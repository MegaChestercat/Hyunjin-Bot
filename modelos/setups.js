const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildID: String,
    sugerencias: {type: String, default: ""},
})

const model = mongoose.model("Configuraciones", setupSchema);

module.exports = model;