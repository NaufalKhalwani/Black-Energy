/**
 * License: NPL-KK
 * File: components/AnimatedBackground.jsx
 * Coal Mine & Ember Ambient Background Animation System for All Pages
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  // Lock random particles & coal rocks with useMemo for performance & consistency
  const coalParticles = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        size: Math.random() * 5 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 14 + 8,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.7 + 0.2,
        color: i % 3 === 0 ? 'rgba(245, 158, 11, 0.85)' : i % 5 === 0 ? 'rgba(217, 119, 6, 0.7)' : 'rgba(255, 255, 255, 0.2)'
      })),
    []
  );

  const coalOreLumps = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        size: Math.random() * 70 + 35,
        left: Math.random() * 95 + 2.5,
        top: Math.random() * 96 + 2,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 4,
        rotateStart: Math.random() * 180,
        rotateEnd: Math.random() * 360 + 180,
        emberGlow: i % 2 === 0 ? '0 0 25px rgba(245, 158, 11, 0.25)' : '0 0 15px rgba(0, 0, 0, 0.9)'
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-neutral-950">
      {/* Dynamic Geothermal Coal Mine Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 90, -50, 0],
          y: [0, -70, 70, 0],
          scale: [1, 1.25, 0.9, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/6 left-1/5 w-[550px] h-[550px] bg-amber-500/12 rounded-full blur-[150px]"
      />

      <motion.div
        animate={{
          x: [0, -110, 60, 0],
          y: [0, 90, -60, 0],
          scale: [1, 0.85, 1.2, 1]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/5 w-[650px] h-[650px] bg-amber-600/12 rounded-full blur-[170px]"
      />

      {/* Coal Mine Stockpile Texture Mesh Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(245, 158, 11, 0.7) 1.5px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Floating Coal Ore Rocks / Polygon Gems */}
      {coalOreLumps.map((rock) => (
        <motion.div
          key={`coal-ore-${rock.id}`}
          className="absolute bg-gradient-to-br from-neutral-800 via-neutral-900 to-black rounded-lg border border-neutral-700/30 shadow-2xl"
          style={{
            width: `${rock.size}px`,
            height: `${rock.size}px`,
            left: `${rock.left}%`,
            top: `${rock.top}%`,
            opacity: 0.22,
            boxShadow: rock.emberGlow,
            clipPath:
              'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)'
          }}
          animate={{
            y: [0, -70, 0],
            x: [0, 25, 0],
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

      {/* Glowing Ember Sparkles & Coal Dust Drifting Upward */}
      {coalParticles.map((p) => (
        <motion.div
          key={`coal-ember-${p.id}`}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`
          }}
          animate={{
            y: [0, -140, -280],
            x: [0, (p.id % 2 === 0 ? 35 : -35), 0],
            opacity: [0, p.opacity, 0],
            scale: [0.6, 1.3, 0.4]
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
