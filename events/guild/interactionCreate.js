module.exports = async(client, interaction) => {
    if(interaction.isCommand()){
        const command = client.slashCommands.get(interaction.commandName)
        command.run(client, interaction)
    }
}