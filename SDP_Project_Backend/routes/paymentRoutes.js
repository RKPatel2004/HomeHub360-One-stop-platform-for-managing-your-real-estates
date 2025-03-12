const express = require('express');
const router = express.Router();
const { 
  createPayPalOrder, 
  capturePayPalOrder, 
  cancelPayPalOrder,
  getPaymentById,
  getUserPayments,
  getPaymentDetailsByOrderId
} = require('../controllers/paymentController');
const { getAllPayments } = require('../controllers/getAllPayments');
const verifyToken = require('../middleware/auth');

// Route to create a PayPal order
router.post('/create-paypal-order', verifyToken, createPayPalOrder);

// Route to capture payment after approval
router.get('/capture-paypal-order', capturePayPalOrder);

// Route to handle canceled payments
router.get('/cancel-paypal-order', cancelPayPalOrder);

router.get('/all', verifyToken, getAllPayments);

// Route to get payment by ID
// Modified to NOT require authentication for payment details lookup by orderId
router.get('/details', getPaymentDetailsByOrderId);

// Route to get all payments for a user
router.get('/user/:userId', verifyToken, getUserPayments);

// Route to get payment by ID
router.get('/:id', verifyToken, getPaymentById);

module.exports = router;