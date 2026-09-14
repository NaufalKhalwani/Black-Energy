/**
 * License: NPL-KK
 * File: components/OrderForm.jsx
 */
import React, { forwardRef, useState } from 'react';

const ADMIN_WHATSAPP = import.meta.env.VITE_ADMIN_WHATSAPP || '6281234567890';

const OrderForm = forwardRef(function OrderForm({ selectedProduct }, ref) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    tonnage: '',
    destination: '',
    notes: ''
  });

  const handleOrder = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const text =
      `*PERMINTAAN PENAWARAN BATU BARA - BLACK ENERGY*\n` +
      `-----------------------------------------\n` +
      `*Produk / Spec:* ${selectedProduct?.name || 'Custom Spec'}\n` +
      `*Kalori:* ${selectedProduct?.calorie || 'GAR'}\n` +
      `*Asal Tambang:* ${selectedProduct?.origin || 'Kalimantan / Sumatra'}\n` +
      `-----------------------------------------\n` +
      `*Nama Perusahaan:* ${formData.companyName}\n` +
      `*Email Kontak:* ${formData.email || '-'}\n` +
      `*Volume Pemesanan:* ${formData.tonnage} Ton\n` +
      `*Pelabuhan Tujuan:* ${formData.destination}\n` +
      `*Catatan Tambahan:* ${formData.notes || 'Mohon kirimkan COA (Certificate of Analysis) & FOT/FOB price.'}\n\n` +
      `Terima kasih.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encodedText}`, '_blank');

    setFormData({ companyName: '', email: '', tonnage: '', destination: '', notes: '' });
  };

  return (
    <div ref={ref} id="order-form" className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
          Fast Trade Terminal
        </span>
        <h3 className="text-3xl font-black uppercase tracking-tight text-white mt-3">
          Formulir Pemesanan & Penawaran
        </h3>
        <p className="text-neutral-400 text-xs mt-1">
          Isi detail kebutuhan volume batu bara Anda. Tim Sales kami akan memproses penawaran resmi via WhatsApp Admin.
        </p>
      </div>

      <form onSubmit={handleOrder} className="space-y-5">
        {/* Selected Product Banner */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-500 block">Produk Batu Bara Terpilih</span>
            <span className="text-sm font-black text-amber-400">
              {selectedProduct ? `${selectedProduct.name} (${selectedProduct.calorie})` : 'Pilih produk pada katalog di atas'}
            </span>
          </div>
          {selectedProduct && (
            <span className="text-[10px] font-bold uppercase bg-amber-500 text-neutral-950 px-2.5 py-1 rounded">
              Ready Supply
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Nama Perusahaan / Buyer *
            </label>
            <input
              type="text"
              required
              placeholder="PT. Energi Indonesia Tbk"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Email Perusahaan
            </label>
            <input
              type="email"
              placeholder="procurement@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Volume Tonnage */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Volume Kebutuhan (Ton) *
            </label>
            <input
              type="number"
              min="100"
              required
              placeholder="Min 10,000 Ton"
              value={formData.tonnage}
              onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Destination Port */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Pelabuhan / Lokasi Tujuan *
            </label>
            <input
              type="text"
              required
              placeholder="Pelabuhan Ciwandan / Taboneo / Buyer Port"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
            Catatan Layanan / Spesifikasi Tambahan
          </label>
          <textarea
            rows={3}
            placeholder="Tuliskan jika membutuhkan metode pengiriman FOT, FOB Barge, atau CIF..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={!selectedProduct}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 py-4 rounded-xl font-black uppercase text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-amber-500/20 active:scale-98 flex items-center justify-center gap-3"
        >
          <span>Kirim Penawaran Langsung ke WhatsApp Admin</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
        </button>
      </form>
    </div>
  );
});

export default OrderForm;

/**
 * License: NPL-KK
 */
