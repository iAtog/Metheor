const Discord = require('discord.js');
const cool = new Set();

module.exports.export = async(client, msg) => {
  const leveling = require('discord-leveling');
  
  const ms = require('ms');
  var profile = await leveling.Fetch(msg.author.id)
  let xpAdd = Math.floor(Math.random() * 5)+7;
  let cooldown = Math.floor(1000 * 60);
  if(cool.has(msg.author.id))return;
  
  if(profile.level === 0) {
    leveling.AddLevel(msg.author.id, 1)
  }
  leveling.AddXp(msg.author.id, xpAdd)
  
  let nxtlvl = profile.level * 354;
  
  if(profile.xp > nxtlvl){
    leveling.AddLevel(msg.author.id, 1)
    let emb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(msg.author.username+" - Level UP!", msg.author.displayAvatarURL)
    .setDescription("Felicidades! has subido al nivel "+Math.floor(profile.level+1))
    .setThumbnail('https://i.imgur.com/lXeBiMs.png')
    .setFooter(msg.guild.name, msg.guild.iconURL)
    msg.channel.send(emb)
  }
  
  cool.add(msg.author.id);
  setTimeout(() => {
    cool.delete(msg.author.id);
  }, cooldown);
}
