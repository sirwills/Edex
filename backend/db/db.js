const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

const connectDB = async() =>{
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

         console.log("DB Connected")
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectDB;