const Discord = require('discord.js')
const memer = require("discordmeme.js");

module.exports.run = async(client, msg, args) => {
  let img = msg.mentions.users.first();
  try{
    if(!img) {
    let triggered = await memer.trigger(msg.author.avatarURL)
    msg.channel.send(new Discord.RichEmbed().setColor('random').setImage(triggered))
  }else if(img.avatarURL === null) {
    msg.channel.send("Este usuariono tiene avatar")
  }else{
    let triggered = await memer.trigger(img.avatarURL);
    msg.channel.send(new Discord.RichEmbed().setColor('random').setImage(triggered))
  }
  }catch(err) {
   msg.channel.send("Ha ocurrido un error al ejecutar esta accion") 
  }
}

module.exports.help = {
  name: "triggered"
}