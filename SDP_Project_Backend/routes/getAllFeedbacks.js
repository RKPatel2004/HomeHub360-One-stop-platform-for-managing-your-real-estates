const express = require('express');
const router = express.Router();
const { getAllFeedbacks } = require('../controllers/getAllFeedbacks');
const verifyToken = require('../middleware/auth');

// Route to get all feedbacks (protected route - requires authentication)
router.get('/getAllFeedbacks', verifyToken, getAllFeedbacks);

module.exports = router;