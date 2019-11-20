const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("suicide");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: 0,
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
    let images = [
      'https://cdn.discordapp.com/attachments/399448944889036801/503052598803300352/ewe.gif',
      'https://cdn.discordapp.com/attachments/399448944889036801/503051880109178900/Sayori.gif',
      'https://i.imgur.com/4JaVy5S.gif',
      'https://i.imgur.com/R3U7fz4.gif'
    ];
    let imagen = images[Math.floor(Math.random() * images.length)];
    let embe = new Discord.RichEmbed()
    .setImage(imagen)
    .setColor(`RANDOM`)
    .setDescription(msg.author+" Se Suicido! D':")
    msg.channel.send(embe)
  }
}

module.exports = Command;