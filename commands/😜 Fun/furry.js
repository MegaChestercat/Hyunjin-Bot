const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'furry',
    aliases: ['fr'],
    desc: 'It shows your furry level',
    run: async(client, message, args, prefix) => {
        const furry = Math.floor(Math.random() * 100);
        const user = message.mentions.users.first() ;
        if(!user) return message.channel.send("Please mention someone");

        const embed = new MessageEmbed()
        .setTitle(`📈Pureness level📉`)
        .setDescription(`<@${user.id}> **Your furry level is of ${furry}%**`)//it will gave the results obtained from pure const
        .setImage(`https://c.tenor.com/x_GNnWa8SIoAAAAC/vegeta-its-over9000.gif`)
        .setColor('RANDOM')
        message.channel.send({embeds: [embed]})//sends the embed 
    }
}