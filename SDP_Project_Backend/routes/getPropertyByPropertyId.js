const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/getPropertyByPropertyId');
const verifyToken = require('../middleware/auth');

// Route to get property by ID from any collection
router.get('/api/property/:propertyId', verifyToken, propertyController.getPropertyByPropertyId);

module.exports = router;