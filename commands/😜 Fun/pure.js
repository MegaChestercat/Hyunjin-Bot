const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pure',
    aliases: ['lewd', 'horny'],
    desc: 'It shows your pureness/ lewdness level',
    run: async(client, message, args, prefix) => {
        const pure = Math.floor(Math.random() * 100);
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention someone");

        const embed = new MessageEmbed()
        .setTitle(`📈Pureness level📉`)
        .setDescription(`<@${user.id}> **Your pureness level is of ${pure}%**`)//it will gave the results obtained from pure const
        .setThumbnail(`https://c.tenor.com/jgvYywfGXkgAAAAM/captain-ginyu.gif`)
        message.channel.send({embeds: [embed]})//sends the embed 
    }
}