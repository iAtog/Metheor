const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("work");
  }

  run(client, msg, args) {
    (async() => {
      const eco = require('discord-economy');
    const cool = new Set();
    let culdoun = await eco.Daily(msg.author.id);
    const ms = require('ms');
    if(culdoun.updated){
      let output = await eco.Work(msg.author.id, {
        failurerate: 10,
        money: Math.floor(Math.random() * 50),
        jobs: ['de abogado', 'de minero', 'de leñador','de youtuber','de hacker','de alter','de programador','en enviar nudes','en sexcam','de streamer','de contador','de limpiador', 'en buzzbreaken','en google opinion rewards', '']
      })
    if (output.earned === 0) return msg.reply('Oh no, No has podido recojer nada D:');
    let time = "4h";
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(msg.author.username+" | Trabajo", msg.author.displayAvatarURL)
    .setDescription("Has trabajado "+output.job+" y ganaste `"+output.earned+"`$ y ahora tienes `"+output.balance+"`$")
    .setFooter(msg.guild.name, msg.guild.iconURL)
    
    msg.channel.send(embed)
    
    cool.add(msg.author.id);
    setTimeout(function(){
      cool.delete(msg.author.id);
    }, ms(time));
    }else{
      msg.channel.send("Tienes que esperar "+culdoun.timetowait+" para volver a trabajar!")
    }
    })();
    
  }
}

module.exports = Command;
