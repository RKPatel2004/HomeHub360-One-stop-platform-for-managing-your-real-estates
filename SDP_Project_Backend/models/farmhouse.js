// const mongoose = require('mongoose');

// const farmhouseSchema = new mongoose.Schema({
//     ownerId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Users',
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     area: {
//         type: Number,
//         required: true,
//     },
//     images: {
//         type: [String],
//     },
//     status: {
//         type: String,
//         enum: ['available', 'sold', 'rented'],
//         default: 'available',
//     },
//     bedrooms: {
//         type: Number,
//         required: true,
//     },
//     bathrooms: {
//         type: Number,
//         required: true,
//     },
//     gardenArea: {
//         type: Number,
//     },
//     swimmingPool: {
//         type: Boolean,
//         default: false,
//     },
//     furnishingStatus: {
//         type: String,
//         enum: ['fully furnished', 'semi-furnished', 'unfurnished'],
//         default: 'unfurnished',
//     },
//     isForSale: {
//         type: Boolean,
//         required: true,
//         default: true,
//     },
//     isForRent: {
//         type: Boolean,
//         default: false,
//     },
//     rentPrice: {
//         type: Number,
//         required: function () {
//             return this.isForRent;
//         },
//     },
//     price: {
//         type: Number,
//         required: function () {
//             return this.isForSale;
//         },
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model('Farmhouse', farmhouseSchema);






const mongoose = require('mongoose');

const farmhouseSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
    },
    status: {
        type: String,
        enum: ['available', 'sold', 'rented'],
        default: 'available',
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    gardenArea: {
        type: Number,
    },
    swimmingPool: {
        type: Boolean,
        default: false,
    },
    furnishingStatus: {
        type: String,
        enum: ['fully furnished', 'semi-furnished', 'unfurnished'],
        default: 'unfurnished',
    },
    isForSale: {
        type: Boolean,
        required: true,
        default: true,
    },
    isForRent: {
        type: Boolean,
        default: false,
    },
    rentPrice: {
        type: Number,
        required: function () {
            return this.isForRent;
        },
    },
    price: {
        type: Number,
        required: function () {
            return this.isForSale;
        },
    },
    rentalTimer: {
        type: Number,
        default: null,
    },
    rentalStartDate: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Farmhouse', farmhouseSchema);