// const mongoose = require('mongoose');
// const notificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   message: { type: String, required: true },
//   isRead: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });
// module.exports = mongoose.model('Notification', notificationSchema);






// models/notification.js
const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['payment', 'booking', 'system', 'other'], default: 'system' },
  isRead: { type: Boolean, default: false },
  relatedId: { type: mongoose.Schema.Types.ObjectId }, // Can store propertyId, paymentId, etc.
  details: { type: Object }, // Flexible field to store various details
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Notification', notificationSchema);