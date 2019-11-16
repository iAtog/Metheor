const Discord = require('discord.js');

module.exports.run = async(client, msg ,args) => {
  const eco = require('discord-economy');
  
  var output = await eco.FetchBalance(msg.author.id)
  let mencion = msg.mentions.users.first() || client.users.get(args[0]);
  if(!mencion) {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(msg.author.username+" | Economy", msg.author.displayAvatarURL)
    .setDescription("➤ Dinero: `"+output.balance+"`")
    msg.channel.send(embed)
  }else{
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(mencion.username+" | Economy", mencion.displayAvatarURL)
    .setDescription("➤ Dinero: `"+output.balance+"`")
  msg.channel.send(embed)
  }
  
  
}

module.exports.help = {
  name: "balance"
}