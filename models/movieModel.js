
const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    id: Number,
    name : String,
    language : String,
    genres : [String],
    url : String 
})

module.exports = mongoose.model('movies', UserSchema);

