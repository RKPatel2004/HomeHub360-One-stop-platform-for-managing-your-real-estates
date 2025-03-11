const Payment = require('../models/paymentModel');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');
const mongoose = require('mongoose');

const getBookedProperties = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all completed payments for the logged in user
    const payments = await Payment.find({
      userId: userId,
      paymentStatus: 'COMPLETED'
    });

    if (!payments.length) {
      return res.status(200).json({ 
        success: true, 
        message: 'No booked properties found', 
        properties: [] 
      });
    }

    // Extract unique property IDs from payments
    const propertyIds = [...new Set(payments.map(payment => 
      payment.propertyId.toString()
    ))];

    // Create a map to store property details with their payment info
    const propertyPayments = {};
    payments.forEach(payment => {
      const propId = payment.propertyId.toString();
      if (!propertyPayments[propId]) {
        propertyPayments[propId] = [];
      }
      propertyPayments[propId].push({
        paymentId: payment._id,
        paymentType: payment.paymentType,
        amount: payment.amount,
        currency: payment.currency,
        paymentMethod: payment.paymentMethod,
        paymentDate: payment.createdAt
      });
    });

    // Convert ObjectId strings back to ObjectIds for querying
    const objectIdPropertyIds = propertyIds.map(id => new mongoose.Types.ObjectId(id));

    // Fetch properties from different collections using their IDs
    const [apartments, farmhouses, lands, offices] = await Promise.all([
      Apartment.find({ _id: { $in: objectIdPropertyIds } }),
      Farmhouse.find({ _id: { $in: objectIdPropertyIds } }),
      Land.find({ _id: { $in: objectIdPropertyIds } }),
      Office.find({ _id: { $in: objectIdPropertyIds } })
    ]);

    // Combine all properties with their payment info
    const bookedProperties = [];

    // Helper function to add properties to result array
    const addPropertiesToResult = (properties, type) => {
      properties.forEach(property => {
        const propId = property._id.toString();
        if (propertyPayments[propId]) {
          bookedProperties.push({
            type: type,
            property: property,
            payments: propertyPayments[propId]
          });
        }
      });
    };

    // Add properties from each collection
    addPropertiesToResult(apartments, 'apartment');
    addPropertiesToResult(farmhouses, 'farmhouse');
    addPropertiesToResult(lands, 'land');
    addPropertiesToResult(offices, 'office');

    return res.status(200).json({
      success: true,
      count: bookedProperties.length,
      properties: bookedProperties
    });

  } catch (error) {
    console.error('Error fetching booked properties:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching booked properties',
      error: error.message
    });
  }
};

module.exports = { getBookedProperties };