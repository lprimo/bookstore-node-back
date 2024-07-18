const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', BookController.getAllBooks);
router.post('/', authMiddleware, BookController.createBook);
router.put('/:id', authMiddleware, BookController.updateBook);
router.get('/:id', authMiddleware, BookController.getBookById);
router.get('/title/:title', BookController.getBooksByTitle);
router.get('/author/:author', BookController.getBooksByAuthor);

module.exports = router;
