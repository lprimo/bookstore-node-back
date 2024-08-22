const Cart = require('../models/cart');
const Book = require('../models/book');

exports.addToCart = async (req, res) => {
    const { customerId, bookId, quantity, type } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        let cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            cart = new Cart({ customer: customerId, items: [], totalPrice: 0 });
        }
        const cartItem = cart.items.find(item => item.book.toString() === bookId && item.type === type);
        if (cartItem) {
            cartItem.quantity += quantity;
            cartItem.price = book.saleValue * cartItem.quantity; // Adjust this if rental price is different
        } else {
            cart.items.push({ book: bookId, quantity, price: book.saleValue * quantity, type });
        }
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { customerId, bookId, type } = req.params;
    try {
        let cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.book.toString() !== bookId || item.type !== type);
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    const { customerId } = req.params;
    try {
        const cart = await Cart.findOne({ customer: customerId }).populate('items.book');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};