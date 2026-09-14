/**
 * License: NPL-KK
 * File: components/FloatingCoal.jsx
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingCoal() {
  // Lock random particles with useMemo so position stays consistent between renders
  const coals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        size: Math.random() * 50 + 25,
        left: Math.random() * 96 + 2,
        top: Math.random() * 90 + 5,
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 3,
        rotateStart: Math.random() * 180,
        rotateEnd: Math.random() * 360 + 180,
        emberColor: i % 3 === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.15)'
      })),
    []
  );

  const embers = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Coal Rocks */}
      {coals.map((c) => (
        <motion.div
          key={`coal-${c.id}`}
          className="absolute bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-lg shadow-2xl border border-neutral-700/30"
          style={{
            width: `${c.size}px`,
            height: `${c.size}px`,
            left: `${c.left}%`,
            top: `${c.top}%`,
            opacity: 0.25,
            boxShadow: `0 0 20px ${c.emberColor}`,
            clipPath:
              'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
          }}
          animate={{
            y: [0, -45, 0],
            x: [0, 15, 0],
            rotate: [c.rotateStart, c.rotateEnd]
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            delay: c.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Floating Ember Glowing Sparks */}
      {embers.map((e) => (
        <motion.div
          key={`ember-${e.id}`}
          className="absolute rounded-full bg-amber-400 shadow-lg shadow-amber-500/50"
          style={{
            width: `${e.size}px`,
            height: `${e.size}px`,
            left: `${e.left}%`,
            top: `${e.top}%`
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.2]
          }}
          transition={{
            duration: e.duration,
            repeat: Infinity,
            delay: e.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}

/**
 * License: NPL-KK
 */
