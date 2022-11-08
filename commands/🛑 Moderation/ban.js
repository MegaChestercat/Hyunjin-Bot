const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    aliases: ["banear", "banuser", "ban-user"],
    desc: "It helps to ban a user of the server",
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    bot_permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    run: async (client, message, args, prefix) => {
        //It is defined the person to ban
        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!user) return message.reply(`❌ **It was not found the user you specified!**`);

        //It is defined a reason, and if there is not one, the reason will be "No reason has been specified"
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason has been specified!"

        //It is proved that the user to ban is not the server owner 
        if(user.id == message.guild.ownerId) return message.reply(`❌ **You cannot ban the server owner!**`);

        if (user.id == message.author.id) return message.reply(`❌ **You cannot ban yourself from the server!**`);

        //It is proved that the BOT is above the user to ban 
        if (message.guild.me.roles.highest.position > user.roles.highest.position) {
            //It is proved that the position of the role of the user that executes the command is above of the person that is going to be banned
            if (message.member.roles.highest.position > user.roles.highest.position) {

                message.delete().catch(() => {});
                
                //It is send to the user by DM that it was banned!
                user.send({embeds: [
                    new MessageEmbed()
                    .setTitle(`You have been banned from __${message.guild.name}__`)
                    .setDescription(`**Reason:** \n\`\`\`yml\n${reason}\`\`\``)
                    .setColor(client.color)
                    .setTimestamp()
                ]}).catch(() => {});
                //It is send to the channel that the user has been succesfully banned

                message.channel.send({embeds: [new MessageEmbed()
                .setTitle(`✅ User banned`)
                .setDescription(`**It has been successfully banned \`${user.user.tag}\` *(\`${user.id}\`)* of the server!**`)
                .addField(`By`, `\n\`\`\`yml\n${message.author.tag}\`\`\``, true)
                .addField(`Reason`, `\n\`\`\`yml\n${reason}\`\`\``, true)
                .setColor(client.color)
                .setTimestamp()
                ]})

                user.ban({reason: reason}).catch(() => {
                    return message.reply({embeds: 
                    [new MessageEmbed()
                    .setTitle(`❌ I have not been able to ban the user!`)
                    .setColor("FF0000")
                    ]})
                });
            } else {
                return message.reply(`❌ **Your role is __under__ the user you want to ban!**`)
            }
        } else {
            return message.reply(`❌ **My role is __under__ the user you want to ban!**`)
        }


    }
}