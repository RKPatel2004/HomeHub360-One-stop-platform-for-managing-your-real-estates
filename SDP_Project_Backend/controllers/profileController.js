const User = require("../models/users");

// Controller function to fetch user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from decoded token

    // Fetch user details from the database
    const user = await User.findById(userId).select("username email phone profilePic");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserProfile };
