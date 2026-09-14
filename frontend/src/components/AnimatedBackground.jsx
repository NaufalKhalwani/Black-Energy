/**
 * License: NPL-KK
 * File: components/AnimatedBackground.jsx
 * Continuous Ambient Background Animation System for All Sections
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Lock random particles with useMemo so position stays consistent between renders
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.2,
        color: i % 4 === 0 ? 'rgba(245, 158, 11, 0.7)' : 'rgba(255, 255, 255, 0.25)'
      })),
    []
  );

  const coalRocks = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        size: Math.random() * 60 + 30,
        left: Math.random() * 94 + 3,
        top: Math.random() * 95 + 2,
        duration: Math.random() * 16 + 14,
        delay: Math.random() * 4,
        rotateStart: Math.random() * 180,
        rotateEnd: Math.random() * 360 + 180
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Pulsing Radial Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 60, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.8, 1.15, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 right-1/6 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[160px]"
      />

      {/* Shifting Cyber Mesh Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245, 158, 11, 0.6) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Continuous Drifting Coal Rock Polygon Gems */}
      {coalRocks.map((rock) => (
        <motion.div
          key={`rock-${rock.id}`}
          className="absolute bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-lg border border-neutral-700/20 shadow-2xl"
          style={{
            width: `${rock.size}px`,
            height: `${rock.size}px`,
            left: `${rock.left}%`,
            top: `${rock.top}%`,
            opacity: 0.18,
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.15)',
            clipPath:
              'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 20, 0],
            rotate: [rock.rotateStart, rock.rotateEnd]
          }}
          transition={{
            duration: rock.duration,
            repeat: Infinity,
            delay: rock.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Ambient Drifting Particles Across All Sections */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full shadow-lg"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`
          }}
          animate={{
            y: [0, -120, -240],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
            opacity: [0, p.opacity, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

/**
 * License: NPL-KK
 */
