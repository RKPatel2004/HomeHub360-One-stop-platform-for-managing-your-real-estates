const express = require('express');
const multer = require('multer');
const verifyToken = require('../middleware/auth');
const { filterOfficeProperties } = require('../controllers/FilterOffice');

const router = express.Router();

// Multer setup for handling form-data
const upload = multer();

router.post('/filterOffice', verifyToken, upload.none(), filterOfficeProperties);

module.exports = router;