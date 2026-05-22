const express = require('express');
const jwt     = require('jsonwebtoken');
const { Cart } = require('../models');
const router  = express.Router();

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'shopease_secret'); next(); }
  catch { res.status(401).json({ message: 'Invalid token' }); }
};

// GET cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price imageUrl');
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// POST add to cart
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const idx = cart.items.findIndex((i) => i.product.toString() === productId);
    if (idx > -1) cart.items[idx].quantity += quantity;
    else           cart.items.push({ product: productId, quantity });

    await cart.save();
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// PUT update item quantity
router.put('/update', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) {
      if (quantity <= 0) cart.items = cart.items.filter((i) => i.product.toString() !== productId);
      else item.quantity = quantity;
    }
    await cart.save();
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// DELETE remove item from cart
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// DELETE clear cart
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
