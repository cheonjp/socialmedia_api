const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')

app.use(cors())

const port = 1000

dotenv.config()


// mongoose.connect('mongodb+srv://nmmcjp:gksdud29@cluster0.rughgcz.mongodb.net/?retryWrites=true&w=majority', ()=>{
//     console.log('MongoDB is connected')
// })
mongoose.connect(process.env.MONGODB_URL, ()=>{
    console.log('MongoDB is connected')
})

app.listen(port, ()=>{
    console.log(`Backend is under port ${port}`)
})