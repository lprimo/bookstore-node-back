const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Adicionar item no carrinho
router.post('/', cartController.addToCart);

// Delete item do carrinho
router.delete('/:bookId/:type', cartController.removeFromCart);

// Obter itens do carrinho
router.get('/', cartController.getCart);

module.exports = router;