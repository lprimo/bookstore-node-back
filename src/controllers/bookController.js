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

        book.title = title || book.title;
        book.author = author || book.author;
        book.isbn = isbn || book.isbn;
        book.publishedDate = publishedDate || book.publishedDate;
        book.pages = pages || book.pages;

        const updatedBook = await book.save();
        res.json(updatedBook);
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