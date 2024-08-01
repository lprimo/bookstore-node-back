const Rental = require('../models/rental');
const Book = require('../models/book');
const Customer = require('../models/customer');

exports.registerRental = async (req, res) => {
    const { bookId, customerId, dueDate } = req.body;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const rental = new Rental({
            book: bookId,
            customer: customerId,
            dueDate,
        });

        await Rental.save();
        res.status(201).json(rental);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllRental = async (req, res) => {
    try {
        const rentals = await Rental.find().populate('book');
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRentalById = async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findById(id).populate('book');
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
    const { returnedAt, status } = req.body;

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
        const rental = await Rental.findByIdAndDelete(id);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        res.json({ message: `Rental removed` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
