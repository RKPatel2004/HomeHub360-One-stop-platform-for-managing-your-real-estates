const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: Number, required: true },
  images: [String],
  status: { type: String, enum: ['available', 'sold', 'rented'], required: true },
  zoningType: { type: String, required: true },
  isForSale: { type: Boolean, default: true },
  isForRent: { type: Boolean, default: false },
  rentPrice: { type: Number },
  price: { type: Number, required: function() { return this.isForSale; } },
  rentalTimer: { type: Number, default: null },
  rentalStartDate: { type: Date, default: null },
  views: {
    count: { type: Number, default: 0 },
    uniqueUsers: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Land', landSchema);