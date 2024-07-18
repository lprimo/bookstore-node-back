const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

router.get('/', BookController.getAllBooks);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.get('/:id', BookController.getBookById);
router.get('/title/:title', BookController.getBooksByTitle);
router.get('/author/:author', BookController.getBooksByAuthor);

module.exports = router;
