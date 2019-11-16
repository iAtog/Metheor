const Discord = require('discord.js');


module.exports.run = async(client, msg, args) => {
  if(msg.author.id !== '580485225952444416' && msg.author.id !== '636198946816917504')return msg.channel.send("Solo mi creador puede usar esto.");
  if(!args[0])return msg.channel.send("No puedo codificar aire");
  let message = msg;
  let bot = client;
  const config = require('/app/config.json')
  var Weez = require("weez");
  var weez = new Weez.WeezAPI(config.weeztoken);
  let alert = function(msgs) {
    msg.channel.send(msgs)
  }
  let code = args.join(' ')
  let codev2 = code.replace("@everyone", "@-everyone");
  let codev3 = codev2.replace("@here", "@-here")
  try{
    msg.delete();
    new Function()(eval(codev3));
  }catch(error) {
    msg.channel.send("Error.");
    msg.channel.send("```"+error+"```");
  }
}

module.exports.help = {
  name: "eval"
}