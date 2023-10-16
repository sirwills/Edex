const authController = require('express').Router()
const bcrypt = require("bcryptjs")
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const SECRET = process.env.SECRET
const auth = require('../middleware/auth')


authController.post('/register', async (req, res, next)=>{
    try {
        const {username, email, password} = req.body

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({success: false, message: "User Already Exists"})

        }


        const newUser =  await  User.create({username, email, password})

       

        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "5hr"})

        newUser.token = token
        
        await newUser.save()

        res.status(201).json({Msg: "User successfully created", success: true, user: newUser, token})
        next()

       
    } catch (error) {
       res.status(500).json({success:false, msg: "Server Error"}) 
       console.error(error)
    }
});


authController.post("/login", async(req, res)=>{
    try {
        
        const {email, password} = req.body;
        const existingUser = await User.findOne({email})

        if(!existingUser) {
            return res.status(404).json({success: false, Msg: "Invalid user credentials"})
        }

        const auth = await  bcrypt.compare(password, existingUser.password)

        if(!auth){
            return res.status(401).json({success: false, Msg: "Invalid user credentials"})
        }

        const token = jwt.sign({id: existingUser._id}, SECRET, {expiresIn: "2hr"})

        existingUser.token = token
        return res.status(200).json({success: true, Msg: "successfully logged in", existingUser, token})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({success: false, Msg: "Server Error"})
    }
} )

authController.put("/me", auth, async(req, res)=>{
    const {username, password, email} = req.body

    try {
        let user = await User.findOne({email})
        if(!email){
            return res.status(400).json({success: false, Msg: "invalid credentials"})
        }

        user.username = username, 
        user.password = password;

        await user.save()
        res.status(200).json({succcess: true, Msg: "Successfully updated user details", user})
    } catch (error) {
       console.error(error.message) 
    }
})

module.exports = authController