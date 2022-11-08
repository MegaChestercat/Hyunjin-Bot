const Discord = require('discord.js');

module.exports = {
  name: 'say', 
  aliases: [],
  des: "It let's you say something as the server bot" ,
  permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  bot_permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  run: async (client, message, args, prefix) => {

    const messageText = args.join(" ") 
    if(!messageText) return message.channel.send("Specify a message") 
    message.delete().catch(() => {});

    message.channel.send(messageText) 
  }
}