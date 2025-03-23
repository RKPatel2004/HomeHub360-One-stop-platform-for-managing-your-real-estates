const Office = require('../models/office');

const filterOfficeProperties = async (req, res) => {
  try {
    const {
      propertyType,
      area,
      floor,
      parkingSpaces,
      isForSale,
      isForRent,
      rentPrice,
      price,
      address,  
    } = req.body;

    if (propertyType !== 'office') {
      return res.status(400).json({ message: "Invalid property type. Must be 'office'." });
    }

    let filter = {};

    if (area) filter.area = { $gte: Number(area) };
    if (floor) filter.floor = Number(floor);
    if (parkingSpaces) filter.parkingSpaces = { $gte: Number(parkingSpaces) };
    if (isForSale !== undefined) filter.isForSale = isForSale === 'true';
    if (isForRent !== undefined) filter.isForRent = isForRent === 'true';
    if (rentPrice) filter.rentPrice = { $lte: Number(rentPrice) };
    if (price) filter.price = { $lte: Number(price) };
    
    if (address) {
      filter.address = { $regex: new RegExp(address, "i") }; 
    }

    const offices = await Office.find(filter);

    if (offices.length === 0) {
      return res.status(404).json({ message: "No matching office properties found." });
    }

    res.status(200).json(offices);
  } catch (error) {
    console.error("Error filtering offices:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { filterOfficeProperties };