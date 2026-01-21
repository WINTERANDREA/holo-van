'use client';

import { motion } from 'framer-motion';

export function HolographicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient layer */}
      <motion.div
        className="absolute inset-0 holographic-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Secondary shifted layer for depth */}
      <motion.div
        className="absolute inset-0 holographic-overlay opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      {/* Blur diffusion layer */}
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </div>
  );
}
