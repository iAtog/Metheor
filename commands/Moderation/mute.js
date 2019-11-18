const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("mute");
  }

  run(client, msg, args) {
    msg.channel.send("Todavia se esta tabajando en ello.");
  }
}

module.exports = Command;
