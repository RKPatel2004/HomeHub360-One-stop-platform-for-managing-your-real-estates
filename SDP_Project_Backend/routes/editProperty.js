const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/auth");
const { editProperty } = require("../controllers/editProperty");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put(
  "/editProperty/:id/:propertyType",
  verifyToken,
  upload.array("images", 5), 
  editProperty
);

module.exports = router;
