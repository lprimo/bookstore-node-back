const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBook = async (req, res) => {
    const { title, author, isbn, publishedDate, pages } = req.body;
    const book = new Book({
        title,
        author,
        isbn,
        publishedDate,
        pages,
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, publishedDate, pages } = req.body;

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

        await book.save();
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
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
        const books = await Book.find({ title: new RegExp(title, 'i') });
        if (!books.length) {
            return res.status(404).json({ message: 'No books found with the given title' });
        }
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBooksByAuthor = async (req, res) => {
    const { author } = req.params;

    try {
        const books = await Book.find({ author: new RegExp(author, 'i') });
        if (!books.length) {
            return res.status(404).json({ message: 'No books found with the given author' });
        }
        res.json(books);
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

        const books = await Book.find(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};