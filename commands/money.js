const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  let emb = new Discord.RichEmbed()
  .setColor(`RANDOM`)
  .setDescription("❌ Argumentos del comando:\n**`bal` - Mira tu dinero en total**")
  .setFooter('Developed by '+client.users.get('580485225952444416').tag,'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383')
  if(!args[0])return msg.channel.send(emb)
}

module.exports.help = {
  name: "money"
}