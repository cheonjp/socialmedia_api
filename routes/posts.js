const router = require("express").Router()
const Post = require("../models/Post")

//create a post
router.post("/post" , async (req,res)=>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all post
router.get("/:userId", async (req,res)=>{
    try {
        const myPost = await Post.find({userId:req.params.userId})
        res.status(200).json(myPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports= router