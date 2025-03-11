const express = require('express');
const multer = require('multer'); // Import multer
const verifyToken = require('../middleware/auth');
const { filterApartments } = require('../controllers/FilterApartment');

const router = express.Router();
const upload = multer(); // Initialize multer (for parsing form-data)

// Apply authentication middleware and multer for form-data parsing
router.post('/filterApartment', verifyToken, upload.none(), filterApartments);

module.exports = router;
