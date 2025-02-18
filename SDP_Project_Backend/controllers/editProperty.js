const Apartment = require("../models/apartment");
const Farmhouse = require("../models/farmhouse");
const Land = require("../models/land");
const Office = require("../models/office");

const editProperty = async (req, res) => {
  try {
    const { id, propertyType } = req.params;
    const ownerId = req.user.id; 
    const updates = req.body;

    if (!propertyType) {
      return res.status(400).json({ message: "Property type is required" });
    }

    const type = propertyType.toLowerCase();

    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => file.path);
    }

    let Model;
    switch (type) {
      case "apartment":
        Model = Apartment;
        break;
      case "farmhouse":
        Model = Farmhouse;
        break;
      case "land":
        Model = Land;
        break;
      case "office":
        Model = Office;
        break;
      default:
        return res.status(400).json({ message: "Invalid property type" });
    }

    const property = await Model.findOne({ _id: id, ownerId });

    if (!property) {
      return res.status(404).json({ message: "Property not found or unauthorized" });
    }

    Object.assign(property, updates);
    property.updatedAt = new Date();

    await property.save();

    res.json({ message: "Property updated successfully", property });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { editProperty };
