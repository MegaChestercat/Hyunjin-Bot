const mongoose = require("mongoose");
module.exports = client => {
    //Conection to the database

    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MONGODB database".blue);
    }).catch((err) =>{
        console.log("Error when connecting to MONGODB database".red);
        console.log(err);
    })

    console.log(`Connected as ${client.user.tag}`.green)
}