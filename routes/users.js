const User = require("../models/User")
const router = require("express").Router()

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