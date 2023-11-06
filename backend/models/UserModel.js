const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Your name is required"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Your email is required"]
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    avatar : {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }

 
})



module.exports = mongoose.model('User', userSchema)