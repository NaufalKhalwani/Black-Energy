/**
 * License: NPL-KK
 * File: components/Navbar.jsx
 * Floating Pill Capsule Navbar with Guaranteed Reliable Click Handlers
 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar({ onOpenContactModal }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Guaranteed smooth scroll handler for all sections & routes
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-[100] flex justify-center px-4">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`w-full max-w-6xl rounded-full transition-all duration-500 cursor-pointer ${
          scrolled
            ? 'bg-neutral-950/90 backdrop-blur-xl border border-amber-500/40 shadow-2xl shadow-amber-500/20 py-2.5 px-6'
            : 'bg-neutral-950/75 backdrop-blur-md border border-neutral-800 shadow-xl py-3 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Floating Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 rounded-full border border-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              <span className="text-neutral-950 font-black text-sm tracking-tighter">BE</span>
            </div>
            <div>
              <span className="font-black uppercase tracking-widest text-base text-white group-hover:text-amber-400 transition-colors">
                BLACK <span className="text-amber-500">ENERGY</span>
              </span>
              <p className="text-[8px] uppercase tracking-widest text-neutral-400 font-semibold -mt-1 hidden sm:block">
                Coal Supply & Logistics
              </p>
            </div>
          </Link>

          {/* Navigation Links with Guaranteed Click Handlers */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-300">
            <Link to="/" className="hover:text-amber-400 transition-colors py-1">
              Beranda
            </Link>
            <button
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-amber-400 transition-colors py-1 cursor-pointer bg-transparent border-0"
            >
              Pengenalan
            </button>
            <button
              onClick={(e) => handleNavClick(e, 'specs')}
              className="hover:text-amber-400 transition-colors py-1 cursor-pointer bg-transparent border-0"
            >
              Spesifikasi
            </button>
            <button
              onClick={(e) => handleNavClick(e, 'products')}
              className="hover:text-amber-400 transition-colors py-1 cursor-pointer bg-transparent border-0"
            >
              Produk
            </button>
            <button
              onClick={(e) => handleNavClick(e, 'logistics')}
              className="hover:text-amber-400 transition-colors py-1 cursor-pointer bg-transparent border-0"
            >
              Logistik
            </button>
            <Link
              to="/admin"
              className="text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full hover:bg-amber-500/10 transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* CTA Contact Seller Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenContactModal && onOpenContactModal()}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping" />
              <span className="hidden sm:inline">Hubungi Penjual</span>
              <span className="sm:hidden">Kontak</span>
            </button>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}

/**
 * License: NPL-KK
 */
