const Apartment = require("../models/apartment");
const Farmhouse = require("../models/farmhouse");
const Land = require("../models/land");
const Office = require("../models/office");

const editProperty = async (req, res) => {
  try {
    const { id, propertyType } = req.params;
    const ownerId = req.user.id; // Extract user ID from JWT token
    const updates = req.body;

    // ✅ Fix: Ensure "propertyType" exists before calling .toLowerCase()
    if (!propertyType) {
      return res.status(400).json({ message: "Property type is required" });
    }

    // ✅ Fix: Convert propertyType to lowercase for consistency
    const type = propertyType.toLowerCase();

    // Check if images are uploaded
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => file.path);
    }

    // ✅ Correct model selection
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

    // ✅ Find property by ID and ownerId
    const property = await Model.findOne({ _id: id, ownerId });

    if (!property) {
      return res.status(404).json({ message: "Property not found or unauthorized" });
    }

    // ✅ Update property fields dynamically
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
