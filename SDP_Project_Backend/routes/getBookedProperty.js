const express = require('express');
const router = express.Router();
const { getBookedProperties } = require('../controllers/getBookedProperty');
const verifyToken = require('../middleware/auth');

// Route to get all booked properties for a logged-in user
router.get('/booked-properties', verifyToken, getBookedProperties);

module.exports = router;