const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all orders (for Admin Dashboard)
router.get('/', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM Orders ORDER BY created_at DESC');
    // Fetch items for each order (basic implementation)
    for (let order of orders) {
      const [items] = await db.query(
        'SELECT oi.*, p.name FROM Order_Items oi JOIN Products p ON oi.product_id = p.id WHERE oi.order_id = ?',
        [order.id]
      );
      order.items = items;
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
