const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("say");
  }

  run(client, msg, args) {
    let m = args[0];
    if(!args[0])return msg.channel.send("Especifica un texto por enviar.");
    if(!msg.member.hasPermission('MENTION_EVERYONE'))m.replace("@everyone", "@-everyone").replace("@here", "@-here");
    msg.channel.send(m);
  }
}

module.exports = Command;
