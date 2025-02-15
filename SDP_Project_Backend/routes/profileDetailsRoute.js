const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { getUserProfile } = require("../controllers/profileController");

// Protected route to get user profile
router.get("/getUserProfile", verifyToken, getUserProfile);

module.exports = router;
