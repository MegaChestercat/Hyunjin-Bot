require("colors"); //we could also add require("dotenv").config() if we are going to use a .env file
const {Client, Intents, Collection} = require("discord.js");
const {StarboardClient} = require("reconlx");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
    restTimeOffset: 0, //This is useful so the bot can react and work faster
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES, //This intent will help to capture the number of bots and humans in the server
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS  
    ]
});

client.commands = new Collection(); //Here all bot commands will be saved
client.slashCommands = new Collection() //Here all bot slashCommands will be saved
client.aliases = new Collection(); //Here all command Aliases will be saved

function requerirhandlers(){
    ["command", "events", "suggestions"].forEach(handler => {
        try{
            require(`./handlers/${handler}`)(client)
        } catch(e){
            console.warn(e);
        }
    })
}
requerirhandlers();

client.once("ready", () =>{

    async function activateState() {

        try {
            await client.user.setPresence({
                activities: [
                    {
                        name:"Camp Buddy", 
                        type: "PLAYING"//types: PLAYING, LISTENING, COMPETING, WATCHING, STREAMING
                    },
                ],
                status: "on"//dnd(do not disturb), on(connected), idle
            });
            
        } catch (error) {
            console.error(error);
        }
    }
    activateState();

    console.log('The bot is online');
});

client.on("guildMemberAdd", async member => { //an alternative to client.emojis.cache.find(emoji => emoji.name === 'IrumaSmile').toString() could be just putting <:IrumaSmile:974423014131236904>
    const opt1 = client.emojis.cache.find(emoji => emoji.name === 'IrumaSmile').toString() + " **Hey** <@" + member.id + ">**, welcome to Hyunjin Paradise!** " + client.emojis.cache.find(emoji => emoji.name === 'IrumaSmile').toString() + "\n\nDo not forget on grabbing some roles on"  + member.guild.channels.cache.get(process.env.ROLECH).toString() + ", and introducing yourself on" + member.guild.channels.cache.get(process.env.INTROCH).toString() + ", so we can know more about you. " + client.emojis.cache.find(emoji => emoji.name === 'Meliodas_Go').toString();
    const opt2 = client.emojis.cache.find(emoji => emoji.name === 'YoichiHeart').toString() + " **Hello there** <@" + member.id + ">**, welcome to my techy dominion** " + client.emojis.cache.find(emoji => emoji.name === 'dr_senku_xoxo').toString() + "\n\nRemember to grab some roles on " + member.guild.channels.cache.get(process.env.ROLECH).toString() + ", and to introduce yourself on" + member.guild.channels.cache.get(process.env.INTROCH).toString() + ", so we can know each other. \n\nXOXO -Jin" + client.emojis.cache.find(emoji => emoji.name === 'DayEscanor').toString();
    //const opt3 = client.emojis.cache.find(emoji => emoji.name === 'LelouchCoff').toString() + " **Hi** <@" + member.id + ">**, my name is Hyunjin, but you can call me Jin**" + client.emojis.cache.find(emoji => emoji.name === 'IrumaSmile').toString() + "\n\nIf you want some booty and deliousness you came to the right place... wait what did I just said? Hmmmmmm. " + client.emojis.cache.find(emoji => emoji.name === 'brolyass').toString() + " Anyway, just grab some roles on " + member.guild.channels.cache.get(process.env.ROLECH).toString() + ", and introduce yourself on" + member.guild.channels.cache.get(process.env.INTROCH).toString() + ", while I stop my nose bleeding." + client.emojis.cache.find(emoji => emoji.name === 'Meliodas_Go').toString();
    
    let ranAnswer = Math.floor(Math.random() * (2 - 1 + 1)) + 1; 

    if(ranAnswer == 1){
        member.client.channels.cache.get(process.env.GENCH).send(opt1); 
    }
    else{
        member.client.channels.cache.get(process.env.GENCH).send(opt2); 
    }
});

client.on("messageCreate", message =>{
    
    if(!message.author.bot){
        if(message.content.includes("I'm") || message.content.includes("i'm") || message.content.includes("Im") || message.content.includes("im")){
            if(message.content.includes("I'm")) pops = message.content.split("I'm").slice(1).toString().split(" ").slice(1, 18).join(' ') //To identify how many words is going to cover the final result substract of the second slice end-start (18-1)= 17 words
            else if(message.content.includes("i'm")) pops = message.content.split("i'm").slice(1).toString().split(" ").slice(1, 18).join(' ') 
            else if(message.content.includes("Im")) pops = message.content.split("Im").slice(1).toString().split(" ").slice(1, 18).join(' ')
            else if(message.content.includes("im")) pops = message.content.split("im").slice(1).toString().split(" ").slice(1, 18).join(' ')
            let ranAnswer = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // Math.random() * (max - min + 1)) + min --This command is to generate a random number between 2 values (including them).
            if(ranAnswer == 4){ //We are giving a random number possibility so the bot doens't reply to the user always
                message.reply("Hi " + pops + ". I'm Hyunjin and I'm a geek." ); 
            }
        }
        else if(message.content.includes("big") || message.content.includes("giant")){
            if(message.content.includes("big")){
                let ranAnswer = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                if(ranAnswer == 4){
                    message.reply("Big? What is big? XwX");
                }
            }
            else{
                let ranAnswer = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                if(ranAnswer == 4){
                    message.reply("Giant??");
                }
            }
        }
        else if(message.content.includes("bottom")){
            let ranAnswer = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
                if(ranAnswer == 4){
                    message.reply("Yeah, I'm a bottom, and I'm proud of it.");
                }
        }
    }
})
client.login(process.env.TOKEN); //For running the bot use the command npm run dev. to restart use rs. 

const starboardClient = new StarboardClient({
    client: client,
    Guilds: [
        {
            id: process.env.SERVID,
            options: {
                starCount: 3,
                starboardChannel: process.env.STARCH,
            },
        },
    ],
});

client.on("messageReactionAdd", (reaction) => {
    starboardClient.listener(reaction);
});

client.on("messageReactionRemove", (reaction) => {
    starboardClient.listener(reaction);
});