const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "about",
    description: "It shows you information about the bot",
    run: async(client, interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`About ${client.user.tag}`)
        .setThumbnail(client.user.displayAvatarURL({ size: 2048, dynamic: true }))
        .setDescription(`Hyunjin Bot is a multifunctional bot developed by The_Chester#4302 that is capable of providing tons of fun in your server. \n\n**Types of Commands**: \n-Info\n-Fun\n-Moderation`)
        .setColor('BLUE')

        interaction.reply({ embeds: [embed] })
    }
}