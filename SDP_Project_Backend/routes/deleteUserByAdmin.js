// // routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const { getAllUsers } = require("../controllers/getAllUsers");
// const { deleteUserByAdmin } = require("../controllers/deleteUserByAdmin");
// // const { verifyToken } = require("../middleware/auth");

// // Get all users route - accessible only by admin
// // router.get("/", protect, getAllUsers);

// // Delete user route - accessible only by admin
// router.delete("/:userId", deleteUserByAdmin);

// module.exports = router;



// routes/userRoutes.js
const express = require("express");
const router = express.Router();
// const { getAllUsers } = require("../controllers/getAllUsers");
const { deleteUserByAdmin } = require("../controllers/deleteUserByAdmin");
const verifyToken = require("../middleware/auth");

// Get all users route - accessible only by admin
// router.get("/", verifyToken, getAllUsers);


module.exports = router;