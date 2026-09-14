/**
 * License: NPL-KK
 * File: pages/AdminPanel.jsx
 * Enterprise Admin Commodity Management Terminal
 */
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';

const emptyForm = {
  name: '',
  calorie: '',
  origin: '',
  description: '',
  priceEstimate: ''
};

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then((res) => {
        setProducts(res.data || []);
      })
      .catch(() => {
        setError('Gagal terhubung ke API backend. Pastikan server running di port 5000.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.calorie.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
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
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        setSuccessMsg(`Produk "${form.name}" berhasil diperbarui!`);
      } else {
        await createProduct(form);
        setSuccessMsg(`Produk baru "${form.name}" berhasil ditambahkan!`);
      }
      resetForm();
      loadProducts();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err?.response?.data?.error || 'Terjadi kesalahan saat menyimpan produk.');
    }
  };

  const handleDelete = async (id, productName) => {
    if (!window.confirm(`Konfirmasi: Hapus data batu bara "${productName}" dari database?`)) return;
    setError('');
    setSuccessMsg('');
    try {
      await deleteProduct(id);
      setSuccessMsg(`Produk "${productName}" berhasil dihapus.`);
      loadProducts();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      setError('Gagal menghapus produk dari server.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-neutral-100 font-sans pt-28 pb-20 px-4 sm:px-6 relative z-10">
      <Navbar />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header Terminal Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Commodity Inventory Management
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
              Admin Panel Control Center
            </h1>
            <p className="text-neutral-400 text-xs mt-1">
              Manajemen Katalog Spesifikasi & Portofolio Batu Bara (Black Energy Enterprise)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreateModal}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 px-5 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2"
            >
              <span>+ Tambah Produk Baru</span>
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between"
            >
              <span>⚠️ {error}</span>
              <button onClick={() => setError('')} className="text-xs uppercase hover:underline">Tutup</button>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between"
            >
              <span>✅ {successMsg}</span>
              <button onClick={() => setSuccessMsg('')} className="text-xs uppercase hover:underline">Tutup</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Analytics Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">Total Item Catalog</span>
            <p className="text-3xl font-black text-white mt-1">{products.length}</p>
            <span className="text-[10px] text-emerald-400 font-bold mt-1 block">Live Connected Database</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">Low Calorie (GAR &lt; 4000)</span>
            <p className="text-3xl font-black text-amber-400 mt-1">
              {products.filter((p) => p.calorie.includes('3800') || p.calorie.includes('3400')).length}
            </p>
            <span className="text-[10px] text-neutral-400 font-bold mt-1 block">Sub-Bituminous</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">Mid Calorie (GAR 4000-5000)</span>
            <p className="text-3xl font-black text-white mt-1">
              {products.filter((p) => p.calorie.includes('4200') || p.calorie.includes('5000')).length}
            </p>
            <span className="text-[10px] text-neutral-400 font-bold mt-1 block">Export Grade</span>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">High Calorie (GAR 5800+)</span>
            <p className="text-3xl font-black text-amber-400 mt-1">
              {products.filter((p) => p.calorie.includes('5800') || p.calorie.includes('6000') || p.calorie.includes('6500')).length}
            </p>
            <span className="text-[10px] text-neutral-400 font-bold mt-1 block">Bituminous Premium</span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari berdasarkan nama, kalori, atau tambang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-neutral-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs text-neutral-400 font-semibold">
            Menampilkan <span className="text-amber-400 font-bold">{filteredProducts.length}</span> dari {products.length} item
          </div>
        </div>

        {/* Data Table Terminal */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-neutral-400 text-sm">
              <span className="inline-block animate-spin mr-2">⚙️</span> Memuat inventaris produk...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-widest text-[10px] border-b border-neutral-800">
                  <tr>
                    <th className="py-4 px-6">Produk Batu Bara</th>
                    <th className="py-4 px-4">Spesifikasi Kalori</th>
                    <th className="py-4 px-4">Asal Tambang</th>
                    <th className="py-4 px-4">Estimasi Harga</th>
                    <th className="py-4 px-6 text-right">Aksi Kelola</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-neutral-800/40 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-black text-sm text-white group-hover:text-amber-400 transition-colors">
                          {p.name}
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1 max-w-xs">
                          {p.description}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {p.calorie}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-semibold text-neutral-300">
                          📍 {p.origin}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-white bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                          {p.priceEstimate}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 border border-neutral-700 px-3 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id, p.name)}
                            className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 px-3 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-neutral-500 text-xs">
                        Tidak ada data produk batu bara yang sesuai pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Form Drawer / Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-neutral-950 border border-amber-500/40 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl z-10 my-8"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-black uppercase text-white tracking-wide">
                    {editingId ? 'Edit Spesifikasi Produk' : 'Tambah Produk Batu Bara Baru'}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    {editingId ? 'Perbarui data komoditas dalam katalog' : 'Masukkan rincian spesifikasi komoditas batu bara'}
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Nama Produk Komoditas *
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Contoh: Coal GAR 4200 (Medium Calorie)"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Nilai Kalori (GAR/NAR) *
                    </label>
                    <input
                      name="calorie"
                      required
                      placeholder="GAR 4200 / NAR 3900"
                      value={form.calorie}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Asal Tambang / Site *
                    </label>
                    <input
                      name="origin"
                      required
                      placeholder="Kalimantan Timur / Sumatra"
                      value={form.origin}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Estimasi Indikasi Harga
                  </label>
                  <input
                    name="priceEstimate"
                    placeholder="US$ 62 - 70 / Ton (FOB Barge)"
                    value={form.priceEstimate}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Deskripsi & Karakteristik Pembakaran *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Jelaskan karakteristik pembakaran, HGI, total sulfur, dan sektor industri pengguna..."
                    value={form.description}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 px-5 py-3 rounded-lg font-bold text-xs uppercase tracking-wider"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20"
                  >
                    {editingId ? 'Simpan Perubahan' : 'Tambah Ke Katalog'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * License: NPL-KK
 */
