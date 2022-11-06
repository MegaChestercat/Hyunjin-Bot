const serverSchema = require(`${process.cwd()}/modelos/servidor.js`);
const {asegurar_todo} = require(`${process.cwd()}/handlers/funciones.js`);

module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;
    await asegurar_todo(message.guild.id);
    let data = await serverSchema.findOne({guildID: message.guild.id});
    if(!message.content.startsWith(data.prefijo)) return;
    const args = message.content.slice(data.prefijo.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if(command){
        if(command.permisos_bot){
            if(!message.guild.me.permissions.has(command.permisos_bot)) return message.reply(`❌ **I don't have the enough permissions to execute this command!** \nI need the following permissions: ${command.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        if(command.permisos){
            if(!message.member.permissions.has(command.permisos)) return message.reply(`❌ **You don't have the enough permissions to execute this command!** \nYou need the following permissions: ${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        //Execute the command
        command.run(client, message, args, data.prefijo)
        
    }
    else{
        //optional
        return message.reply("I didn't find the specified command");
    }
}