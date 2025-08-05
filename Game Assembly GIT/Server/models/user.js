const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: "guest" 
    },
})

module.exports = mongoose.model("User", userSchema);