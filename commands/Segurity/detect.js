const Discord = require('discord.js');
let s1 = require('/app/database/malicious.json');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("detect");
  }

  run(client, msg, args) {
    let bs = s1.ids;
    if(bs[msg.author.id])return msg.channel.send("Oh no. Tu eres un usuario malicioso!. no puedes ejecutar este comando.")
    const emb = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setDescription("Personas `PELIGROSAS` en su servidor")
    .setFooter("Desarrollado por "+client.users.get('580485225952444416').tag)
    let number = 1;
    for(let al=0;al<bs.length;al++){
      let cu = bs[al].split(':');
      if(bs && msg.guild.members.has(cu[0])){
        
        emb.setTitle("**Personas Peligrosas Detectadas!**")
        emb.addField("**Usuario Malicioso Detectado**","➤ #"+number+" "+client.users.get(cu[0])+"\n"+cu[1],true);
        number++
    }
    }
    if(emb.fields.length < 1)return msg.channel.send(new Discord.RichEmbed().setColor(`RANDOM`).setDescription("Su servidor no esta en peligro!"))
    msg.channel.send(emb);
  }
}

module.exports = Command;

