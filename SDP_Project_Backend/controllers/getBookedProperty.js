const Payment = require('../models/paymentModel');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');
const mongoose = require('mongoose');

const getBookedProperties = async (req, res) => {
  try {
    const userId = req.user.id;

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

    const propertyIds = [...new Set(payments.map(payment => 
      payment.propertyId.toString()
    ))];

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

    const objectIdPropertyIds = propertyIds.map(id => new mongoose.Types.ObjectId(id));

    const [apartments, farmhouses, lands, offices] = await Promise.all([
      Apartment.find({ _id: { $in: objectIdPropertyIds } }),
      Farmhouse.find({ _id: { $in: objectIdPropertyIds } }),
      Land.find({ _id: { $in: objectIdPropertyIds } }),
      Office.find({ _id: { $in: objectIdPropertyIds } })
    ]);

    const bookedProperties = [];

    const fixedNow = new Date();
    
    const addPropertiesToResult = async (properties, type, Model) => {
      const now = fixedNow;
      
      for (const property of properties) {
        const propId = property._id.toString();
        
        if (propertyPayments[propId]) {
          if (property.status === 'rented') {
            if (property.rentalTimer === null || property.rentalTimer === undefined) {
              const rentalStartDate = new Date();
              await Model.findByIdAndUpdate(property._id, {
                rentalTimer: 30,
                rentalStartDate: rentalStartDate
              });
              
              property.rentalTimer = 30;
              property.rentalStartDate = rentalStartDate;
            } else {
              const rentalStartDate = new Date(property.rentalStartDate);
              
              const elapsedMs = now - rentalStartDate;
              const elapsedHours = elapsedMs / (1000 * 60 * 60);
              
              const daysPassed = Math.floor(elapsedHours / 24);
              
              const remainingDays = Math.max(0, 30 - daysPassed);
              
              console.log(`Property: ${property._id}`);
              console.log(`Rental Start: ${rentalStartDate.toISOString()}`);
              console.log(`Now: ${now.toISOString()}`);
              console.log(`Elapsed Hours: ${elapsedHours}`);
              console.log(`Days Passed: ${daysPassed}`);
              console.log(`Remaining Days: ${remainingDays}`);
              
              if (remainingDays !== property.rentalTimer) {
                await Model.findByIdAndUpdate(property._id, { 
                  rentalTimer: remainingDays 
                });
                
                property.rentalTimer = remainingDays;
              }
              
              if (remainingDays <= 0) {
                await Model.findByIdAndUpdate(property._id, { 
                  status: 'available',
                  rentalTimer: null,
                  rentalStartDate: null
                });
                
                continue;
              }
            }
          }
          
          bookedProperties.push({
            type: type,
            property: property,
            payments: propertyPayments[propId]
          });
        }
      }
    };

    await addPropertiesToResult(apartments, 'apartment', Apartment);
    await addPropertiesToResult(farmhouses, 'farmhouse', Farmhouse);
    await addPropertiesToResult(lands, 'land', Land);
    await addPropertiesToResult(offices, 'office', Office);

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