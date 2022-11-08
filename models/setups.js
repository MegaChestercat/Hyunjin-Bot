const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildID: String,
    suggestions: {type: String, default: ""},
})

const model = mongoose.model("Settings", setupSchema);

module.exports = model;