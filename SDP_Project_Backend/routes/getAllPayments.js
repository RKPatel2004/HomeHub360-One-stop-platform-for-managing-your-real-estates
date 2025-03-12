const express = require('express');
const router = express.Router();
const { getAllPayments } = require('../controllers/getAllPayments');
const verifyToken = require('../middleware/auth');

// Route to get all payments (Only accessible by admin)
router.get('/all', verifyToken, getAllPayments);

module.exports = router;
