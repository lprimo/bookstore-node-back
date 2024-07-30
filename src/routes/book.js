const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/date', BookController.filterBooksByDate);
router.get('/title/:title', BookController.getBooksByTitle);
router.get('/author/:author', BookController.getBooksByAuthor);

router.get('/', BookController.getAllBooks);

router.post('/', authMiddleware, BookController.createBook);
router.patch('/:id', authMiddleware, BookController.updateBook);
router.get('/:id', authMiddleware, BookController.getBookById);

module.exports = router;
