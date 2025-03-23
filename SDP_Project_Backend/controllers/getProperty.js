const Apartment = require("../models/apartment");
const Farmhouse = require("../models/farmhouse");
const Land = require("../models/land");
const Office = require("../models/office");

exports.getProperties = async (req, res) => {
  try {
    const apartments = await Apartment.find({});
    const farmhouses = await Farmhouse.find({});
    const lands = await Land.find({});
    const offices = await Office.find({});

    const allProperties = [
      ...apartments.map((property) => ({ type: "apartment", ...property._doc })),
      ...farmhouses.map((property) => ({ type: "farmhouse", ...property._doc })),
      ...lands.map((property) => ({ type: "land", ...property._doc })),
      ...offices.map((property) => ({ type: "office", ...property._doc })),
    ];

    res.status(200).json({ success: true, properties: allProperties });
  } catch (error) {
    console.error("Error fetching properties:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
