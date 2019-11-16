const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  let m = args[0];
  if(!args[0])return msg.channel.send("Especifica un texto por enviar.");
  if(!msg.member.hasPermission('MENTION_EVERYONE'))m.replace("@everyone", "@-everyone").replace("@here", "@-here");
  msg.channel.send(m);
}

module.exports.help = {
  name: "say"
}