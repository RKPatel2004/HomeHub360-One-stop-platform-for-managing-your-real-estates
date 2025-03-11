const Apartment = require('../models/apartment');

const filterApartments = async (req, res) => {
  try {
    const { propertyType, bedrooms, furnishingStatus, isForSale, isForRent, rentPrice, price, address } = req.body;

    if (!propertyType || propertyType.toLowerCase() !== 'apartment') {
      return res.status(400).json({ message: 'Invalid or missing propertyType. Must be "apartment".' });
    }

    let filterCriteria = {};

    if (bedrooms) {
      filterCriteria.bedrooms = parseInt(bedrooms);
    }

    if (furnishingStatus) {
      filterCriteria.furnishingStatus = furnishingStatus;
    }

    if (isForSale === 'true') {
      filterCriteria.isForSale = true;
      if (price) {
        filterCriteria.price = { $lte: parseInt(price) };
      }
    }

    if (isForRent === 'true') {
      filterCriteria.isForRent = true;
      if (rentPrice) {
        filterCriteria.rentPrice = { $lte: parseInt(rentPrice) };
      }
    }

    if (address) {
      filterCriteria.address = { $regex: new RegExp(address, 'i') }; // Case-insensitive match
    }

    // Find apartments matching the criteria
    const apartments = await Apartment.find(filterCriteria);

    if (apartments.length === 0) {
      return res.status(404).json({ message: 'No apartments match the criteria.' });
    }

    res.status(200).json(apartments);
  } catch (error) {
    console.error('Error filtering apartments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { filterApartments };