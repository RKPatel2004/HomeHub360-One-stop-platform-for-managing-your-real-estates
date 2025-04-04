const express = require('express');
const router = express.Router();
const viewController = require('../controllers/propertyView');
const verifyToken = require('../middleware/auth');

// Route to increment view count (requires authentication)
router.post('/:modelType/:propertyId/view', verifyToken, viewController.incrementViewCount);

// Route to get view count (can be public)
router.get('/:modelType/:propertyId/views', verifyToken, viewController.getViewCount);

module.exports = router;