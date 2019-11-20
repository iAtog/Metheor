const Discord = require('discord.js');
const request = require('request');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("mcbody");
  }

  settings() {
    return {
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
  // https://minotar.net/armor/body
  if(!args[0])return msg.channel.send("Especifica un jugador")
  let apiURL = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`;
  msg.channel.send("Buscando...").then(m => {
    try{
      request(apiURL, function(err, resp, body) {
        body = JSON.parse(body);
        let url = `https://minotar.net/armor/body/${args[0]}/100.png`;
        m.edit("Lo tengo!");
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage(url);
        m.edit(embed)
    });
    }catch(error) {
      msg.channel.send("Jugador no encontrado.")
      m.edit("Error")
    }
    
  });
  }
}

module.exports = Command;
