const Discord = require('discord.js');
let nose = "${client.guilds.size} ${ser}! |   ${client.users.size} Users";
module.exports.extract = async(client) => {
  let ms = require('ms');
  
  let ser = "";
  let servs = "Guilds";
  let serv = "Guild";
  if (client.guilds.size == 1) {
    ser = ser + serv;
  } else {
    ser = ser + servs;
  }
  let ma = ['BETA. 60% | '+client.users.size+' Users.', 'Chocando contra el planeta!', 'Haciendo amigos', 'Pasando por la luna.', 'Desarrollado por '+client.users.get('580485225952444416').tag, 'Aniquilar a '+client.users.filter(u => !u.bot).size+" Personas D:"];
  client.user.setPresence({
    status: "idle",
    game: {
      name: ma[Math.floor(Math.random() * ma.length)],

      type: "PLAYING",
      
      application_id: "605432938649354286",
      
      state: "Metheor bot",
      
      url: "https://www.twich.tv/metheor"
      
    }
  });
  console.log("Conectado con Discord!");
}