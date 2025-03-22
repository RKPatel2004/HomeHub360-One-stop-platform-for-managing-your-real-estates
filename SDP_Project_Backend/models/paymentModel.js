const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  paymentType: {
    type: String,
    enum: ['BOOKING', 'RENT', 'MAINTENANCE', 'DEPOSIT'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    default: 'PayPal'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  },
  paypalOrderId: {
    type: String
  },
  paypalPaymentId: {
    type: String
  },
  paypalPayerId: {
    type: String
  },
  transactionDetails: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;