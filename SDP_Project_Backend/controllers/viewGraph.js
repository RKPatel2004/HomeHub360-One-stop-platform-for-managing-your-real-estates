const Apartment = require('../models/apartment');
const Farmhouse = require('../models/farmhouse');
const Land = require('../models/land');
const Office = require('../models/office');
const User = require('../models/users');
const mongoose = require('mongoose');

// Helper function to get views data for a specific model
async function getViewsDataForModel(Model, propertyType, userId) {
    const properties = await Model.find({ ownerId: userId }).populate({
        path: 'views.uniqueUsers',
        model: 'User',
        select: 'username'
    });

    return properties.map(property => ({
        title: property.title,
        viewCount: property.views.count,
        uniqueUsers: property.views.uniqueUsers.map(user => user.username),
        propertyType: propertyType
    }));
}

// Get views by property type
exports.getViewsByPropertyType = async (req, res) => {
    try {
        // Get the logged-in user's ID from the token
        const userId = req.user.id;

        const apartmentViews = await getViewsDataForModel(Apartment, 'Apartment', userId);
        const farmhouseViews = await getViewsDataForModel(Farmhouse, 'Farmhouse', userId);
        const landViews = await getViewsDataForModel(Land, 'Land', userId);
        const officeViews = await getViewsDataForModel(Office, 'Office', userId);

        const combinedData = [
            ...apartmentViews,
            ...farmhouseViews,
            ...landViews,
            ...officeViews
        ];

        // Group data by property type
        const groupedData = combinedData.reduce((acc, item) => {
            if (!acc[item.propertyType]) {
                acc[item.propertyType] = {
                    totalViews: 0,
                    properties: []
                };
            }
            acc[item.propertyType].totalViews += item.viewCount;
            acc[item.propertyType].properties.push({
                title: item.title,
                viewCount: item.viewCount,
                uniqueUsers: item.uniqueUsers
            });
            return acc;
        }, {});

        res.json({
            message: 'Views by Property Type',
            data: groupedData
        });
    } catch (error) {
        console.error('Error fetching views by property type:', error);
        res.status(500).json({ message: 'Error fetching views data', error: error.message });
    }
};

// Get views by location
exports.getViewsByLocation = async (req, res) => {
    try {
        // Get the logged-in user's ID from the token
        const userId = req.user.id;

        const models = [
            { model: Apartment, type: 'Apartment' },
            { model: Farmhouse, type: 'Farmhouse' },
            { model: Land, type: 'Land' },
            { model: Office, type: 'Office' }
        ];

        const locationViews = [];

        for (const { model: Model, type: propertyType } of models) {
            const properties = await Model.find({ ownerId: userId }).populate({
                path: 'views.uniqueUsers',
                model: 'User',
                select: 'username'
            });

            properties.forEach(property => {
                locationViews.push({
                    address: property.address,
                    viewCount: property.views.count,
                    uniqueUsers: property.views.uniqueUsers.map(user => user.username),
                    propertyType: propertyType
                });
            });
        }

        // Group data by address
        const groupedData = locationViews.reduce((acc, item) => {
            if (!acc[item.address]) {
                acc[item.address] = {
                    totalViews: 0,
                    properties: []
                };
            }
            acc[item.address].totalViews += item.viewCount;
            acc[item.address].properties.push({
                viewCount: item.viewCount,
                uniqueUsers: item.uniqueUsers,
                propertyType: item.propertyType
            });
            return acc;
        }, {});

        res.json({
            message: 'Views by Location',
            data: groupedData
        });
    } catch (error) {
        console.error('Error fetching views by location:', error);
        res.status(500).json({ message: 'Error fetching views data', error: error.message });
    }
};