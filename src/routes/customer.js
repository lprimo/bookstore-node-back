const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { validateCustomer } = require('../utils/validators');

// Registrar um novo cliente
router.post('/', validateCustomer, customerController.registerCustomer);

// Obter todos os clientes
router.get('/', customerController.getAllCustomers);

// Obter cliente por ID
router.get('/:id', customerController.getCustomerById);

// Atualizar cliente por ID (atualização parcial)
router.patch('/:id', validateCustomer, customerController.updateCustomer);

// Deletar cliente por ID
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
