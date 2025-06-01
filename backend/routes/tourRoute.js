const express = require('express');
const { getTours, createTour, updateTour, deleteTour } = require('../controller/tourController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const router = express.Router();

router.get('/', getTours);
router.post('/',adminAuthMiddleware, createTour);
router.put('/:id',adminAuthMiddleware, updateTour);
router.delete('/:id',adminAuthMiddleware, deleteTour);

module.exports = router;