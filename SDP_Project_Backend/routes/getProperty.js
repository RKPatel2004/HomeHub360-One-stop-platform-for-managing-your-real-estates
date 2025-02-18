const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth"); 
const { getProperties } = require("../controllers/getProperty");

// Route to get all properties
router.get("/getProperty", verifyToken, getProperties);

module.exports = router;
