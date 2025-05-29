const Tour = require('../models/Tour');

const getTours = async(req,res)=>{
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (error) {
        res.status(500).json("Error fetching Tours Plans");
    }
}


module.exports = {getTours};