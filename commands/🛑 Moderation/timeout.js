const { MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = {
    name: "timeout",
    aliases: ["timeoutuser", "timeout-user"],
    desc: "It helps to give a timeout to a user of the server",
    permissions: ["ADMINISTRATOR"],
    bot_permissions: ["ADMINISTRATOR"],
    run: async (client, message, args, prefix) => {
        //It is defined the person to timeout
        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!user) return message.reply(`❌ **It was not found the user you specified!**`);

        let time = args[1];
        if(!time) return message.reply(`❌ **It has not been specified a time!**`);
        const milliseconds = ms(time);

        if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) return message.reply(`❌ **Invalid time or it is not between 10s-28d!**`)

        //It is defined a reason, and if there is not one, the reason will be "No reason has been specified"
        let reason = args.slice(2).join(" ");
        if (!reason) reason = "It has not been specified a reason!"

        //It is proved that the user to timeout is not the server owner 
        if (user.id == message.guild.ownerId) return message.reply(`❌ **You cannot timeout the server owner!**`);

        //It is proved that the user to timeout is not the same to the one that uses the command 
        if (user.id == message.author.id) return message.reply(`❌ **You cannot timeout yourself from the server!**`);

        //It is proved that the BOT is above the user to timeout
        if (message.guild.me.roles.highest.position > user.roles.highest.position) {
            //It is proved that the position of the role of the user that executes the command is above of the person that is going to be in timeout
            if (message.member.roles.highest.position > user.roles.highest.position) {

                message.delete().catch(() => {});

                //It is send to the user by DM that it was timeout!
                user.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`You have been timed out from __${message.guild.name}__ for ${time}`)
                            .setDescription(`**Reason:** \n\`\`\`yml\n${reason}\`\`\``)
                            .setColor(client.color)
                            .setTimestamp()
                    ]
                }).catch(() => {}); 
                //It is send to the channel that the user got timed out

                message.channel.send({
                    embeds: [new MessageEmbed()
                        .setTitle(`✅ User timed out`)
                        .setDescription(`**The user \`${user.user.tag}\` *(\`${user.id}\`)* got timed out!**`)
                        .addField(`By`, `\n\`\`\`yml\n${message.author.tag}\`\`\``, true)
                        .addField(`Time`, `\n\`\`\`yml\n${time}\`\`\``, true)
                        .addField(`Reason`, `\n\`\`\`yml\n${reason}\`\`\``, true)
                        .setColor(client.color)
                        .setTimestamp()
                    ]
                })

                user.timeout(milliseconds, [reason]).catch(() => {
                    return message.channel.send({
                        embeds:
                            [new MessageEmbed()
                                .setTitle(`❌ I have not been able to timeout the user!`)
                                .setColor("FF0000")
                            ]
                    })
                })
            } else {
                return message.reply(`❌ **Your role is __under__ the user you want to timeout!**`)
            }
        } else {
            return message.reply(`❌ **My role is __under__ the user you want to timeout!**`)
        }


    }
}