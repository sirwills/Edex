const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
    ],
    


    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }, 
            text: {
                type: String
            },
            name:{
                type: String
            }, 
            date: {
                type: Date,
                default: Date.now
            }
        },
    ],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Post", postSchema)