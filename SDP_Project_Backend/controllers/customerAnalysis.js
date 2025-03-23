// // controllers/customerAnalysis.js
// const Payment = require('../models/paymentModel');
// const Apartment = require('../models/apartment');
// const Farmhouse = require('../models/farmhouse');
// const Land = require('../models/land');
// const Office = require('../models/office');
// const mongoose = require('mongoose');

// // Get customer analytics data
// exports.getCustomerAnalytics = async (req, res) => {
//   try {
//     const userId = req.user.id; // Get user ID from the authentication token

//     // Find all successful payments by this user
//     const payments = await Payment.find({
//       userId: userId,
//       paymentStatus: 'COMPLETED'
//     });

//     // Get rented properties (properties with RENT payment type)
//     const rentedPayments = payments.filter(payment => payment.paymentType === 'RENT');
//     const rentedPropertyIds = [...new Set(rentedPayments.map(payment => payment.propertyId.toString()))];
    
//     // Get purchased properties (properties with BOOKING payment type for purchase)
//     const purchasePayments = payments.filter(payment => payment.paymentType === 'BOOKING');
//     const purchasedPropertyIds = [...new Set(purchasePayments.map(payment => payment.propertyId.toString()))];
    
//     // Calculate total expenses (sum of all successful payment amounts)
//     const totalExpenses = payments.reduce((sum, payment) => sum + payment.amount, 0);

//     // Prepare response object
//     const analyticsData = {
//       totalRentedProperties: rentedPropertyIds.length,
//       totalPurchasedProperties: purchasedPropertyIds.length,
//       totalExpenses: totalExpenses,
//       currency: payments.length > 0 ? payments[0].currency : 'USD'
//     };

//     res.status(200).json({
//       success: true,
//       data: analyticsData
//     });
//   } catch (error) {
//     console.error('Error in getCustomerAnalytics:', error);
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while fetching customer analytics',
//       error: error.message
//     });
//   }
// };

// // Get monthly activity data for graphs
// exports.getMonthlyActivity = async (req, res) => {
//   try {
//     const userId = req.user.id; // Get user ID from the authentication token
//     const currentYear = new Date().getFullYear();
    
//     // Prepare monthly data structure
//     const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
    
//     // Initialize monthly payments count and amount
//     const monthlyActivity = months.map((month, index) => ({
//       month,
//       transactionCount: 0,
//       totalAmount: 0
//     }));

//     // Find all successful payments by this user
//     const payments = await Payment.find({
//       userId: userId,
//       paymentStatus: 'COMPLETED',
//       createdAt: {
//         $gte: new Date(`${currentYear}-01-01`),
//         $lte: new Date(`${currentYear}-12-31`)
//       }
//     });

//     // Populate monthly activity data
//     payments.forEach(payment => {
//       const month = new Date(payment.createdAt).getMonth();
//       monthlyActivity[month].transactionCount += 1;
//       monthlyActivity[month].totalAmount += payment.amount;
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         year: currentYear,
//         monthlyActivity
//       }
//     });
//   } catch (error) {
//     console.error('Error in getMonthlyActivity:', error);
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while fetching monthly activity data',
//       error: error.message
//     });
//   }
// };

// // Get detailed property transactions
// exports.getPropertyTransactions = async (req, res) => {
//   try {
//     const userId = req.user.id; // Get user ID from the authentication token

//     // Find all successful payments by this user
//     const payments = await Payment.find({
//       userId: userId,
//       paymentStatus: 'COMPLETED'
//     }).sort({ createdAt: -1 }); // Sort by most recent first

//     // Get all property IDs
//     const propertyIds = [...new Set(payments.map(payment => payment.propertyId))];
    
//     // Prepare a container for property details
//     const propertyTransactions = [];
    
//     // Helper function to fetch property details
//     const getPropertyDetails = async (propertyId) => {
//       // Search in each property collection
//       const apartment = await Apartment.findById(propertyId);
//       if (apartment) return { ...apartment.toObject(), type: 'Apartment' };
      
//       const farmhouse = await Farmhouse.findById(propertyId);
//       if (farmhouse) return { ...farmhouse.toObject(), type: 'Farmhouse' };
      
//       const land = await Land.findById(propertyId);
//       if (land) return { ...land.toObject(), type: 'Land' };
      
//       const office = await Office.findById(propertyId);
//       if (office) return { ...office.toObject(), type: 'Office' };
      
//       return null;
//     };

//     // For each property, fetch details and related transactions
//     for (const propertyId of propertyIds) {
//       const propertyDetails = await getPropertyDetails(propertyId);
      
//       if (propertyDetails) {
//         const propertyPayments = payments.filter(payment => 
//           payment.propertyId.toString() === propertyId.toString()
//         );
        
//         const totalSpent = propertyPayments.reduce((sum, payment) => sum + payment.amount, 0);
        
//         propertyTransactions.push({
//           property: {
//             id: propertyId,
//             title: propertyDetails.title,
//             address: propertyDetails.address,
//             type: propertyDetails.type,
//             status: propertyDetails.status
//           },
//           transactions: propertyPayments.map(payment => ({
//             id: payment._id,
//             type: payment.paymentType,
//             amount: payment.amount,
//             currency: payment.currency,
//             date: payment.createdAt,
//             method: payment.paymentMethod
//           })),
//           totalSpent
//         });
//       }
//     }

