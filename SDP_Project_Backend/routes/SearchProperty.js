const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { searchPropertyByAddress } = require('../controllers/SearchProperty');

router.get('/searchPropertyByAddress/:address', verifyToken, searchPropertyByAddress);

module.exports = router;
