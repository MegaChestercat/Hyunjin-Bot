const { MessageEmbed } = require('discord.js');
module.exports = {
    name: `uptime`,
    aliases: [`up`],
    desc: "It lets you know how much time the bot has been active",
    run: async(client, message, args, prefix) => {
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        const uptime = new MessageEmbed()
        .setDescription(`I have been active: \`${days}\` days \`${hours}\` hours \`${minutes}\` minutes and \`${seconds}\` seconds`)
        .setColor("BLUE")
        .setTimestamp()
    
        message.reply({ embeds: [uptime]});
    }
}