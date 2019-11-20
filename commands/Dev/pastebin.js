const Discord = require('discord.js');
const PastebinAPI = require('pastebin-js');
const config = require('/app/config.json');
const DeletedCommand = require('../DeletedCommand.js');
let pastebin = new PastebinAPI({
  'api_dev_key': '',
  'api_user_name': '',
  'api_user_password': ''
});

class PastebinCommand extends DeletedCommand {
  constructor() {
    super ("pastebin");
  }

  settings() {
    return {
      minArgs: 1,
      maxArgs: -1,
      usage: "No puedo subir aire a Pastebin"
    }
  }
  run(client, msg, args) {
    console.log("None");
    msg.channel.send("Todavia se esta desarrollando.")
  }
}

module.exports = PastebinCommand;