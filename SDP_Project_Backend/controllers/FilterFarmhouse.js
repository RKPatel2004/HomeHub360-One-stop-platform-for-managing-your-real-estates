const Farmhouse = require('../models/farmhouse');

const filterFarmhouses = async (req, res) => {
  try {
    const {
      propertyType,
      gardenArea,
      swimmingPool,
      furnishingStatus,
      isForSale,
      isForRent,
      rentPrice,
      price,
      address
    } = req.body;

    // Ensure the propertyType is "farmhouse"
    if (!propertyType || propertyType.toLowerCase() !== 'farmhouse') {
      return res.status(400).json({ message: 'Invalid or missing propertyType. Must be "farmhouse".' });
    }

    let filterCriteria = {};

    // Garden Area should be greater than or equal to the provided value
    if (gardenArea) {
      filterCriteria.gardenArea = { $gte: parseInt(gardenArea) };
    }

    // Swimming Pool filter (convert "true"/"false" from form-data to boolean)
    if (swimmingPool === 'true') {
      filterCriteria.swimmingPool = true;
    } else if (swimmingPool === 'false') {
      filterCriteria.swimmingPool = false;
    }

    // Furnishing status filter
    if (furnishingStatus) {
      filterCriteria.furnishingStatus = furnishingStatus;
    }

    // Sale filters
    if (isForSale === 'true') {
      filterCriteria.isForSale = true;
      if (price) {
        filterCriteria.price = { $lte: parseInt(price) };
      }
    }

    // Rent filters
    if (isForRent === 'true') {
      filterCriteria.isForRent = true;
      if (rentPrice) {
        filterCriteria.rentPrice = { $lte: parseInt(rentPrice) };
      }
    }

    if (address) {
      filterCriteria.address = { $regex: new RegExp(address, 'i') }; // Case-insensitive match
    }

    // Find farmhouses matching the criteria
    const farmhouses = await Farmhouse.find(filterCriteria);

    if (farmhouses.length === 0) {
      return res.status(404).json({ message: 'No farmhouses match the criteria.' });
    }

    res.status(200).json(farmhouses);
  } catch (error) {
    console.error('Error filtering farmhouses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { filterFarmhouses };