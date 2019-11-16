const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  if(!args[0])return msg.channel.send("Especificame el nombre de la cabeza")
  let head = `https://cravatar.eu/helmhead/${args[0]}.png`;
  msg.channel.send("Buscando skin...").then((m) => {
    if(head === null)return m.edit("Cabeza no encontrada");
    m.edit("Lo tengo!").then(s => {
      try{
        let emb = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setImage(head)
      s.edit(emb)
      }catch(err) {
        msg.channel.send("Ha ocurrido un error we")
      }
      
      });
    });
    
  
}

module.exports.help = {
  name: "mchead"
}