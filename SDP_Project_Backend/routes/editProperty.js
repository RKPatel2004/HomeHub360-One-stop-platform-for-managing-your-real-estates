const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/auth");
const { editProperty } = require("../controllers/editProperty");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ✅ Fix: Ensure parameter name matches what is accessed in the controller
router.put(
  "/editProperty/:id/:propertyType",
  verifyToken,
  upload.array("images", 5), // Handle multiple images
  editProperty
);

module.exports = router;
