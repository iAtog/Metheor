const Discord = require('discord.js');
const DeletedCommand = require('../DeletedCommand.js');

class BugReportCommand extends DeletedCommand {
  constructor() {
    super("bugreport");
  }
  
  settings() {
    return {
      minArgs: 0,
      maxArgs: -1,
      usage: "```Envia un reporte de falla o bug\nEjemplo: mth!bugreport Descripción|Prueba```"
    }
  }

  run(client, msg, args) {
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
  
}
module.exports = BugReportCommand;