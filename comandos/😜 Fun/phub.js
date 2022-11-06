const { MessageAttachment } = require('discord.js');

module.exports = {
    name: `phub`,
    aliases: [`comment`, `phubcomment`, `phub-comment`, `pmessage`, `message`, `phub-message`, `phubmessage`],
    desc: "It lets you write a message as a Phub message",
    permisos_bot: ["ADMINISTRATOR"],
    run: async(client, message, args, prefix) => {
        
        message.delete().catch(() => {});

        const txt = args.join('%20');  
        if (!txt) return message.channel.send("You forgot to add the necessary arguments");
        let author = message.author; 

        let attachment = new MessageAttachment(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${message.author.displayAvatarURL()}&text=${txt}&username=${author.username}&raw=1`,'logo.png');
        message.channel.send({files: [attachment] });
    }
}