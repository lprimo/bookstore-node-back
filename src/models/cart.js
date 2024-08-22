const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subdocument schema for cart items
const CartItemSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ['rental', 'sale'], required: true }
}, { _id: false });

// Main cart schema
const CartSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
    items: [CartItemSchema],
    totalPrice: { type: Number, required: true, default: 0, min: 0 }
}, { timestamps: true });

// Middleware to calculate total price before saving
CartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    next();
});

// Ensure unique customer cart
CartSchema.index({ customer: 1 }, { unique: true });

module.exports = mongoose.model('Cart', CartSchema);