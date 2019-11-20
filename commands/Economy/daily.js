const Discord = require('discord.js');
const cool = new Set();
const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("daily");
  }

  run(client, msg, args) {
    (async() => {
      const eco = require('discord-economy');
      if(cool.has(msg.author.id))return msg.channel.send("Tu ya has reclamado tu recompenza diaria!.\nTienes que esperar 24h Para volverla a reclamar!");
      let profile = await eco.AddToBalance(msg.author.id, 30);
      msg.channel.send("<:money:640013365502279707> Haz reclamado la recompenza diaria!.\nAhora tienes "+profile.newbalance);
  
      cool.add(msg.author.id);
      setTimeout(() => {
        cool.delete(msg.author.id);
      }, Math.floor(1000 * 60 * 60 * 24));
    })()
  }
}

module.exports = Command;