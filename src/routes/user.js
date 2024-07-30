const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { validateUser } = require('../middleware/validators');

// Register a new user (protected route, admin only)
router.post('/register', authMiddleware, adminMiddleware, validateUser, UserController.registerUser);

// Get all users (protected route, admin only)
router.get('/', authMiddleware, adminMiddleware, UserController.getAllUsers);

// Get user by ID (protected route, admin only)
router.get('/:id', authMiddleware, adminMiddleware, UserController.getUserById);

// Update user by ID (partial update, protected route, admin only)
router.patch('/:id', authMiddleware, adminMiddleware, validateUser, UserController.updateUser);

// Delete user by ID (protected route, admin only)
router.delete('/:id', authMiddleware, adminMiddleware, UserController.deleteUser);

module.exports = router;
