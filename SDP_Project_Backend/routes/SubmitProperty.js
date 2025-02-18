const express = require("express");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/auth");
const { submitProperty, upload, storage } = require("../controllers/SubmitProperty");

const router = express.Router();


// Route to submit property (accepts multiple images)
router.post("/submitProperty", upload.fields([
    {name: 'images[]', maxCount: 20}
]), verifyToken, submitProperty);

module.exports = router;
