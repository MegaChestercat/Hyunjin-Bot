const { Client, Message, MessageEmbed } = require("discord.js");
const superagent = require('superagent')

module.exports = {
    name: "achievement",
    aliases: [`attainment`, `accomplishment`, `mc-achievement`],
    desc: "",
    run: async (client, message, args, prefix) => {
        try {
            let text = args.join(" "); //Achievement arguments.
            if (!text) return message.channel.send("Put a text to the achievement"); //If it doesn't set any argument.
            if (text.length > 23) return message.channel.send("The achievement can just have until 23 characters."); //If it sets more than 23 characters to the argument.
            if (text.length < 2) return message.channel.send("The achievement needs to have more than 2 characters."); //If it sets less than 2 characters in the argument.

            let links = ["https://www.minecraftskinstealer.com/achievement/a.php?i=38", "https://www.minecraftskinstealer.com/achievement/a.php?i=1", "https://www.minecraftskinstealer.com/achievement/a.php?i=21", "https://www.minecraftskinstealer.com/achievement/a.php?i=20", "https://www.minecraftskinstealer.com/achievement/a.php?i=13", "https://www.minecraftskinstealer.com/achievement/a.php?i=18", "https://www.minecraftskinstealer.com/achievement/a.php?i=17", "https://www.minecraftskinstealer.com/achievement/a.php?i=9", "https://www.minecraftskinstealer.com/achievement/a.php?i=31", "https://www.minecraftskinstealer.com/achievement/a.php?i=22", "https://www.minecraftskinstealer.com/achievement/a.php?i=23", "https://www.minecraftskinstealer.com/achievement/a.php?i=2", "https://www.minecraftskinstealer.com/achievement/a.php?i=11", "https://www.minecraftskinstealer.com/achievement/a.php?i=19", "https://www.minecraftskinstealer.com/achievement/a.php?i=33", "https://www.minecraftskinstealer.com/achievement/a.php?i=34", "https://www.minecraftskinstealer.com/achievement/a.php?i=26", "https://www.minecraftskinstealer.com/achievement/a.php?i=35", "https://www.minecraftskinstealer.com/achievement/a.php?i=6", "https://www.minecraftskinstealer.com/achievement/a.php?i=7", "https://www.minecraftskinstealer.com/achievement/a.php?i=10", "https://www.minecraftskinstealer.com/achievement/a.php?i=39", "https://www.minecraftskinstealer.com/achievement/a.php?i=4", "https://www.minecraftskinstealer.com/achievement/a.php?i=5", "https://www.minecraftskinstealer.com/achievement/a.php?i=28"]
            const { body } = await superagent
            .get(links[Math.floor(Math.random() * links.length)])
            .query({
                h: '¡Achievement unlocked!',
                t: text
            });
            message.reply({ files: [{ attachment: body, name: 'achievement.png' }]                      
            });
        } catch (err) {
            message.reply({content: "Ups, there was an error "})
        }
    }
}