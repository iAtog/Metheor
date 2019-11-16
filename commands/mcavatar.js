const Discord = require('discord.js');
const request = require('request');

module.exports.run = async(client, msg, args) =>{
  let apiURL = `https://api.mojang.com/users/profiles/minecraft/${args[0]}`;
  if(!args[0])return msg.channel.send("Especifica a un usuario del juego.");
  msg.channel.send("Buscando...").then(m => {
    try{
      request(apiURL, function(err, resp, body) {
      m.edit("Encontrado!");
      body = JSON.parse(body);
      let id = body.id;
      let url = `https://crafatar.com/avatars/${id}.png`;
      let embe = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setImage(url)
      //msg.channel.send({files: [url]})
      m.edit(embe)
  });
    }catch(error) {
      m.edit("Ha ocurrido un error al encontrar el usuario o el servicio esta fuera.")
    }
  }).catch(console.error);
}

module.exports.help = {
  name: "mcavatar"
}