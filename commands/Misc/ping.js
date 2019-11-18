const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("ping");
  }

  run(client, msg, args) {
    let ping = Math.round(client.ping)
    msg.channel.send(new Discord.RichEmbed().setColor(`RANDOM`).setDescription("Mi latencia actual es: `"+ping+"`ms"));
  }
}

module.exports = Command;

