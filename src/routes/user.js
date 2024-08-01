const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const { validateUser } = require('../utils/validators');

// Cadastrar um novo usuário ('rota protegida, somente administrador')
router.post('/register', authMiddleware, adminMiddleware, validateUser, UserController.registerUser);

// Obter todos os usuários ('rota protegida, somente administrador')
router.get('/', authMiddleware, adminMiddleware, UserController.getAllUsers);

// Ober usuário por ID ('rota protegida, somente administrador')
router.get('/:id', authMiddleware, adminMiddleware, UserController.getUserById);

// Atualizar usuário por ID (atualização parcial, 'rota protegida, somente administrador')
router.patch('/:id', authMiddleware, adminMiddleware, validateUser, UserController.updateUser);

// Deletar usuário por ID ('rota protegida, somente administrador')
router.delete('/:id', authMiddleware, adminMiddleware, UserController.deleteUser);

module.exports = router;
