const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const deleteProperty = require('../controllers/deleteProperty');

router.delete('/deleteProperty/:id/:propertyType', verifyToken, deleteProperty);

module.exports = router;