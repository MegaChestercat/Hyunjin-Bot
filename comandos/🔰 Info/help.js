const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const {readdirSync} = require('fs');

module.exports = {
    name: "help",
    aliases: [`h`, `bothelp`],
    desc: "It is useful for seeing the information about the bot",
    run: async(client, message, args, prefix) => {
        //Define bot categories by reading the ./comandos route
        const categorias = readdirSync('./comandos');
        if(args[0]){
            const comando = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            const categoria = categorias.find(categoria => categoria.toLowerCase().endsWith(args[0].toLowerCase()));
            if(comando){
                let embed = new MessageEmbed()
                .setTitle(`Command: \`${comando.name}\``)
                .setFooter({text: "© Developed by The_Chester#4302 | 2022", iconURL: "https://cdn.discordapp.com/avatars/513850291485933589/952033cd4f246e80d5f96ea0b4f02986.webp?size=2048"})
                .setColor(client.color)

                //We define conditionals
                if(comando.desc) embed.addField('✍ Description:', `\`\`\`${comando.desc}\`\`\``);
                if(comando.aliases && comando.aliases.length >= 1) embed.addField('✅ Alias:', `${comando.aliases.map(alias => `\`${alias}\``).join(", ")}`);
                if(comando.permisos && comando.permisos.length >= 1) embed.addField('👤 Required Permissions:', `${comando.permisos.map(permiso => `\`${permiso}\``).join(", ")}`);
                if(comando.permisos_bot && comando.permisos_bot.length >= 1) embed.addField('🤖 Required Bot Permissions:', `${comando.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`);

                return message.reply({embeds: [embed]});
            }
            else if(categoria){
                const comandos_de_categoria = readdirSync(`./comandos/${categoria}`).filter(archivo => archivo.endsWith(".js"));
                return message.reply({embeds: [new MessageEmbed()
                .setTitle(`${categoria.split(" ")[0]} ${categoria.split(" ")[1]} ${categoria.split(" ")[0]}`)
                .setColor(client.color)
                .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *There are not commands yet on this category...*`)
                ]})
            }
            else{
                return message.reply(`❌ **It was not found the specified command!**\nUse \`${prefix}help\` in order to see the commands and categories!`)
            }
        }
        else{
            //we define the selection of category
            const selection = new MessageActionRow().addComponents(new MessageSelectMenu() //*The maximum limit of options(binders) is 25. If not the bot could give errors.
            .setCustomId(`HelpSelectionMenu`)
            .setMaxValues(4)
            .setMinValues(1)
            .addOptions(categorias.map(categoria => {
                //We define the object that will be an option to choosing
                let objeto = {
                    label: categoria.split(" ")[1].substring(0, 50),
                    value: categoria,
                    description: `Check the commands of ${categoria.split(" ")[1].substring(0, 50)}`,
                    emoji: categoria.split(" ")[0],
                }
                //We return the created object and we add it as another option
                return objeto;
            }))
            )

            let ayuda_embed = new MessageEmbed()
            .setTitle(`Help of __${client.user.tag}__`)
            .setColor(client.color)
            .setDescription(`Multifunctional bot in development by \`The_Chester#4302\`\n\n[\`Join the server\`](https://discord.gg/Tk9shUXuMq)`)
            .setThumbnail(message.guild.iconURL({dynamic: true }))
            .setFooter({text: "© Developed by The_Chester#4302 | 2022", iconURL: "https://cdn.discordapp.com/avatars/513850291485933589/952033cd4f246e80d5f96ea0b4f02986.webp?size=2048"})

            let mensaje_ayuda = await message.reply({embeds: [ayuda_embed], components: [selection]});

            const collector = mensaje_ayuda.createMessageComponentCollector({filter: (i) => (i.isSelectMenu()) && i.user && i.message.author.id == client.user.id, time: 180e3});

            collector.on("collect", (interaccion) =>{
                let embeds = [];
                for(const seleccionado of interaccion.values){
                    //We define the commands by reading the path of the selected value of the menu
                    comandos_de_categoria = readdirSync(`./comandos/${seleccionado}`).filter(archivo => archivo.endsWith('.js'));

                    let embed = new MessageEmbed()
                    .setTitle(`${seleccionado.split(" ")[0]} ${seleccionado.split(" ")[1]} ${seleccionado.split(" ")[0]}`)
                    .setColor(client.color)
                    .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *There are not commands yet on this category...*`)
                    
                    embeds.push(embed)
                }
                interaccion.reply({embeds, ephemeral: true})
            });

            collector.on("end", () => {
                mensaje_ayuda.edit({content: `Your time has expired! Type again \`${prefix}help\` for seeing it again!`, components: []}).catch(() => {});
            })
        }
        
    }
}