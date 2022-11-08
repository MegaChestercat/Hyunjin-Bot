const serverSchema = require(`${process.cwd()}/models/server.js`);
const {secure_all} = require(`${process.cwd()}/handlers/functions.js`);

module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;
    await secure_all(message.guild.id);
    let data = await serverSchema.findOne({guildID: message.guild.id});
    if(!message.content.startsWith(data.prefix)) return;
    const args = message.content.slice(data.prefix.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if(command){
        if(command.bot_permissions){
            if(!message.guild.me.permissions.has(command.bot_permissions)) return message.reply(`❌ **I don't have the enough permissions to execute this command!** \nI need the following permissions: ${command.bot_permissions.map(permission => `\`${permission}\``).join(", ")}`)
        }

        if(command.permissions){
            if(!message.member.permissions.has(command.permissions)) return message.reply(`❌ **You don't have the enough permissions to execute this command!** \nYou need the following permissions: ${command.permissions.map(permission => `\`${permission}\``).join(", ")}`)
        }

        //Execute the command
        command.run(client, message, args, data.prefix)
        
    }
    else{
        //optional
        return message.reply("I didn't find the specified command");
    }
}