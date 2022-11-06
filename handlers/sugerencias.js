const setupSchema = require(`${process.cwd()}/modelos/setups.js`);
const votosSchema = require(`${process.cwd()}/modelos/votos-sugs.js`);
const {asegurar_todo} = require(`${process.cwd()}/handlers/funciones.js`);
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = client => {
    //event at the moment of sending a message in the suggestion channel
    client.on("messageCreate", async message => {
        try{
            //previous comprobations
            if(!message.guild || !message.channel || message.author.bot) return;
            //we search the data of the DB
            let setup_data = await setupSchema.findOne({guildID: message.guild.id});
            //previous comprobations
            if(!setup_data || !setup_data.sugerencias || !message.guild.channels.cache.get(setup_data.sugerencias) || message.channel.id !== setup_data.sugerencias) return;
            //we delete the suggestion sended by the author and we convert it in suggestion with buttons
            message.delete().catch(() => {});
            //we define the buttons
            let botones = new MessageActionRow().addComponents([
                //Vote yes
                new MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("✅").setCustomId("votar_si"),
                //Vote no
                new MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("❌").setCustomId("votar_no"),
                //Ver votantes
                new MessageButton().setStyle("PRIMARY").setLabel("Who voted?").setEmoji("❓").setCustomId("ver_votos"),
            ])
            //we send the message with the buttons
            let msg = await message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setAuthor({name: "Proposal of " + message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    .setDescription(`>>> ${message.content}`)
                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                    .addField(`✅ Positive Votes`, "0 votes", true)
                    .addField(`❌ Negative Votes`, "0 votes", true)
                    .setColor(client.color)
                    .setFooter({text: "💡 Do you want the proposal of something? Send the idea to the suggestions channel!"})
                ],
                components: [botones]
            })
            let data_msg =  new votosSchema({
                messageID: msg.id,
                autor: message.author.id,
            })
            data_msg.save();
        } catch(e){console.log(e)}
    })

    //event at the moment of making click on a button of the suggestion
    client.on("interactionCreate", async interaction => {
        try{
            //previous comprobations 
            if(!interaction.guild || !interaction.channel || !interaction.message || !interaction.user) return;
            //We secure the DB
            asegurar_todo(interaction.guild.id, interaction.user.id)
            //we search the data in the DB 
            let setup_data = await setupSchema.findOne({guildID: interaction.guild.id});
            //we search the DB of the suggestion message
            let msg_data = await votosSchema.findOne({messageID: interaction.message.id});
            //previous comprobations
            if(!msg_data || !setup_data || !setup_data.sugerencias || interaction.channel.id !== setup_data.sugerencias) return;
            switch(interaction.customId){
                case "votar_si": {
                    //If the voter already voted on the same vote we make return
                    if(msg_data.si.includes(interaction.user.id)) return interaction.reply({content: `You already voted YES in the proposal of <@${msg_data.autor}>`, ephemeral: true,});
                    //we modify the DB
                    if(msg_data.no.includes(interaction.user.id)) msg_data.no.splice(msg_data.no.indexOf(interaction.user.id), 1)
                    msg_data.si.push(interaction.user.id);
                    msg_data.save();

                    //modify the embed
                    interaction.message.embeds[0].fields[0].value = `${msg_data.si.length} votes`;
                    interaction.message.embeds[0].fields[1].value = `${msg_data.no.length} votes`;

                    //we modify the buttons with the value of the button
                    interaction.message.components[0].components[0].label = `${msg_data.si.length}`;
                    interaction.message.components[0].components[1].label = `${msg_data.no.length}`;

                    //we edit the message
                    await interaction.message.edit({embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]]});
                    interaction.deferUpdate();
                }

                    break;

                case "votar_no": {
                    //If the voter already voted on the same vote we make return
                    if(msg_data.no.includes(interaction.user.id)) return interaction.reply({content: `You already voted NO in the proposal of <@${msg_data.autor}>`, ephemeral: true,});
                    //we modify the DB
                    if(msg_data.si.includes(interaction.user.id)) msg_data.si.splice(msg_data.si.indexOf(interaction.user.id), 1)
                    msg_data.no.push(interaction.user.id);
                    msg_data.save();

                    //modify the embed
                    interaction.message.embeds[0].fields[0].value = `${msg_data.si.length} votes`;
                    interaction.message.embeds[0].fields[1].value = `${msg_data.no.length} votes`;

                    //we modify the buttons with the value of the button
                    interaction.message.components[0].components[0].label = `${msg_data.si.length}`;
                    interaction.message.components[0].components[1].label = `${msg_data.no.length}`;

                    //we edit the message
                    await interaction.message.edit({embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]]});
                    interaction.deferUpdate();
                }

                    break;

                case "ver_votos": {
                    interaction.reply({
                        embeds: [new MessageEmbed()
                        .setTitle(`Votes of the proposal`)
                        .addField(`✅ Positive Votes`, msg_data.si.length >= 1 ? msg_data.si.map(u => `<@${u}>\n`).toString() : `There are no votes`, true)
                        .addField(`❌ Negative Votes`, msg_data.no.length >= 1 ? msg_data.no.map(u => `<@${u}>\n`).toString() : `There are no votes`, true)
                        .setColor(client.color)
                        ],
                        ephemeral: true,
                    })
                }

                    break;
            }
        } catch(e){console.log(e)}
    })
}