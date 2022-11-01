const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')
const multer = require("multer")
const path = require("path")

const authRouter = require("./routes/auth")
const userRouter = require("./routes/users")
const postRouter = require("./routes/posts")

const port = 1000

let postingTime
let setPost = true


dotenv.config()
app.use(express.json())
app.use(cors())

app.use("/images", express.static(path.join(__dirname,"/public/images")))

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('MongoDB is connected')
})
// app.use("/images",express.static(path.join(__dirname,"/public/images")))

// app.use(express.static(path.join(__dirname,"/public/images")))
app.use("/post",express.static(__dirname + "/public"))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        // cb(null,req.body.name)
        // cb(null,req.body.name)
        if(setPost===true){
            postingTime = new Date().getTime()
            setPost = false
        }
        cb(null, postingTime + "_" + file.originalname)
    },
})
const upload = multer({ storage })
app.post("/api/upload", upload.array("file"), (req, res) => {
    setPost = true
    try {
        // return res.status(200).json("File uploaded successfully.")
        return res.status(200).json(postingTime)
    } catch (err) {
        console.log(err)
    }
})







app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

app.listen(port, () => {
    console.log(`Backend is under port ${port}`)
})