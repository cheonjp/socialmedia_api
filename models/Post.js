const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postText: {
        type: String
    },
    postImg: {
        type: Array
    },
    likes:{
        type:Array,
        default:[]
    }

},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema)