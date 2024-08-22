const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const rentalRoutes = require('./routes/rental');
const customerRoutes = require('./routes/customer');
const cartRoutes = require('./routes/cart');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para segurança de cabeçalhos HTTP
app.use(helmet());

// Middleware para parsear JSON
app.use(express.json());

// Middleware para log de requisições HTTP
app.use(morgan('combined'));

// Middleware para compressão de respostas HTTP
app.use(compression());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rental', rentalRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/carts', cartRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;