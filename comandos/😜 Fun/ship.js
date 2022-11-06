const Canvas = require('@napi-rs/canvas');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
    name: "ship",
    aliases: ["affinity", "love"],
    desc: "It ships two users",
    run: async(client, message, args, prefix) => {
        
        const canvas = Canvas.createCanvas(700,250);
        const ctx = canvas.getContext("2d");
    
        const target = message.mentions.users.first();
        const mentiontwo = message.mentions.users.last();

        if(!target) return message.channel.send("Please mention someone");
        if(!mentiontwo) return message.channel.send("You have to mention another user");

        const bg = await Canvas.loadImage("https://e7.pngegg.com/pngimages/691/67/png-clipart-blue-sky-lawn-sky-reversal-film-cloud-blue-atmosphere.png");
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        const avatar = await Canvas.loadImage(target.displayAvatarURL({ format: "png" }));

        ctx.drawImage(avatar, 50, 25, 200, 200);

        const targetAvatar = await Canvas.loadImage(mentiontwo.displayAvatarURL({ format: "png" }));
        ctx.drawImage(targetAvatar, 450, 25, 200, 200);

        const heart = await Canvas.loadImage("https://static.vecteezy.com/system/resources/previews/001/186/861/original/heart-arrow-png.png");
        const random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
        ctx.drawImage(heart, 275, 60, 150, 150);
        const attachment = new MessageAttachment(await canvas.encode('png'), "love.png");

        const embed = new MessageEmbed()
        .setTitle(`${target.username} and ${mentiontwo.username}`)
        .setColor("RED")
        .setImage(`attachment://love.png`);
        if(target.id == mentiontwo.id) embed.addField(`**You two have a 100% of match.**`, `Self love is really important, but it would be better to have a partner that could give you a hand.`)
        else if(random <= 10) embed.addField(`**You two have a ${random}% of match.**`, "Everything is still possible, but you should try to search other options.")
        else if(random >= 11 && random <= 29) embed.addField(`**You two have a ${random}% of match.**`, "Don't be disappointed, the friendzone or friends with benefits area is still available.")
        else if(random >= 30 && random <= 39) embed.addField(`**You two have a ${random}% of match.**`, `Even if things seem a little dark, there's still hope, with efforts the relationship could go to a good point.*`)
        else if(random >= 40 && random <= 64) embed.addField(`**You two have a ${random}% of match.**`, `Neither good, nor bad. Try if it will work carefully.`)
        else if(random >= 65 && random <= 69) embed.addField(`**You two have a ${random}% of match.**`, `You two have passed the mid umbral, the only way to know if it will work is if you try.`)
        else if(random >= 70 && random <= 89) embed.addField(`**You two have a ${random}% of match.**`, `Wow! You two seem to have a good probability, don't give up!`)
        else if(random >= 80 && random <= 99) embed.addField(`**You two have a ${random}% of match.**`, `It seems you two could be a great couple, you should do a french kiss.`)
        else if(random == 100) embed.addField(`**You two have a ${random}% of match.**`, `You are literally soulmates. When is the wedding?`)
        
        return message.channel.send({embeds: [embed], files: [attachment]});
    }
}