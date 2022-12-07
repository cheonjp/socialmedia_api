const router = require("express").Router()
const Post = require("../models/Post")
const User = require("../models/User")

//create a post
router.post("/post", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all my post
router.get("/:userId", async (req, res) => {
    try {
        const myPost = await Post.find({ userId: req.params.userId })
        res.status(200).json(myPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/timeline/:userId", async (req, res) => {
    try {
        let allPostsInfo = {
            posts: [],
            friends: []
        }
        const currentUser = await User.findById(req.params.userId)

        const userFriends = await User.find({ _id: currentUser.friends })

        const userPosts = await Post.find({ userId: currentUser._id })
        const userFriendsPosts = await Promise.all(
            currentUser.friends.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )
        const myAndFriendsPosts = userPosts.concat(...userFriendsPosts)
        const timelinePosts = myAndFriendsPosts.sort((a, b) => {
            return b.updatedAt - a.updatedAt
        })
        allPostsInfo.posts = timelinePosts
        allPostsInfo.friends = userFriends
        console.log(allPostsInfo.posts)
        // res.status(200).json(timelinePosts)
        res.status(200).json(allPostsInfo)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router