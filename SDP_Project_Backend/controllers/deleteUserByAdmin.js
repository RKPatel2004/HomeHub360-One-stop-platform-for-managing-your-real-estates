const User = require("../models/users");

const deleteUserByAdmin = async (req, res) => {
  console.log('here2')
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ 
        success: false,
        message: "Access denied. Admin privileges required." 
      });
    }

    const { userId } = req.params;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    if (userId === req.user.id.toString()) {
      return res.status(400).json({ 
        success: false,
        message: "Admin cannot delete their own account through this endpoint" 
      });
    }

    await User.findByIdAndDelete(userId);
    
    res.status(200).json({ 
      success: true, 
      message: "User deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete user", 
      error: error.message 
    });
  }
};

module.exports = {
  deleteUserByAdmin
};