const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    texts: [{ type: String }],
});

const TextSchema = mongoose.model("text", textSchema);
 
module.exports = TextSchema;