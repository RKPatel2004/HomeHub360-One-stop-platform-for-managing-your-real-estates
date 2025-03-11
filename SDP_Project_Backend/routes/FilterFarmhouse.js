const express = require('express');
const multer = require('multer');
const verifyToken = require('../middleware/auth');
const { filterFarmhouses } = require('../controllers/FilterFarmhouse');

const router = express.Router();

// Configure multer for form-data parsing
const upload = multer();

// Apply authentication middleware and multer middleware
router.post('/filterFarmhouse', verifyToken, upload.none(), filterFarmhouses);

module.exports = router;