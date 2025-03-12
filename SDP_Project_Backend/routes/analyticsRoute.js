const express = require('express');
const { getPropertyAnalytics } = require('../controllers/analyticsController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// GET request for analytics
router.get('/property-stats', verifyToken, getPropertyAnalytics);

module.exports = router;
