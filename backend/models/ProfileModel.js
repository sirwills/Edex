const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    nickname: {
        type: String,

    },
    occupation:{
        type: String,
        required: true,
    },
    bio:{
        type: String,
    },
    school:{
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model('Profile', profileSchema)