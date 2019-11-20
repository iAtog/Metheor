const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const config = require('../../config.json');
const queue = new Map();
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.tokens.yttoken);  

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("play");
  }

  run(client, msg, args) {
    async() => {
      if(!args[0]) return msg.channel.send(`Debes especificar una cancion o video!`);
    const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.send(`Debes estar en un canal de voz para que yo pueda reproducir musica!`);
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT')) {
        return msg.channel.send(`No me pude conectar a tu canal de voz. Por favor comprueba que tenga los permisos adecuados.`);
    }
    if (!permissions.has('SPEAK')) {
        return msg.channel.send(`No puedo hablar en este canal de voz. Por favor comprueba que tenga los permisos adecuados.`);
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id); 
            await handleVideo(video2, msg, voiceChannel, true); 
        }
        return msg.channel.send(`Se añadio la playlist ${playlist.title} a la cola!`);
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 10);
                let index = 0;
                const embed = new Discord.RichEmbed()
                .setTitle("Selecciona un video")
                .setDescription("Por favor proporciona un valor para seleccionar uno de los resultados de la busqueda de 1 a 10.")

                msg.channel.send(`**Selecciona una cancion o video**
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Por favor proporciona un valor para seleccionar uno de los resultados de la busqueda de 1 a 10.
                `);
                try {
                    var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    console.error(err);
                    return msg.channel.send(`No se obtuvo una respuesta valida.`);
                }
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return msg.channel.send('');
            }
        }
        return handleVideo(video, msg, voiceChannel);
    }
    }
  
  }
}

module.exports = Command;


async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Ocurrio un error, por lo que no pude conectarme al canal de voz: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Ocurrio un error, por lo que no pude conectarme al canal de voz.\nDetalles: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(` Se añadio ${song.title} a la cola!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.'){
                console.log('La cancion se ha terminado: '+reason);
            } 
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const embed = new Discord.RichEmbed()
    .setAuthor("Reproductor | Metheor", 'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383')
    .setDescription(`Comenzando a reproducir la cancion ${song.title}!`)
    .setFooter('Disfruta de tu estadia escuchando.', 'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383')
    .setColor("#EE82EE")
	serverQueue.textChannel.send({embed});
}

module.exports.queue = queue;
