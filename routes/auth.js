const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.post("/register", async(req,res)=>{
    try {
        const salt =10
        const hashedPassword = bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        const comparedPassword = await bcrypt.compare(req.body.password, user.password)
        if(!user){
           return res.status(404).json("The email can not be founded")
        }
        // if(req.body.password !== user.password){
        //     return res.status(400).json("the password is wrong")
        // }
        if(!comparedPassword){
            return res.status(400).json("the password is wrong")
        }
        res.status(200).json("login succeed")
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router