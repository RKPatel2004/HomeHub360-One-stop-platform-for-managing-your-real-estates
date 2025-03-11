const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;

        // Search property in different collections
        let property =
            await Apartment.findById(id) ||
            await Farmhouse.findById(id) ||
            await Land.findById(id) ||
            await Office.findById(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { getPropertyById };