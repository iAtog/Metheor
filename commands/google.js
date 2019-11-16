const Discord = require('discord.js');
const request = require('request-promise');
let config = require('/app/config.json').googleapi;
let config2 = require('/app/config.json').googleApi;
module.exports.run = async(client, msg, args) => {
  if(args.length < 1)return msg.channel.send("Dime que quieres que busque en google.");
  
  const filter = ['porno', 'xnxx', 'pornhub', 'porn', 'livesex', 'nsfw', 'hentai', 'pussy', 'ass', 'anal', 'blowjob'];
  
  for (let i = 0; i < filter.length; i += 1) {
    if (args.includes(filter[i])) return msg.channel.send("No puedo mandar de ese contenido.");
  }
  
  const response = await request({
      headers: { 'User-Agent': 'Mozilla/5.0' },
      uri: 'https://www.googleapis.com/customsearch/v1',
      json: true,
      qs: {
        cx: config,
        key: config2,
        num: 1,
        q: args.join(' ')
      }
    }).catch((error) => console.error(error.response.body.error, msg.channel));
  if (!response) return false;
  if (response.searchInformation.totalResults !== '0') {
      const result = response.items[0];
      const link = decodeURIComponent(result.link);

      const embed = new Discord.MessageEmbed()
        .setColor('#0066CC')
        .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL())
        .setURL(link)
        .setTitle(result.title)
        .setDescription(result.snippet)
        .setFooter(result.link, result.link);

      if (result.pagemap && result.pagemap.cse_thumbnail) embed.setThumbnail(result.pagemap.cse_thumbnail[0].src);

      return msg.channel.send({ embed });
    }
}

module.exports.help = {
  name: "googles"
}