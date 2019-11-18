const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("pay");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: -1,
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
    let eco = require('discord-economy')
    let user = msg.mentions.users.first();
    let money = args[1];
    
    let helpEmbed = new Discord.RichEmbed()
    .setColor('#2C2F33')
    .setAuthor("Transfiere a usuarios!",client.user.displayAvatarURL)
    .setDescription("__Para usar este comando tienes que ponerlo como te digo:__\n`prefix`pay @Usuario#1234 (Dinero)");
    
    if(!user)return msg.channel.send(helpEmbed);
    if(!money)return msg.channel.send(helpEmbed);
    if(user === msg.author)return msg.channel.send("No puedes transferirte dinero a ti mismo!")
    if(user.bot)return msg.channel.send("No le puedes transferir a un bot.")
    let output = await eco.FetchBalance(msg.author.id)
    if(output.balance < money)return msg.channel.send("Tu no tienes los suficientes fondos para efectuar este comando");
    let transfer = await eco.Transfer(msg.author.id, user.id, money)
    let payEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(msg.author.username+" Pago a "+user.username, client.user.displayAvatarURL)
    .setDescription("Le transferiste `"+money+"`<:money:640013365502279707> a "+user+" Ahora tiene: `"+transfer.ToUser+"`<:money:640013365502279707>")
    msg.channel.send(payEmbed)
  }
}

module.exports = Command;
