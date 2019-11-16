const Discord = require('discord.js');
const PastebinAPI = require('pastebin-js');
const config = require('/app/config.json');
let pastebin = new PastebinAPI({
  'api_dev_key': '',
  'api_user_name': '',
  'api_user_password': ''
});

module.exports.help = {
  name: "pastebin"
}

