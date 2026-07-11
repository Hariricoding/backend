const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productsRoute = require('./routes/products');
const checkoutRoute = require('./routes/checkout');
const ordersRoute = require('./routes/orders');

app.use('/api/products', productsRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/orders', ordersRoute);

// Basic Route
app.get('/', (req, res) => {
  res.send('UAS Store Backend API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
