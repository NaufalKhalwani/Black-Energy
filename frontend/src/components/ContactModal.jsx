/**
 * License: NPL-KK
 * File: components/ContactModal.jsx
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_WHATSAPP = import.meta.env.VITE_ADMIN_WHATSAPP || '6281234567890';

export default function ContactModal({ isOpen, onClose, initialProduct = null }) {
  const [inquiryType, setInquiryType] = useState('SPOT'); // SPOT, LTC, COA, PRICE
  const [formData, setFormData] = useState({
    companyName: '',
    buyerName: '',
    phone: '',
    tonnage: '50000',
    incoterm: 'FOB', // FOB, FOT, CIF
    destinationPort: '',
    customCalorie: initialProduct?.calorie || 'GAR 4200'
  });

  if (!isOpen) return null;

  const handleSendWhatsApp = (e) => {
    e.preventDefault();

    let inquiryTitle = 'PERMINTAAN KONTRAK SPOT (SINGLE SHIPMENT)';
    if (inquiryType === 'LTC') inquiryTitle = 'PENGAJUAN KONTRAK JANGKA PANJANG (LTC)';
    if (inquiryType === 'COA') inquiryTitle = 'PERMINTAAN LAPORAN HASIL UJI COA (SUCOFINDO/SGS)';
    if (inquiryType === 'PRICE') inquiryTitle = 'KONSULTASI INDIKASI HARGA (FOB/CIF/FOT)';

    const message =
      `*🏛️ TRADE CONSULTATION TERMINAL - BLACK ENERGY*\n` +
      `===========================================\n` +
      `*Kategori Pengajuan:* ${inquiryTitle}\n` +
      `-------------------------------------------\n` +
      `*Perusahaan Buyer:* ${formData.companyName}\n` +
      `*Perwakilan / PIC:* ${formData.buyerName}\n` +
      `*Nomor Kontak:* ${formData.phone}\n` +
      `-------------------------------------------\n` +
      `*Spec Batu Bara:* ${formData.customCalorie}\n` +
      `*Volume Kebutuhan:* ${Number(formData.tonnage).toLocaleString('id-ID')} Ton\n` +
      `*Skema Pengiriman:* ${formData.incoterm} (${formData.destinationPort || 'Pelabuhan Tujuan'})\n` +
      `===========================================\n` +
      `Mohon tim sales executive segera menghubungi kami. Terima kasih.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-neutral-950 border border-amber-500/40 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Top Bar Header */}
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <h3 className="font-black text-base uppercase text-white tracking-wide">
                  Trade Executive Desk
                </h3>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                  Live Response SLA &lt; 15 Menit
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <form onSubmit={handleSendWhatsApp} className="p-6 sm:p-8 space-y-6">
            {/* Tab Selection */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-2">
                Pilih Kategori Layanan / Transaksi:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'SPOT', label: 'Kontrak Spot', icon: '🚢' },
                  { id: 'LTC', label: 'Kontrak LTC', icon: '📜' },
                  { id: 'COA', label: 'Minta COA Lab', icon: '📄' },
                  { id: 'PRICE', label: 'Indikasi Harga', icon: '💬' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInquiryType(tab.id)}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                      inquiryType === tab.id
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span className="block text-base mb-1">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spec Selection Display */}
            <div className="bg-neutral-900/90 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 block">Grade Kebutuhan</span>
                <span className="text-sm font-black text-amber-400">{formData.customCalorie}</span>
              </div>
              <select
                value={formData.customCalorie}
                onChange={(e) => setFormData({ ...formData, customCalorie: e.target.value })}
                className="bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="GAR 3800 (Low Calorie)">GAR 3800 (Low Calorie)</option>
                <option value="GAR 4200 (Medium Calorie)">GAR 4200 (Medium Calorie)</option>
                <option value="GAR 5000 (Mid-High Calorie)">GAR 5000 (Mid-High Calorie)</option>
                <option value="GAR 5800 (High Calorie)">GAR 5800 (High Calorie)</option>
              </select>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Nama Perusahaan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="PT. Industri Energi Tbk"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Nama PIC / Jabatan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Bpk. Hendra (Procurement)"
                  value={formData.buyerName}
                  onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Nomor WhatsApp / HP *
                </label>
                <input
                  type="text"
                  required
                  placeholder="081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Volume (Ton) *
                </label>
                <input
                  type="number"
                  required
                  step="1000"
                  value={formData.tonnage}
                  onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Incoterm & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Skema IncoTerms
                </label>
                <select
                  value={formData.incoterm}
                  onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="FOB Barge">FOB Barge</option>
                  <option value="FOB Vessel">FOB Vessel</option>
                  <option value="FOT Stockpile">FOT Stockpile</option>
                  <option value="CIF Destination">CIF Destination</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Pelabuhan / Lokasi Tujuan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Pelabuhan Taboneo / Ciwandan / Buyer Jetty"
                  value={formData.destinationPort}
                  onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 font-black uppercase text-xs tracking-widest py-4 rounded-xl shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-all flex items-center justify-center gap-3"
            >
              <span>Buka Chat Direct WhatsApp Sales Executive</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * License: NPL-KK
 */
