const express = require("express");
const { getPropertiesByOwner } = require("../controllers/getPropertyById");
const authMiddleware = require("../middleware/auth"); // Ensure authentication middleware is used

const router = express.Router();

router.get("/my-properties", authMiddleware, getPropertiesByOwner);

module.exports = router;
