const { MessageEmbed } = require('discord.js');

module.exports = {
    name: `kiss`,
    aliases: [],
    desc: "It lets you kiss another user",
    run: async(client, message, args, prefix) => {
        const member = message.mentions.users.first(); 

        if(!member) return message.channel.send("Please mention someone");
        if(member.id == message.author.id) return message.channel.send("Please mention someone else");

        let RandomGifs_Text = [ // Here we can put gifs or images, separated by a comma
            `https://c.tenor.com/ZUn-xF2zN7UAAAAC/junjouromantica-misaki.gif`,
            `https://c.tenor.com/3io-qeiry30AAAAC/pucca-kiss.gif`,
            `https://c.tenor.com/jbipi38TU_gAAAAd/merlin-kiss-escanor-merlin.gif`,
            `https://thumbs.gfycat.com/BadOilyAuklet-size_restricted.gif`,
            `https://i.gifer.com/BVSQ.gif`,
            `https://thumbs.gfycat.com/CompetentWearyGreatdane-size_restricted.gif`,
            'https://c.tenor.com/LpNlJxRBFwMAAAAC/umibe-no-etranger-anime.gif'
        ];
        let RandomGifs = RandomGifs_Text[Math.floor(Math.random() * RandomGifs_Text.length)]; // establecemos el random, para que los gifs que pongamos ahi sean random

        const embed = new MessageEmbed()
        .setTitle(`${member.username} was kissed by ${message.author.username}`)
        .setImage(`${RandomGifs}`)
        .setColor("RED")

        message.reply({embeds: [embed]});

        //const file = new MessageAttachment(RandomGifs); // Establecemos el attachment y ponemos el random para que mande la imagen random claro.

        //message.reply({ content: `<@${member.id}> **was kissed by** <@${message.author.id}>`, files: [file] }); // Enviamos el mensaje con el usuario que fue besado, y el file, el attachment
    }
}