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
      address 
    } = req.body;

    if (propertyType !== 'land') {
      return res.status(400).json({ message: 'Invalid property type' });
    }

    let query = {};

    if (area) {
      query.area = { $gte: Number(area) }; 
    }

    if (zoningType) {
      query.zoningType = zoningType;
    }

    if (isForSale === 'true') {
      query.isForSale = true;
      if (price) {
        query.price = { $lte: Number(price) }; 
      }
    }

    if (isForRent === 'true') {
      query.isForRent = true;
      if (rentPrice) {
        query.rentPrice = { $lte: Number(rentPrice) }; 
      }
    }

    if (address) {
      query.address = { $regex: new RegExp(address, "i") }; 
    }

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