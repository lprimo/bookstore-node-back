const { check, validationResult } = require('express-validator');

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
