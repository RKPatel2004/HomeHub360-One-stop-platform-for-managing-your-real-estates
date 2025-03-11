const User = require("../models/users");
const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profilePics"); // Directory for storing uploaded profile pictures
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
    }
  },
});

// Controller to handle profile photo upload
const uploadProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Update user's profilePic field in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: filePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile picture uploaded successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to serve the profile photo
const getProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user || !user.profilePic) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.sendFile(path.resolve(user.profilePic));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to update user profile information
const updateUserProfile = async (req, res) => {
  try {
    const { userId, username, password, email, phone } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username, email, and phone directly
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    // If password is provided, hash it and update the field
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate salt for hashing
      user.password = await bcrypt.hash(password, salt); // Hash the new password
    }

    // Save updated user details
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUser: {
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { upload, uploadProfilePhoto, getProfilePhoto/*, updateUserProfile*/ };
