const mongoose = require('mongoose');
const YourModel = require('./models/UserModel');

// Connect to your MongoDB instance
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, });

exports.up = async () => {
    // Define the data to be seeded
    const dataToSeed = [
        { _id: "1", name: "Jashan", age: 24, email: "jashan@gmail.com" },
        { _id: "2", name: "Simran", age: 35, email: "simran@gmail.com" }
    ];

    // Insert data into the database
    return YourModel.insertMany(dataToSeed)
}

exports.down = async () => {
    return YourModel.deleteMany({
        _id: {
            $in: ["1", "2"]
        }
    })
}

