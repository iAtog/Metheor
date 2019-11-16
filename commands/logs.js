const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  if (!msg.member.hasPermission("ADMINISTRATOR")) return;
    const channel = msg.mentions.channels.first().id;
    if (!msg.mentions.channels < 1)
      return msg.channel.send("Menciona un canal!");

    client.channels
      .get(channel)
      .send(
        new Discord.RichEmbed()
          .setColor(`RANDOM`)
          .setDescription(
            "Ahora en este canal se registraran las actividades del servidor!"
          )
      );
    msg.channel.send("Si " + channel);
}
module.exports.help = {
  name: "logs"
}