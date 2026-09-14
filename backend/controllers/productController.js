/**
 * License: NPL-KK
 * File: controllers/productController.js
 */
const mongoose = require('mongoose');
const Product = require('../models/Product');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    // Bug fix: validation error harus 400, bukan 500
    res.status(400).json({ error: err.message });
  }
};

// Read All
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One (bug fix: sebelumnya tidak ada endpoint detail produk)
exports.getProductById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }
    // Bug fix: runValidators ditambahkan agar validasi schema tetap berjalan saat update
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: 'ID produk tidak valid' });
    }
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * License: NPL-KK
 */
