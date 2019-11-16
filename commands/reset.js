const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  if(msg.author.id !== '580485225952444416')return;
  const main = require('/app/app.js');
  const guildConf = client.settings.ensure(msg.guild.id, main.defaultSettings);
  client.guilds.forEach(g => {
    client.settings.delete(g.id);
    client.settings.ensure(g.id, main.defaultSettings)
  });
}

module.exports.help = {
  name: "reset"
}