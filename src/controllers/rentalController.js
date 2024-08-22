const Rental = require('../models/rental');
const Book = require('../models/book');
const Customer = require('../models/customer');
const Joi = require('joi');

// Schemas de validação
const rentalSchema = Joi.object({
    bookId: Joi.string().required(),
    customerId: Joi.string().required(),
    dueDate: Joi.date().required(),
    returnedAt: Joi.date().optional(),
    status: Joi.string().optional()
});

exports.registerRental = async (req, res) => {
    const { error, value } = rentalSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { bookId, customerId, dueDate } = value;

    try {
        const book = await Book.findById(bookId).lean();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const customer = await Customer.findById(customerId).lean();
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const rental = new Rental({
            book: bookId,
            customer: customerId,
            dueDate,
        });

        await rental.save();
        res.status(201).json(rental);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllRental = async (req, res) => {
    try {
        const rentals = await Rental.find().populate('book').lean();
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRentalById = async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findById(id).populate('book').lean();
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }
        res.json(rental);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRental = async (req, res) => {
    const { id } = req.params;
    const { error, value } = rentalSchema.validate(req.body, { allowUnknown: true });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { returnedAt, status } = value;

    try {
        const rental = await Rental.findById(id);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        if (returnedAt) rental.returnedAt = returnedAt;
        if (status) rental.status = status;

        await rental.save();
        res.json(rental);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRental = async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findByIdAndDelete(id).lean();
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        res.json({ message: `Rental removed` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};