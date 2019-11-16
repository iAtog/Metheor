const Discord = require('discord.js');
const request = require('request');

module.exports.run = async(client, msg, args) => {
  // https://minotar.net/armor/body
  if(!args[0])return msg.channel.send("Especifica un jugador")
  let apiURL = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`;
  msg.channel.send("Buscando...").then(m => {
    try{
      request(apiURL, function(err, resp, body) {
        body = JSON.parse(body);
        let url = `https://minotar.net/armor/body/${args[0]}/100.png`;
        m.edit("Lo tengo!");
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setImage(url);
        m.edit(embed)
    });
    }catch(error) {
      msg.channel.send("Jugador no encontrado.")
      m.edit("Error")
    }
    
  });
  
  
}


module.exports.help = {
  name: "mcbody"
}