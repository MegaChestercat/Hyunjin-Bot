const translate = require("@iamtraction/google-translate");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "translate",
    aliases: [],
    desc: "It lets you translate something to english from any language",
    run: async (client, message, args, prefix) =>  {
        const query = args.join(" ");
        if(!query) return message.reply("Please specify a text or word to translate");
        
        message.delete().catch(() => {});

        const translated = await translate(query, {to: 'en'});

        let embed = new MessageEmbed()
        .setTitle(`**Translation from "${translated.from.language.iso}" to "en"**`)
        .addField(`Source:`, `\n\`\`\`yml\n${query}\`\`\``, true)
        .addField(`Result:`, `\n\`\`\`yml\n${translated.text}\`\`\``, true)
        .setTimestamp()
        .setColor("AQUA")
        .setFooter({text: `Translation requested by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        
        message.channel.send({embeds: [embed]});

    }
}    