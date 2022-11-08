const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const {readdirSync} = require('fs');

module.exports = {
    name: "help",
    aliases: [`h`, `bothelp`],
    desc: "It is useful for seeing the information about the bot",
    run: async(client, message, args, prefix) => {
        //Define bot categories by reading the ./commands route
        const categories = readdirSync('./commands');
        if(args[0]){
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            const category = categories.find(category => category.toLowerCase().endsWith(args[0].toLowerCase()));
            if(command){
                let embed = new MessageEmbed()
                .setTitle(`Command: \`${command.name}\``)
                .setFooter({text: "© Developed by The_Chester#4302 | 2022", iconURL: "https://cdn.discordapp.com/avatars/513850291485933589/952033cd4f246e80d5f96ea0b4f02986.webp?size=2048"})
                .setColor(client.color)

                //We define conditionals
                if(command.desc) embed.addField('✍ Description:', `\`\`\`${command.desc}\`\`\``);
                if(command.aliases && command.aliases.length >= 1) embed.addField('✅ Alias:', `${command.aliases.map(alias => `\`${alias}\``).join(", ")}`);
                if(command.permissions && command.permissions.length >= 1) embed.addField('👤 Required Permissions:', `${command.permissions.map(permission => `\`${permission}\``).join(", ")}`);
                if(command.bot_permissions && command.bot_permissions.length >= 1) embed.addField('🤖 Required Bot Permissions:', `${command.bot_permissions.map(permission => `\`${permission}\``).join(", ")}`);

                return message.reply({embeds: [embed]});
            }
            else if(category){
                const category_commands = readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"));
                return message.reply({embeds: [new MessageEmbed()
                .setTitle(`${category.split(" ")[0]} ${category.split(" ")[1]} ${category.split(" ")[0]}`)
                .setColor(client.color)
                .setDescription(category_commands.length >= 1 ? `>>> *${category_commands.map(command => `\`${command.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *There are not commands yet on this category...*`)
                ]})
            }
            else{
                return message.reply(`❌ **It was not found the specified command!**\nUse \`${prefix}help\` in order to see the commands and categories!`)
            }
        }
        else{
            //we define the selection of category
            const selection = new MessageActionRow().addComponents(new MessageSelectMenu() //The maximum limit of options(binders) is 25. If not the bot could give errors.
            .setCustomId(`HelpSelectionMenu`)
            .setMaxValues(4)
            .setMinValues(1)
            .addOptions(categories.map(category => {
                //We define the object that will be an option to choosing
                let objeto = {
                    label: category.split(" ")[1].substring(0, 50),
                    value: category,
                    description: `Check the commands of ${category.split(" ")[1].substring(0, 50)}`,
                    emoji: category.split(" ")[0],
                }
                //We return the created object and we add it as another option
                return objeto;
            }))
            )

            let help_embed = new MessageEmbed()
            .setTitle(`Help of __${client.user.tag}__`)
            .setColor(client.color)
            .setDescription(`Multifunctional bot in development by \`The_Chester#4302\`\n\n[\`Join the server\`](https://discord.gg/Tk9shUXuMq)`)
            .setThumbnail(message.guild.iconURL({dynamic: true }))
            .setFooter({text: "© Developed by The_Chester#4302 | 2022", iconURL: "https://cdn.discordapp.com/avatars/513850291485933589/952033cd4f246e80d5f96ea0b4f02986.webp?size=2048"})

            let help_message = await message.reply({embeds: [help_embed], components: [selection]});

            const collector = help_message.createMessageComponentCollector({filter: (i) => (i.isSelectMenu()) && i.user && i.message.author.id == client.user.id, time: 180e3});

            collector.on("collect", (interaction) =>{
                let embeds = [];
                for(const selected of interaction.values){
                    //We define the commands by reading the path of the selected value of the menu
                    category_commands = readdirSync(`./commands/${selected}`).filter(file => file.endsWith('.js'));

                    let embed = new MessageEmbed()
                    .setTitle(`${selected.split(" ")[0]} ${selected.split(" ")[1]} ${selected.split(" ")[0]}`)
                    .setColor(client.color)
                    .setDescription(category_commands.length >= 1 ? `>>> *${category_commands.map(command => `\`${command.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *There are not commands yet on this category...*`)
                    
                    embeds.push(embed)
                }
                interaction.reply({embeds, ephemeral: true})
            });

            collector.on("end", () => {
                help_message.edit({content: `Your time has expired! Type again \`${prefix}help\` for seeing it again!`, components: []}).catch(() => {});
            })
        }
        
    }
}