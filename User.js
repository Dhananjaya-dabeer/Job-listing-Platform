const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    Mobile : Number,

})

module.exports = mongoose.model('User',userSchema)