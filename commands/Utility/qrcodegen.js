const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("qrcodegen");
  }

  run(client, msg, args) {
    const memer = require("discordmeme.js");
    if(!args[0])return msg.channel.send("Especifica un texto")
     let qr = await memer.qrcodegen(args.join(" "))
     
     msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setImage(qr));
  }
}

module.exports = Command;
