const { DiscordTogether } = require('discord-together')

module.exports = {
    name: 'youtube',
    aliases: [`yt`, `youtube-together`],
    desc: "It lets you watch a youtube video with other users at the same time",
    run: async(client, message, args, prefix) => {
        
        const yt = new DiscordTogether(client)

        const channel = message.member.voice.channel.id 

        yt.createTogetherCode(channel, "youtube").then(invite => {
            message.reply(`Here is your link for the channel <#${channel}>: ${invite.code}`)
        }).catch(e => {
            message.reply(`An error occurred: ${e}`)
        })
    
    }
}