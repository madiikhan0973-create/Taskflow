// ─── models/User.js ──────────────────────────────────────────────────────────
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  isAdmin:   { type: Boolean, default: false },
  addresses: [{ street: String, city: String, country: String, zip: String }],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.matchPassword = async function (p) { return bcrypt.compare(p, this.password); };

const User = mongoose.model('User', userSchema);

// ─── models/Product.js ───────────────────────────────────────────────────────
const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true, min: 0 },
  category:    { type: String, required: true },
  stock:       { type: Number, default: 0 },
  imageUrl:    { type: String, default: '' },
  ratings:     [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, score: Number, comment: String }],
  avgRating:   { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ─── models/Order.js ─────────────────────────────────────────────────────────
const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     String,
  price:    Number,
  quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:         [orderItemSchema],
  totalPrice:    { type: Number, required: true },
  status:        { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: { street: String, city: String, country: String, zip: String },
  paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
  stripePaymentId: { type: String, default: '' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// ─── models/Cart.js ──────────────────────────────────────────────────────────
const cartSchema = new mongoose.Schema({
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, default: 1 } }],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = { User, Product, Order, Cart };
