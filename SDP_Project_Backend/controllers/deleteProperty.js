const mongoose = require('mongoose');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

const deleteProperty = async (req, res) => {
    try {
        const { id, propertyType } = req.params;
        const userId = req.user.id; // Extracted from JWT token

        // Map propertyType to corresponding model
        const models = {
            apartment: Apartment,
            farmhouse: Farmhouse,
            land: Land,
            office: Office
        };

        const Model = models[propertyType];

        if (!Model) {
            return res.status(400).json({ message: 'Invalid property type' });
        }

        // Find the property by ID
        const property = await Model.findById(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Convert `ownerId` to string before comparing with `userId`
        if (property.ownerId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own properties.' });
        }

        // Delete the property
        await Model.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = deleteProperty;