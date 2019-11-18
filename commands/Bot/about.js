const Discord = require('discord.js');
const DeletedCommand = require('../DeletedCommand.js');

class AboutCommand extends DeletedCommand {
  constructor() {
    super("about");
  }

  settings() {
    return {
      minArgs: 0,
      maxArgs: 0,
      usage: "about"
    }
  }

  run (client, msg, args) {
    let os = require("os");
    let totalSeconds = client.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let s1 = "";
    if (days != 1 && days != 0) s1 == s1 + "s";
    let s2 = "";
    if (hours != 0 && hours != 1) s2 == s2 + "s";
    let s3 = "";
    if (minutes != 1 && minutes != 0) s3 == s3 + "s";
    const embed = new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .setTitle("**Información del Bot**",true)
      .addField("Libreria:", "discord.js", true)
      .addField("Versión:", "1.0", true)
      .addField("Arquitectura:", "x64", true)
      .addField("Hosting:", "http://glitch.com",true)
      .addField("Ping:", "Pong! `" + Math.round(client.ping) + "`**ms**",true)
      .addField("Creador:", "Atog#7266", true)
      .addField(
        "Uptime:",
        days +
          " Dia" +
          s1 +
          " " +
          hours +
          " Hora" +
          s2 +
          " " +
          minutes +
          " Minuto" +
          s3,
        true
      )
      .addField("Colaboradores:", "Nadie :)", true)
      .addField(
        "Datos de la Maquina:",
        os.cpus() +
          " RAM: " +
          os.totalmem() +
          " Memoria Disponible: " +
          os.freemem(),
        true
      );
    msg.channel.send(embed);
  }

}
module.exports = AboutCommand;