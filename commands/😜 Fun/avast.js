module.exports = {
name: "avast",
    aliases: [`antivirus`, `virus`],
    desc: "The virus database has been updated",
    run: async(client, message, args, prefix) => {
        message.channel.send({files: [`${process.cwd()}/src/Avast Audio.mp3`]})
    }
}    