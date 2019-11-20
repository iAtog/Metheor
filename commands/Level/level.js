const Discord = require('discord.js');
const fs = require('fs');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("level");
  }

  settings() {
    return {
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
    (async() => {
      let xp = require('/app/database/level.json');
  
    let user = msg.mentions.users.first() || msg.author;
    
    const leveling = require('discord-leveling');
    
    var output = await leveling.Fetch(user.id)
    
    let embe = new Discord.RichEmbed()
    .setColor('random')
    .setAuthor(user.username+" - Nivel", user.displayAvatarURL)
    .setDescription("Los datos del usuario son:\n\n➤**LEVEL:** `"+output.level+"`\n\n➤**XP:** `"+output.xp+"`\n឵឵឵឵឵឵឵឵឵឵឵឵឵")
    msg.channel.send(embe);
    })()
  }
}

module.exports = Command;