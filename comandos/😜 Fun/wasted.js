module.exports = {
    name: "wasted",
    aliases: ["gta"],
    desc: "It lets you show a user with the iconic GTA \"wasted\" message",
    run: async(client, message, args, prefix) => {

        let username = message.mentions.users.first();

        if(!username) return message.channel.send("You need to mention someone!");

        const avatar = username.displayAvatarURL({ size: 2048, format: "png"});

        await message.reply({ files: [{ attachment: `https://some-random-api.ml/canvas/wasted?avatar=${avatar}`, name: 'file.png'}] })
    }
}