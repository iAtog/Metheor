const Discord = require('discord.js');
const DeletedCommand = require('../DeletedCommand.js');

class InviteCommand extends DeletedCommand {
  constructor() {
    super("invite");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: 0
    }
  }

  run(client, msg, args) {
    let embe = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setTitle("**Link de invitación de "+client.user.username+"**")
    .setDescription("Click [aqui](https://discordapp.com/oauth2/authorize?client_id=605432938649354286&scope=bot&permissions=1073081814) para ir al link de invitación")
    .setFooter('Bot desarrollado por '+client.users.get('580485225952444416').tag,'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383');
    msg.channel.send(embe)
  }
}
module.exports = InviteCommand;