const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const { authMiddleware } = require('../middleware/authMiddleware');

// ------------------------------- Filtros --------------------------------------

// Filtra por data de publicação(inicial / final)
router.get('/date', BookController.filterBooksByDate);
// Filtra por titulo
router.get('/title/:title', BookController.getBooksByTitle);
// Filtra por autor
router.get('/author/:author', BookController.getBooksByAuthor);

// ------------------------------- Fim Filtros ----------------------------------

// Obter todos os livros
router.get('/', BookController.getAllBooks);

// Registrar novo livro (rota protegida)
router.post('/', authMiddleware, BookController.createBook);

// Atualizar livro por ID (rota protegida)
router.patch('/:id', authMiddleware, BookController.updateBook);

// Obter livro por ID (rota protegida)
router.get('/:id', authMiddleware, BookController.getBookById);

// Falta delete - por conta do rental e outras regras de negocio

module.exports = router;
