const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^(97(8|9))?\d{9}(\d|X)$/.test(v);
            },
            message: props => `${props.value} is not a valid ISBN number!`
        }
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Book', bookSchema);
