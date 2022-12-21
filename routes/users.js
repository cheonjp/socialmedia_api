const User = require("../models/User")
const router = require("express").Router()

// get friends
router.get("/my_friends/:email", async (req, res) => {
    try {
        const user = await User.find({ email: req.params.email })

        const friendsRequest = await Promise.all(
            user[0].friends.map((friend) => {
                return User.findById(friend)
            })
        )
        res.status(200).json(friendsRequest)

    } catch (error) {
        res.status(500).json(error)
    }
})

// get recommended friends
router.get("/recommended_friends/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        const coverMatched = await User.find({ coverPicture: user.coverPicture })
        const statusMatched = await User.find({ status: user.status })
        const jobMatched = await User.find({ job: user.job })
        const cityMatched = await User.find({ job: user.city })
        coverMatched.concat(statusMatched, jobMatched, ...cityMatched)
        const allRecommended = coverMatched


        const friendsFiltered = allRecommended.filter((friend) => {
            return (
                friend._id.toString() != user._id
            )
        })
        let arrayTest=[]
        const test = friendsFiltered.map((recommendedFriend)=>{
            user.friends.forEach((userFriend)=>{
                console.log(userFriend)
                if(recommendedFriend._id.toString() === userFriend.toString()){
                    arrayTest.push(recommendedFriend)
                }
            })
        })
        // From Here
        arrayTest.filter((each)=>{
            console.log(friendsFiltered.indexOf(each))
            friendsFiltered.splice(friendsFiltered.indexOf(each),0)
        })


        res.status(200).json(arrayTest)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get user
router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})










module.exports = router