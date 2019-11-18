const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("run");
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
      'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2Frun01.gif?v=1570757600330',
      'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2Frun02.gif?v=1570759790118',
      'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2Frun03.gif?v=1570759965414',
      'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2Frun04.gif?v=1570760081679',
      'https://tenor.com/view/hasta-la-proxima-gif-14857954'
    ];
    let imagen = images[Math.floor(Math.random() * images.length)];
    const embe = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setDescription(msg.author+" Se hecho a correr...")
    .setImage(imagen);
    msg.channel.send(embe);
  }
}

module.exports = Command;