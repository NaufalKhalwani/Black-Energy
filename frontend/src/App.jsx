/**
 * License: NPL-KK
 * File: App.jsx
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPanel from './pages/AdminPanel';
import AnimatedBackground from './components/AnimatedBackground';

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Coal Mine Ambient Background System for ALL Pages */}
      <AnimatedBackground />

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
