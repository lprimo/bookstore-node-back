const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ['rental', 'sale'], required: true }
});

const CartSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [CartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Cart', CartSchema);