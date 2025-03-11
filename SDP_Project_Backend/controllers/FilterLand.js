const Land = require('../models/land');

exports.filterLand = async (req, res) => {
  try {
    const {
      propertyType, 
      area, 
      zoningType, 
      isForSale, 
      isForRent, 
      rentPrice, 
      price,
      address // New field added for filtering
    } = req.body;

    if (propertyType !== 'land') {
      return res.status(400).json({ message: 'Invalid property type' });
    }

    let query = {};

    // Filter by area if provided
    if (area) {
      query.area = { $gte: Number(area) }; // Only lands greater than or equal to requested area
    }

    // Filter by zoningType if provided
    if (zoningType) {
      query.zoningType = zoningType;
    }

    // Filter by sale status
    if (isForSale === 'true') {
      query.isForSale = true;
      if (price) {
        query.price = { $lte: Number(price) }; // Price should be less than or equal to given value
      }
    }

    // Filter by rent status
    if (isForRent === 'true') {
      query.isForRent = true;
      if (rentPrice) {
        query.rentPrice = { $lte: Number(rentPrice) }; // Rent price should be less than or equal to given value
      }
    }

    // **Filter by address if provided**
    if (address) {
      query.address = { $regex: new RegExp(address, "i") }; // Case-insensitive search
    }

    // Fetch filtered properties
    const lands = await Land.find(query);

    if (lands.length === 0) {
      return res.status(404).json({ message: 'No matching properties found' });
    }

    res.status(200).json(lands);
  } catch (error) {
    console.error('Error filtering lands:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};