# Full-Stack Coal Import Company Profile Model Project (FIXED & COMPLETE)
**License: NPL-KK**

Proyek ini adalah arsitektur lengkap (**Full-Stack**) untuk website Company Profile Importir Batu Bara menggunakan **React (Vite)** di Frontend, **Node.js (Express)** di Backend, dan **MongoDB** sebagai database. Desain menggunakan tema **Dark & Light Minimalist (Dominan Hitam & Putih)** dengan animasi interaktif batu bara bergerak menggunakan **Framer Motion & CSS Particle Effects**.

> Versi ini adalah revisi dari blueprint awal. Semua file yang sebelumnya hanya
> disebutkan namanya di struktur folder tapi tidak pernah dituliskan isinya
> sekarang sudah lengkap, dan seluruh bug pada kode yang sudah ada sudah dibenahi.
> Lihat bagian **📋 Changelog Perbaikan** di paling bawah.

## 🛠️ Tech Stack & Fitur Utama
1. **Frontend:** React.js, Tailwind CSS (Tema Hitam-Putih), Framer Motion (Animasi Batu Bara Bergerak), Axios, React Router.
2. **Backend:** Node.js, Express.js, Mongoose (MongoDB), CORS.
3. **Fitur Utama:**
   - **Interactive Landing Page:** Hero section dengan animasi batu bara melayang, detail spesifikasi (GAR/NAR).
   - **Product Catalog:** List produk batu bara berdasarkan kalori beserta tombol pemesanan.
   - **WhatsApp Integration:** Form pemesanan otomatis menyusun teks format order dan mengalihkan user ke WhatsApp admin.
   - **CRUD Admin Panel:** Manajemen data produk (Tambah, Lihat, Update, Hapus) untuk portofolio batu bara — halaman `/admin`.

---

## 📂 Struktur Folder Proyek

```text
coal-import-company/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FloatingCoal.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── OrderForm.jsx
    │   │   └── ProductCard.jsx
    │   ├── pages/
    │   │   ├── AdminPanel.jsx
    │   │   ├── LandingPage.jsx
    │   │   └── ProductCatalog.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    └── .env.example
```

---

## 💻 Kode Implementasi Lengkap — Backend

### 1. `backend/config/db.js`
```javascript
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
```

### 2. `backend/models/Product.js`
```javascript
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
```

### 3. `backend/controllers/productController.js`
```javascript
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
    // FIX: error validasi harus 400, bukan 500
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

// Read One (FIX: endpoint detail produk sebelumnya tidak ada)
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
    // FIX: runValidators ditambahkan agar validasi schema tetap berjalan saat update
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
    // FIX: sebelumnya tidak dicek apakah produk benar-benar ada / terhapus
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
```

### 4. `backend/routes/productRoutes.js` *(sebelumnya tidak ada — bug fatal)*
```javascript
/**
 * License: NPL-KK
 * File: routes/productRoutes.js
 */
const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;

/**
 * License: NPL-KK
 */
```

### 5. `backend/middleware/errorHandler.js` *(sebelumnya tidak ada)*
```javascript
/**
 * License: NPL-KK
 * File: middleware/errorHandler.js
 */
const notFound = (req, res, next) => {
  res.status(404).json({ error: `Route tidak ditemukan: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: err.message || 'Terjadi kesalahan pada server'
  });
};

module.exports = { notFound, errorHandler };

/**
 * License: NPL-KK
 */
```

### 6. `backend/server.js` *(sebelumnya tidak ada — proyek tidak akan bisa dijalankan tanpa ini)*
```javascript
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

