const mongoose = require('mongoose');

const suggestions_votes = new mongoose.Schema({
    messageID: String,
    yes: {type: Array, default: []},
    no: {type: Array, default: []},
    author: {type: String, default: ""}
})

const model = mongoose.model("suggestion_votes", suggestions_votes);

module.exports = model;