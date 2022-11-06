const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "time",
    aliases: [`hour`, `current-time`, `date`],
    desc: "It is useful for checking the hour",
    run: async(client, message, args, prefix) => {
        return message.reply({
            embeds: [new MessageEmbed()
            .setTitle(`Current Time`)
            .setDescription(`**Hour: <t:${Math.round(Date.now()/1000)}:t>\n\nDate: <t:${Math.round(Date.now()/1000)}:d>**`)
            .setTimestamp()
            .setThumbnail("https://c.tenor.com/n-5biYcWQE0AAAAS/time-flies.gif")
            .setColor("GREEN")
            ]
        }) 
    }
}