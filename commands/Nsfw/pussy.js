const Discord = require('discord.js')

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("pussy");
  }

  run(client, msg, args) {
    (async() => {
      if(msg.channel.nsfw) {
      const memer = require('discordmeme.js');
      let img = await memer.pussy();
    
      let emb = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription("Aqui esta tu perversión")
      .setImage(img)
      msg.channel.send(emb)
      }else{
        msg.channel.send("En este no esta activado el nsfw")
      }
    })()
  }
}

module.exports = Command;
