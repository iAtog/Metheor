const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  const memer = require("discordmeme.js");
 if(!args[0])return msg.channel.send("Especifica un texto")
  let qr = await memer.qrcodegen(args.join(" "))
  
  //const attachment = new Discord.Attachment(qr, 'qrcode.png');
  msg.channel.send(new Discord.RichEmbed().setColor('RANDOM').setImage(qr));
}

module.exports.help = {
  name: "qrcodegen"
}
