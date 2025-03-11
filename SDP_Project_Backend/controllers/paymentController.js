// const axios = require('axios');
// const Payment = require('../models/paymentModel');
// const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_MODE } = require('../config/paypalConfig');
// const Apartment = require('../models/apartment');
// const Farmhouse = require('../models/farmhouse');
// const Land = require('../models/land');
// const Office = require('../models/office');

// // Function to get PayPal Access Token
// const getPayPalAccessToken = async () => {
//   try {
//     const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
//     const response = await axios.post(
//       PAYPAL_MODE === 'live' 
//         ? 'https://api-m.paypal.com/v1/oauth2/token' 
//         : 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
//       'grant_type=client_credentials',
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': `Basic ${auth}`
//         }
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error getting PayPal access token:', error);
//     throw new Error('Failed to authenticate with PayPal');
//   }
// };

// // Function to get owner ID for a property
// const getPropertyOwnerId = async (propertyId) => {
//   try {
//     // Define collections to check
//     const collections = [
//       { model: Apartment, name: 'Apartment' },
//       { model: Farmhouse, name: 'Farmhouse' },
//       { model: Land, name: 'Land' },
//       { model: Office, name: 'Office' }
//     ];

//     // Try to find the property in each collection
//     for (const { model, name } of collections) {
//       const property = await model.findById(propertyId);
      
//       if (property && property.ownerId) {
//         console.log(`Found owner ID ${property.ownerId} for ${name} with ID ${propertyId}`);
//         return property.ownerId;
//       }
//     }
    
//     console.log(`Owner ID not found for property with ID ${propertyId}`);
//     return null;
//   } catch (error) {
//     console.error('Error getting property owner ID:', error);
//     return null;
//   }
// };

// // Function to update property status after successful payment
// const updatePropertyStatus = async (propertyId, paymentType) => {
//   try {
//     // Define collections to check
//     const collections = [
//       { model: Apartment, name: 'Apartment' },
//       { model: Farmhouse, name: 'Farmhouse' },
//       { model: Land, name: 'Land' },
//       { model: Office, name: 'Office' }
//     ];

//     let updated = false;
    
//     // Try to find and update the property in each collection
//     for (const { model, name } of collections) {
//       const property = await model.findById(propertyId);
      
//       if (property) {
//         if (paymentType === 'BOOKING' && property.isForSale) {
//           property.isForSale = false;
//           property.status = 'sold';
//         } else if (paymentType === 'RENT' && property.isForRent) {
//           property.isForRent = false;
//           property.status = 'rented';
//         }
        
//         await property.save();
//         console.log(`Updated ${name} with ID ${propertyId}`);
//         updated = true;
//         break;
//       }
//     }
    
//     if (!updated) {
//       console.log(`Property with ID ${propertyId} not found in any collection`);
//     }
    
//     return updated;
//   } catch (error) {
//     console.error('Error updating property status:', error);
//     return false;
//   }
// };

// // Create PayPal order
// exports.createPayPalOrder = async (req, res) => {
//   try {
//     const { userId, propertyId, ownerId, paymentType, amount, currency, description, returnUrl, cancelUrl } = req.body;

//     if (!userId || !propertyId || !paymentType || !amount) {
//       return res.status(400).json({ message: 'Missing required payment information' });
//     }

//     // If ownerId is not provided in the request, fetch it from the database
//     let propertyOwnerId = ownerId;
//     if (!propertyOwnerId) {
//       propertyOwnerId = await getPropertyOwnerId(propertyId);
//     }

//     // Convert INR to USD for PayPal sandbox (if needed)
//     // Note: In production with a business account, you may support INR directly
//     const paypalCurrency = PAYPAL_MODE === 'sandbox' ? 'USD' : (currency || 'USD');
    
//     // For sandbox testing, if the amount is very large, scale it down
//     // This is just for testing purposes
//     let paypalAmount = amount;
//     if (PAYPAL_MODE === 'sandbox' && amount > 10000) {
//       // Convert to a more reasonable test amount (e.g., 100.00)
//       paypalAmount = parseFloat((amount).toFixed(2));
//     }
    
//     const accessToken = await getPayPalAccessToken();

