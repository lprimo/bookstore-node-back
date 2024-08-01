const express = require('express');
const router = express.Router();
const RentalController = require('../controllers/rentalController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Register a new rental (protected route)
router.post('/', authMiddleware, RentalController.registerRental);

// Get all rentals (protected route)
router.get('/', authMiddleware, RentalController.getAllRental);

// Get rental by ID (protected route)
router.get('/:id', authMiddleware, RentalController.getRentalById);

// Update rental by ID (protected route)
router.patch('/:id', authMiddleware, RentalController.updateRental);

// Delete rental by ID (protected route)
router.delete('/:id', authMiddleware, RentalController.deleteRental);

module.exports = router;
