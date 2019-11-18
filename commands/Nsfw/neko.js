const Discord = require('discord.js')
const nekoslife = require('nekos.life');
const {nsfw} = new nekoslife();

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("neko");
  }

  run(client, msg, args) {
    if(!msg.channel.nsfw)return msg.channel.send("Este canal no esta marcado como ´nsfw´");
    let img = await nsfw.neko();
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setImage(img.url)
    msg.channel.send(embed);
  }
}

module.exports = Command;

module.exports.run = async(client ,msg ,args) => {

}

module.exports.help = {
  name: "neko"
}