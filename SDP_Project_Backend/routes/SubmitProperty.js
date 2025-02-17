// const express = require('express');
// const verifyToken = require('../middleware/auth'); // Middleware for authentication
// const { submitProperty } = require('../controllers/SubmitProperty');

// const router = express.Router();

// router.post('/submitProperty', verifyToken, submitProperty);

// module.exports = router;






// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const verifyToken = require("../middleware/auth");
// const { submitProperty } = require("../controllers/SubmitProperty");

// const router = express.Router();

// // Set up storage for uploaded images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save images in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//   }
// });

// const upload = multer({ storage: storage });

// // Route to submit property
// router.post("/submitProperty", verifyToken, upload.single("image"), submitProperty);

// module.exports = router;










const express = require("express");
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middleware/auth");
const { submitProperty } = require("../controllers/SubmitProperty");

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Route to submit property (accepts multiple images)
router.post("/submitProperty", verifyToken, upload.array("images", 5), submitProperty);

module.exports = router;
