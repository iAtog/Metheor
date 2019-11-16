const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  let images = [
    'https://media.tenor.com/images/9ee0591267125d5bee771079aa0ab42a/tenor.gif',
    'https://media.tenor.com/images/7c37724f05ed6d2272d1eaa00d0b06a9/tenor.gif',
    'https://media.tenor.com/images/ca4da758cdd8816f0e79f5dd0fe83f6d/tenor.gif',
    'https://media.tenor.com/images/a2e8ad72e1e8c4030b89ff1ef40ee2f5/tenor.gif',
    'https://media.tenor.com/images/b977f6d26035cee778f3a584f31bb31e/tenor.gif',
    'https://media.tenor.com/images/1e37cb56c521ce4099c15ce46bd74320/tenor.gif',
    'https://media.tenor.com/images/5db4c3757b3a83de24ee6abe0f0b536c/tenor.gif'
  ];
  let imagen = images[Math.floor(Math.random() * images.length)];
  let user = msg.mentions.users.first();
  if(msg.mentions.users.size < 1 || !user)return msg.channel.send(new Discord.RichEmbed().setColor(`RANDOM`).setDescription("Menciona a la victima"))
  if(user === client.user)return msg.channel.send("No puedes hackear a un meteorito.");
  if(user === msg.author)return msg.channel.send("No te puedes hackear a ti mismo jsjs.");
  if(user === msg.guild.owner)return msg.channel.send("No puedes hackear al todo poderoso jsjs.")
  let embe = new Discord.RichEmbed()
  .setColor(`RANDOM`)
  .setImage(imagen)
  .setDescription(msg.author+" Hackeo a "+user);
  msg.channel.send(embe)
}
module.exports.help = {
  name: "hack"
}