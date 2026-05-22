// ─── routes/productRoutes.js ─────────────────────────────────────────────────
const express = require('express');
const jwt     = require('jsonwebtoken');
const { Product } = require('../models');
const router  = express.Router();

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'shopease_secret'); next(); }
  catch { res.status(401).json({ message: 'Invalid token' }); }
};

// GET all products with optional search & category filter
router.get('/', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const query = {};
    if (search)   query.name     = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);

    const total    = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * limit).limit(Number(limit))
      .sort({ createdAt: -1 });
    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// POST create product (admin)
router.post('/', protect, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// PUT update product (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// DELETE product (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
