const Payment = require('../models/paymentModel');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

// Get remaining days for a specific property
exports.getRemainingDays = async (req, res) => {
  try {
    const { propertyId } = req.params;
    
    if (!propertyId) {
      return res.status(400).json({ success: false, message: 'Property ID is required' });
    }

    // Find the latest successful rent payment for this property
    const payment = await Payment.findOne({
      propertyId,
      paymentType: 'RENT',
      paymentStatus: 'COMPLETED'
    }).sort({ createdAt: -1 });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'No rental payment found for this property' });
    }

    // Calculate the remaining days
    const paymentDate = new Date(payment.createdAt);
    const currentDate = new Date();
    
    // Rental period is 30 days from payment
    const rentalEndDate = new Date(paymentDate);
    rentalEndDate.setDate(rentalEndDate.getDate() + 30);
    
    // Calculate remaining days
    const remainingDays = Math.max(0, Math.ceil((rentalEndDate - currentDate) / (1000 * 60 * 60 * 24)));
    
    // Check if the property exists in any collection and get its status
    let property;
    let collectionName;
    
    property = await Apartment.findById(propertyId);
    if (property) collectionName = 'Apartment';
    
    if (!property) {
      property = await Farmhouse.findById(propertyId);
      if (property) collectionName = 'Farmhouse';
    }
    
    if (!property) {
      property = await Land.findById(propertyId);
      if (property) collectionName = 'Land';
    }
    
    if (!property) {
      property = await Office.findById(propertyId);
      if (property) collectionName = 'Office';
    }
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found in any collection' });
    }

    return res.status(200).json({
      success: true,
      data: {
        propertyId,
        propertyType: collectionName,
        status: property.status,
        remainingDays,
        rentalStartDate: paymentDate,
        rentalEndDate
      }
    });

  } catch (error) {
    console.error('Error in getRemainingDays:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Check and update all expired rentals
exports.checkExpiredRentals = async (req, res) => {
  try {
    const currentDate = new Date();
    const collections = [
      { model: Apartment, name: 'Apartment' },
      { model: Farmhouse, name: 'Farmhouse' },
      { model: Land, name: 'Land' },
      { model: Office, name: 'Office' }
    ];
    
    const expiredProperties = [];
    
    // Process each collection
    for (const collection of collections) {
      // Find properties that are rented
      const rentedProperties = await collection.model.find({ status: 'rented' });
      
      for (const property of rentedProperties) {
        // Find the latest rent payment for this property
        const latestPayment = await Payment.findOne({
          propertyId: property._id,
          paymentType: 'RENT',
          paymentStatus: 'COMPLETED'
        }).sort({ createdAt: -1 });
        
        // If no payment found or payment is older than 30 days, update the property
        if (!latestPayment) continue;
        
        const paymentDate = new Date(latestPayment.createdAt);
        const rentalEndDate = new Date(paymentDate);
        rentalEndDate.setDate(rentalEndDate.getDate() + 30);
        
        // Check if the rental period has expired
        if (currentDate > rentalEndDate) {
          // Update property status
          property.isForRent = true;
          property.status = 'available';
          await property.save();
          
          // Delete the payment
          await Payment.deleteOne({ _id: latestPayment._id });
          
          expiredProperties.push({
            propertyId: property._id,
            type: collection.name,
            title: property.title,
            paymentId: latestPayment._id
          });
        }
      }
    }
    
    return res.status(200).json({
      success: true,
      message: `${expiredProperties.length} expired rentals found and updated`,
      expiredProperties
    });

  } catch (error) {
    console.error('Error checking expired rentals:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};