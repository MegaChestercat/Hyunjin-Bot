const fs = require("fs");

module.exports = (client) => {
    try{
        let commandNum = 0;
        fs.readdirSync("./commands/").forEach((folder) => {
            const commands = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
            for(let file of commands){
                let command = require(`../commands/${folder}/${file}`);
                if(command.name){
                    client.commands.set(command.name, command);
                    commandNum++;
                }
                else{
                    console.log(`COMMAND [/${folder}/${file}]`, `error => the command is not set up`.brightred);
                    continue;
                }
                if(command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
            }
        });
        console.log(`${commandNum} Loaded commands`.brightGreen);
    } catch(e){
        console.log(e.red);
    }
}