// FIX: CORS & body parser wajib ada agar frontend bisa memanggil API ini
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
```

### 7. `backend/.env.example`
```env
# License: NPL-KK
MONGO_URI=mongodb://localhost:27017/coal_db
PORT=5000
```

### 8. `backend/package.json`
```json
{
  "name": "coal-import-backend",
  "version": "1.0.0",
  "license": "NPL-KK",
  "description": "Backend for Coal Import Company Profile - License: NPL-KK",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.5.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

---

## 💻 Kode Implementasi Lengkap — Frontend

### 9. `frontend/src/components/FloatingCoal.jsx`
```jsx
/**
 * License: NPL-KK
 * File: components/FloatingCoal.jsx
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingCoal() {
  // FIX: Math.random() dulunya dipanggil langsung di JSX, menyebabkan posisi
  // partikel berubah acak setiap kali parent re-render. Sekarang dikunci pakai useMemo.
  const coals = useMemo(
    () =>
      Array.from({ length: 8 }).map(() => ({
        size: Math.random() * 40 + 20,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 6 + 6
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {coals.map((c, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-br from-neutral-800 to-black rounded-lg shadow-xl"
          style={{
            width: `${c.size}px`,
            height: `${c.size}px`,
            left: `${c.left}%`,
            top: `${c.top}%`,
            opacity: 0.15,
            clipPath:
              'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
          animate={{ y: [0, -40, 0], rotate: [0, 360] }}
          transition={{ duration: c.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/**
 * License: NPL-KK
 */
```

### 10. `frontend/src/components/Navbar.jsx` *(sebelumnya tidak ada)*
```jsx
/**
 * License: NPL-KK
 * File: components/Navbar.jsx
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-black uppercase tracking-tighter text-lg text-neutral-950">
          Black <span className="text-neutral-400">Energy</span>
        </Link>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-neutral-700">
          <Link to="/" className="hover:text-black transition-colors">Beranda</Link>
          <a href="/#products" className="hover:text-black transition-colors">Produk</a>
          <Link to="/admin" className="hover:text-black transition-colors">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

/**
 * License: NPL-KK
 */
```

### 11. `frontend/src/components/ProductCard.jsx` *(sebelumnya tidak ada)*
```jsx
/**
 * License: NPL-KK
 * File: components/ProductCard.jsx
 */
import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onOrder }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="border border-neutral-200 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow"
    >
      <div>
        <h4 className="text-lg font-black uppercase tracking-tight text-neutral-950">{product.name}</h4>
        <p className="text-xs font-bold uppercase text-neutral-400 mt-1">Kalori: {product.calorie}</p>
        <p className="text-xs font-bold uppercase text-neutral-400">Asal: {product.origin}</p>
        <p className="text-sm text-neutral-600 mt-3">{product.description}</p>
        <p className="text-sm font-bold text-neutral-950 mt-3">{product.priceEstimate}</p>
      </div>
      <button
        onClick={() => onOrder(product)}
        className="mt-6 bg-black text-white hover:bg-neutral-800 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
      >
        Pesan Produk Ini
      </button>
    </motion.div>
  );
}

/**
 * License: NPL-KK
 */
```

### 12. `frontend/src/components/OrderForm.jsx`
```jsx
/**
 * License: NPL-KK
 * File: components/OrderForm.jsx
 */
import React, { forwardRef, useState } from 'react';

const ADMIN_WHATSAPP = '6281234567890'; // Ganti dengan nomor WA perusahaan Anda

const OrderForm = forwardRef(function OrderForm({ selectedProduct }, ref) {
  const [formData, setFormData] = useState({ companyName: '', tonnage: '', destination: '' });

  const handleOrder = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const text =
      `Halo Admin, kami ingin memesan batu bara.\n\n` +
      `*Produk:* ${selectedProduct?.name || 'Custom Spec'}\n` +
      `*Perusahaan:* ${formData.companyName}\n` +
      `*Jumlah (Ton):* ${formData.tonnage} Ton\n` +
      `*Tujuan Pengiriman:* ${formData.destination}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encodedText}`, '_blank');

    // FIX: form sebelumnya tidak pernah direset setelah submit
    setFormData({ companyName: '', tonnage: '', destination: '' });
  };

  return (
    <form
      ref={ref}
      onSubmit={handleOrder}
      className="max-w-md mx-auto bg-neutral-50 p-8 border border-neutral-200 shadow-2xl"
    >
      <h3 className="text-xl font-black uppercase mb-6 tracking-tight text-neutral-950">
        Form Pemesanan Cepat
      </h3>

      <div className="mb-4">
        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Produk Terpilih</label>
        <input
          type="text"
          readOnly
          value={selectedProduct?.name || 'Silahkan pilih produk di bawah'}
          className="w-full bg-neutral-200 border border-neutral-300 p-3 text-sm font-semibold text-neutral-800"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Nama Perusahaan</label>
        <input
          type="text"
          required
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Volume (Ton)</label>
        <input
          type="number"
          min="1"
          required
          value={formData.tonnage}
          onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
          className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
          Pelabuhan / Lokasi Tujuan
        </label>
        <input
          type="text"
          required
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black"
        />
      </div>

      <button
        type="submit"
        disabled={!selectedProduct}
        className="w-full bg-black text-white hover:bg-neutral-800 py-4 font-bold uppercase text-xs tracking-widest disabled:bg-neutral-300 transition-colors"
      >
        Kirim ke WhatsApp Admin
      </button>
    </form>
  );
});

export default OrderForm;

/**
 * License: NPL-KK
 */
```

### 13. `frontend/src/services/api.js` *(sebelumnya tidak ada — URL API di-hardcode berulang)*
```javascript
/**
 * License: NPL-KK
 * File: services/api.js
 */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;

/**
 * License: NPL-KK
 */
```

