const Discord = require('discord.js');
const DeletedCommand = require('../DeletedCommand.js');

class RestartCommand extends DeletedCommand {
  constructor() {
    super("restart");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: 0
    }
  }

  run(client, msg, args) {
    if(msg.author.id === '580485225952444416'){
      msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setDescription("<a:discord:622860046648475689> Me estoy reiniciando... ")).then(msg => client.destroy()).then(msg => client.login(process.env.TOKEN).then(msg => process.exit(1)))
    }
  }

}

module.exports = RestartCommand;