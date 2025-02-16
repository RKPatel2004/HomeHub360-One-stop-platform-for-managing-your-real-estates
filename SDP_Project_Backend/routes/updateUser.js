const express = require("express");
const multer = require("multer");
const path = require("path");
const { updateUserProfile } = require("../controllers/updateUser");
const verifyToken = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.put("/updateProfile", verifyToken, upload.single("profilePic"), updateUserProfile);

module.exports = router;