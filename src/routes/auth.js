const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authLimiter } = require('../middleware/authMiddleware');

// Login
router.post('/login', authLimiter, AuthController.login);

module.exports = router;
