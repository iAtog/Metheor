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
    super("skip");
  }

  run(client, msg, args) {
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    if (!msg.member.voiceChannel) return msg.channel.send(`No estas en un chat de voz!`);
    if (!serverQueue) return msg.channel.send(`No hay nada que reproducir!`);
    serverQueue.connection.dispatcher.end(`Salteando a la siguiente cancion...`);
    return undefined;
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
			console.error(` Ocurrio un error, por lo que no pude conectarme al canal de voz: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(` Ocurrio un error, por lo que no pude conectarme al canal de voz.\nDetalles: ${error}`);
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
			if (reason === 'Stream is not generating quickly enough.') console.log('La cancion se ha terminado.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const embed = new Discord.RichEmbed()
    .setTitle("Siguiente!")
    .setDescription(`Comenzando a reproducir la cancion ${song.title}!`)
    .setColor("#EE82EE")
    .setFooter('Bot desarrollado por Pabszito#7790', 'https://cdn.discordapp.com/avatars/549379358914248724/679997bb2c5db236807fa73011e6d98c.png?size=2048');
	serverQueue.textChannel.send({embed});
}
module.exports.help = {
  name: "skip"
}