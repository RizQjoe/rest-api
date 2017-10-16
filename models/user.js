const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: String
});

let User = mongoose.model('users',userSchema)

module.exports = User