const { MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = {
    name: "timeout",
    aliases: ["timeoutuser", "timeout-user"],
    desc: "It helps to give a timeout to a user of the server",
    permisos: ["ADMINISTRATOR"],
    permisos_bot: ["ADMINISTRATOR"],
    run: async (client, message, args, prefix) => {
        //definimos la persona a banear
        let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!usuario) return message.reply(`❌ **It was not found the user you specified!**`);

        let time = args[1];
        if(!time) return message.reply(`❌ **It has not been specified a time!**`);
        const milliseconds = ms(time);

        if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) return message.reply(`❌ **Invalid time or it is not between 10s-28d!**`)

        //definimos razón, y si no hay, la razón será "No se ha especificado ninguna razón!"
        let razon = args.slice(2).join(" ");
        if (!razon) razon = "It has not been specified a reason!"

        //comprobamos que el usuario a banear no es el dueño del servidor
        if (usuario.id == message.guild.ownerId) return message.reply(`❌ **You cannot timeout the server owner!**`);

        //comprobamos que el usuario a kickear no es el mismo que el que usa el comando
        if (usuario.id == message.author.id) return message.reply(`❌ **You cannot timeout yourself from the server!**`);

        //comprobar que el BOT está por encima del usuario a banear
        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
            //comprobar que la posición del rol del usuario que ejecuta el comando sea mayor a la persona que vaya a banear
            if (message.member.roles.highest.position > usuario.roles.highest.position) {

                message.delete().catch(() => {});

                //enviamos al usuario por privado que ha sido baneado!
                usuario.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`You have been timed out from __${message.guild.name}__ for ${time}`)
                            .setDescription(`**Reason:** \n\`\`\`yml\n${razon}\`\`\``)
                            .setColor(client.color)
                            .setTimestamp()
                    ]
                }).catch(() => {}); //message.channel.send(`It has not been possible to send the DM to the user!`) if I want to put it as a catch
                //enviamos en el canal que el usuario ha sido baneado exitosamenete

                message.channel.send({
                    embeds: [new MessageEmbed()
                        .setTitle(`✅ User timed out`)
                        .setDescription(`**The user \`${usuario.user.tag}\` *(\`${usuario.id}\`)* got timed out!**`)
                        .addField(`By`, `\n\`\`\`yml\n${message.author.tag}\`\`\``, true)
                        .addField(`Time`, `\n\`\`\`yml\n${time}\`\`\``, true)
                        .addField(`Reason`, `\n\`\`\`yml\n${razon}\`\`\``, true)
                        .setColor(client.color)
                        .setTimestamp()
                    ]
                })

                usuario.timeout(milliseconds, [razon]).catch(() => {
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