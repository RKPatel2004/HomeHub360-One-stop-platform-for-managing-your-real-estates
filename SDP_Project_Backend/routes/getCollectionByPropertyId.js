const express = require('express');
const router = express.Router();
const propertyTypeController = require('../controllers/getCollectionByPropertyId');
const verifyToken = require('../middleware/auth');

// Route to get the collection type based on property ID
router.get('/type/:propertyId', verifyToken, propertyTypeController.getPropertyType);

module.exports = router;