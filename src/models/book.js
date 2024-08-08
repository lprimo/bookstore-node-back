const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    saleValue: {
        type: Number
    },
    rentalValue: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ImageBook'
    }]
});

module.exports = mongoose.model('Book', bookSchema);