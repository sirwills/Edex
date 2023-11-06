const express = require("express");
const connectDB = require("./db/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 7000
const app = express();
const cors = require("cors");
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const postController = require("./controllers/postController");



connectDB();

app.use(express.json())
app.use(cors())
// app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', authController);
app.use("/api/profile", profileController);
app.use('/api/post', postController)



app.listen(PORT, ()=>console.log(`Server started at ${PORT}`))