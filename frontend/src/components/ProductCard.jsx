/**
 * License: NPL-KK
 * File: components/ProductCard.jsx
 */
import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onOrder, onQuickView }) {
  // Grade classification helper
  const isHighGrade =
    product.calorie.includes('5800') ||
    product.calorie.includes('6000') ||
    product.calorie.includes('6500') ||
    product.calorie.toLowerCase().includes('high');

  const isMidGrade =
    product.calorie.includes('4200') ||
    product.calorie.includes('4700') ||
    product.calorie.includes('5000') ||
    product.calorie.toLowerCase().includes('medium');

  const gradeCategory = isHighGrade
    ? 'High Calorie Bituminous'
    : isMidGrade
    ? 'Medium Calorie Export'
    : 'Low Calorie Thermal';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 relative overflow-hidden group h-full"
    >
      {/* Top Color Accent Line */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 ${
          isHighGrade ? 'bg-amber-400' : isMidGrade ? 'bg-amber-500' : 'bg-neutral-600'
        }`}
      />

      <div>
        {/* Header Tags & Category */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-md">
            {gradeCategory}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 truncate max-w-[150px]">
            📍 {product.origin}
          </span>
        </div>

        {/* Product Title */}
        <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors line-clamp-2 min-h-[3.5rem] flex items-center">
          {product.name}
        </h4>

        {/* Calorie Badge */}
        <div className="my-3 inline-flex items-center gap-2 bg-neutral-950 px-3.5 py-2 rounded-lg border border-neutral-800/80 w-full">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <span className="text-xs font-black tracking-wider text-amber-400 uppercase truncate">
            {product.calorie}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-neutral-400 mt-2 line-clamp-3 min-h-[3.3rem]">
          {product.description}
        </p>

        {/* Ultra-Neat Parameter Micro Grid */}
        <div className="grid grid-cols-2 gap-2 my-5 text-[11px] bg-neutral-950/70 p-3 rounded-xl border border-neutral-800/80">
          <div className="border-r border-neutral-800 pr-2">
            <span className="text-neutral-500 block uppercase font-bold text-[9px] tracking-wider">
              Total Moisture
            </span>
            <span className="font-extrabold text-neutral-200">
              {isHighGrade ? '10% - 15%' : isMidGrade ? '22% - 28%' : '32% - 36%'}
            </span>
          </div>

          <div className="pl-2">
            <span className="text-neutral-500 block uppercase font-bold text-[9px] tracking-wider">
              Total Sulfur (TS)
            </span>
            <span className="font-extrabold text-neutral-200">&lt; 0.8% Max</span>
          </div>

          <div className="border-r border-neutral-800 pr-2 pt-2 border-t border-neutral-800/60">
            <span className="text-neutral-500 block uppercase font-bold text-[9px] tracking-wider">
              Ash Content
            </span>
            <span className="font-extrabold text-neutral-200">5% - 8% Max</span>
          </div>

          <div className="pl-2 pt-2 border-t border-neutral-800/60">
            <span className="text-neutral-500 block uppercase font-bold text-[9px] tracking-wider">
              Pengiriman
            </span>
            <span className="font-extrabold text-amber-400">Barge / Vessel</span>
          </div>
        </div>

        {/* Price Estimate Strip */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 pt-4 mb-5">
          <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
            Indikasi Harga
          </span>
          <span className="text-xs font-black text-white bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
            {product.priceEstimate}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 py-3 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all text-center"
          >
            🔍 Lihat Spec
          </button>
        )}
        <button
          onClick={() => onOrder(product)}
          className={`${
            onQuickView ? '' : 'col-span-2'
          } bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 py-3 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 active:scale-95 text-center`}
        >
          Pesan Spec Ini
        </button>
      </div>
    </motion.div>
  );
}

/**
 * License: NPL-KK
 */
