const bcrypt = require("bcrypt");
const User = require("../models/users");

const updateUserProfile = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let updated = false;
    if (username && username !== user.username) {
      user.username = username.trim();
      updated = true;
    }
    if (email && email !== user.email) {
      user.email = email.trim();
      updated = true;
    }
    if (phone && phone !== user.phone) {
      user.phone = phone.trim();
      updated = true;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password.trim(), salt);
      updated = true;
    }
    
    if (req.file) {
      user.profilePic = req.file.path;
      updated = true;
    }

    if (updated) {
      await user.save();
      res.status(200).json({
        message: "Profile updated successfully",
        updatedUser: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePic: user.profilePic,
        },
      });
    } else {
      res.status(200).json({
        message: "No changes to update",
        updatedUser: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePic: user.profilePic,
        },
      });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateUserProfile };