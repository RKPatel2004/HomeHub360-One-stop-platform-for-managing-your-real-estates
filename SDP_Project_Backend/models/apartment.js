
const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: Number, required: true },
  images: [String],
  status: { type: String, enum: ['available', 'sold', 'rented'], required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  balconies: { type: Number, required: true },
  furnishingStatus: { type: String, required: true },
  isForSale: { type: Boolean, default: false },
  isForRent: { type: Boolean, default: false },
  rentPrice: { type: Number },
  price: { type: Number },
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

module.exports = mongoose.model('Apartment', apartmentSchema);