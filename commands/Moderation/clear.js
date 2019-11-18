const Discord = require('discord.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("clear");
  }

  run(client, msg, args) {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) {
      msg.channel.send("Tu no tienes permisos para manejar mensajes.")
      return;
    } else if(!msg.channel.permissionsFor(client.user).hasPermission("MANAGE_MESSAGES")) {
      msg.channel.send("Necesito el permiso: `MANAGE_MESSAGES` para poder ejecutar el comando");
      return;
    }
    if(!args[0])return msg.channel.send("Especifica el numero de mensajes por eliminar");
    
    let messagecount = parseInt(args[0]);
    
    if(messagecount > 101 || messagecount <= 0) {
      msg.channel.send("Necesitas especificar el número de mensajes pro eliminar el cual seria del 1 al 100");
      return;
    }
    
    msg.channel.fetchMessages({ limit: messagecount })
    msg.delete().then(() => msg.channel.bulkDelete(messagecount)).then((messages) => {
      msg.channel.send(`Se eliminaron ${messages.size} mensaje(s)`).then(m => m.delete(3000))
    });
  }
}

module.exports = Command;
