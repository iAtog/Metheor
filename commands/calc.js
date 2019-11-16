
const math = require('mathjs');const Discord = require('discord.js')

module.exports.run = async(client, msg, args) => {
  if(!args[0])return msg.channel.send("Dime la operación "+msg.author)
  let resp;
  try{
    resp = math.eval(args.join(' '))
  }catch(e) {
    return msg.channel.send("Tu operación fallo o esta mal, Intentalo más tarde");
  }
  let embe = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription("**Usado:** ```"+args.join(' ')+"```\n\n**Resultado Final:** ```"+resp+"```")
  .setTitle("**Resultados de tus calculos**");
  msg.channel.send(embe)
  
  
}

module.exports.help = {
  name: "calc",
  alias: "calculator"
}