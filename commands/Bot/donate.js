const Discord = require('discord.js');
const config = require('../../config.json');
const DeletedCommand = require('../DeletedCommand.js');

class DonateCommand extends DeletedCommand {
  constructor() {
    super("donate");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: 0,
      usage: ""
    }
  }

  run(client, msg, args) {
    let embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setTitle("Donar al creador de "+client.user.username)
    .setDescription("Puedes donar a `"+config.creator+"` para ayudarlo a seguir y mejorarme cliqueando [AQUI](https://www.paypal.me/atog123) ")
    .setFooter('Bot desarrollado por '+config.creator,'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383');
    msg.channel.send(embed)
  }

}

module.exports = DonateCommand;