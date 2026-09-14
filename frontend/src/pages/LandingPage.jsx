/**
 * License: NPL-KK
 * File: pages/LandingPage.jsx
 */
import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingCoal from '../components/FloatingCoal';
import ProductCatalog from './ProductCatalog';
import Navbar from '../components/Navbar';
import ContactModal from '../components/ContactModal';
import coalHeroImg from '../assets/coal_hero.jpg';
import coalShipImg from '../assets/coal_ship.jpg';

export default function LandingPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedModalProduct, setSelectedModalProduct] = useState(null);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const openContactModal = (product = null) => {
    setSelectedModalProduct(product);
    setIsContactModalOpen(true);
  };

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans min-h-screen relative selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden">
      {/* Global Ambient Background Animation Layer for ALL Sections */}
      <AnimatedBackground />

      {/* Scroll Progress Bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 z-[60] transform origin-left"
        style={{ scaleX }}
      />

      {/* Floating Pill Capsule Navbar */}
      <Navbar onOpenContactModal={() => openContactModal()} />

      {/* Trade Consultation Modal Window */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialProduct={selectedModalProduct}
      />

      {/* Floating Bottom-Right Quick Contact Widget */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => openContactModal()}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 font-black px-5 py-3 rounded-full shadow-2xl shadow-amber-500/40 border border-amber-300 hover:scale-105 transition-transform flex items-center gap-3 active:scale-95 group"
      >
        <span className="w-3 h-3 rounded-full bg-emerald-950 animate-ping" />
        <span className="text-xs uppercase tracking-wider">Hubungi Penjual (Live)</span>
        <svg className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      </motion.button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 border-b border-neutral-800/80 overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img
            src={coalHeroImg}
            alt="3D Floating Coal Background"
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        </div>

        {/* Dynamic Floating Coal & Ember Canvas */}
        <FloatingCoal />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Pemasok & Importir Batu Bara Terpercaya
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none"
          >
            BLACK{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              ENERGY
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl max-w-3xl mx-auto text-neutral-300 font-normal leading-relaxed"
          >
            Menghubungkan sumber daya energi tambang batu bara berkualitas tinggi (GAR 3400 – 6800) ke industri pembangkit listrik, pabrik semen, peleburan logam, dan pasar ekspor internasional.
          </motion.p>

          {/* Key Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left"
          >
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl backdrop-blur hover:border-amber-500/30 transition-colors">
              <p className="text-2xl md:text-3xl font-black text-amber-400">5M+ Ton</p>
              <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Kapasitas Supply / Tahun</p>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl backdrop-blur hover:border-amber-500/30 transition-colors">
              <p className="text-2xl md:text-3xl font-black text-white">99.8%</p>
              <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Akurasi Spek Kalori COA</p>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl backdrop-blur hover:border-amber-500/30 transition-colors">
              <p className="text-2xl md:text-3xl font-black text-amber-400">30+ Vessel</p>
              <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Armada Logistik Global</p>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl backdrop-blur hover:border-amber-500/30 transition-colors">
              <p className="text-2xl md:text-3xl font-black text-white">IUP-OPK</p>
              <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Izin Resmi Kemen ESDM</p>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <button
              onClick={() => openContactModal()}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-2"
            >
              <span>Hubungi Penjual Direct</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <a
              href="#products"
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              Katalog Spec Batu Bara
            </a>
          </motion.div>
        </div>
      </section>

      {/* Product Introduction Section (#about) */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-800/80 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
              Pengenalan & Standar Mutu
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-4 leading-tight">
              Komitmen Pasokan Batu Bara Industri Berkelanjutan
            </h2>
            <p className="text-neutral-300 text-sm mt-4 leading-relaxed">
              Black Energy bergerak dalam perdagangan, pasokan, dan distribusi batu bara skala besar. Kami melayani kebutuhan bahan bakar untuk sektor termal (PLTU), manufaktur semen, tekstil, dan industri berat lainnya.
            </p>

            <div className="mt-8 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4 bg-neutral-900/80 backdrop-blur p-4 rounded-xl border border-neutral-800"
              >
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg border border-amber-500/30 flex items-center justify-center shrink-0">
                  <span className="text-amber-400 font-bold">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm">Standar GAR (Gross As Received) & NAR (Net As Received)</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Nilai energi yang dihitung secara presisi sesuai pengujian lab independen (Sucofindo / SGS / Geoservices).
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4 bg-neutral-900/80 backdrop-blur p-4 rounded-xl border border-neutral-800"
              >
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg border border-amber-500/30 flex items-center justify-center shrink-0">
                  <span className="text-amber-400 font-bold">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm">Kontrol Kadar Total Sulfur & Ash Content</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Batu bara kami memiliki rasio pembakaran ramah lingkungan dengan kandungan ash dan sulfur yang terkontrol ketat.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Visual Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative bg-neutral-900/90 backdrop-blur rounded-2xl p-8 border border-neutral-800 shadow-2xl"
          >
            <h3 className="text-lg font-black uppercase text-amber-400 mb-6 tracking-wide">
              Komposisi Parameter Uji Kualitas
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-neutral-300 mb-1">
                  <span>Gross Calorific Value (GAR)</span>
                  <span className="text-amber-400">3800 - 6500 Kcal/kg</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-neutral-300 mb-1">
                  <span>Total Moisture (TM)</span>
                  <span className="text-amber-400">10% - 35%</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-neutral-300 mb-1">
                  <span>Total Sulfur (TS)</span>
                  <span className="text-amber-400">0.2% - 0.8% Max</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '25%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-neutral-300 mb-1">
                  <span>Ash Content (AC)</span>
                  <span className="text-amber-400">4% - 10% Max</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '40%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Laporan Analisis Terakreditasi ISO/IEC 17025</span>
              <span className="text-amber-400 font-bold">100% Certified</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specifications Section (#specs) */}
      <section id="specs" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-800/80 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
            Kategori Grade
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-4">
            Klasifikasi Batu Bara Berdasarkan Kalori
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            className="bg-neutral-900/90 backdrop-blur border border-neutral-800 rounded-2xl p-8 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Grade A - Low Calorie</span>
              <h3 className="text-2xl font-black uppercase text-white mt-2 mb-4">GAR 3400 - 3800</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Batu bara Sub-Bituminous ekonomis dengan tingkat pembakaran efisien untuk pembangkit listrik skala besar dan boiler industri dasar.
              </p>
              <ul className="text-xs space-y-2 text-neutral-300 font-semibold border-t border-neutral-800 pt-4">
                <li className="flex justify-between"><span>TM (Total Moisture):</span> <span className="text-white">32% - 36%</span></li>
                <li className="flex justify-between"><span>Ash Content:</span> <span className="text-white">5% - 7%</span></li>
                <li className="flex justify-between"><span>Total Sulfur:</span> <span className="text-white">0.2% - 0.5%</span></li>
              </ul>
            </div>
            <button
              onClick={() => openContactModal({ calorie: 'GAR 3800 (Low Calorie)' })}
              className="mt-6 w-full bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-full transition-all"
            >
              Tanya Penjual untuk Grade Ini
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            className="bg-neutral-900/90 backdrop-blur border border-amber-500/40 rounded-2xl p-8 relative shadow-2xl flex flex-col justify-between"
          >
            <span className="absolute -top-3 right-6 bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              Paling Populer
            </span>
            <div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Grade B - Mid Calorie</span>
              <h3 className="text-2xl font-black uppercase text-white mt-2 mb-4">GAR 4200 - 5000</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Batu bara serbaguna dengan nilai kalor ideal yang paling banyak diminati untuk ekspor ke China, India, dan pasar domestik Indonesia.
              </p>
              <ul className="text-xs space-y-2 text-neutral-300 font-semibold border-t border-neutral-800 pt-4">
                <li className="flex justify-between"><span>TM (Total Moisture):</span> <span className="text-white">24% - 28%</span></li>
                <li className="flex justify-between"><span>Ash Content:</span> <span className="text-white">6% - 8%</span></li>
                <li className="flex justify-between"><span>Total Sulfur:</span> <span className="text-white">0.4% - 0.8%</span></li>
              </ul>
            </div>
            <button
              onClick={() => openContactModal({ calorie: 'GAR 4200 (Medium Calorie)' })}
              className="mt-6 w-full bg-amber-500 text-neutral-950 font-black text-xs uppercase tracking-wider py-3 rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
            >
              Tanya Penjual untuk Grade Ini
            </button>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            className="bg-neutral-900/90 backdrop-blur border border-neutral-800 rounded-2xl p-8 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Grade C - High Calorie</span>
              <h3 className="text-2xl font-black uppercase text-white mt-2 mb-4">GAR 5800 - 6500</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Batu bara Bituminous premium bernilai panas tinggi dengan kelembaban rendah untuk industri smelter, tekstil presisi, dan ekspor Eropa.
              </p>
              <ul className="text-xs space-y-2 text-neutral-300 font-semibold border-t border-neutral-800 pt-4">
                <li className="flex justify-between"><span>TM (Total Moisture):</span> <span className="text-white">10% - 15%</span></li>
                <li className="flex justify-between"><span>Ash Content:</span> <span className="text-white">8% - 12%</span></li>
                <li className="flex justify-between"><span>Total Sulfur:</span> <span className="text-white">0.6% - 1.0%</span></li>
              </ul>
            </div>
            <button
              onClick={() => openContactModal({ calorie: 'GAR 5800 (High Calorie)' })}
              className="mt-6 w-full bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-full transition-all"
            >
              Tanya Penjual untuk Grade Ini
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Logistics & Supply Chain Section (#logistics) */}
      <section id="logistics" className="py-24 px-6 max-w-7xl mx-auto border-b border-neutral-800/80 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 group"
          >
            <img
              src={coalShipImg}
              alt="Coal Bulk Carrier Ship Vessel"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-500 text-neutral-950 rounded-full">
                Global Transshipment
              </span>
              <h4 className="text-xl font-black uppercase text-white mt-2">
                Pengiriman Vessel & Tongkang Handal
              </h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
              Sistem Rantai Pasok
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white mt-4 leading-tight">
              Alur Distribusi & Pengiriman Terintegrasi
            </h2>
            <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
              Jaringan logistik yang mencakup pengangkutan darat (hauling road), pemuatan di jetty pelabuhan muat, pengangkutan tongkang (barging), hingga transshipment ke kapal mother vessel.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 font-black flex items-center justify-center text-xs">1</div>
                <span className="text-sm font-bold text-white">Tambang (Stockpile Pit Mine Site)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 font-black flex items-center justify-center text-xs">2</div>
                <span className="text-sm font-bold text-white">Penghancuran (Crusher & Quality Check)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 font-black flex items-center justify-center text-xs">3</div>
                <span className="text-sm font-bold text-white">Pengangkutan Tongkang (300 ft Barge Barging)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 font-black flex items-center justify-center text-xs">4</div>
                <span className="text-sm font-bold text-white">Transshipment Vessel (Handymax / Panamax Bulk Carrier)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog & Form Section (#products) */}
      <section id="products" className="py-24 relative z-10">
        <ProductCatalog onOpenContactModal={(product) => openContactModal(product)} />
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950/90 backdrop-blur py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div>
            <span className="font-black text-white uppercase tracking-widest text-base">
              BLACK <span className="text-amber-500">ENERGY</span>
            </span>
            <p className="mt-1">Pemasok & Importir Batu Bara Indonesia • License: NPL-KK</p>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] font-semibold text-neutral-300">
            <span>IUP-OPK Approved</span>
            <span>•</span>
            <span>COA Certified Sucofindo / SGS</span>
            <span>•</span>
            <span>FOB / FOT / CIF terms</span>
          </div>

          <div>
            <p>© 2026 Black Energy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * License: NPL-KK
 */
