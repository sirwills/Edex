const postController = require("express").Router();
const auth = require("../middleware/auth");
const Post = require('../models/postModel');
const User = require("../models/UserModel");
const avatar = require("gravatar")


// @Desc      CREATE A NEW POST BY A LOGGED IN USER
// @Route    api/post
// @access   Private
// @RequestType Post

postController.post("/", auth, (async(req, res)=>{
    try {
        const user  = await User.findById(req.user.id).select("-password")

        const post = new Post({
            text: req.body.text,
            name: user.username,
            user: req.user.id,
            avatar: user.avatar
        })

        await post.save()

        return res.status(201).json(post)
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({success: false, Msg: "Server error"})
    }
}));



// @Desc      Get all post 
// @Route    api/post
// @access   Private
// @RequestType GET


postController.get("/", auth, async(req, res)=>{
    try {
        const posts = await Post.find().sort({date: -1})
    if(!posts){ 
        return res.status(400).json({success: false, Msg: "No post found"})
    }

    return res.status(200).json(posts)

    } catch (error) {
        console.error(error.message)
        return res.status(400).json({success: false, Msg: "Server Error"})
    }
});



// @Desc      Get a post by id
// @Route    api/:id
// @access   Private
// @RequestType GET


postController.get("/:id", auth, async(req, res)=>{
   try {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(400).json({success: false, Msg: " Server Error"})
        }
        return res.status(200).json(post)
       } catch (error) {
        console.error(error.message);
        return res.status(500).json({success: false, Msg: "Server Error"})
       }
   } catch (error) {

    if(error.kind === "ObjectId"){
        return res.status(400).json({success: false, Msg: "No post Found"})
    }

    console.error(error.message)
   }
});


// @Desc      Edit / Update a POST
// @Route    api/:id
// @access   Private
// @RequestType PUT

postController.put("/:id", auth, async(req, res)=>{

    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({success: false, Msg: "No post found"})
        }

        if(req.user.id.toString() !== post.user.toString()){
            return res.status(403).json({success: false, Msg: "Unauthorized"})
        }

        post.text = req.body.text

        await post.save()

        return res.status(200).json({success: true, Msg: "Successfully update post", post})
    } catch (error) {
        console.error(error.message)
        if(error.kind === "ObjectId"){
            return res.status(400).json({succcess: false, Msg: "invalid post id"})
        }

        return res.status(500).json({success: false, Msg: "Server Error"})
    }
})


// @Desc      Delete Post
// @Route    api/:id
// @access   Private
// @RequestType DELETE


postController.delete('/:id', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
    if(!post){
        return res.status(404).json({success: false, Msg: "No post found"})
    }

    if(req.user.id.toString() !== post.user.toString()){
        return res.status(403).json({success: false, Msg: "Unauthorizedd"})
    }

    await post.deleteOne()
    
    return res.status(200).json({success: true, Msg: "successfully deleted post"})
    } catch (error) {
        console.error(error.message)
        if(error.kind === "ObjectId"){
            return res.status(403).json({success: false, Msg: "no post found"})
        }

        return res.status(500).json({success: false, Msg: "Server Error"})
    }
})


// COMMENTS SECTION


// @Desc      Make a comment
// @Route    api/comment/:id
// @access   Private
// @RequestType POST


postController.post("/comment/:id", auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        const user = await User.findById(req.user.id).select("-password")

        if(!post){
            return res.status(404).json({success: false, Msg: "No post found"})
        }

        const comment = {
            text: req.body.text,
            user: req.user.id,
            name: user.username,

        }

        post.comments.unshift(comment)

        await post.save()

        return res.status(200).json({success: true, Msg: "Successfully added a comment", post})
    } catch (error) {
        console.error(error.message)
        if(error.kind === "ObjectId"){
            return res.status(403).json({success: false, Msg: "invalid post id"})
        }
        return res.status(500).json({success: false, Msg: "Server Error"})
    }
})


// @Desc      Update a post
// @Route    api/comment/:id
// @access   Private
// @RequestType PUT


