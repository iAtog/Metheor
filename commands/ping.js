const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  let ping = Math.round(client.ping)
  msg.channel.send(new Discord.RichEmbed().setColor(`RANDOM`).setDescription("Mi latencia actual es: `"+ping+"`ms"));
}

module.exports.help = {
  name: "ping"
}
