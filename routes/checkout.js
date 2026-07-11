const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Checkout API
router.post('/', async (req, res) => {
  const { customer_name, customer_phone, items } = req.body;
  // items should be an array of { product_id, quantity, price, name }

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let total_amount = 0;
    let orderDetails = `*New Order from ${customer_name}*\n*Phone:* ${customer_phone}\n\n*Items:*\n`;

    for (const item of items) {
      total_amount += item.quantity * item.price;
      orderDetails += `- ${item.name} (x${item.quantity}): Rp ${item.quantity * item.price}\n`;
    }

    orderDetails += `\n*Total:* Rp ${total_amount}`;

    // Insert Order
    const [orderResult] = await db.query(
      'INSERT INTO Orders (customer_name, customer_phone, total_amount) VALUES (?, ?, ?)',
      [customer_name, customer_phone, total_amount]
    );

    const orderId = orderResult.insertId;

    // Insert Order Items
    for (const item of items) {
      await db.query(
        'INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      // Update stock (optional but good practice)
      await db.query('UPDATE Products SET stock = stock - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    // Format WhatsApp Link
    // Defaulting to the owner's WhatsApp number. You should replace this with the actual WA number or use env variable.
    const waNumber = process.env.WA_OWNER_NUMBER || '6281234567890';
    const waMessage = encodeURIComponent(orderDetails);
    const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

    res.status(201).json({ message: 'Checkout successful', orderId, waLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
