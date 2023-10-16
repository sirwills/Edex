const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
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
    date: {
        type: Date,
        default: Date.now()
    }

 
})

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model('User', userSchema)