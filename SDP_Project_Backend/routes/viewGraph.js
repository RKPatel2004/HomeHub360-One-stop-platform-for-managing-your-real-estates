const express = require('express');
const router = express.Router();
const viewGraphController = require('../controllers/viewGraph');
const verifyToken = require('../middleware/auth');

// Route to get views graph data by property type
router.get('/views-by-property-type', verifyToken, viewGraphController.getViewsByPropertyType);

// Route to get views graph data by location
router.get('/views-by-location', verifyToken, viewGraphController.getViewsByLocation);

module.exports = router;