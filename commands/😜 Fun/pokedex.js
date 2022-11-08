const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'pokedex',
    aliases: [`dexter`],
    desc: "It shows you pfp as in a pokedex",
    run: async(client, message, args, prefix) => {

        const user = message.mentions.users.first();

        const avatar = user.displayAvatarURL({ format: "png" });

        const finalLink = 'https://luminabot.xyz/api/image/dexter?image=' + avatar;

        const attach = new MessageAttachment(finalLink, "avatar.png")

        message.channel.send({ files: [attach]})
    }
}