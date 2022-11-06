const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "avatar",
  aliases: ["av", "user-avatar"],
  desc: "It shows you the avatar of a server member",
  run: async (client, message, args, prefix) =>  {
    let user = message.mentions.users.first() || message.author;
      
    const embed = new MessageEmbed()
    .setTitle(`Avatar of ${user.tag}`)
    .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
    .setColor("RANDOM")
    .setFooter({text: `Avatar requested by: ${message.author.tag}`})
      
    message.reply({ embeds: [embed] })
  }

}

