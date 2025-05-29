const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/tour');
        console.log("mongooDB connected");
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
}

module.exports = connectDB;