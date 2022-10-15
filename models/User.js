const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    job: {
        type: String,
        default: "N/A"
    },
    degree: {
        type: String,
        default: "N/A"
    },
    city: {
        type: String,
        default: "N/A"
    },
    status: {
        type: String,
        default: "N/A"
    },

},
    { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)