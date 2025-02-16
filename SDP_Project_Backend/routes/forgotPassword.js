const express = require("express");
const cors = require("cors");
const { forgot_password } = require("../controllers/forgotPassword");

const router = express.Router();

router.use(cors());

router.post("/forgot-password", forgot_password);

module.exports = router;
