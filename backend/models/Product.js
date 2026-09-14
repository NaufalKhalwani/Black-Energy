/**
 * License: NPL-KK
 * File: models/Product.js
 */
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Nama produk wajib diisi'], trim: true },
    calorie: { type: String, required: [true, 'Nilai kalori wajib diisi'], trim: true },
    origin: { type: String, required: [true, 'Asal tambang wajib diisi'], trim: true },
    description: { type: String, required: [true, 'Deskripsi wajib diisi'], trim: true },
    priceEstimate: { type: String, default: 'Hubungi Kontak', trim: true },
    imageUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);

/**
 * License: NPL-KK
 */
