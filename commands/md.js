const Discord = require('discord.js');

module.exports.run = async(client, msg, args) =>{
  const user = msg.mentions.users.first() || client.users.get(args[0]);
  const mensaje = args.slice(1).join(" ");
  if(!user) return msg.reply("Debes de mencionar a un usuario para enviar el mensaje!");
  if(!args[1])return msg.channel.send("Dime el texto para enviar");
  if(user.id === msg.author.id)return msg.channel.send("No puees mandarte md a ti mismo.");
  if(user.bot)return msg.channel.send("No puedo mandarle el mensaje a un bot!.")
  let embed = new Discord.RichEmbed()
  .setAuthor(msg.author.tag+" | Mensaje", msg.author.displayAvatarURL)
  .setDescription(mensaje)
  .setColor('RANDOM')
  .setFooter("Te lo manda de todo corazón o no O.o", user.displayAvatarURL)
  msg.channel.type === ("dm")+client.users.get(user.id).send(embed).then(m => m.react('632347818820108328'));
  msg.channel.send("Tu mensaje ha sido enviado correctamente · "+msg.author)
  
  
}

module.exports.help = {
  name: "md"
}