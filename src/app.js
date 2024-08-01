const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const rentalRoutes = require('./routes/rental');
const customerRoutes = require('./routes/customer');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rental', rentalRoutes);
app.use('/api/customers', customerRoutes);
