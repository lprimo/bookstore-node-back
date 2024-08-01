const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    rentedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnedAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['rented', 'returned', 'overdue'],
        default: 'rented',
    },
});

module.exports = mongoose.model('Rental', rentalSchema);
