// const express = require('express');
// const router = express.Router();
// const rentTimerController = require('../controllers/rentTimerController');
// const verifyToken = require('../middleware/auth');

// // Get remaining days for a specific property
// router.get('/rent-timer/:propertyId', verifyToken, rentTimerController.getRemainingDays);

// // Update all expired rental properties (can be used by admin)
// router.post('/update-expired-rentals', verifyToken, rentTimerController.updateExpiredRentals);

// module.exports = router;



const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const rentTimerController = require('../controllers/rentTimerController');

// Get remaining days for a specific property
router.get('/property-rent-timer/:propertyId', verifyToken, rentTimerController.getRemainingDays);

// Admin route to check and update all expired rentals
router.post('/check-expired-rentals', verifyToken, rentTimerController.checkExpiredRentals);

module.exports = router;