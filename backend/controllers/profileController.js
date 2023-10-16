const profileController = require('express').Router();
const auth = require("../middleware/auth")
const Profile = require("../models/ProfileModel");
const User = require('../models/UserModel');


// @Desc      Get current user profile
// @Route    api/profile/me
// @access   Private
// @RequestType GET

profileController.get('/me', auth, async(req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["username"])
        if(!profile){
            return res.status(400).json({success: false, Msg: "There's no profile for this user"})
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
    }
})


//  @Desc      Create Profile for logged in user
// @Route    api/profile/me
// @access   Private
// @RequestType POST

profileController.post("/me", auth, async(req, res)=>{
    const {nickname, occupation, bio, school, department} = req.body

    try {
        let profile = await Profile.findOne({user: req.user.id}).populate("user", ["username"])
        if(profile){
        return res.status(400).json({success: false, Msg: "There is already a profile for this user"})
    }

    profile = new Profile({
        user: req.user.id,
        nickname, occupation, bio, department,school
    })

    await profile.save()
    return res.status(201).json(profile)
        
    } catch (error) {
        console.error(error.message)
    }
})

//  @Desc      Update a logged in user Profile
// @Route    api/profile/me
// @access   Private
// @RequestType PUT

profileController.put('/me', auth, async(req, res)=>{
    const {nickname, occupation, bio, school, department} = req.body

    try {

        let profile = await Profile.findOne({user: req.user.id})
        if(!profile){
            return res.status(400).json({success: false, Msg: "There is no profile for this user"})
        }

        profile.nickname = nickname,
        profile.occupation = occupation, 
        profile.bio = bio,
        profile.school = school,
        profile.department = department;

        await profile.save()
        return res.status(201).json({success: true, Msg: "Profile successfully updated", profile})
    } catch (error) {
        console.error(error.message)
    }
})


//  @Desc      Get a user profile
// @Route    api/profile/user/:user_id
// @access   public
// @RequestType GET

profileController.get("/user/:user_id", async(req, res)=>{

    try {
        let profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["username"])
        if(!profile){
            return res.status(400).json({success: false, Msg: "No profile found for this user"})
        }
        res.status(200).json({success: true, profile})
    } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(404).json({msge: 'Profile not found'})
        }
        console.error(error.message)
    }
})


//  @Desc      Get all users profile
// @Route    api/profile/
// @access   public
// @RequestType GET

profileController.get('/', async(req, res)=>{
    try {
        let profiles = await Profile.find().populate("user", ['username'])
        if(!profiles){
            return res.status(400).json({success: false, Msg: "No profile found"})
        }

        res.json(profiles)
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = profileController