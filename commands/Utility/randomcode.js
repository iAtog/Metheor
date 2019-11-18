const Discord = require('discord.js');

let code = function(lenght) {
  let result = "";
  let characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < lenght; i++) {
    result =
      result + characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("randomcode");
  }

  run(client, msg, args) {
    const arg1 = args.slice(1).join(" ");
    const arg2 = args.slice(2).join(" ");
    let limit = 1000;
    if (!arg1)
      return msg.channel.send(
        new Discord.RichEmbed()
          .setColor(`RANDOM`)
          .setDescription("Selecciona un tipo")
          .addField("Tipos:", "`private` & `public`", true)
      );

    if (arg1.startsWith("private")) {
      if (!arg2)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription("Choose a lenght")
        );
      if (arg2 > limit)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription("Mi limite es: `" + limit + "`")
        );
      msg.channel.type ===
        `"dm"` +
          client.users.get(msg.author.id).send(
            new Discord.RichEmbed()
              .setColor(`RANDOM`)
              .setTitle("Tu codigo")
              .setDescription("`" + code(arg2) + "`")
          );
    }
    if (arg1.startsWith("public")) {
      if (!arg2)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription("Selecciona una cantidad")
        );
      if (arg2 > limit)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription("Mi limite es: `" + limit + "`")
        );
      msg.channel.send(
        new Discord.RichEmbed()
          .setColor(`RANDOM`)
          .setTitle("Tu codigo")
          .setDescription("`" + code(arg2) + "`")
      );
    }
  }
}

module.exports = Command;
