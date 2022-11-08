const {MessageEmbed} = require('discord.js');
const day = require("dayjs") // npm i dayjs

module.exports = {
    name: "user", 
    aliases: ["userinfo", "user-info"], 
    desc: "It lets you see the information of a server user",
    run: async(client, message, args, prefix) => {
        let status = {
        "online" : "Online",
        "idle" : "Idle",
        "dnd" : "Do not disturb",
        "offline" : "Offline/Invisible"
        };

        let user = message.mentions.users.first() || message.author;

        const member = await message.guild.members.fetch(user);
        const joinsv = day(member.joinedAt).format('DD/MM/YY');
        const joinds = day(user.createdAt).format('DD/MM/YY'); 

        const embedInfo = new MessageEmbed()
        .setTitle(`Information of ${user.username}`)
        .addField('**Name :**', `${user.username}`, true)
        .addField('**Tag :**', `#${user.discriminator}`, true)
        .addField('**ID :**', `${user.id}`, true)
        .addField('**Alias :**', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField('**Booster :**', user.premiumSince ? 'Booster User' : 'No Booster User', true)
        .addField('**Account creation date:**', `${joinds}`, true)
        .addField('**Joined the server :**', `${joinsv}`, true)
        .addField('**Is it a bot?**', user.bot ? 'Yes' : 'No', true)
        .addField('**Status :**', status[member.presence?.status ?? 'offline'], true)
        .addField('**Roles :**', member.roles.cache.map(r => r).join(" ").replace("@everyone", " "), true)
        .setThumbnail(user.displayAvatarURL({format : 'png', dynamic : 'true'}))
        .setColor("BLUE")
        message.channel.send({embeds: [embedInfo]});
    }
} 