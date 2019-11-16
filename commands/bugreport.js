const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  let e = "```Envia un reporte de falla o bug\nEjemplo: mth!bugreport Descripción|Prueba```";
  if(!args[0])return msg.channel.send(e);
  let arg1 = args.join(' ').split('|');
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
  .addField("Comentario:","`"+arg1[0]+"`",true)
  .addField("Prueba:", "[Link]( "+arg1[1]+" )",true)
  .setFooter("Reporte de bug", client.user.displayAvatarURL);
  client.channels.get('639897149546692628').send(embed);
  
  msg.channel.send(":white_check_mark: Tu reporte ha sido enviado a los desarrolladores!").then(m => msg.delete(5000));
}

module.exports.help = {
  name: "bugreport"
}