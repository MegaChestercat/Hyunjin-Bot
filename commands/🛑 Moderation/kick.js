const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kick",
    aliases: ["kickear", "expulsar", "kick-user", "kickuser"],
    desc: "It helps to kick a user of the server",
    permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
    bot_permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
    run: async (client, message, args, prefix) => {
        //It is defined the person to kick
        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!user) return message.reply(`❌ **It was not found the user you specified!**`);

        //It is defined a reason, and if there is not one, the reason will be "No reason has been specified"
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "It has not been specified a reason!"

        //It is proved that the user to kick is not the server owner 
        if (user.id == message.guild.ownerId) return message.reply(`❌ **You cannot kick the server owner!**`);

        //It is proved that the user to kick is not the same to the one that uses the command 
        if (user.id == message.author.id) return message.reply(`❌ **You cannot kick yourself from the server!**`);

        //It is proved that the BOT is above the user to kick 
        if (message.guild.me.roles.highest.position > user.roles.highest.position) {
            //It is proved that the position of the role of the user that executes the command is above of the person that is going to be kicked
            if (message.member.roles.highest.position > user.roles.highest.position) {

                message.delete().catch(() => {});

                //It is send to the user by DM that it was kicked!
                user.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`You have been kicked from __${message.guild.name}__`)
                            .setDescription(`**Reason:** \n\`\`\`yml\n${reason}\`\`\``)
                            .setColor(client.color)
                            .setTimestamp()
                    ]
                }).catch(() => {});
                //It is send to the channel that the user has been succesfully kicked

                message.channel.send({
                    embeds: [new MessageEmbed()
                        .setTitle(`✅ User kicked`)
                        .setDescription(`**It has been successfully kicked \`${user.user.tag}\` *(\`${user.id}\`)* of the server!**`)
                        .addField(`By`, `\n\`\`\`yml\n${message.author.tag}\`\`\``, true)
                        .addField(`Reason`, `\n\`\`\`yml\n${reason}\`\`\``, true)
                        .setColor(client.color)
                        .setTimestamp()
                    ]
                })

                user.kick([reason]).catch(() => {
                    return message.channel.send({
                        embeds:
                            [new MessageEmbed()
                                .setTitle(`❌ I have not been able to kick the user!`)
                                .setColor("FF0000")
                            ]
                    })
                })
            } else {
                return message.reply(`❌ **Your role is __under__ the user you want to kick!**`)
            }
        } else {
            return message.reply(`❌ **My role is __under__ the user you want to kick!**`)
        }


    }
}