const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')

const authRouter = require("./routes/auth")
const userRouter = require("./routes/users")

const port = 1000

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL, ()=>{
    console.log('MongoDB is connected')
})

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)


app.listen(port, ()=>{
    console.log(`Backend is under port ${port}`)
})