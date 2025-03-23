const bcrypt = require("bcrypt");
const User = require("../models/users");

async function forgot_password(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    console.log(email, newPassword, confirmPassword);
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
}

module.exports = { forgot_password };