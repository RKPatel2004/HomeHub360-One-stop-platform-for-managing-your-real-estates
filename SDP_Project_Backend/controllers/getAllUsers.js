const User = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }

    const users = await User.find({}, { password: 0 }); 
    
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