### 14. `frontend/src/pages/ProductCatalog.jsx` *(sebelumnya tidak ada sama sekali — mengakibatkan import error di LandingPage)*
```jsx
/**
 * License: NPL-KK
 * File: pages/ProductCatalog.jsx
 */
import React, { useEffect, useRef, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import OrderForm from '../components/OrderForm';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((res) => {
        if (mounted) setProducts(res.data);
      })
      .catch(() => {
        if (mounted) setError('Gagal memuat produk. Pastikan backend berjalan.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleOrder = (product) => {
    setSelectedProduct(product);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-12 text-neutral-950">
        Katalog Produk Batu Bara
      </h2>

      {loading && <p className="text-center text-neutral-500">Memuat produk...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-neutral-500">Belum ada produk tersedia.</p>
      )}

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onOrder={handleOrder} />
        ))}
      </div>

      <OrderForm ref={formRef} selectedProduct={selectedProduct} />
    </div>
  );
}

/**
 * License: NPL-KK
 */
```

### 15. `frontend/src/pages/LandingPage.jsx`
```jsx
/**
 * License: NPL-KK
 * File: pages/LandingPage.jsx
 */
import React from 'react';
import FloatingCoal from '../components/FloatingCoal';
import ProductCatalog from './ProductCatalog';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="bg-white text-neutral-900 font-sans min-h-screen relative selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 border-b border-neutral-200">
        <FloatingCoal />
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-neutral-950 z-10">
          BLACK{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-black">
            ENERGY
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-neutral-600 font-medium z-10">
          Suplier & Importir Utama Batu Bara Berkualitas Tinggi. Menghubungkan Sumber Daya Global
          dengan Kebutuhan Industri Anda.
        </p>
        <div className="mt-8 z-10">
          <a
            href="#products"
            className="bg-black text-white hover:bg-neutral-800 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all"
          >
            Lihat Produk
          </a>
        </div>
      </section>

      {/* Detail Spesifikasi Informasi */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-neutral-950 text-white">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="border-l-4 border-white pl-6">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Standar GAR & NAR</h3>
            <p className="text-neutral-400 text-sm">
              Menyediakan berbagai spek kalori dari GAR 3800 hingga NAR 6000 siap supply skala besar.
            </p>
          </div>
          <div className="border-l-4 border-neutral-700 pl-6">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Logistik Global</h3>
            <p className="text-neutral-400 text-sm">
              Armada kapal vessel dan tongkang handal yang menjamin ketepatan waktu bongkar muat.
            </p>
          </div>
          <div className="border-l-4 border-neutral-500 pl-6">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Legalitas Aman</h3>
            <p className="text-neutral-400 text-sm">
              Dokumen ekspor-impor lengkap (Rencana Kerja, IUP-OPK, dan Certificate of Analysis).
            </p>
          </div>
        </div>
      </section>

      {/* Catalog & Form Section */}
      <section id="products" className="py-24 bg-white">
        <ProductCatalog />
      </section>
    </div>
  );
}

/**
 * License: NPL-KK
 */
```

### 16. `frontend/src/pages/AdminPanel.jsx` *(sebelumnya tidak ada — padahal "CRUD Admin Panel" disebut sebagai fitur utama)*
```jsx
/**
 * License: NPL-KK
 * File: pages/AdminPanel.jsx
 */
import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';

const emptyForm = { name: '', calorie: '', origin: '', description: '', priceEstimate: '' };

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setError('Gagal memuat data produk.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setError(err?.response?.data?.error || 'Gagal menyimpan produk.');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      calorie: product.calorie,
      origin: product.origin,
      description: product.description,
      priceEstimate: product.priceEstimate
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      setError('Gagal menghapus produk.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-28 pb-20 px-6">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Admin Panel Produk</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 bg-neutral-50 border border-neutral-200 p-6 mb-12">
          <input name="name" required placeholder="Nama Produk (Coal GAR 4200)" value={form.name} onChange={handleChange} className="border border-neutral-300 p-3 text-sm" />
          <input name="calorie" required placeholder="Kalori" value={form.calorie} onChange={handleChange} className="border border-neutral-300 p-3 text-sm" />
          <input name="origin" required placeholder="Asal Tambang" value={form.origin} onChange={handleChange} className="border border-neutral-300 p-3 text-sm" />
          <input name="priceEstimate" placeholder="Estimasi Harga" value={form.priceEstimate} onChange={handleChange} className="border border-neutral-300 p-3 text-sm" />
          <textarea name="description" required placeholder="Deskripsi" value={form.description} onChange={handleChange} className="border border-neutral-300 p-3 text-sm md:col-span-2" rows={3} />
          <div className="flex gap-3 md:col-span-2">
            <button type="submit" className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800">
              {editingId ? 'Update Produk' : 'Tambah Produk'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="border border-neutral-300 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-100">
                Batal
              </button>
            )}
          </div>
        </form>

        {loading ? (
          <p className="text-neutral-500">Memuat data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-neutral-200">
              <thead className="bg-neutral-950 text-white uppercase text-xs">
                <tr>
                  <th className="p-3 text-left">Nama</th>
                  <th className="p-3 text-left">Kalori</th>
                  <th className="p-3 text-left">Asal</th>
                  <th className="p-3 text-left">Harga</th>
                  <th className="p-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-t border-neutral-200">
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3">{p.calorie}</td>
                    <td className="p-3">{p.origin}</td>
                    <td className="p-3">{p.priceEstimate}</td>
                    <td className="p-3 flex gap-2">
                      <button onClick={() => handleEdit(p)} className="text-xs font-bold uppercase underline">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="text-xs font-bold uppercase text-red-600 underline">Hapus</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-neutral-500">Belum ada produk.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * License: NPL-KK
 */
```

