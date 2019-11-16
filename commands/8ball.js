const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
  if(!args[0])return msg.channel.send("Debes preguntarme algo.");
  const respuestas = ["En mi opinión, sí", "Es cierto", "Es decididamente así", "Probablemente", "Buen pronóstico", "Todo apunta a que sí", "Sin duda", "Sí", "Definitivamente", "Debes confiar en ello", "Respuesta vaga, vuelve a intentarlo", "Pregunta en otro momento", "Será mejor que no te lo diga ahora", "No puedo predecirlo ahora", "Concéntrate y vuelve a preguntar", "Puede ser", "No cuentes con ello", "Mi respuesta es no", "Mis fuentes me dicen que no", "Las perspectivas no son buenas", "Muy dudoso", "Sabes? 9 de 10 odontologos recomiendan que te calles..."];
  
  let result = Math.floor((Math.random() * respuestas.length));
  let poll = args.join(" ");
  
  const embed = new Discord.RichEmbed()
    .setTitle("🎱 8 Ball")
    .setDescription("Tu pregunta es: \n**"+args.join(' ')+"**\n\nMi respuesta es:\n\n```"+respuestas[result]+"```")
    .setColor("#EE82EE")
    msg.channel.send(embed);
  
}

module.exports.help = {
  name: "8ball"
}