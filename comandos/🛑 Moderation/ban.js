const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    aliases: ["banear", "banuser", "ban-user"],
    desc: "It helps to ban a user of the server",
    permisos: ["ADMINISTRATOR", "BAN_MEMBERS"],
    permisos_bot: ["ADMINISTRATOR", "BAN_MEMBERS"],
    run: async (client, message, args, prefix) => {
        //definimos la persona a banear
        let usuario = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!usuario) return message.reply(`❌ **It was not found the user you specified!**`);

        //definimos razón, y si no hay, la razón será "No se ha especificado ninguna razón!"
        let razon = args.slice(1).join(" ");
        if(!razon) razon = "It has not been specified a reason!"

        //comprobamos que el usuario a banear no es el dueño del servidor
        if(usuario.id == message.guild.ownerId) return message.reply(`❌ **You cannot ban the server owner!**`);

        if (usuario.id == message.author.id) return message.reply(`❌ **You cannot ban yourself from the server!**`);

        //comprobar que el BOT está por encima del usuario a banear
        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
            //comprobar que la posición del rol del usuario que ejecuta el comando sea mayor a la persona que vaya a banear
            if (message.member.roles.highest.position > usuario.roles.highest.position) {

                message.delete().catch(() => {});
                
                //enviamos al usuario por privado que ha sido baneado!
                usuario.send({embeds: [
                    new MessageEmbed()
                    .setTitle(`You have been banned from __${message.guild.name}__`)
                    .setDescription(`**Reason:** \n\`\`\`yml\n${razon}\`\`\``)
                    .setColor(client.color)
                    .setTimestamp()
                ]}).catch(() => {}); //message.reply(`It has not been possible to send the DM to the user!`)
                //enviamos en el canal que el usuario ha sido baneado exitosamenete

                message.channel.send({embeds: [new MessageEmbed()
                .setTitle(`✅ User banned`)
                .setDescription(`**It has been successfully banned \`${usuario.user.tag}\` *(\`${usuario.id}\`)* of the server!**`)
                .addField(`By`, `\n\`\`\`yml\n${message.author.tag}\`\`\``, true)
                .addField(`Reason`, `\n\`\`\`yml\n${razon}\`\`\``, true)
                .setColor(client.color)
                .setTimestamp()
                ]})

                usuario.ban({reason: razon}).catch(() => {
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