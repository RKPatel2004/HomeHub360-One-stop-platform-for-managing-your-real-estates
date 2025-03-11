// // routes/getAllUsers.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/users');
// const verifyToken = require('../middleware/auth');
// const authorizeRoles = require('../middleware/userRoles'); // Using the new file

// // Get all users route
// router.get(
//   '/',
//   verifyToken,
//   authorizeRoles('admin', 'owner'),
//   async (req, res) => {
//     try {
//       // Add query parameters for filtering
//       const query = {};
//       const { role, username, email } = req.query;
      
//       // Apply filters if provided
//       if (role) query.role = role;
//       if (username) query.username = { $regex: username, $options: 'i' };
//       if (email) query.email = { $regex: email, $options: 'i' };
      
//       // Pagination parameters
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 10;
//       const skip = (page - 1) * limit;
      
//       // Find users with filters, pagination, and sorting
//       const users = await User.find(query)
//         .select('-password') // Exclude password from the response
//         .skip(skip)
//         .limit(limit)
//         .sort({ createdAt: -1 });
      
//       // Get total count for pagination info
//       const totalUsers = await User.countDocuments(query);
      
//       res.status(200).json({
//         success: true,
//         count: users.length,
//         total: totalUsers,
//         totalPages: Math.ceil(totalUsers / limit),
//         currentPage: page,
//         users
//       });
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Error fetching users',
//         error: error.message
//       });
//     }
//   }
// );

// module.exports = router;






const User = require("../models/users");

// Get all users - only accessible by admin
const getAllUsers = async (req, res) => {
  try {
    // Check if the requesting user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    // Fetch all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude passwords from the results
    
    res.status(200).json({ 
      success: true, 
      count: users.length, 
      users 
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch users", 
      error: error.message 
    });
  }
};

module.exports = {
  getAllUsers
};