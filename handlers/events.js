const fs = require("fs");
const allevents = [];

module.exports = async (client) => {
    try{
        try{
            console.log("Loading events...".yellow);
        }catch {}
        let quantity = 0;
        const load_dir = (dir) => {
            const events_file = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(`.js`));
            for(const file of events_file){
                try{
                    const event = require(`../events/${dir}/${file}`);
                    const event_name = file.split(".")[0];
                    allevents.push(event_name);
                    client.on(event_name, event.bind(null, client));
                    quantity++;
                } catch(e){
                    console.log(e)
                }
            }
        }
        await ["client", "guild"].forEach(e => load_dir(e));
        console.log(`${quantity} Loaded events`.brightGreen);
        try{
            console.log(`Logging in the bot...`.yellow);
        } catch(e){
            console.log(e)
        }
    } catch(e){
        console.log(e.bgRed);
    }
}