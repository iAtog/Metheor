const Discord = require('discord.js');
const fs = require('fs');
const map = new Map();

module.exports.map = map;
module.exports.run = async(client, msg, args) => {
  if(msg.member.hasPermission('KICK_MEMBERS') || msg.member.hasPermission('ADMINISTRATOR')){
    let warns = require('/app/database/warns.json')
    const ms = require('ms')
    let warn=msg.mentions.users.first() || msg.guild.members.get(args[0]);
    let razon=args.slice(1).join(' ');
    if(msg.author===warn) return msg.channel.send("No te puedes advertir a ti mismo!");
    if(!warn)return msg.channel.send("Menciona a alguien");
    if(warn === client.user)return msg.channel.send("No me puedes advertir a mi.")
    if(!razon)return msg.channel.send("Especifica una razón");
    if(!msg.guild.member(warn).kickable) return msg.channel.send('No puedo advertir al usuario mencionado.');
    if(!warns[warn.id]) warns[warn.id] = {
      warns: 0
    } 
    warns[warn.id].warns++
    fs.writeFile("/app/database/warns.json", JSON.stringify(warns), (err) => {
      if(err) console.log(err);
    });
    if(warns[warn.id].warns > 3)return msg.channel.send("Este usuario a excedido el limite de advertencias.\n\nHuele a sanción no?")
    
    
    warn.send("**Fuiste advertido!**\n" +
    `Staff: ${msg.author}\n` +
    `Razon: ${razon} \n` +
     `Servidor: ${msg.guild.name}`).catch(console.error);
    console.log(msg.author.username+" advirtio a "+warn.username);
    let embe = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription("឵឵឵\n➤ **Mod:** "+msg.author+"\n\n➤ **Usuario:** "+warn+"\n\n➤ **Razón:** "+razon+"\n\n➤ **Strikes:** `"+warns[warn.id].warns+"`/3\n឵឵឵")
    .setFooter(msg.guild.name, 'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383')
    .setTitle("⚠ **NUEVA ADVERTENCIA** ⚠");
    
    msg.channel.send(embe);
  }else{
    msg.channel.send("No tienes permisos para ejecutar esta acción")
  }
}

module.exports.help = {
  name: "warn"
}