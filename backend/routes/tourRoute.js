const express = require('express');
const { getTours } = require('../controller/tourController');
const router = express.Router();

router.get('/', getTours);



module.exports = router;