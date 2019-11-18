const Discord = require('discord.js');
const DeletedCommand = require('../DeletedCommand.js');
const db = require('sqlite');
db.open('../../banco.sqlite');

function generarTarjeta() {
  let resultado = '';
  let chars = '0123456789';
  
  for(let i = 0; i < 16; i++) {
    resultado = resultado+chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return resultado;
}

function generarExpiracion() {
  let result1 = '';
  let result2 = '';
  let chars2 = '2345';
  let chars1 = '0123';
  
  for (let i = 0; i < 2; i++) {
    result1 = result1+chars1.charAt(Math.floor(Math.random() * chars1.length));
  }
  for (let i = 0; i < 2; i++) {
    result2 = result2+chars2.charAt(Math.floor(Math.random() * chars2.length));
  }
  let resultFinal = result1+"/"+result2;
  return resultFinal;
}

function generarCVV() {
  let result = '';
  let chars = '1234567890';
  
  for (let i = 0; i < 3; i++) {
    result = result+chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

class BankCommand extends DeletedCommand {
  constructor() {
    super("bank");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: -1
    }
  }

  run(client, msg, args) {
    let eco = require('discord-economy');
  
    let helpEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(msg.author.username+" | Bank help", client.user.displayAvatarURL)
    .setDescription("Deposita/Saca dinero del banco.\n\n➤ `deposit` - Deposita una cantidad especifica al banco.\n\n➤ `withdraw` - Saca dinero del banco\n\n➤ `profile` - Mira tu perfil en el banco\n\n➤ `create` - Create una cuenta galactica!.")
    
    
    if(!args[0]){
      return msg.channel.send(helpEmbed);
    }else if(args[0] === "withdraw") {
      db.get(`SELECT * FROM banco WHERE id ="${msg.author.id}"`).then(table => {
        if(!table)return msg.channel.send("Tu no tienes cuenta galactica!");
        let validar = table.id;
        
        if(!args[1])return msg.channel.send("Especifica el dinero por sacar.");
        let dinero = table.money;
        
        let balance = eco.FetchBalance(validar);
        
        let dineroFinal = Math.floor(dinero - args[1]);
        if(validar === msg.author.id) {
          if(args[1] === "all") {
            db.run(`UPDATE banco SET money = 0 WHERE id = ${validar}`);
            eco.AddToBalance(validar, dinero);
            msg.channel.send("Se ha sacado un total de "+dinero+"$")
            return;
          }
          if(isNaN(args[1]))return msg.channel.send("Esto no es un número valido.");
          if(dinero < args[1])return msg.channel.send("Esta cantidad se pasa de lo almacenado.");
          db.run(`UPDATE banco SET money = ${dineroFinal} WHERE id = ${validar}`);
          eco.AddToBalance(validar, args[1]);
          msg.channel.send("Se ha sacado del banco "+args[1]+"$");
        }
        
      });
    }else if(args[0] === "deposit") {
      db.get(`SELECT * FROM banco WHERE id ="${msg.author.id}"`).then(table => {
        
        if(!table)return msg.channel.send("Tu no estas registrado en el banco galactico");
        if(!args[1])return msg.channel.send("Especifica una cantidad de dinero por depositar.");
        
        let validar = table.id;
        if(validar === msg.author.id) {
          let output = async() => {
            let output1 = await eco.FetchBalance(validar);
            return output1;
          }
          if(args[1] === "all") {
            db.run('UPDATE banco SET money = '+output.balance+' WHERE id = '+validar);
            let dineroPorEliminar = output.balance;
            eco.SubtractFormBalance(validar, dineroPorEliminar);
            return;
          }
          
          if(isNaN(args[1]))return msg.channel.send("Esto o es un número.");
          if(output().balance < args[1])return msg.channel.send("Tu saldo no es suficiente o se pasa de el actual.");
          
          db.run(`UPDATE banco SET money = ${args[1]} WHERE id = ${validar}`);
          eco.SubtractFromBalance(validar, args[1]);
          msg.channel.send("Has depositado "+args[1]+"$ Al banco!");
        }else{
          return;
        }
        
        
      });
    }else if(args[0] === "profile") {
      let usuario = msg.mentions.users.first() || client.users.get(args[1]);
      if(!usuario) {
        db.get(`SELECT * FROM banco WHERE id ="${msg.author.id}"`).then(table => {
          if(!table)return msg.channel.send("No estas registrado en el banco");
          let embed = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(msg.author.username+" | Profile", msg.author.displayAvatarURL)
          .setDescription("> Balance: `"+table.money+"`\n\n---DATOS DE CUENTA---\n> Tarjeta Bancaria: `"+table.tarjeta+"`\n> Expira: `"+table.expires+"`\n> CVV: `"+table.cvv+"`\n\nUsuario: "+client.users.get(table.id));
          msg.channel.send(embed);
        });
      } else {
        if(usuario.bot)return msg.channel.send("Un bot no puede tener cuenta galactica 😂");
        db.get(`SELECT * FROM banco WHERE id ="${usuario.id}"`).then(table => {
          if(!table)return msg.channel.send("Este usuario no tiene una cuenta en el banco galactico");
          let embed = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(msg.author.username+" | Profile", msg.author.displayAvatarURL)
          .setDescription("> Balance: "+table.money+"\n\nUsuario: "+client.users.get(table.id));
          msg.channel.send(embed);
        });
      }
      
    }else if(args[0] === "create") {
      db.get(`SELECT * FROM banco WHERE id = "${msg.author.id}"`).then(table => {
        if(table)return msg.channel.send("Tu ya estas registrado!");
        db.run('INSERT INTO banco (id, money, tarjeta, expires, cvv) values (?, ?, ?, ?, ?)', [msg.author.id, 0, generarTarjeta(), generarExpiracion(), generarCVV()]);
        msg.channel.send("Te has registrado en el Banco Galactico!")
      });
      
      
    }else if(args[0] === "accounts") {
      const sqlite3 = require('sqlite3').verbose();
      let sql3 = new sqlite3.Database('/app/database/bank.sqlite');
      let consult = `SELECT * FORM banco`;
      
      sql3.all(consult, (err, list) => {
        list.forEach(function (filas) {
          lista2.put(client.users.get(filas.id).tag);
        });
      });
      
      if(lista2.length < 1)return msg.channel.send("No hay usuarios registrados en el banco galactico.")
      
      msg.channel.send('Lista de los usuarios en el banco galactico'+ '```\n' + lista2 + '\n```')
      
      lista2 = new Array();
    }
    else if(args[0] === "instalar") {
      if(msg.author.id !== '580485225952444416')return;
      db.run('CREATE TABLE IF NOT EXISTS banco (id TEXT, money INTEGER, tarjeta INTEGER, expires TEXT, cvv INTEGER)');
      msg.channel.send("Tabla instalada correctamente");
    }
  }
}

let lista2 = new Array();
module.exports = BankCommand;