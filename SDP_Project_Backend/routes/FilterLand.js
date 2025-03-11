const express = require('express');
const multer = require('multer');
const verifyToken = require('../middleware/auth');
const { filterLand } = require('../controllers/FilterLand');

const router = express.Router();

// Multer setup (for handling form-data)
const storage = multer.memoryStorage(); // No file uploads, just form-data
const upload = multer({ storage });

router.post('/filterLand', verifyToken, upload.none(), filterLand);

module.exports = router;