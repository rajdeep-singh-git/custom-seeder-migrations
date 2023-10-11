const mongoose = require('mongoose');
const YourModel = require('./models/UserModel');
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, });


exports.up = async () => {
    return YourModel.updateMany({}, { $set: { city: 'Default City' } });
}

exports.down = async () => {
    return YourModel.updateMany({}, { $unset: { city: 1 } });
}