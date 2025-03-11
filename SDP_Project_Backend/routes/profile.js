const express = require("express");
const router = express.Router();
const { upload, uploadProfilePhoto, getProfilePhoto} = require("../controllers/profile");

// Endpoint to upload profile picture
router.post("/uploadProfilePic", upload.single("profilePic"), uploadProfilePhoto);

// Endpoint to get profile picture
router.get("/profilePic/:userId", getProfilePhoto);

module.exports = router;






