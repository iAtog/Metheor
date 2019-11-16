const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  const arg1 = args[0];
  
  if (!arg1)
    return msg.channel.send(
      new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setDescription("El prefix actual es: `mth!`")
    );
  
};

module.exports.help = {
  name: "prefix"
}
