'use client';

import { motion } from 'framer-motion';

const holoColors = [
  { name: 'Pink', hex: '#FFB8D0' },
  { name: 'Peach', hex: '#FFD4A8' },
  { name: 'Yellow', hex: '#FFFFA8' },
  { name: 'Mint', hex: '#B8FFB8' },
  { name: 'Cyan', hex: '#A8FFF4' },
];

export function EffectsSection() {
  return (
    <div className="space-y-12">
      {/* Holographic Background */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Background</h3>
        <div className="relative h-64 rounded-xl overflow-hidden">
          <div className="absolute inset-0 holographic-base opacity-80" />
          <div className="absolute inset-0 holographic-overlay opacity-60" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <p className="font-archivo-condensed font-semibold text-4xl text-holo-charcoal uppercase">
              Layered Effect
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-secondary">
          Three layers: <code className="bg-primary/5 px-1 rounded">holographic-base</code> +{' '}
          <code className="bg-primary/5 px-1 rounded">holographic-overlay</code> +{' '}
          <code className="bg-primary/5 px-1 rounded">backdrop-blur-3xl</code>
        </p>
      </div>

      {/* Holographic Text */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Text</h3>
        <p className="font-archivo-condensed font-semibold text-6xl uppercase holographic-text">
          Travellers Only
        </p>
        <p className="mt-2 text-sm text-secondary">
          CSS class: <code className="bg-primary/5 px-2 py-0.5 rounded">holographic-text</code>
        </p>
      </div>

      {/* Animation Curves */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Motion Easing</h3>
        <div className="flex gap-4">
          <motion.div
            className="w-16 h-16 bg-primary rounded-lg"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="flex flex-col justify-center">
            <p className="font-archivo font-medium">Custom Easing</p>
            <code className="text-sm text-secondary">[0.22, 1, 0.36, 1]</code>
          </div>
        </div>
      </div>

      {/* Stagger Animation */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Stagger Animation</h3>
        <div className="flex gap-2">
          {holoColors.map((color, i) => (
            <motion.div
              key={color.name}
              className="w-12 h-12 rounded-lg"
              style={{ backgroundColor: color.hex }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
