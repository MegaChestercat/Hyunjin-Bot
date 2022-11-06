module.exports = {
name: "avast",
    aliases: [`antivirus`, `virus`],
    desc: "La base de datos de virus ha sido actualizada",
    run: async(client, message, args, prefix) => {
        message.channel.send({files: ["Avast Audio.mp3"]})
    }
}    