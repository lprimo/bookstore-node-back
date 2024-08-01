const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cpfCnpj: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    civilStatus: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

customerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Customer', customerSchema);
