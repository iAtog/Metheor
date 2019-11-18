const Discord = require('discord.js')

const userstatus = {
    online: "<:online:639219652958093352> En linea", // Icono de online
    idle: "<:idle:639219650839838721> Ausente", // Ausente
    dnd: "<:dnd:639219650349105184> No molestar", // No molestar
    offline: "<:offline_invisble:639219652941053980> Desconectado/Invisible" // Desconectado o Invisible
  }

let isbot = "";
let nickname = "";

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " un dia" : " dias") + " atras";
};

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("userinfo");
  }

  run(client, msg, args) {
    const user = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.member;
    let target = msg.mentions.users.first() || msg.author;
    
    if(user.user.bot){
          isbot = "Si";
      }else{
          isbot = "No";
      }
    if(user.nickname != null){
          nickname = user.nickname;
      }else{
          nickname = "Ninguno"; 
      }
    
    const embed = new Discord.RichEmbed()
      .setTitle("Informacion") // titulo
      .setDescription("Aqui esta la informacion que estabas pidiendo.")
      .addField("Nombre completo:", user.user.tag, false)
      .addField("Bot:", isbot, false)
      .addField("ID:", user.user.id, false)
      .addField("Nickname:", nickname, false)
      .addField("Estado:", userstatus[user.user.presence.status], false)
      .addField("Fecha de creacion:", `${user.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(user.user.createdAt)})`, false)
      .addField("Roles", `${user.roles.filter(r => r.id !== msg.guild.id).map(roles => `\`${roles.name}\``).join(" , ") || "Sin roles"}`, false);
      embed.setColor("#EE82EE");
    msg.channel.send(embed)
  }
}

module.exports = Command;
