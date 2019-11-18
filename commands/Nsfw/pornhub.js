const Discord = require('discord.js');


const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("pornhub");
  }

  run(client, msg, args) {
    msg.channel.send("Todavia se esta desarrollando...")
  }
}

module.exports = Command;
