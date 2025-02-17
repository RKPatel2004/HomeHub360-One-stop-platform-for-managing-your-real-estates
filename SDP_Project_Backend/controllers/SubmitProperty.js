const Apartment = require("../models/apartment");
const Farmhouse = require("../models/farmhouse");
const Land = require("../models/land");
const Office = require("../models/office");

exports.submitProperty = async (req, res) => {
  try {
    const {
      propertyType, title, description, address, status,
      bedrooms, bathrooms, balconies, furnishingStatus,
      gardenArea, swimmingPool, zoningType, floor, totalFloors, parkingSpaces,
      isForSale, isForRent, rentPrice, price, area
    } = req.body;

    const ownerId = req.user.id;

    // Store multiple image paths
    const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    let property;

    switch (propertyType) {
      case "apartment":
        property = new Apartment({
          ownerId,
          title,
          description,
          address,
          area: Number(area) || 0,
          images: imagePaths,
          status,
          bedrooms: Number(bedrooms) || 0,
          bathrooms: Number(bathrooms) || 0,
          balconies: Number(balconies) || 0,
          furnishingStatus,
          isForSale: isForSale === "true",
          isForRent: isForRent === "true",
          rentPrice: Number(rentPrice) || 0,
          price: Number(price) || 0,
        });
        break;

      case "farmhouse":
        property = new Farmhouse({
          ownerId,
          title,
          description,
          address,
          area: Number(area) || 0,
          images: imagePaths,
          status,
          bedrooms: Number(bedrooms) || 0,
          bathrooms: Number(bathrooms) || 0,
          gardenArea: Number(gardenArea) || 0,
          swimmingPool: swimmingPool === "true",
          isForSale: isForSale === "true",
          isForRent: isForRent === "true",
          rentPrice: Number(rentPrice) || 0,
          price: Number(price) || 0,
        });
        break;

      case "land":
        property = new Land({
          ownerId,
          title,
          description,
          address,
          area: Number(area) || 0,
          images: imagePaths,
          status,
          zoningType,
          isForSale: isForSale === "true",
          isForRent: isForRent === "true",
          rentPrice: Number(rentPrice) || 0,
          price: Number(price) || 0,
        });
        break;

      case "office":
        property = new Office({
          ownerId,
          title,
          description,
          address,
          area: Number(area) || 0,
          images: imagePaths,
          status,
          floor: Number(floor) || 0,
          totalFloors: Number(totalFloors) || 0,
          furnishingStatus,
          parkingSpaces: Number(parkingSpaces) || 0,
          isForSale: isForSale === "true",
          isForRent: isForRent === "true",
          rentPrice: Number(rentPrice) || 0,
          price: Number(price) || 0,
        });
        break;

      default:
        return res.status(400).json({ message: "Invalid property type" });
    }

    await property.save();
    res.status(201).json({ message: "Property submitted successfully", property });

  } catch (error) {
    res.status(500).json({ message: "Error submitting property", error: error.message });
  }
};
