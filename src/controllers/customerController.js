const Customer = require('../models/customer');
const Rental = require('../models/rental');
const { validationResult } = require('express-validator');

exports.registerCustomer = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, cpfCnpj, birthDate, address, telephone, email, password, civilStatus, profession, image } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer already exists' });
        }

        const customer = new Customer({
            name,
            cpfCnpj,
            birthDate,
            address,
            telephone,
            email,
            password,
            civilStatus,
            profession,
            image
        });

        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, cpfCnpj, birthDate, address, telephone, email, password, civilStatus, profession, image } = req.body;

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        if (name) customer.name = name;
        if (cpfCnpj) customer.cpfCnpj = cpfCnpj;
        if (birthDate) customer.birthDate = birthDate;
        if (address) customer.address = address;
        if (telephone) customer.telephone = telephone;
        if (email) customer.email = email;
        if (password) customer.password = password;
        if (civilStatus) customer.civilStatus = civilStatus;
        if (profession) customer.profession = profession;
        if (image) customer.image = image;

        await customer.save();
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findOne({ customer: id });
        if (rental) {
            return res.status(400).json({ message: 'Rental found for the given customer ID' });
        }

        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json({ message: `Customer removed: ${customer.name}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
