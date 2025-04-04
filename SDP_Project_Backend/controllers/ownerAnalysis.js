const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');
const Payment = require('../models/paymentModel');

exports.getOwnerAnalytics = async (req, res) => {
  try {
    const ownerId = req.user.id; 

    const [apartments, farmhouses, lands, offices] = await Promise.all([
      Apartment.find({ ownerId }),
      Farmhouse.find({ ownerId }),
      Land.find({ ownerId }),
      Office.find({ ownerId })
    ]);

    const allProperties = [
      ...apartments.map(p => ({ ...p.toObject(), type: 'apartment' })),
      ...farmhouses.map(p => ({ ...p.toObject(), type: 'farmhouse' })),
      ...lands.map(p => ({ ...p.toObject(), type: 'land' })),
      ...offices.map(p => ({ ...p.toObject(), type: 'office' }))
    ];

    const locationDistribution = {};
    
    allProperties.forEach(property => {
      let location = property.address;
      
      if (location && location.length > 0) {
        const parts = location.split(',');
        if (parts.length > 0) {
          location = (parts[parts.length - 1] || parts[0]).trim();
        }
      } else {
        location = "Unknown";
      }

      if (location.length > 25) {
        location = location.substring(0, 25) + '...';
      }
      
      locationDistribution[location] = (locationDistribution[location] || 0) + 1;
    });

    const locationData = Object.entries(locationDistribution).map(([location, count]) => ({
      location,
      count,
      percentage: Math.round((count / allProperties.length) * 100)
    }));

    const soldProperties = allProperties.filter(p => p.status === 'sold');
    const priceRanges = {
      '0-10k': 0,
      '10k-20k': 0,
      '20k-30k': 0,
      '30k-40k': 0,
      '40k-50k': 0,
      '50k-60k': 0,
      '60k-70k': 0,
      '70k-80k': 0,
      '80k-90k': 0,
      '90k-100k': 0,
      '100k+': 0
    };

    soldProperties.forEach(property => {
      const price = property.price;
      if (price <= 10000) priceRanges['0-10k']++;
      else if (price <= 20000) priceRanges['10k-20k']++;
      else if (price <= 30000) priceRanges['20k-30k']++;
      else if (price <= 40000) priceRanges['30k-40k']++;
      else if (price <= 50000) priceRanges['40k-50k']++;
      else if (price <= 60000) priceRanges['50k-60k']++;
      else if (price <= 70000) priceRanges['60k-70k']++;
      else if (price <= 80000) priceRanges['70k-80k']++;
      else if (price <= 90000) priceRanges['80k-90k']++;
      else if (price <= 100000) priceRanges['90k-100k']++;
      else priceRanges['100k+']++;
    });

    let maxSoldRange = '';
    let maxSoldCount = 0;
    for (const [range, count] of Object.entries(priceRanges)) {
      if (count > maxSoldCount) {
        maxSoldCount = count;
        maxSoldRange = range;
      }
    }

    const rentedProperties = allProperties.filter(p => p.status === 'rented');
    const rentRanges = {
      '0-500': 0,
      '500-1k': 0,
      '1k-1.5k': 0,
      '1.5k-2k': 0,
      '2k-2.5k': 0,
      '2.5k-3k': 0,
      '3k-3.5k': 0,
      '3.5k-4k': 0,
      '4k-4.5k': 0,
      '4.5k-5k': 0,
      '5k+': 0
    };

    rentedProperties.forEach(property => {
      const rentPrice = property.rentPrice;
      if (rentPrice <= 500) rentRanges['0-500']++;
      else if (rentPrice <= 1000) rentRanges['500-1k']++;
      else if (rentPrice <= 1500) rentRanges['1k-1.5k']++;
      else if (rentPrice <= 2000) rentRanges['1.5k-2k']++;
      else if (rentPrice <= 2500) rentRanges['2k-2.5k']++;
      else if (rentPrice <= 3000) rentRanges['2.5k-3k']++;
      else if (rentPrice <= 3500) rentRanges['3k-3.5k']++;
      else if (rentPrice <= 4000) rentRanges['3.5k-4k']++;
      else if (rentPrice <= 4500) rentRanges['4k-4.5k']++;
      else if (rentPrice <= 5000) rentRanges['4.5k-5k']++;
      else rentRanges['5k+']++;
    });

    let maxRentRange = '';
    let maxRentCount = 0;
    for (const [range, count] of Object.entries(rentRanges)) {
      if (count > maxRentCount) {
        maxRentCount = count;
        maxRentRange = range;
      }
    }

    const payments = await Payment.find({ ownerId });
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

    const sampleAddresses = allProperties.slice(0, 5).map(p => p.address);

    res.status(200).json({
      success: true,
      data: {
        totalProperties: allProperties.length,
        locationDistribution: locationData,
        soldProperties: {
          count: soldProperties.length,
          priceRanges,
          maxSellingRange: maxSoldRange,
          maxSellingCount: maxSoldCount
        },
        rentedProperties: {
          count: rentedProperties.length,
          rentRanges,
          maxRentRange: maxRentRange,
          maxRentCount: maxRentCount
        },
        totalRevenue,
        sampleAddresses
      }
    });
  } catch (error) {
    console.error('Error in getOwnerAnalytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving owner analytics',
      error: error.message
    });
  }
};