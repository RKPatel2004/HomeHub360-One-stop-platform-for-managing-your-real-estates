// const Payment = require('../models/paymentModel');
// const Apartment = require('../models/apartment');
// const Farmhouse = require('../models/farmhouse');
// const Land = require('../models/land');
// const Office = require('../models/office');
// const mongoose = require('mongoose');

// const getBookedProperties = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     // Find all completed payments for the logged in user
//     const payments = await Payment.find({
//       userId: userId,
//       paymentStatus: 'COMPLETED'
//     });

//     if (!payments.length) {
//       return res.status(200).json({ 
//         success: true, 
//         message: 'No booked properties found', 
//         properties: [] 
//       });
//     }

//     // Extract unique property IDs from payments
//     const propertyIds = [...new Set(payments.map(payment => 
//       payment.propertyId.toString()
//     ))];

//     // Create a map to store property details with their payment info
//     const propertyPayments = {};
//     payments.forEach(payment => {
//       const propId = payment.propertyId.toString();
//       if (!propertyPayments[propId]) {
//         propertyPayments[propId] = [];
//       }
//       propertyPayments[propId].push({
//         paymentId: payment._id,
//         paymentType: payment.paymentType,
//         amount: payment.amount,
//         currency: payment.currency,
//         paymentMethod: payment.paymentMethod,
//         paymentDate: payment.createdAt
//       });
//     });

//     // Convert ObjectId strings back to ObjectIds for querying
//     const objectIdPropertyIds = propertyIds.map(id => new mongoose.Types.ObjectId(id));

//     // Fetch properties from different collections using their IDs
//     const [apartments, farmhouses, lands, offices] = await Promise.all([
//       Apartment.find({ _id: { $in: objectIdPropertyIds } }),
//       Farmhouse.find({ _id: { $in: objectIdPropertyIds } }),
//       Land.find({ _id: { $in: objectIdPropertyIds } }),
//       Office.find({ _id: { $in: objectIdPropertyIds } })
//     ]);

//     // Combine all properties with their payment info
//     const bookedProperties = [];

//     // Helper function to add properties to result array and handle rental timer
//     const addPropertiesToResult = async (properties, type, Model) => {
//       const today = new Date();
      
//       for (const property of properties) {
//         const propId = property._id.toString();
        
//         // Only process if we have payment info
//         if (propertyPayments[propId]) {
//           // Check if the property has 'rented' status
//           if (property.status === 'rented') {
//             // Initialize rentalTimer if it doesn't exist or is null
//             if (property.rentalTimer === null || property.rentalTimer === undefined) {
//               // Set initial timer to 30 days from today
//               const rentalStartDate = new Date();
//               await Model.findByIdAndUpdate(property._id, {
//                 rentalTimer: 30,
//                 rentalStartDate: rentalStartDate
//               });
              
//               property.rentalTimer = 30;
//               property.rentalStartDate = rentalStartDate;
//             } else {
//               // Calculate days passed since rental start
//               const rentalStartDate = property.rentalStartDate || new Date();
//               const daysPassed = Math.floor((today - rentalStartDate) / (1000 * 60 * 60 * 24));
//               const remainingDays = Math.max(0, 30 - daysPassed);
              
//               // Update timer in database
//               await Model.findByIdAndUpdate(property._id, { 
//                 rentalTimer: remainingDays 
//               });
              
//               // If timer expired, update status to 'available'
//               if (remainingDays <= 0) {
//                 await Model.findByIdAndUpdate(property._id, { 
//                   status: 'available',
//                   rentalTimer: null,
//                   rentalStartDate: null
//                 });
                
//                 // Skip adding this property as it's no longer rented
//                 continue;
//               }
              
//               property.rentalTimer = remainingDays;
//             }
//           }
          
//           bookedProperties.push({
//             type: type,
//             property: property,
//             payments: propertyPayments[propId]
//           });
//         }
//       }
//     };

//     // Add properties from each collection with their respective models
//     await addPropertiesToResult(apartments, 'apartment', Apartment);
//     await addPropertiesToResult(farmhouses, 'farmhouse', Farmhouse);
//     await addPropertiesToResult(lands, 'land', Land);
//     await addPropertiesToResult(offices, 'office', Office);

//     return res.status(200).json({
//       success: true,
//       count: bookedProperties.length,
//       properties: bookedProperties
//     });

//   } catch (error) {
//     console.error('Error fetching booked properties:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Error fetching booked properties',
//       error: error.message
//     });
//   }
// };

// module.exports = { getBookedProperties };










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

    // Fixed date for testing (March 14, 2025)
    const fixedNow = new Date('2025-03-14T16:19:12.740+00:00');
    
    // Helper function to add properties to result array and handle rental timer
    const addPropertiesToResult = async (properties, type, Model) => {
      // Use current time (or fixed time for testing)
      const now = fixedNow;
      
      for (const property of properties) {
        const propId = property._id.toString();
        
        // Only process if we have payment info
        if (propertyPayments[propId]) {
          // Check if the property has 'rented' status
          if (property.status === 'rented') {
            // Initialize rentalTimer if it doesn't exist or is null
            if (property.rentalTimer === null || property.rentalTimer === undefined) {
              // Set initial timer to 30 days
              const rentalStartDate = new Date();
              await Model.findByIdAndUpdate(property._id, {
                rentalTimer: 30,
                rentalStartDate: rentalStartDate
              });
              
              property.rentalTimer = 30;
              property.rentalStartDate = rentalStartDate;
            } else {
              // Get the rental start date as stored in the database
              const rentalStartDate = new Date(property.rentalStartDate);
              
              // Calculate hours elapsed since rental start
              const elapsedMs = now - rentalStartDate;
              const elapsedHours = elapsedMs / (1000 * 60 * 60);
              
              // Calculate days elapsed (precise to the hour)
              // Only decrement after at least 24 hours have passed
              const daysPassed = Math.floor(elapsedHours / 24);
              
              // Calculate remaining days
              const remainingDays = Math.max(0, 30 - daysPassed);
              
              // Debug log
              console.log(`Property: ${property._id}`);
              console.log(`Rental Start: ${rentalStartDate.toISOString()}`);
              console.log(`Now: ${now.toISOString()}`);
              console.log(`Elapsed Hours: ${elapsedHours}`);
              console.log(`Days Passed: ${daysPassed}`);
              console.log(`Remaining Days: ${remainingDays}`);
              
              // Only update if the calculated timer is different from the current one
              if (remainingDays !== property.rentalTimer) {
                // Update timer in database
                await Model.findByIdAndUpdate(property._id, { 
                  rentalTimer: remainingDays 
                });
                
                property.rentalTimer = remainingDays;
              }
              
              // If timer expired, update status to 'available'
              if (remainingDays <= 0) {
                await Model.findByIdAndUpdate(property._id, { 
                  status: 'available',
                  rentalTimer: null,
                  rentalStartDate: null
                });
                
                // Skip adding this property as it's no longer rented
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

    // Add properties from each collection with their respective models
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