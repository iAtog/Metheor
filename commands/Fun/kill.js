const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("kill");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: -1,
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
    let images = [
      'https://media.giphy.com/media/W7o5wwiAGY0lG/giphy.gif',
      'https://i.imgur.com/nNuad7E.gif',
      'https://media.giphy.com/media/20KSmo8aJ7HYu5L0rf/giphy.gif'
    ];
    let mencion = msg.mentions.users.first();
    if(msg.mentions.users.size < 1 || !mencion)return msg.channel.send("Menciona a una persona para liquidarla");
    if(mencion === client.user)return msg.channel.send("No puedes matar a un meteorito");
    let imagen = images[Math.floor(Math.random() * images.length)];
    
    let embe = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(imagen);
    if(mencion === msg.author){
      embe.setDescription(msg.author+" Se mato a si mismo");
    }else{
      embe.setDescription(msg.author+" Mato a "+mencion+"... :'c")
    }
    msg.channel.send(embe)
  }
}

module.exports = Command;
