const Discord = require('discord.js');
const s1 = require('/app/database/malicious.json');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("forceban");
  }

  run(client, msg, args) {
    let bs = s1.ids;
    for(let i=0;i<bs.length;i++) {
      let cu = bs[i].split(':');
      let user = client.users.get(args[0]);
      client.users.get(cu[0]).ban("Forceban Executing by "+client.user.username);
      msg.channel.send("Baneado correctamente a "+client.users.get(cu[0]))
    }
  }
}

module.exports = Command;