//     // Create order in PayPal
//     const response = await axios.post(
//       PAYPAL_MODE === 'live' 
//         ? 'https://api-m.paypal.com/v2/checkout/orders' 
//         : 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
//       {
//         intent: 'CAPTURE',
//         purchase_units: [
//           {
//             amount: {
//               currency_code: paypalCurrency,
//               value: paypalAmount.toString()
//             },
//             description: description || `Payment for ${paymentType}`
//           }
//         ],
//         application_context: {
//           return_url: `${req.protocol}://${req.get('host')}/api/payments/capture-paypal-order`,
//           cancel_url: `${req.protocol}://${req.get('host')}/api/payments/cancel-paypal-order`
//         }
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         }
//       }
//     );

//     // Save payment record in database with original amount and currency
//     const payment = new Payment({
//       userId,
//       propertyId,
//       ownerId: propertyOwnerId, // Save the owner ID
//       paymentType,
//       amount, // Save the original amount
//       currency: currency || 'INR', // Save the original currency
//       paypalOrderId: response.data.id,
//       paymentStatus: 'PENDING',
//       transactionDetails: {
//         ...response.data,
//         originalAmount: amount,
//         originalCurrency: currency || 'INR',
//         paypalAmount: paypalAmount,
//         paypalCurrency: paypalCurrency
//       }
//     });

//     await payment.save();

//     return res.status(200).json({
//       success: true,
//       order: response.data
//     });
//   } catch (error) {
//     console.error('Error creating PayPal order:', error.response ? error.response.data : error);
//     return res.status(500).json({
//       success: false,
//       error: 'Failed to create PayPal order',
//       details: error.message,
//       paypalDetails: error.response ? error.response.data : 'No additional details'
//     });
//   }
// };

// // Capture PayPal payment
// exports.capturePayPalOrder = async (req, res) => {
//   try {
//     const { token, PayerID } = req.query;

//     if (!token) {
//       return res.status(400).json({ message: 'Order ID is required' });
//     }

//     const accessToken = await getPayPalAccessToken();

//     // Capture the order
//     const response = await axios.post(
//       PAYPAL_MODE === 'live' 
//         ? `https://api-m.paypal.com/v2/checkout/orders/${token}/capture` 
//         : `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
//       {},
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         }
//       }
//     );

//     // Update payment record
//     const payment = await Payment.findOne({ paypalOrderId: token });

//     if (!payment) {
//       return res.status(404).json({ message: 'Payment record not found' });
//     }

//     // If owner ID was not set during order creation, try to set it now
//     if (!payment.ownerId) {
//       const ownerId = await getPropertyOwnerId(payment.propertyId);
//       if (ownerId) {
//         payment.ownerId = ownerId;
//       }
//     }

//     payment.paymentStatus = 'COMPLETED';
//     payment.paypalPayerId = PayerID;
//     payment.paypalPaymentId = response.data.purchase_units[0].payments.captures[0].id;
//     payment.transactionDetails = {
//       ...payment.transactionDetails,
//       captureDetails: response.data
//     };
//     payment.updatedAt = Date.now();

//     await payment.save();

//     // Update property status based on payment type
//     await updatePropertyStatus(payment.propertyId, payment.paymentType);

//     // IMPORTANT CHANGE: Redirect to the frontend application
//     // This assumes your frontend is running on http://localhost:3000
//     // Modify this URL to match your actual frontend URL
//     // For HashRouter, we need to use the hash format
//     res.redirect(`http://localhost:3000/#/payment-success?orderId=${token}`);
//   } catch (error) {
//     console.error('Error capturing PayPal payment:', error.response ? error.response.data : error);
//     // Also update the cancel URL to point to the frontend
//     res.redirect(`http://localhost:3000/#/payment-cancel?error=${encodeURIComponent(error.message)}`);
//   }
// };

// // Cancel PayPal order
// exports.cancelPayPalOrder = async (req, res) => {
//   try {
//     const { token } = req.query;

//     if (token) {
//       const payment = await Payment.findOne({ paypalOrderId: token });

//       if (payment) {
//         payment.paymentStatus = 'FAILED';
//         payment.updatedAt = Date.now();
//         await payment.save();
//       }
//     }

//     // Update this URL to point to the frontend
//     res.redirect(`http://localhost:3000/#/payment-cancel`);
//   } catch (error) {
//     console.error('Error cancelling PayPal order:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to process payment cancellation',
//       details: error.message
//     });
//   }
// };

// // Get payment by ID
// exports.getPaymentById = async (req, res) => {
//   try {
//     const payment = await Payment.findById(req.params.id);

//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }

