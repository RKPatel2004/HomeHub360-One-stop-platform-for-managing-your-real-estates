const express = require('express');
const { getAverageRatings } = require('../controllers/feedbackGraphController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Get average ratings per property type
router.get('/average-ratings', verifyToken, getAverageRatings);

module.exports = router;
