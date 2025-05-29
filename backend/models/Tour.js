const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    location: {type: String, require: true},
    charges: {type: String, require: true},
    description: {type: String, require: true},
    img: {type: String}
});

module.exports = mongoose.model("Tour", tourSchema);