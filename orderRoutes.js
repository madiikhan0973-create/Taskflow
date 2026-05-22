// ─── routes/orderRoutes.js ───────────────────────────────────────────────────
const express = require('express');
const jwt     = require('jsonwebtoken');
const { Order, Product } = require('../models');
const router  = express.Router();

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'shopease_secret'); next(); }
  catch { res.status(401).json({ message: 'Invalid token' }); }
};

// POST create order
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order' });

    // Calculate total from DB prices (never trust client-side price)
    let totalPrice = 0;
    const enriched = await Promise.all(items.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) throw new Error(`Product ${item.product} not found`);
      totalPrice += product.price * item.quantity;
      return { product: product._id, name: product.name, price: product.price, quantity: item.quantity };
    }));

    const order = await Order.create({ user: req.user.id, items: enriched, totalPrice, shippingAddress });
    res.status(201).json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// GET my orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// GET single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// PUT update order status (admin)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
