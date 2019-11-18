const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const ytdl = require('ytdl-core')
const config = require('../../config.json');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.tokens.yttoken);
let playCommand = require('./play.js');
let queue = playCommand.queue;

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("nowplaying");
  }

  run(client, msg, args) {
    const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send(`No hay nada reproduciendose ahora mismo.`);
    return msg.channel.send(`La cancion actual es: ${serverQueue.songs[0].title}`);
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
		else return msg.channel.send(`Se añadio ${song.title} a la cola!`);
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
	serverQueue.textChannel.send({embed});
}