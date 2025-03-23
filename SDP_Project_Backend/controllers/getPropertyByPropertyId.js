const mongoose = require('mongoose');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

/**
 * Get a property by ID from any of the property collections
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getPropertyByPropertyId = async (req, res) => {
  const { propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ success: false, message: 'Invalid property ID format' });
  }

  try {
    const collections = [
      { model: Apartment, name: 'apartment' },
      { model: Farmhouse, name: 'farmhouse' },
      { model: Land, name: 'land' },
      { model: Office, name: 'office' }
    ];

    let property = null;
    let propertyType = null;

    // Search through each collection
    for (const collection of collections) {
      const result = await collection.model.findById(propertyId);
      if (result) {
        property = result;
        propertyType = collection.name;
        break;
      }
    }

    // If property not found in any collection
    if (!property) {
      return res.status(404).json({ 
        success: false, 
        message: 'Property not found in any collection' 
      });
    }

    // Return the property with its type
    return res.status(200).json({
      success: true,
      propertyType,
      property
    });
    
  } catch (error) {
    console.error('Error fetching property:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching property',
      error: error.message 
    });
  }
};
