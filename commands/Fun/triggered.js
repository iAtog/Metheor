const Discord = require('discord.js')
const memer = require("discordmeme.js");

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("triggered");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: 0,
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
    let img = msg.mentions.users.first();
    try{
      if(!img) {
      let triggered = await memer.trigger(msg.author.avatarURL)
      msg.channel.send(new Discord.RichEmbed().setColor('random').setImage(triggered))
    }else if(img.avatarURL === null) {
      msg.channel.send("Este usuariono tiene avatar")
    }else{
      let triggered = await memer.trigger(img.avatarURL);
      msg.channel.send(new Discord.RichEmbed().setColor('random').setImage(triggered))
    }
    }catch(err) {
     msg.channel.send("Ha ocurrido un error al ejecutar esta accion") 
    }
  }
}

module.exports = Command;