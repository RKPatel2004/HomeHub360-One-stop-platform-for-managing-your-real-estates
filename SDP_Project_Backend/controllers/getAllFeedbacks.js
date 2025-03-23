const Feedback = require('../models/feedback');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email'); 
    
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ success: false, message: 'No feedbacks found' });
    }

    const processedFeedbacks = await Promise.all(feedbacks.map(async (feedback) => {
      const feedbackObj = feedback.toObject();
      const propertyId = feedback.propertyId;
      
      let property = await Apartment.findById(propertyId);
      if (!property) property = await Farmhouse.findById(propertyId);
      if (!property) property = await Land.findById(propertyId);
      if (!property) property = await Office.findById(propertyId);
      
      if (property) {
        feedbackObj.property = {
          _id: property._id,
          title: property.title,
          address: property.address,
          type: getPropertyType(property)
        };
      }
      
      return feedbackObj;
    }));

    return res.status(200).json({
      success: true,
      count: processedFeedbacks.length,
      data: processedFeedbacks
    });
  } catch (error) {
    console.error('Error retrieving feedbacks:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

function getPropertyType(property) {
  if (property.constructor.modelName === 'Apartment') return 'apartment';
  if (property.constructor.modelName === 'Farmhouse') return 'farmhouse';
  if (property.constructor.modelName === 'Land') return 'land';
  if (property.constructor.modelName === 'Office') return 'office';
  return 'unknown';
}

module.exports = { getAllFeedbacks };