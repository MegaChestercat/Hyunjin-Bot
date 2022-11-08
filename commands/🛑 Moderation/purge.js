module.exports = {
    name: "purge",
    aliases: ["clear", "delete", "clean", "delete-messages"],
    desc: "It helps to delete multiple messages from a channel",
    permissions: ["MANAGE_MESSAGES"],
    bot_permissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args, prefix) => {
        const amount = args[0]

        message.delete().catch(() => {})

        if(!amount){
            return message.channel.send("❌ **You need to specify a message quantity to delete**");
        }
        if(isNaN(amount)) return message.channel.send("❌ **You need to specify a valid number**");
        if(amount > 100){
            return message.channel.send("❌ **The maximum amount you can delete at a time is of 100 messages. Specify a number lesser than 100**");
        }
        if(amount < 1){
            return message.channel.send("❌ **The minimum amount you can delete at a time is of 1 message. Specify a number bigger than 0**");
        }

        try {
            setTimeout(() => message.channel.bulkDelete(amount), 2500)
        } catch {
            param.reply('Messages older than 14 days (2 weeks) are not allowed!')
        }

        setTimeout(() => message.channel.send(`✅ **__Deleted__** \`${amount}\` **__messages.__**`).then((msg) => {
            setTimeout(() => msg.delete().catch(() => {}), 5500)
        }), 3000)
    


    }

}