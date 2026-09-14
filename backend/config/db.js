/**
 * License: NPL-KK
 * File: config/db.js
 */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI tidak ditemukan di file .env');
    }
    await mongoose.connect(uri);
    console.log('[DB] MongoDB terhubung.');
  } catch (err) {
    console.error('[DB] Gagal konek MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

/**
 * License: NPL-KK
 */
