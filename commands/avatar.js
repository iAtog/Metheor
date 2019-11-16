const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  let img = msg.mentions.users.first() || client.users.get(args[0]);
    if (!img) {

        const embed = new Discord.RichEmbed()
        .setImage(`${msg.author.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${msg.author.tag}`);
        msg.channel.send(embed);

    } else if (img.avatarURL === null) {

        msg.channel.send("El usuario ("+ img.username +") no tiene avatar!");

    } else {

        const embed = new Discord.RichEmbed()
        .setImage(`${img.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Imagen de perfil de ${img.tag} | Pedido por: ${msg.author.tag}`);
      if(img.id === '580485225952444416')return msg.channel.send("No le puedes robar la imagen a mi Dios!")
        msg.channel.send(embed);

    };
}
module.exports.help = {
  name: "avatar"
}