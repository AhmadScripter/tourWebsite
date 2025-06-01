const Tour = require('../models/Tour');

const getTours = async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (error) {
        res.status(500).json("Error fetching Tours Plans");
    }
}

const createTour = async (req, res) => {
    try {
        const {
            location,
            charges,
            totalDays,
            departureDay,
            servicesProvided,
            mealProvided,
            placesToVisit,
            description,
        } = req.body;

        if (
            !location || !charges?.perHead || !charges?.perCouple ||
            !totalDays || !departureDay || !servicesProvided ||
            !mealProvided?.breakfast || !mealProvided?.lunch || !mealProvided?.dinner ||
            !description
        ) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }


        const imgPath = req.file ? `/uploads/${req.file.filename}` : "";

        const newTour = new Tour({
            location,
            charges,
            totalDays,
            departureDay,
            servicesProvided,
            mealProvided,
            placesToVisit,
            description,
            img: imgPath
        });

        await newTour.save();
        res.status(201).json(newTour);
    } catch (error) {
        res.status(500).json({ error: error.message || "Error creating tour" });
    }
};

const updateTour = async(req,res) =>{
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedTour) return res.status(404).json({ message: 'Tour not found' });
        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(400).json({message: "Error updating Tour"});
    }
}

const deleteTour = async(req,res) =>{
    try{
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        if (!deletedTour) return res.status(404).json({ message: 'Tour not found' });
        res.status(200).json({ message: 'Tour deleted successfully' });
    }catch(error){
        res.status(400).json({message: "Error delete Tour"});
    }
}

module.exports = { getTours, createTour, updateTour, deleteTour };