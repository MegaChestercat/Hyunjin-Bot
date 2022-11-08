module.exports = {
    name: "presence",
    aliases: ["set-presence"],
    desc: "It lets you change the bot presence",
    permissions: ["ADMINISTRATOR"],
    bot_permissions: ["ADMINISTRATOR"],
    run: async (client, message, args, prefix) =>  {

        actType = args[0].toUpperCase();
        content = args.slice(1).join(" ");
        optionStatus = "on";

        try {
            await client.user.setPresence({
                activities: [
                    {
                        name:content,
                        type:actType
                    },
                ],
                status:optionStatus
            });
            
        } catch (error) {
            console.error(error);
        }
    }
}