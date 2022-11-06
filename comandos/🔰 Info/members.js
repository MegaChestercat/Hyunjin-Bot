const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'members',
    aliases: [`membernumber`, `member-number`],
    desc: "It lets you know how many members are in the server",
    run: async(client, message, args, prefix) => {
        let embed = new MessageEmbed()
        .setTitle(`Total members of ${message.guild.name}`)
        .addField(`👥Total Members`, `${message.guild.memberCount}`, true)
        .addField(`👤Humans`, `${message.guild.members.cache.filter(member => !member.user.bot).size}`, true)
        .addField(`🤖Bots`, `${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
        .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({ size: 4096, dynamic: true })})
        .setTimestamp()
        .setColor("GREEN")
        .setFooter({text: `Command requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            
        message.reply({ embeds: [embed] });
    }
}