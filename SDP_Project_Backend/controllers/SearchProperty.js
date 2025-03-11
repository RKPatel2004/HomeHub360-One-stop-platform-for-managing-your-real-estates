const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

const searchPropertyByAddress = async (req, res) => {
    try {
        const { address } = req.params;
        const regex = new RegExp(address, 'i'); // Case-insensitive search

        const apartments = await Apartment.find({ address: regex });
        const farmhouses = await Farmhouse.find({ address: regex });
        const lands = await Land.find({ address: regex });
        const offices = await Office.find({ address: regex });

        const allProperties = [...apartments, ...farmhouses, ...lands, ...offices];

        if (allProperties.length === 0) {
            return res.status(404).json({ message: 'No properties found for the given address' });
        }

        res.status(200).json(allProperties);
    } catch (error) {
        console.error('Error searching properties:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { searchPropertyByAddress };
