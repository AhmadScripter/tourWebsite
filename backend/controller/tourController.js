const Tour = require('../models/Tour');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });
const uploadMiddleware = upload.single("img");

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
      totalDays,
      departureDay,
      servicesProvided,
      description
    } = req.body;

    // Parse JSON strings back to objects
    const charges = req.body.charges ? JSON.parse(req.body.charges) : {};
    const mealProvided = req.body.mealProvided ? JSON.parse(req.body.mealProvided) : {};
    const placesToVisit = req.body.placesToVisit ? JSON.parse(req.body.placesToVisit) : [];

    if (!location || !totalDays || !departureDay || !servicesProvided || !description || !req.file || !charges || !mealProvided || !placesToVisit) {
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

const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: "Error updating Tour" });
  }
}

const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    if (tour.img) {
      const imgPath = path.join(__dirname, "..", tour.img);
      fs.unlink(imgPath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: "Error deleting Tour" });
  }
};

module.exports = { getTours, createTour, updateTour, deleteTour, uploadMiddleware };