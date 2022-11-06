module.exports = {
    name: "ping",
    aliases: [`latency`, `ms`],
    desc: "It is useful for seeing bot ping",
    run: async(client, message, args, prefix) => {
        message.reply(`Pong! The bot ping is of \`${client.ws.ping}ms\``);
    }
}