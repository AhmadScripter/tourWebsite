const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    location: { type: String, required: true },
    charges: {
        perHead: { type: String, required: true },
        perCouple: { type: String, required: true }
    },
    totalDays: { type: String, required: true },
    departureDay: { type: String, required: true },
    servicesProvided: { type: String, required: true },
    mealProvided: {
        breakfast: { type: String, required: true },
        lunch: { type: String, required: true },
        dinner: { type: String, required: true }
    },
    placesToVisit: [{ type: String }],
    description: { type: String, required: true },
    img: { type: String }
});

module.exports = mongoose.model("Tour", tourSchema);