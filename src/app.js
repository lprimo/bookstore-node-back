const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/book');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

app.use('/api/books', bookRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
