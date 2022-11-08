const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'gay',
    aliases: ['homosexual', `gaylevel`],
    desc: 'It shows your gay level',
    run: async(client, message, args, prefix) => {
        const gayLevel = Math.floor(Math.random() * 100);
        const user = message.mentions.users.first() ;
        if(!user) return message.channel.send("Please mention someone");

        let RandomGifs_Text = [ // Here we can put gifs or images, separated by a comma
            `https://c.tenor.com/VXuTv9HuJs0AAAAC/sasaki-to-miyano-sasaki-and-miyano.gif`,
            `https://c.tenor.com/6dfz24YM518AAAAC/anime-umibe-no-etranger.gif`,
            `https://64.media.tumblr.com/2489fc7d1b6ab28397a415bf3469307d/tumblr_py3o2kAkP91se56q3o1_500.gif`,
            `https://c.tenor.com/3ZU-zKcIVfkAAAAC/junjou-romantica-misaki.gif`,
            `https://c.tenor.com/fKSKob21Ub8AAAAC/sekaiichi-hatsukoi-masamune-takano.gif`
        ];
        let RandomGifs = RandomGifs_Text[Math.floor(Math.random() * RandomGifs_Text.length)];

        const embed = new MessageEmbed()
        .setTitle(`📈Gay level📉`)
        .setDescription(`<@${user.id}> **is ${gayLevel}% gay :gay_pride_flag:**`)//it will gave the results obtained from pure const
        .setImage(`${RandomGifs}`)
        .setColor('RANDOM')
        message.channel.send({embeds: [embed]})//sends the embed 
    }
}