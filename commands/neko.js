const Discord = require('discord.js')
const nekoslife = require('nekos.life');
const {nsfw} = new nekoslife();

module.exports.run = async(client ,msg ,args) => {
  let img = await nsfw.neko();
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setImage(img.url)
  msg.channel.send(embed)
}

module.exports.help = {
  name: "neko"
}