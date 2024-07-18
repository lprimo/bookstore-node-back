const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to bookstore back end!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
