'use client';

import { motion } from 'framer-motion';

export function HolographicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dark mode base layer */}
      <div className="absolute inset-0 bg-surface" />
      {/* Base gradient layer — uses bg tier for dark mode reduction */}
      <motion.div
        className="absolute inset-0 holographic-base holo-bg-tier"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Secondary shifted layer for depth */}
      <motion.div
        className="absolute inset-0 holographic-overlay holo-bg-tier opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      {/* Blur diffusion layer */}
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </div>
  );
}
