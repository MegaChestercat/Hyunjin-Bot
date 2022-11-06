const Discord = require('discord.js');

module.exports = {
  name: 'say', 
  aliases: [],
  des: "It let's you say something as the server bot" ,
  permisos: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  permisos_bot: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
  run: async (client, message, args, prefix) => {

    const messageText = args.join(" ") 
    if(!messageText) return message.channel.send("Especify a message") 
    message.delete().catch(() => {});

    message.channel.send(messageText) 
  }
}