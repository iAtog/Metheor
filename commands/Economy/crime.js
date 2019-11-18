const Discord = require('discord.js');
const DeletedCommand = require('../DeletedCommand.js');
let cool = new Set();
let ms = require('ms');

class CrimeCommand extends DeletedCommand {
  constructor() {
    super("crime");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: 0,
      usage: "Uso incorrecto."
    }
  }

  run(client, msg, args) {
    let eco = require('discord-economy');
  
  
    if(cool.has(msg.author.id))return msg.channel.send("Debes esperar 5 horas para volver a robar");
    let output = await eco.Work(msg.author.id, {
      failurerate: 50,
      money: Math.floor(Math.random() * 7)+8,
      jobs: ['un banco','un orfanato','a un youtuber','a un abuelo','a una casa']
    });
    if(output.earned === 0){
      let random = Math.floor(Math.random() * 40);
      eco.SubtractFromBalance(msg.author.id, random)
      msg.channel.send("Fallaste cometiendo un crimen y recibiste una multa de "+random+"<:money:640013365502279707>")
      return;
    }
    
    let balanceEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(msg.author.username+" | Robo", msg.author.displayAvatarURL)
    .setDescription("Robaste "+output.job+" y ganaste "+output.earned+"<:money:640013365502279707>")
    .setFooter(msg.guild.name, msg.guild.iconURL);
    msg.channel.send(balanceEmbed);
    
    cool.add(msg.author.id);
    setTimeout(() => {
      cool.delete(msg.author.id);
    }, Math.floor(1000 * 60 * 60 * 5));
  }

}

module.exports = CrimeCommand;