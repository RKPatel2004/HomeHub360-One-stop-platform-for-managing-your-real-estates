const express = require('express');
const router = express.Router();
const { getPropertyById } = require('../controllers/ViewProperty');
const verifyToken = require('../middleware/auth');

router.get('/property/:id', verifyToken, getPropertyById);

module.exports = router;