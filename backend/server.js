/**
 * License: NPL-KK
 * File: server.js
 * Coal Import Company Profile - Backend Entry Point
 */
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Bug fix: CORS & body parser wajib ada, tidak disebutkan implementasinya di blueprint asli
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Coal Import API is running. License: NPL-KK' });
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Berjalan di port ${PORT}`);
});

/**
 * License: NPL-KK
 */
