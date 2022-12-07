const User = require("../models/User")
const router = require("express").Router()

// get friends
router.get("/my_friends/:email", async(req,res)=>{
    try {
        const user = await User.find({email:req.params.email})

        const friendsRequest = await Promise.all(
            user[0].friends.map((friend)=>{
                return User.findById(friend)
            })
        )
        res.status(200).json(friendsRequest)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// get user
router.get("/:email",  async(req,res)=>{
    try {
        const user = await User.findOne({email:req.params.email})
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error)
    }
})








module.exports = router