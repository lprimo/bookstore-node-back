const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/rentalController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Registra uma nova locação (rota protegida)
router.post('/', authMiddleware, RentalController.registerRental);

// Obter todos os aluguéis (rota protegida)
router.get('/', authMiddleware, RentalController.getAllRental);

// Ober aluguel por ID (rota protegida)
router.get('/:id', authMiddleware, RentalController.getRentalById);

// Atualizar aluguel por ID (rota protegida)
router.patch('/:id', authMiddleware, RentalController.updateRental);

// Deletar aluguel por ID (rota protegida)
router.delete('/:id', authMiddleware, RentalController.deleteRental);

module.exports = router;
