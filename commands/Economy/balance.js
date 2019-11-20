const Discord = require('discord.js');
const DeletedCommand = require('../DeletedCommand');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('/app/database/banco.sqlite');

class BalanceCommand extends DeletedCommand {
  constructor() {
    super ("balance");
  }

  aliases() {
    return ["bal", "money", "dinero", "balance"];
  }



  run(client, msg, args) {
    (async () => {
      const eco = require('discord-economy');
    var output = await eco.FetchBalance(msg.author.id);

    let mencion = msg.mentions.users.first() || client.users.get(args[0]);
    if(!mencion) {
      let dineroEnBanco = '';

      db.get(`SELECT * FROM banco WHERE id = "${msg.author.id}"`, (err, table) => {
        if(err)console.log(err);
        if(!table) {
          dineroEnBanco = 'No account found';
        }else{
          dineroEnBanco = Math.floor(dineroEnBanco+table.money);
        }
      });

      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(msg.author.username+" | Economy", msg.author.displayAvatarURL)
      .setDescription("➤ Dinero: `"+output.balance+"`\n\n➤ Banco: `"+dineroEnBanco+"`")
      msg.channel.send(embed)
    }else{
      let dineroEnBanco = '';
      db.get(`SELECT * FROM banco WHERE id = "${mencion.id}"`, (err, table) => {
        if(err)console.log(err);
        if(!table) {
          dineroEnBanco = 'No account found';
        }else{
          dineroEnBanco = Math.floor(dineroEnBanco+table.money);
        }
      });
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(mencion.username+" | Economy", mencion.displayAvatarURL)
      .setDescription("➤ Dinero: `"+output.balance+"`\n\n➤ Banco: `"+dineroEnBanco+"`")
    msg.channel.send(embed)
    }
    })()
  }
}

module.exports = BalanceCommand;