### 17. `frontend/src/App.jsx` *(sebelumnya tidak ada — tidak ada routing sama sekali)*
```jsx
/**
 * License: NPL-KK
 * File: App.jsx
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * License: NPL-KK
 */
```

### 18. `frontend/src/main.jsx` *(sebelumnya tidak ada)*
```jsx
/**
 * License: NPL-KK
 * File: main.jsx
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * License: NPL-KK
 */
```

### 19. `frontend/src/index.css` *(sebelumnya tidak ada — Tailwind tidak akan aktif tanpa ini)*
```css
/* License: NPL-KK */
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
}

/* License: NPL-KK */
```

### 20. `frontend/tailwind.config.js`
```javascript
/** License: NPL-KK */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
};
/** License: NPL-KK */
```

### 21. `frontend/postcss.config.js`
```javascript
/** License: NPL-KK */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
/** License: NPL-KK */
```

### 22. `frontend/vite.config.js`
```javascript
/** License: NPL-KK */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});
/** License: NPL-KK */
```

### 23. `frontend/index.html`
```html
<!-- License: NPL-KK -->
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Black Energy | Importir Batu Bara</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
<!-- License: NPL-KK -->
```

### 24. `frontend/.env.example`
```env
# License: NPL-KK
VITE_API_URL=http://localhost:5000/api
```

### 25. `frontend/package.json`
```json
{
  "name": "coal-import-frontend",
  "version": "1.0.0",
  "license": "NPL-KK",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "framer-motion": "^11.5.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "vite": "^5.4.6"
  }
}
```

---

## 🚀 Panduan Menjalankan Proyek

> Salin folder `backend/` dan `frontend/` di atas ke dalam direktori kerja Anda, misalnya `D:\fullstack\batubara\`.

### 1. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
API berjalan di `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Buka `http://localhost:5173` (landing page) dan `http://localhost:5173/admin` (admin panel).

### 3. Sebelum produksi
- Ganti `ADMIN_WHATSAPP` di `OrderForm.jsx` dengan nomor WhatsApp asli.
- Ganti `MONGO_URI` sesuai database Anda (lokal/Atlas).

---

## 📋 Changelog Perbaikan (dari blueprint awal)

| # | Masalah di Blueprint Awal | Perbaikan |
|---|---|---|
| 1 | `server.js` tidak pernah dibuat | Dibuat lengkap dengan CORS, body-parser, error handler |
| 2 | `routes/productRoutes.js` tidak ada | Dibuat, menghubungkan semua endpoint CRUD |
| 3 | `App.jsx`, `main.jsx`, `index.css`, `index.html`, `vite.config.js` tidak ada | Semua dibuat, proyek siap dijalankan |
| 4 | `ProductCatalog.jsx`, `AdminPanel.jsx`, `Navbar.jsx` diimpor tapi tidak ada filenya | Dibuat lengkap dan fungsional |
| 5 | `createProduct`/`updateProduct` balas `500` untuk error validasi | Diperbaiki jadi `400` |
| 6 | `updateProduct` tidak pakai `runValidators` | Ditambahkan |
| 7 | `updateProduct`/`deleteProduct` tidak cek dokumen ditemukan | Sekarang balas `404` jika tidak ada |
| 8 | Tidak ada validasi format ObjectId | Ditambahkan `isValidId()` |
| 9 | `FloatingCoal.jsx` pakai `Math.random()` langsung di JSX | Dikunci dengan `useMemo` |
| 10 | `OrderForm` tidak reset setelah submit | Ditambahkan reset state |
| 11 | Tidak ada endpoint detail produk (`GET /:id`) | Ditambahkan |
| 12 | URL API di-hardcode di banyak tempat | Disentralkan di `services/api.js` |
| 13 | Tidak ada Admin Panel meski disebut fitur utama | Dibuat CRUD penuh |
| 14 | Tidak ada routing halaman | `react-router-dom` ditambahkan |
| 15 | Tidak ada `.env.example` | Ditambahkan untuk backend & frontend |

---
**License: NPL-KK**
