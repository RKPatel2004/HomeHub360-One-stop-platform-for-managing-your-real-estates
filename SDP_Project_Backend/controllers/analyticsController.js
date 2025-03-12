const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

const getPropertyAnalytics = async (req, res) => {
    try {
        // Aggregate counts for each category
        const apartmentStats = await Apartment.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const farmhouseStats = await Farmhouse.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const landStats = await Land.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const officeStats = await Office.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // Combine results
        const formatData = (stats) => {
            return stats.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, { available: 0, sold: 0, rented: 0 });
        };

        const totalStats = {
            apartments: formatData(apartmentStats),
            farmhouses: formatData(farmhouseStats),
            lands: formatData(landStats),
            offices: formatData(officeStats),
        };

        res.json(totalStats);
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getPropertyAnalytics };
