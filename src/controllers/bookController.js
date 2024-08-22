const Book = require('../models/book');
const Rental = require('../models/rental');
const ImageBook = require('../models/imageBook');
const Joi = require('joi');

// Schemas de validação
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    publishedDate: Joi.date().required(),
    pages: Joi.number().integer().required(),
    saleValue: Joi.number().required(),
    rentalValue: Joi.number().required(),
    quantity: Joi.number().integer().required(),
    images: Joi.array().items(Joi.object({
        image: Joi.string().required(),
        description: Joi.string().optional(),
        order: Joi.number().integer().required()
    })).optional()
});

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('images').lean();
        const availableBooks = await Promise.all(books.map(async (book) => {
            const rentedCount = await Rental.countDocuments({ book: book._id, status: 'rented' });
            return {
                ...book,
                availableQuantity: book.quantity - rentedCount
            };
        }));
        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBook = async (req, res) => {
    const { error, value } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { title, author, isbn, publishedDate, pages, saleValue, rentalValue, quantity, images } = value;
    const book = new Book({ title, author, isbn, publishedDate, pages, saleValue, rentalValue, quantity });
    try {
        const newBook = await book.save();
        if (images && images.length > 0) {
            const imagePromises = images.map(img => {
                const newImage = new ImageBook({ book: newBook._id, image: img.image, description: img?.description, order: img.order });
                return newImage.save();
            });
            const savedImages = await Promise.all(imagePromises);
            newBook.images = savedImages.map(image => image._id);
            await newBook.save();
        }
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBookAndImages = async (req, res) => {
    const { id } = req.params;
    const { error: idError } = idSchema.validate(id);
    if (idError) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }
    const { error, value } = bookSchema.validate(req.body, { allowUnknown: true });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { title, author, isbn, publishedDate, pages, saleValue, rentalValue, quantity, images } = value;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (title) book.title = title;
        if (author) book.author = author;
        if (isbn) book.isbn = isbn;
        if (publishedDate) book.publishedDate = publishedDate;
        if (pages) book.pages = pages;
        if (saleValue) book.saleValue = saleValue;
        if (rentalValue) book.rentalValue = rentalValue;
        if (quantity) book.quantity = quantity;
        await book.save();

        if (images && Array.isArray(images)) {
            const updatePromises = images.map(async (img) => {
                const { id, image, description, order } = img;
                const imageBook = await ImageBook.findById(id);

                if (!imageBook) {
                    throw new Error(`Image with id ${id} not found`);
                }

                if (image) imageBook.image = image;
                if (description) imageBook.description = description;
                if (order) imageBook.order = order;

                return imageBook.save();
            });

            const updatedImages = await Promise.all(updatePromises);
            res.json({ book, updatedImages });
        } else {
            res.json(book);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    const { error } = idSchema.validate(id);
    if (error) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const book = await Book.findById(id).populate('images').lean();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBooksByTitle = async (req, res) => {
    const { title } = req.params;

    try {
        const books = await Book.find({ title: new RegExp(title, 'i') }).populate('images').lean();
        if (!books.length) {
            return res.status(404).json({ message: 'No books found with the given title' });
        }
        const availableBooks = await Promise.all(books.map(async (book) => {
            const rentedCount = await Rental.countDocuments({ book: book._id, status: 'rented' });
            return {
                ...book,
                availableQuantity: book.quantity - rentedCount
            };
        }));
        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBooksByAuthor = async (req, res) => {
    const { author } = req.params;

    try {
        const books = await Book.find({ author: new RegExp(author, 'i') }).populate('images').lean();
        if (!books.length) {
            return res.status(404).json({ message: 'No books found with the given author' });
        }
        const availableBooks = await Promise.all(books.map(async (book) => {
            const rentedCount = await Rental.countDocuments({ book: book._id, status: 'rented' });
            return {
                ...book,
                availableQuantity: book.quantity - rentedCount
            };
        }));
        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.filterBooksByDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const query = {};

        if (startDate) {
            query.publishedDate = { $gte: new Date(startDate) };
        }

        if (endDate) {
            query.publishedDate = query.publishedDate || {};
            query.publishedDate.$lte = new Date(endDate);
        }

        const books = await Book.find(query).populate('images').lean();
        const availableBooks = await Promise.all(books.map(async (book) => {
            const rentedCount = await Rental.countDocuments({ book: book._id, status: 'rented' });
            return {
                ...book,
                availableQuantity: book.quantity - rentedCount
            };
        }));
        res.json(availableBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    const { id } = req.params;
    const { error } = idSchema.validate(id);
    if (error) {
        return res.status(400).json({ message: 'Invalid image ID' });
    }

    try {
        const image = await ImageBook.findByIdAndDelete(id);
        if (!image) {
            return res.status(404).json({ message: 'Image id not found' });
        }

        res.json({ message: `Deleted image` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    const { error } = idSchema.validate(id);
    if (error) {
        return res.status(400).json({ message: 'Invalid book ID' });
    }

    try {
        const rental = await Rental.findOne({ book: id });
        if (rental) {
            return res.status(400).json({ message: 'Rental found for the given book ID' });
        }

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await ImageBook.deleteMany({ book: id });

        await book.remove();

        res.json({ message: 'Book and associated images deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};