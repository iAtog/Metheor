const Discord = require('discord.js');
const config = require('/app/config.json');
var Weez = require("weez");
var weez = new Weez.WeezAPI(config.weeztoken);

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("pat");
  }

  settings() {
    return {
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
    (async() => {
      let user = msg.mentions.users.first();
      if(msg.mentions.users.size < 1 || !user)return msg.channel.send("Menciona a una persona");
      if(user === msg.author)return msg.channel.send("¿Y te acariciaras a ti mismo? ok...");
      if(user === client.user)return msg.channel.send("No puedes acariciar a un Meteorito");
      let img = await weez.randomPat();
      const embe = new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .setDescription(msg.author+" Acaricio con cariño a "+user)
      .setImage(img);
      msg.channel.send(embe);
      })()
  }  
}

module.exports = Command;