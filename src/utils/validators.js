const { check, validationResult } = require('express-validator');

exports.validateCustomer = [
    check('name')
        .optional()
        .isString()
        .withMessage('Name must be a string'),
    check('cpfCnpj')
        .optional()
        .isString()
        .withMessage('CPF/CNPJ must be valid'),
    check('birthDate')
        .optional()
        .isDate()
        .withMessage('Birth date must be a valid date'),
    check('address')
        .optional()
        .isString()
        .withMessage('Address must be a string'),
    check('telephone')
        .optional()
        .isString()
        .withMessage('Telephone must be a string'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Email must be valid'),
    check('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('civilStatus')
        .optional()
        .isIn(['single', 'married', 'divorced', 'widowed'])
        .withMessage('Civil status must be one of the following: single, married, divorced, widowed'),
    check('profession')
        .optional()
        .isString()
        .withMessage('Profession must be a string'),
    check('image')
        .optional()
        .isString()
        .withMessage('Image must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

exports.validateUser = [
    check('name')
        .optional()
        .isString()
        .withMessage('Name must be a string'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Email must be valid'),
    check('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('role')
        .optional()
        .isIn(['admin', 'employee'])
        .withMessage('Role must be either admin or employee'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
