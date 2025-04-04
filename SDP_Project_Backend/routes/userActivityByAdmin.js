const express = require('express');
const router = express.Router();
const { getMonthlyUniqueUsers } = require('../controllers/userActivityByAdmin');
const verifyToken = require('../middleware/auth');

// Route to get monthly unique users (admin only)
router.get('/monthly-unique-users', verifyToken, getMonthlyUniqueUsers);

module.exports = router;