const akinator = require("discord.js-akinator");

module.exports = {
    name: 'akinator',
    aliases: [`aki`, `genie`],
    desc: "It lets you play Akinator on Discord",
    run: async(client, message, args, prefix) => {
        akinator(message, {
            language: "en", //Defaults to "en"
            childMode: false, //Defaults to "false"
            gameType: "character", //Defaults to "character"
            useButtons: true, //Defaults to "false"
            embedColor: "#1F1E33" //Defaults to "RANDOM"
        });
    
    }
}