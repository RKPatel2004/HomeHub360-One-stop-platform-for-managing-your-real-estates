const mongoose = require('mongoose');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

/**
 * Controller to determine which collection a property ID belongs to
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPropertyType = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid property ID format'
      });
    }

    const collections = [
      { model: Apartment, type: 'apartment' },
      { model: Farmhouse, type: 'farmhouse' },
      { model: Land, type: 'land' },
      { model: Office, type: 'office' }
    ];

    let propertyFound = false;
    let propertyData = null;
    let propertyType = null;

    for (const collection of collections) {
      const property = await collection.model.findById(propertyId);
      if (property) {
        propertyFound = true;
        propertyData = property;
        propertyType = collection.type;
        break;
      }
    }

    if (!propertyFound) {
      return res.status(404).json({
        success: false,
        message: 'Property not found in any collection'
      });
    }

    return res.status(200).json({
      success: true,
      collection: {
        propertyId,
        propertyType,
        property: propertyData
      }
    });
  } catch (error) {
    console.error('Error determining property type:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while determining property type',
      error: error.message
    });
  }
};

module.exports = {
  getPropertyType
};