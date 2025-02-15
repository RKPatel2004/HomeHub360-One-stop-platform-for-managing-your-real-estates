const express = require("express");
const router = express.Router();
const { upload, uploadProfilePhoto, getProfilePhoto/*, updateUserProfile*/ } = require("../controllers/profile");

// Endpoint to upload profile picture
router.post("/uploadProfilePic", upload.single("profilePic"), uploadProfilePhoto);

// Endpoint to get profile picture
router.get("/profilePic/:userId", getProfilePhoto);

// // Endpoint to update user profile details
// router.put("/updateUser", updateUserProfile);

module.exports = router;






// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middleware/auth"); // Updated import path
// const { upload, uploadProfilePhoto, getProfilePhoto } = require("../controllers/profile");

// // Endpoint to upload profile picture (now with token verification)
// router.post("/uploadProfilePic", verifyToken, upload.single("profilePic"), uploadProfilePhoto);

// // Endpoint to get profile picture (optional: can also be protected)
// router.get("/profilePic/:userId", verifyToken, getProfilePhoto);

// module.exports = router;