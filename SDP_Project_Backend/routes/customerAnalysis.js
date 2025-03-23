// routes/customerAnalysis.js
const express = require('express');
const router = express.Router();
const customerAnalysisController = require('../controllers/customerAnalysis');
const verifyToken = require('../middleware/auth');

// Route to get customer analytics overview
router.get('/overview', verifyToken, customerAnalysisController.getCustomerAnalytics);

// Route to get monthly activity data for graphs
router.get('/monthly-activity', verifyToken, customerAnalysisController.getMonthlyActivity);

// Route to get detailed property transactions
router.get('/property-transactions', verifyToken, customerAnalysisController.getPropertyTransactions);

module.exports = router;