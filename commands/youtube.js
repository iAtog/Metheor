const Discord = require('discord.js')
const requesting = require('request');
const config = require('/app/config.json')

module.exports.run = async(client, msg, args) => {
  if(!args[0])return msg.channel.send("Debes especificar una busqueda.");
  const url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${args}&maxResults=1&type=video&key=${process.env.YTKEY}`;
  requesting(url, (err, response, body) => {
    if(err) {
      console.log("Ha ocurrido un error la buscar "+args.join(' ')+" en youtube")
      return msg.channel.send("Ha ocurrido un error al conectar con el servicio.")
    }
    const search = JSON.parse(body);
    try{
      const { title } = search.items[0].snippet;
      const thumbnail = search.items[0].snippet.thumbnails.medium.url;
      const { description } = search.items[0].snippet;
      const newUrl = `https://www.youtube.com/watch?v=${search.items[0].id.videoId}`;
      let embe = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setAuthor(title, 'https://img.icons8.com/clouds/2x/youtube-squared.png')
      .setDescription(description)
      .setURL(newUrl)
      .setFooter(newUrl, 'https://img.icons8.com/clouds/2x/youtube-squared.png')
      msg.channel.send(embe)
    }catch(error) {
      return msg.channel.send("No se encontraron resultados.")
    }
  });
}

module.exports.help = {
  name: "youtube"
}