const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const ownerAnalysisController = require('../controllers/ownerAnalysis');

// GET owner analytics
router.get('/owner-analytics', verifyToken, ownerAnalysisController.getOwnerAnalytics);

module.exports = router;