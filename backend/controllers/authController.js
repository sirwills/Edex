const authController = require('express').Router()
const bcrypt = require("bcryptjs")
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const SECRET = process.env.SECRET
const auth = require('../middleware/auth')




authController.post('/register', async (req, res)=>{
    try {
        const {username, email, password} = req.body

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({success: false, message: "User Already Exists"})

        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user =  await  User.create({username, email, password:hashedPassword})

       

        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "5hr"})

        user.token = token
        
        await user.save()

        return res.status(201).json({user, token})
        

       
    } catch (error) {
        console.error(error.message)
       return res.status(500).json({success:false, msg: "Server Error"}) 
      
    }
});


authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, Msg: "Invalid user credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, Msg: "Invalid user credentials" });
        }

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "5hr" });

        user.token = token;

        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ success: false, Msg: "Server Error" });
    }
});


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