//     res.status(200).json({ success: true, payment });
//   } catch (error) {
//     console.error('Error getting payment:', error);
//     res.status(500).json({ success: false, error: 'Failed to retrieve payment' });
//   }
// };

// // Get user payments
// exports.getUserPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find({ userId: req.params.userId });

//     res.status(200).json({ success: true, count: payments.length, payments });
//   } catch (error) {
//     console.error('Error getting user payments:', error);
//     res.status(500).json({ success: false, error: 'Failed to retrieve user payments' });
//   }
// };

// // Get payment details by Order ID - Modified to not require authentication
// exports.getPaymentDetailsByOrderId = async (req, res) => {
//   try {
//     const { orderId } = req.query;

//     if (!orderId) {
//       return res.status(400).json({ message: 'Order ID is required' });
//     }

//     const payment = await Payment.findOne({ paypalOrderId: orderId });

//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }

//     res.status(200).json({ success: true, payment });
//   } catch (error) {
//     console.error('Error getting payment details:', error);
//     res.status(500).json({ success: false, error: 'Failed to retrieve payment details' });
//   }
// };










const axios = require('axios');
const Payment = require('../models/paymentModel');
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_MODE } = require('../config/paypalConfig');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');
const { createPaymentNotification } = require('./notificationController');

// Function to get PayPal Access Token
const getPayPalAccessToken = async () => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
      PAYPAL_MODE === 'live' 
        ? 'https://api-m.paypal.com/v1/oauth2/token' 
        : 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw new Error('Failed to authenticate with PayPal');
  }
};

// Function to get owner ID for a property
const getPropertyOwnerId = async (propertyId) => {
  try {
    // Define collections to check
    const collections = [
      { model: Apartment, name: 'Apartment' },
      { model: Farmhouse, name: 'Farmhouse' },
      { model: Land, name: 'Land' },
      { model: Office, name: 'Office' }
    ];

    // Try to find the property in each collection
    for (const { model, name } of collections) {
      const property = await model.findById(propertyId);
      
      if (property && property.ownerId) {
        console.log(`Found owner ID ${property.ownerId} for ${name} with ID ${propertyId}`);
        return property.ownerId;
      }
    }
    
    console.log(`Owner ID not found for property with ID ${propertyId}`);
    return null;
  } catch (error) {
    console.error('Error getting property owner ID:', error);
    return null;
  }
};

// Function to update property status after successful payment
const updatePropertyStatus = async (propertyId, paymentType) => {
  try {
    // Define collections to check
    const collections = [
      { model: Apartment, name: 'Apartment' },
      { model: Farmhouse, name: 'Farmhouse' },
      { model: Land, name: 'Land' },
      { model: Office, name: 'Office' }
    ];

    let updated = false;
    
    // Try to find and update the property in each collection
    for (const { model, name } of collections) {
      const property = await model.findById(propertyId);
      
      if (property) {
        if (paymentType === 'BOOKING' && property.isForSale) {
          property.isForSale = false;
          property.status = 'sold';
        } else if (paymentType === 'RENT' && property.isForRent) {
          property.isForRent = false;
          property.status = 'rented';
        }
        
        await property.save();
        console.log(`Updated ${name} with ID ${propertyId}`);
        updated = true;
        break;
      }
    }
    
    if (!updated) {
      console.log(`Property with ID ${propertyId} not found in any collection`);
    }
    
    return updated;
  } catch (error) {
    console.error('Error updating property status:', error);
    return false;
  }
};

