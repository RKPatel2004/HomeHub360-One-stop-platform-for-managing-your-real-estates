const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { submitFeedback, getFeedbackByProperty } = require('../controllers/feedbackController');

// Route to submit feedback
router.post('/feedback', verifyToken, submitFeedback);

// Route to get feedback for a specific property
router.get('/feedback/:propertyId', getFeedbackByProperty);

module.exports = router;
