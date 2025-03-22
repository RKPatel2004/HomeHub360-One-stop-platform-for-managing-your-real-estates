const Feedback = require('../models/feedback');
const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');

const getAverageRatings = async (req, res) => {
    try {
        // Fetch all feedbacks
        const feedbacks = await Feedback.find();

        // Initialize rating counts for each property type
        let ratings = {
            Apartment: { total: 0, count: 0 },
            Farmhouse: { total: 0, count: 0 },
            Land: { total: 0, count: 0 },
            Office: { total: 0, count: 0 }
        };

        // Loop through each feedback and determine property type
        for (const feedback of feedbacks) {
            const propertyId = feedback.propertyId;

            let propertyType = null;

            if (await Apartment.findById(propertyId)) propertyType = 'Apartment';
            else if (await Farmhouse.findById(propertyId)) propertyType = 'Farmhouse';
            else if (await Land.findById(propertyId)) propertyType = 'Land';
            else if (await Office.findById(propertyId)) propertyType = 'Office';

            if (propertyType) {
                ratings[propertyType].total += feedback.rating;
                ratings[propertyType].count += 1;
            }
        }

        // Calculate average ratings
        const averageRatings = Object.keys(ratings).map(type => ({
            propertyType: type,
            averageRating: ratings[type].count > 0 ? (ratings[type].total / ratings[type].count).toFixed(2) : 0
        }));

        res.json(averageRatings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAverageRatings };
