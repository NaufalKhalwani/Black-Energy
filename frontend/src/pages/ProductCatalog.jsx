/**
 * License: NPL-KK
 * File: pages/ProductCatalog.jsx
 */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import OrderForm from '../components/OrderForm';
import SpecSheetModal from '../components/SpecSheetModal';

const FALLBACK_PRODUCTS = [
  {
    _id: 'default-1',
    name: 'Coal GAR 3800 (Low Calorie)',
    calorie: 'GAR 3800 / NAR 3500',
    origin: 'Kalimantan Selatan (Mine Site)',
    description: 'Batu bara kalori rendah-menengah ekonomis untuk pembangkit listrik (PLTU) & pabrik tekstil. Kadar sulfur rendah dan pembakaran stabil.',
    priceEstimate: 'US$ 48 - 56 / Ton (FOB)'
  },
  {
    _id: 'default-2',
    name: 'Coal GAR 4200 (Medium Calorie)',
    calorie: 'GAR 4200 / NAR 3900',
    origin: 'Kalimantan Timur (Mahakam)',
    description: 'Spesifikasi paling populer pasar domestik & ekspor ke China/India. Cocok untuk boiler industri semen, kertas, dan energi.',
    priceEstimate: 'US$ 62 - 70 / Ton (FOB)'
  },
  {
    _id: 'default-3',
    name: 'Coal GAR 5000 (Medium High Calorie)',
    calorie: 'GAR 5000 / NAR 4700',
    origin: 'Sumatra Selatan (Muara Enim)',
    description: 'Batu bara energi tinggi dengan nilai HGI tinggi dan kelembaban rendah. Sangat cocok untuk industri peleburan metalurgi & manufaktur skala besar.',
    priceEstimate: 'US$ 78 - 88 / Ton (FOB)'
  },
  {
    _id: 'default-4',
    name: 'Coal GAR 5800 (High Calorie Premium)',
    calorie: 'GAR 5800 / NAR 5500',
    origin: 'Kalimantan Tengah',
    description: 'Kualitas Bituminous super premium dengan kandungan abu minimal (<6%) dan Total Moisture terendah. Ideal untuk ekspor Eropa & Asia Timur.',
    priceEstimate: 'Hubungi Kontak Admin'
  }
];

export default function ProductCatalog({ onOpenContactModal }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL'); // ALL, LOW, MID, HIGH
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((res) => {
        if (mounted) {
          if (res.data && res.data.length > 0) {
            setProducts(res.data);
          } else {
            setProducts(FALLBACK_PRODUCTS);
          }
        }
      })
      .catch(() => {
        if (mounted) {
          setProducts(FALLBACK_PRODUCTS);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeFilter === 'LOW') return p.calorie.includes('3400') || p.calorie.includes('3800') || p.calorie.toLowerCase().includes('low');
      if (activeFilter === 'MID') return p.calorie.includes('4200') || p.calorie.includes('4700') || p.calorie.includes('5000') || p.calorie.toLowerCase().includes('mid') || p.calorie.toLowerCase().includes('medium');
      if (activeFilter === 'HIGH') return p.calorie.includes('5800') || p.calorie.includes('6000') || p.calorie.includes('6500') || p.calorie.toLowerCase().includes('high');
      return true;
    });
  }, [products, activeFilter]);

  const handleOrder = (product) => {
    setSelectedProduct(product);
    if (onOpenContactModal) {
      onOpenContactModal(product);
    } else {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Quick View Spec Sheet Modal */}
      <SpecSheetModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onOrder={handleOrder}
      />

      {/* Catalog Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
          Structured Portfolio & Catalog
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-4">
          Katalog Portofolio Batu Bara
        </h2>
        <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
          Pilihan grade kalori batu bara terstruktur dengan jaminan CoA (Certificate of Analysis) terakreditasi untuk kebutuhan Spot & Long-Term Contract.
        </p>
      </motion.div>

      {/* Neat Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {[
          { id: 'ALL', label: 'Semua Grade', count: products.length },
          { id: 'LOW', label: 'Low Calorie (GAR < 4000)', count: products.filter(p => p.calorie.includes('3400') || p.calorie.includes('3800')).length },
          { id: 'MID', label: 'Mid Calorie (GAR 4000-5000)', count: products.filter(p => p.calorie.includes('4200') || p.calorie.includes('4700') || p.calorie.includes('5000')).length },
          { id: 'HIGH', label: 'High Calorie (GAR 5800+)', count: products.filter(p => p.calorie.includes('5800') || p.calorie.includes('6500')).length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFilter === tab.id
                ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 font-black scale-105'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeFilter === tab.id ? 'bg-neutral-950 text-amber-400' : 'bg-neutral-800 text-neutral-300'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-neutral-400">Memuat katalog produk...</p>}

      {/* Ultra-Neat Responsive Grid */}
      <motion.div
        key={activeFilter}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-24 items-stretch"
      >
        {filteredProducts.map((p) => (
          <motion.div
            key={p._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="h-full"
          >
            <ProductCard
              product={p}
              onOrder={handleOrder}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Trade Order Terminal */}
      <OrderForm ref={formRef} selectedProduct={selectedProduct || filteredProducts[0]} />
    </div>
  );
}

/**
 * License: NPL-KK
 */
