'use client';

import { motion } from 'framer-motion';

export function HolographicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark mode base layer */}
      <div className="absolute inset-0 bg-surface" />
      {/* Base gradient layer — stays vibrant in both light & dark mode */}
      <motion.div
        className="absolute inset-0 holographic-base holo-force-vibrant"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Secondary shifted layer for depth */}
      <motion.div
        className="absolute inset-0 holographic-overlay holo-force-vibrant opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      {/* Blur diffusion layer */}
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </div>
  );
}
