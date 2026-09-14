/**
 * License: NPL-KK
 * File: components/SpecSheetModal.jsx
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpecSheetModal({ product, isOpen, onClose, onOrder }) {
  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-neutral-950 border border-amber-500/40 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full">
                Laboratory Certificate of Analysis (CoA)
              </span>
              <h3 className="text-2xl font-black uppercase text-white tracking-wide mt-2">
                {product.name}
              </h3>
              <p className="text-neutral-400 text-xs mt-1">
                📍 Asal Tambang: <span className="text-white font-bold">{product.origin}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* Calorie Pill & Price */}
          <div className="grid grid-cols-2 gap-4 bg-neutral-900/80 p-4 rounded-xl border border-neutral-800 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 block">Nilai Kalori</span>
              <span className="text-base font-black text-amber-400">{product.calorie}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 block">Estimasi Indikasi Harga</span>
              <span className="text-base font-black text-white">{product.priceEstimate}</span>
            </div>
          </div>

          {/* Detailed Parameter Table */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-300">
              Parameter Hasil Pengujian Lab Sucofindo / SGS / Geoservices
            </h4>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden text-xs">
              <div className="grid grid-cols-2 border-b border-neutral-800 p-3 bg-neutral-950/80 font-bold text-neutral-400 uppercase text-[10px]">
                <span>Parameter Pengujian</span>
                <span className="text-right">Hasil Uji Garansi</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-neutral-800/60">
                <span className="text-neutral-300">Gross Calorific Value (GAR)</span>
                <span className="text-right font-black text-amber-400">{product.calorie}</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-neutral-800/60">
                <span className="text-neutral-300">Total Moisture (TM)</span>
                <span className="text-right font-bold text-white">12% - 34% (ADB)</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-neutral-800/60">
                <span className="text-neutral-300">Inherent Moisture (IM)</span>
                <span className="text-right font-bold text-white">8% - 14%</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-neutral-800/60">
                <span className="text-neutral-300">Total Sulfur (TS)</span>
                <span className="text-right font-bold text-emerald-400">&lt; 0.8% Max (Low Sulfur)</span>
              </div>
              <div className="grid grid-cols-2 p-3 border-b border-neutral-800/60">
                <span className="text-neutral-300">Ash Content (AC)</span>
                <span className="text-right font-bold text-white">5% - 8% Max</span>
              </div>
              <div className="grid grid-cols-2 p-3">
                <span className="text-neutral-300">Hardgrove Grindability Index (HGI)</span>
                <span className="text-right font-bold text-white">50 - 55 HGI</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-300 mb-2">
              Karakteristik & Peruntukan Industri
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed bg-neutral-900 p-4 rounded-xl border border-neutral-800">
              {product.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              onClick={onClose}
              className="bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                if (onOrder) onOrder(product);
              }}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20"
            >
              Pesan Spec Ini Sekarang
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * License: NPL-KK
 */
