const Discord = require('discord.js');
const config = require('/app/config.json');
var Weez = require("weez");
var weez = new Weez.WeezAPI(config.weeztoken);
const memer = require('discordmeme.js');

const DeletedCommand = require('../DeletedCommand.js');

class Command extends DeletedCommand {
  constructor() {
    super("meme");
  }
  aliases() {
    return ["memes"];
  }
  settings() {
    return {
      minArgs: 0,
      maxArgs: 0,
      usage: "Nose we"
    }
  }
  run(client, msg, args) {
    let img = await weez.randomMeme();
    let meme = await memer.meme();
    let random = "Weez:Discord Meme";
    let get = random.split(':');
    let imgs = [img, meme];
    let r = Math.floor(Math.random() * imgs.length)
    let imagen = imgs[r];
    let texto = get[r];
    
    let embe = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setDescription("Un meme salvaje ha aparecido")
    .setImage(imagen)
    .setFooter("Pedido por: "+msg.author.tag+" | Cortesia de "+texto);
    msg.channel.send(embe).then(m=>{m.react('😂')});
  }
}

module.exports = Command;

