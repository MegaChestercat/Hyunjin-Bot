const { MessageEmbed } = require('discord.js');
const setupSchema = require(`${process.cwd()}/modelos/setups.js`);

module.exports = {
    name: "setup-suggestion",
    aliases: ["suggestion-setup", "setup-sugerencias", "setup-sugerencia", "setupsugerencias"],
    desc: "It is useful for creating a suggestion system",
    permisos: ["ADMINISTRATOR"],
    permisos_bot: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
    run: async (client, message, args, prefix) => {
        if(!args.length) return message.reply("❌**You need to specify the suggestions channel!**");
        const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
        if(!channel || channel.type !== "GUILD_TEXT") return message.reply("❌**The suggestions channel you mention does not exist**");
        setupSchema.findOne({guildID: message.guild.id}, async (err, data) => { //By changing this part at first the command was able to work 
            if(data) data.delete();
            new setupSchema({
                guildID: message.guild.id,
                sugerencias: channel.id,
            }).save();
            return message.reply({
                embeds: [new MessageEmbed()
                .setTitle(`✅ The suggestions channel was established on \`${channel.name}\``)
                .setDescription(`*Each time one person send a message in ${channel} it will be converted as a suggestion*`)
                .setColor(client.color)
                ]
            }) 
        });
    }
}