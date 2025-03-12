const Payment = require("../models/paymentModel");
// const User = require('../models/userModel');

const getAllPayments = async (req, res) => {
    console.log("here");
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied! Only admins can view payments." });
    }

    // Fetch all payments from the database
    const payments = await Payment.find()
      .populate("userId", "username email")
      .populate("propertyId")
      .populate("ownerId", "username email");
    console.log(payments);
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

module.exports = { getAllPayments };
