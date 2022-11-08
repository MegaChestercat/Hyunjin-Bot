const serverSchema = require(`${process.cwd()}/models/server.js`);
module.exports = {
    secure_all,
}

async function secure_all(guildid){
    let serverdata = await serverSchema.findOne({guildID: guildid})
    if(!serverdata){
        console.log("Secured: Server Configuration".green);
        serverdata = await new serverSchema({
            guildID: guildid,
            prefix: process.env.PREFIX
        });
        await serverdata.save();
    }
}