const serverSchema = require(`${process.cwd()}/modelos/servidor.js`);
module.exports = {
    asegurar_todo,
}

/*
async function asegurar_todo(schema, id, id2, objeto){
    let data = await schema.findOne({id: id2})
    if(!data){
        console.log("NO HABÍA BASE DE DATOS CREADA, CREANDO UNA...");
        data = await new schema(objeto);
        data.save();
    }
    return data;
}*/

async function asegurar_todo(guildid){
    let serverdata = await serverSchema.findOne({guildID: guildid})
    if(!serverdata){
        console.log("Asegurado: Config de server".green);
        serverdata = await new serverSchema({
            guildID: guildid,
            prefijo: process.env.PREFIX
        });
        await serverdata.save();
    }
}