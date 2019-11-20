const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("kick");
  }

  run(client, msg, args) {
    let mencion = msg.mentions.users.first();
    let razon = args.slice(2).join(" ");
    let helpEmbed = new Discord.RichEmbed()
    .setColor('RED')
    .setAuthor(client.user.username+" | Kick command", msg.author.displayAvatarURL)
    .setDescription("Comando para sacar a usuarios de tu servidor\nUso correcto: `mth!kick @"+client.users.get('580485225952444416').tag+"` Insultos")
    if(!msg.member.hasPermission('KICK_MEMBERS'))return msg.chanel.send("No tienes permiso para ejecutar esta acción")
    if(!mencion || !razon)return msg.channel.send(helpEmbed);

    if(mencion.id === msg.author.id)return msg.channel.send("No te puedes patear a ti mismo.")

    mencion.kick().then(miembro => {
      msg.channel.type === ("dm")+client.users.get(miembro.id).send("Has sido kickeado de "+msg.guild.name+"\nRazón: `"+razon+"`");
      let kickEmbed = new Discord.RichEmbed().setColor('RED').setDescription("**KICK CASE**\n\n> Usuario: "+miembro+"\n> Razón: "+razon+"\n> Mod: "+msg.author).setAuthor("Kick", msg.guild.iconURL)
      msg.channel.send(kickEmbed);
    }).catch((err) => {
      msg.channel.send("No pude patear al usuario mencionado.")
    });

  }
}

module.exports = Command;
