const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    }
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
