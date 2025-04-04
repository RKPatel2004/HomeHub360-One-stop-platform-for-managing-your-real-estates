const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

// Mapping of model types to their respective models
const modelMap = {
  apartment: Apartment,
  farmhouse: Farmhouse,
  land: Land,
  office: Office
};

exports.incrementViewCount = async (req, res) => {
  const { modelType, propertyId } = req.params;
  const userId = req.user.id; // Assuming you have authentication middleware

  // Validate model type
  if (!modelMap[modelType]) {
    return res.status(400).json({ message: 'Invalid property type' });
  }

  try {
    const Model = modelMap[modelType];
    
    // Find the property
    const property = await Model.findById(propertyId);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user has already viewed the property
    const hasUserViewed = property.views.uniqueUsers.includes(userId);

    if (!hasUserViewed) {
      // Increment view count and add user to unique viewers
      property.views.count += 1;
      property.views.uniqueUsers.push(userId);
      
      // Save the updated property
      await property.save();
    }

    res.status(200).json({ 
      message: 'View count updated', 
      viewCount: property.views.count 
    });
  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getViewCount = async (req, res) => {
  const { modelType, propertyId } = req.params;

  // Validate model type
  if (!modelMap[modelType]) {
    return res.status(400).json({ message: 'Invalid property type' });
  }

  try {
    const Model = modelMap[modelType];
    
    // Find the property and return view count
    const property = await Model.findById(propertyId);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ 
      viewCount: property.views.count,
      uniqueViewers: property.views.uniqueUsers.length
    });
  } catch (error) {
    console.error('Error fetching view count:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};