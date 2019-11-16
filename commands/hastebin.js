const Discord = require('discord.js');
const hastebin = require('hastebin-gen');

module.exports.run = (client, msg, args) => {
    let haste = args.slice(0).join(" ")
       let type = args.slice(1).join(" ")
       if (!args[0]) { return msg.channel.send("<a:discord:622860046648475689> No puedo subir aire a Hastebin."); }
       hastebin(haste).then(r => {
         msg.channel.send("Tu post fue creado con exito! Puedes verlo en "+r+" cuando tu quieras.");
         return;
           const embed = new Discord.RichEmbed()
           .setTitle("__Hastebin__")
           .setDescription("<a:discord:622860046648475689> Tu post fue creado con exito! Puedes verlo en "+r+" cuando tu quieras.");
           embed.setColor("#EE82EE");
           embed.setFooter('Bot desarrollado por '+client.users.get('580485225952444416').tag, 'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383');
           msg.channel.send(embed);
       }).catch(console.error);
} 

module.exports.help = {
  name: "hastebin"
}
