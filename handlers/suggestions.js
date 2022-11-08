const setupSchema = require(`${process.cwd()}/models/setups.js`);
const votesSchema = require(`${process.cwd()}/models/sugg-votes.js`);
const {secure_all} = require(`${process.cwd()}/handlers/functions.js`);
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
            if(!setup_data || !setup_data.suggestions || !message.guild.channels.cache.get(setup_data.suggestions) || message.channel.id !== setup_data.suggestions) return;
            //we delete the suggestion sended by the author and we convert it in suggestion with buttons
            message.delete().catch(() => {});
            //we define the buttons
            let buttons = new MessageActionRow().addComponents([
                //Vote yes
                new MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("✅").setCustomId("vote_yes"),
                //Vote no
                new MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("❌").setCustomId("vote_no"),
                //See who voted
                new MessageButton().setStyle("PRIMARY").setLabel("Who voted?").setEmoji("❓").setCustomId("see_votes"),
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
                components: [buttons]
            })
            let data_msg =  new votesSchema({
                messageID: msg.id,
                author: message.author.id,
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
            secure_all(interaction.guild.id, interaction.user.id)
            //we search the data in the DB 
            let setup_data = await setupSchema.findOne({guildID: interaction.guild.id});
            //we search the DB of the suggestion message
            let msg_data = await votesSchema.findOne({messageID: interaction.message.id});
            //previous comprobations
            if(!msg_data || !setup_data || !setup_data.suggestions || interaction.channel.id !== setup_data.suggestions) return;
            switch(interaction.customId){
                case "vote_yes": {
                    //If the voter already voted on the same vote we make return
                    if(msg_data.yes.includes(interaction.user.id)) return interaction.reply({content: `You already voted YES in the proposal of <@${msg_data.autor}>`, ephemeral: true,});
                    //we modify the DB
                    if(msg_data.no.includes(interaction.user.id)) msg_data.no.splice(msg_data.no.indexOf(interaction.user.id), 1)
                    msg_data.yes.push(interaction.user.id);
                    msg_data.save();

                    //modify the embed
                    interaction.message.embeds[0].fields[0].value = `${msg_data.yes.length} votes`;
                    interaction.message.embeds[0].fields[1].value = `${msg_data.no.length} votes`;

                    //we modify the buttons with the value of the button
                    interaction.message.components[0].components[0].label = `${msg_data.yes.length}`;
                    interaction.message.components[0].components[1].label = `${msg_data.no.length}`;

                    //we edit the message
                    await interaction.message.edit({embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]]});
                    interaction.deferUpdate();
                }

                    break;

                case "vote_no": {
                    //If the voter already voted on the same vote we make return
                    if(msg_data.no.includes(interaction.user.id)) return interaction.reply({content: `You already voted NO in the proposal of <@${msg_data.author}>`, ephemeral: true,});
                    //we modify the DB
                    if(msg_data.yes.includes(interaction.user.id)) msg_data.yes.splice(msg_data.yes.indexOf(interaction.user.id), 1)
                    msg_data.no.push(interaction.user.id);
                    msg_data.save();

                    //modify the embed
                    interaction.message.embeds[0].fields[0].value = `${msg_data.yes.length} votes`;
                    interaction.message.embeds[0].fields[1].value = `${msg_data.no.length} votes`;

                    //we modify the buttons with the value of the button
                    interaction.message.components[0].components[0].label = `${msg_data.yes.length}`;
                    interaction.message.components[0].components[1].label = `${msg_data.no.length}`;

                    //we edit the message
                    await interaction.message.edit({embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]]});
                    interaction.deferUpdate();
                }

                    break;

                case "see_votes": {
                    interaction.reply({
                        embeds: [new MessageEmbed()
                        .setTitle(`Votes of the proposal`)
                        .addField(`✅ Positive Votes`, msg_data.yes.length >= 1 ? msg_data.yes.map(u => `<@${u}>\n`).toString() : `There are no votes`, true)
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