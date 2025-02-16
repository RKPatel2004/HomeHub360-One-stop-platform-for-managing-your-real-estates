const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { deleteUser } = require("../controllers/deleteUser");

router.delete("/deleteUser", verifyToken, deleteUser);

module.exports = router;
