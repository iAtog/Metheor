const Discord = require('discord.js');
const fs = require('fs');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("snipe");
  }

  run(client, msg, args) {
    let snipe = require('/app/database/snipe.json');
    let ch = `${msg.channel.id}`;
    let snipeChannel = snipe[ch];
    try{
      if(snipeChannel[0] === "No snipes") {
      msg.channel.send("No se ha encontrado Snipes")
    }else{
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription("**Message:** "+snipeChannel[0]+".\n\n**User:** "+snipeChannel[1])
      
      
      msg.channel.send(embed);
      
      snipeChannel[0] = "No snipes";
      
      let fileName = "/app/database/snipe.json";
      
      fs.writeFile(fileName, JSON.stringify(snipe, null, 2), (error) => {
        if(error)return console.log(error);
      });
      
    }
    }catch(err) {
      return console.log(err);
    }
  }
}

module.exports = Command;
