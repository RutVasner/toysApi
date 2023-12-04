const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    role: {  
        type: String,
        default :"user",
        enum:["admin","user"],
        required: true,
    }
 
});

const User = model("User", userSchema);
module.exports.User = User;