postController.put('/comment/:postId/:commentId', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.postId)
        const user = await User.findById(req.user.id).select("-password")

        if(!post){
            return res.status(404).json({success: false, Msg: "Post not found"})
        }

        const commentToUpdate = post.comments.find(comment=> comment._id.toString() === req.params.commentId)

        if(!commentToUpdate){
            return res.status(404).json({success: false, Msg: "No commment found"})
        }

        if(req.user.id.toString() !== commentToUpdate.user.toString()){
            return res.status(403).json({success: false, Msg: "Unauthorized"})
        }

        commentToUpdate.text = req.body.text

        await post.save()

        return res.status(200).json({success: true, Msg: "Successfully updated comment", post})
    } catch (error) {
        console.error(error.message)
        if(error.kind === "ObjectId"){
            return res.status(403).json({success: false, Msg: "Invalid Post id"})
        }
        return res.status(500).json({success: false, Msg: "Server Error"})
    }
})

// @Desc      Get all comments
// @Route    api/comment/
// @access   Private
// @RequestType POST


postController.get("/:postId/comment", auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.postId)
        if(!post){
            return res.status(403).json({success: false, Msg: "No post found"})
        }

        return res.status(200).json(post.comments)

    } catch (error) {
     console.error(error.message)
     if(error.kind === "ObjectId"){
        return res.status(403).json({success: false, Msg: "Server Error"})
     }   
    }
})



// @Desc      Delete a post
// @Route    api/comment/:postId/:commentId
// @access   Private
// @RequestType Delete


postController.delete('/comment/:postId/:commentId', auth, async(req, res)=>{
   try {
    const post = await Post.findById(req.params.postId)
    const user = await User.findById(req.user.id).select('-password')
    if(!post){
        return res.status(404).json({success: false, Msg: "No post found"})
    }

    const commentToDelete = post.comments.find(comment=>comment._id.toString() === req.params.commentId)

    if(!commentToDelete){
        return res.status(404).json({success: false, Msg: "no comment found"})
    }

    if(req.user.id.toString() !== commentToDelete.user.toString()){
        return res.status(403).json({success: false, Msg: "Unauthorized"})
    }

    post.comments = post.comments.filter(comment => comment.id.toString() !== req.params.commentId)

    await post.save()

    return res.status(200).json({success: true, Msg: "Successfully removed comment"})
   } catch (error) {
    console.error(error.message)
    if(error.kind === "ObjectId"){
        return res.status(404).json({success: false, Msg: "No post found"})
    }
    return res.status(500).json({success: false, Msg: "Server Error"})
   }
})

// @Desc      Liking a Post
// @Route    api/post/likes/:likeId
// @access   Private
// @RequestType PUT


postController.put("/like/:likeId", auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.likeId)
        if(!post){
            return res.status(404).json({success: false, Msg: "no post found"})
        }

        const hasLiked = post.likes.filter(like => req.user.id.toString() === like.user.toString());

        if(hasLiked.length > 0){
            return res.status(400).json({success: false, Msg: "Post Already liked"})
        }
            post.likes.unshift({user: req.user.id})

            await post.save()
    
            return res.status(200).json(post.likes)
        
    } catch (error) {
        console.error(error.message)
        if(error.kind === "ObjectId"){
            return res.status(404).json({success: false, Msg: "Post not found"})
        }
        return res.status(500).json({success: false, Msg: "Server Error"})
    }
})


// @Desc      Unliking a POST
// @Route    api/post/likes/:likeId
// @access   Private
// @RequestType DELETE

postController.put('/unlike/:likeId', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.likeId)

        if(!post){
            return res.status(404).json({success: false, Msg: "No post found"})
        }

        if(post.likes.filter(like => like.user.toString() === req.user.id ).length === 0){
            return res.status(403).json({success: false, Msg: "Post has not been liked"})
        }

        const removeIndex = post.likes.map(like => like.user.id.toString()).indexOf(req.user.id)
        
        post.likes.splice(removeIndex, 1)

        await post.save()

        return res.status(200).json(post.likes)

        
    } catch (error) {
        console.error(error.message)
        if(error.kind === "ObjectId"){
            return res.status(403).json({success: false, Msg: "No post found"})
        }
        return res.status(500).json({success: false, Msg: "Server Error"})

    }
})



module.exports = postController