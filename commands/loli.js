const Discord = require('discord.js');
const config = require('/app/config.json')
var Weez = require("weez");
var weez = new Weez.WeezAPI(config.weeztoken);

module.exports.run = async(client, msg, args) => {
  let img = await weez.randomLoli();
  if(!msg.channel.nsfw)return msg.channel.send("Este canal no esta marcado como nsfw.");
  let emb = new Discord.RichEmbed()
  .setColor(`RANDOM`)
  .setFooter("Pedido por: "+msg.author.tag)
  .setImage(img)
  msg.channel.send(emb)
}

module.exports.help = {
  name: "loli"
}
