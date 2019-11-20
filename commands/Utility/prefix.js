const Discord = require("discord.js");

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("prefix");
  }

  run(client, msg, args) {
    const arg1 = args[0];
  
    if (!arg1)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor(`RANDOM`)
          .setDescription("El prefix actual es: `mth!`")
      );
  }
}

module.exports = Command;

