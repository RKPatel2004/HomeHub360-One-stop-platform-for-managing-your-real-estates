const Apartment = require("../models/apartment");
const Farmhouse = require("../models/farmhouse");
const Land = require("../models/land");
const Office = require("../models/office");

exports.getPropertiesByOwner = async (req, res) => {
  try {
    const ownerId = req.user.id; // Extract ownerId from authenticated user

    if (!ownerId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Fetch properties of the logged-in owner
    const apartments = await Apartment.find({ ownerId });
    const farmhouses = await Farmhouse.find({ ownerId });
    const lands = await Land.find({ ownerId });
    const offices = await Office.find({ ownerId });

    // Combine all properties
    const ownerProperties = [
      ...apartments.map((property) => ({ type: "apartment", ...property._doc })),
      ...farmhouses.map((property) => ({ type: "farmhouse", ...property._doc })),
      ...lands.map((property) => ({ type: "land", ...property._doc })),
      ...offices.map((property) => ({ type: "office", ...property._doc })),
    ];

    res.status(200).json({ success: true, properties: ownerProperties });
  } catch (error) {
    console.error("Error fetching owner properties:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
