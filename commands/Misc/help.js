const Discord = require('discord.js');
const config = require('/app/config.json')

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("help");
  }
  aliases() {
    return ["ayuda"];
  }
  run(client, msg, args) {
    const main = require('../../app.js');
    const guildConf = client.settings.ensure(msg.guild.id, main.defaultSettings);
    
    const embe = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor('Metheor - Ayuda',client.user.displayAvatarURL)
    .setDescription("Hola! Soy el meteorito que amenazo a la humanidad varias veces! Vengo en forma de **bot** para discord!\nAqui te dare la ayuda\n\n<a:ooo:639781184410222632>❯¿Quieres ver mis comandos? Usa: ``"+guildConf.prefix+"comandos``\n<a:ooo:639781184410222632>❯¿Soporte? Visita los siguientes links!\n\n [⇝ Discord Link](https://discord.gg/t9Fs2dp)\n[⇝ Servido aliado](https://discord.gg/SW5pqy3)\n\n<:backup:639784829298409493>**➤Bot de Backups!**\n[Click aqui para invitar al bot](https://discordapp.com/oauth2/authorize?client_id=637393386764238869&scope=bot&permissions=8)")
    .setFooter(client.user.username, client.user.displayAvatarURL)
    msg.channel.send(embe);
  }
}

module.exports = Command;
