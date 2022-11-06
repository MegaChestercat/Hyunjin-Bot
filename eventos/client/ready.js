const mongoose = require("mongoose");
module.exports = client => {
    //Conection to the database

    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado a la base de datos de MONGODB".blue);
    }).catch((err) =>{
        console.log("Error al conectar a la base de datos de MONGODB".red);
        console.log(err);
    })

    console.log(`Conectado como ${client.user.tag}`.green)
}