// Create PayPal order
exports.createPayPalOrder = async (req, res) => {
  try {
    const { userId, propertyId, ownerId, paymentType, amount, currency, description, returnUrl, cancelUrl } = req.body;

    if (!userId || !propertyId || !paymentType || !amount) {
      return res.status(400).json({ message: 'Missing required payment information' });
    }

    // If ownerId is not provided in the request, fetch it from the database
    let propertyOwnerId = ownerId;
    if (!propertyOwnerId) {
      propertyOwnerId = await getPropertyOwnerId(propertyId);
    }

    // Convert INR to USD for PayPal sandbox (if needed)
    // Note: In production with a business account, you may support INR directly
    const paypalCurrency = PAYPAL_MODE === 'sandbox' ? 'USD' : (currency || 'USD');
    
    // For sandbox testing, if the amount is very large, scale it down
    // This is just for testing purposes
    let paypalAmount = amount;
    if (PAYPAL_MODE === 'sandbox' && amount > 10000) {
      // Convert to a more reasonable test amount (e.g., 100.00)
      paypalAmount = parseFloat((amount).toFixed(2));
    }
    
    const accessToken = await getPayPalAccessToken();

    // Create order in PayPal
    const response = await axios.post(
      PAYPAL_MODE === 'live' 
        ? 'https://api-m.paypal.com/v2/checkout/orders' 
        : 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: paypalCurrency,
              value: paypalAmount.toString()
            },
            description: description || `Payment for ${paymentType}`
          }
        ],
        application_context: {
          return_url: `${req.protocol}://${req.get('host')}/api/payments/capture-paypal-order`,
          cancel_url: `${req.protocol}://${req.get('host')}/api/payments/cancel-paypal-order`
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    // Save payment record in database with original amount and currency
    const payment = new Payment({
      userId,
      propertyId,
      ownerId: propertyOwnerId, // Save the owner ID
      paymentType,
      amount, // Save the original amount
      currency: currency || 'INR', // Save the original currency
      paypalOrderId: response.data.id,
      paymentStatus: 'PENDING',
      transactionDetails: {
        ...response.data,
        originalAmount: amount,
        originalCurrency: currency || 'INR',
        paypalAmount: paypalAmount,
        paypalCurrency: paypalCurrency
      }
    });

    await payment.save();

    return res.status(200).json({
      success: true,
      order: response.data
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error.response ? error.response.data : error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create PayPal order',
      details: error.message,
      paypalDetails: error.response ? error.response.data : 'No additional details'
    });
  }
};

// Capture PayPal payment
exports.capturePayPalOrder = async (req, res) => {
  try {
    const { token, PayerID } = req.query;
    if (!token) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
    const accessToken = await getPayPalAccessToken();
    // Capture the order
    const response = await axios.post(
      PAYPAL_MODE === 'live' 
        ? `https://api-m.paypal.com/v2/checkout/orders/${token}/capture` 
        : `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    // Update payment record
    const payment = await Payment.findOne({ paypalOrderId: token });
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }
    // If owner ID was not set during order creation, try to set it now
    if (!payment.ownerId) {
      const ownerId = await getPropertyOwnerId(payment.propertyId);
      if (ownerId) {
        payment.ownerId = ownerId;
      }
    }
    payment.paymentStatus = 'COMPLETED';
    payment.paypalPayerId = PayerID;
    payment.paypalPaymentId = response.data.purchase_units[0].payments.captures[0].id;
    payment.transactionDetails = {
      ...payment.transactionDetails,
      captureDetails: response.data
    };
    payment.updatedAt = Date.now();
    await payment.save();
    
    // Update property status based on payment type
    await updatePropertyStatus(payment.propertyId, payment.paymentType);
    
    // Create notifications for payment
    if (payment.ownerId) {
      await createPaymentNotification(payment);
    }
    
    // IMPORTANT CHANGE: Redirect to the frontend application
    // This assumes your frontend is running on http://localhost:3000
    // Modify this URL to match your actual frontend URL
    // For HashRouter, we need to use the hash format
    res.redirect(`http://localhost:3000/#/payment-success?orderId=${token}`);
  } catch (error) {
    console.error('Error capturing PayPal payment:', error.response ? error.response.data : error);
    // Also update the cancel URL to point to the frontend
    res.redirect(`http://localhost:3000/#/payment-cancel?error=${encodeURIComponent(error.message)}`);
  }
};

// Cancel PayPal order
exports.cancelPayPalOrder = async (req, res) => {
  try {
    const { token } = req.query;

    if (token) {
      const payment = await Payment.findOne({ paypalOrderId: token });

      if (payment) {
        payment.paymentStatus = 'FAILED';
        payment.updatedAt = Date.now();
        await payment.save();
      }
    }

    // Update this URL to point to the frontend
    res.redirect(`http://localhost:3000/#/payment-cancel`);
  } catch (error) {
    console.error('Error cancelling PayPal order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process payment cancellation',
      details: error.message
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error('Error getting payment:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve payment' });
  }
};

// Get user payments
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });

    res.status(200).json({ success: true, count: payments.length, payments });
  } catch (error) {
    console.error('Error getting user payments:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve user payments' });
  }
};

// Get payment details by Order ID - Modified to not require authentication
exports.getPaymentDetailsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const payment = await Payment.findOne({ paypalOrderId: orderId });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error('Error getting payment details:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve payment details' });
  }
};