//     res.status(200).json({
//       success: true,
//       data: propertyTransactions
//     });
//   } catch (error) {
//     console.error('Error in getPropertyTransactions:', error);
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while fetching property transactions',
//       error: error.message
//     });
//   }
// };










// controllers/customerAnalysis.js
const Payment = require('../models/paymentModel');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');
const mongoose = require('mongoose');

// Get customer analytics data
exports.getCustomerAnalytics = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authentication token

    // Find all successful payments by this user
    const payments = await Payment.find({
      userId: userId,
      paymentStatus: 'COMPLETED'
    });

    // Get rented properties (properties with RENT payment type)
    const rentedPayments = payments.filter(payment => payment.paymentType === 'RENT');
    const rentedPropertyIds = [...new Set(rentedPayments.map(payment => payment.propertyId.toString()))];
    
    // Get purchased properties (properties with BOOKING payment type for purchase)
    const purchasePayments = payments.filter(payment => payment.paymentType === 'BOOKING');
    const purchasedPropertyIds = [...new Set(purchasePayments.map(payment => payment.propertyId.toString()))];
    
    // Calculate total expenses (sum of all successful payment amounts)
    const totalExpenses = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // Prepare response object
    const analyticsData = {
      totalRentedProperties: rentedPropertyIds.length,
      totalPurchasedProperties: purchasedPropertyIds.length,
      totalExpenses: totalExpenses,
      currency: payments.length > 0 ? payments[0].currency : 'USD'
    };

    res.status(200).json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('Error in getCustomerAnalytics:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching customer analytics',
      error: error.message
    });
  }
};

// Get monthly activity data for graphs
exports.getMonthlyActivity = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authentication token
    const currentYear = new Date().getFullYear();
    
    // Prepare monthly data structure
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Initialize monthly payments count and amount
    const monthlyActivity = months.map((month, index) => ({
      month,
      transactionCount: 0,
      totalAmount: 0,
      uniqueUsers: 0
    }));

    // Find all successful payments for the current year
    const payments = await Payment.find({
      paymentStatus: 'COMPLETED',
      createdAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`)
      }
    });

    // Filter the payments for the current user
    const filteredPayments = payments.filter(payment => payment.userId.toString() === userId);

    // Create a structure to track unique users per month
    const monthlyUsers = Array(12).fill().map(() => new Set());

    // Populate monthly activity data
    payments.forEach(payment => {
      const month = new Date(payment.createdAt).getMonth();
      monthlyActivity[month].transactionCount += 1;
      // monthlyActivity[month].totalAmount += payment.amount;
      
      // Add the userId to the set of unique users for this month
      monthlyUsers[month].add(payment.userId.toString());
    });

    filteredPayments.forEach(payment => {
      const month = new Date(payment.createdAt).getMonth();
      monthlyActivity[month].totalAmount += payment.amount;
      
      // Add the userId to the set of unique users for this month
      monthlyUsers[month].add(payment.userId.toString());
    });

    // Update the uniqueUsers count for each month
    monthlyUsers.forEach((users, month) => {
      monthlyActivity[month].uniqueUsers = users.size;
    });

    res.status(200).json({
      success: true,
      data: {
        year: currentYear,
        monthlyActivity
      }
    });
  } catch (error) {
    console.error('Error in getMonthlyActivity:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching monthly activity data',
      error: error.message
    });
  }
};

// Get detailed property transactions
exports.getPropertyTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authentication token

    // Find all successful payments by this user
    const payments = await Payment.find({
      userId: userId,
      paymentStatus: 'COMPLETED'
    }).sort({ createdAt: -1 }); // Sort by most recent first

    // Get all property IDs
    const propertyIds = [...new Set(payments.map(payment => payment.propertyId))];
    
    // Prepare a container for property details
    const propertyTransactions = [];
    
    // Helper function to fetch property details
    const getPropertyDetails = async (propertyId) => {
      // Search in each property collection
      const apartment = await Apartment.findById(propertyId);
      if (apartment) return { ...apartment.toObject(), type: 'Apartment' };
      
      const farmhouse = await Farmhouse.findById(propertyId);
      if (farmhouse) return { ...farmhouse.toObject(), type: 'Farmhouse' };
      
      const land = await Land.findById(propertyId);
      if (land) return { ...land.toObject(), type: 'Land' };
      
      const office = await Office.findById(propertyId);
      if (office) return { ...office.toObject(), type: 'Office' };
      
      return null;
    };

    // For each property, fetch details and related transactions
    for (const propertyId of propertyIds) {
      const propertyDetails = await getPropertyDetails(propertyId);
      
      if (propertyDetails) {
        const propertyPayments = payments.filter(payment => 
          payment.propertyId.toString() === propertyId.toString()
        );
        
        const totalSpent = propertyPayments.reduce((sum, payment) => sum + payment.amount, 0);
        
        propertyTransactions.push({
          property: {
            id: propertyId,
            title: propertyDetails.title,
            address: propertyDetails.address,
            type: propertyDetails.type,
            status: propertyDetails.status
          },
          transactions: propertyPayments.map(payment => ({
            id: payment._id,
            type: payment.paymentType,
            amount: payment.amount,
            currency: payment.currency,
            date: payment.createdAt,
            method: payment.paymentMethod
          })),
          totalSpent
        });
      }
    }

    res.status(200).json({
      success: true,
      data: propertyTransactions
    });
  } catch (error) {
    console.error('Error in getPropertyTransactions:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching property transactions',
      error: error.message
    });
  }
};