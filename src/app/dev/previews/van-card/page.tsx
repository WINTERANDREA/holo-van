'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const mockVan = {
  name: 'California Ocean',
  type: 'Camper Van',
  capacity: '4 posti',
  price: '€120/giorno',
  features: ['Tetto pop-up', 'Cucina integrata', 'Doccia esterna'],
};

function VariantLabel({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-surface border-b border-border px-6 py-4">
      <h2 className="font-archivo-condensed font-semibold text-2xl uppercase">{name}</h2>
      <p className="font-archivo text-sm text-secondary mt-1">{description}</p>
    </div>
  );
}

/* ===== VARIANT A: Clean Card ===== */
function VanCardA() {
  return (
    <motion.div
      className="bg-surface-elevated border border-border rounded-xl overflow-hidden max-w-sm"
      whileHover={{ y: -4, boxShadow: 'var(--shadow-card-hover)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-primary/10 flex items-center justify-center">
        <span className="font-archivo text-sm text-muted">Van photo</span>
      </div>
      <div className="p-6">
        <p className="font-archivo text-xs text-muted uppercase tracking-wider">{mockVan.type}</p>
        <h3 className="font-archivo-condensed font-semibold text-xl mt-1">{mockVan.name}</h3>
        <div className="flex items-center gap-4 mt-3 text-sm text-secondary">
          <span>{mockVan.capacity}</span>
          <span className="w-1 h-1 rounded-full bg-muted" />
          <span className="font-semibold text-primary">{mockVan.price}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {mockVan.features.map((f) => (
            <span key={f} className="text-xs px-2 py-1 bg-primary/5 rounded-full text-secondary">{f}</span>
          ))}
        </div>
        <button className="w-full mt-6 px-4 py-3 bg-primary text-surface font-archivo-condensed font-semibold text-sm uppercase tracking-wider">
          Dettagli
        </button>
      </div>
    </motion.div>
  );
}

/* ===== VARIANT B: Full-bleed Image ===== */
function VanCardB() {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden max-w-sm aspect-[3/4] group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image placeholder */}
      <div className="absolute inset-0 bg-holo-charcoal/20 flex items-center justify-center">
        <span className="font-archivo text-sm text-white/40">Van photo (full-bleed)</span>
      </div>
      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-holo-charcoal via-holo-charcoal/30 to-transparent" />
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="font-archivo text-xs uppercase tracking-wider text-white/60">{mockVan.type}</p>
        <h3 className="font-archivo-condensed font-semibold text-2xl mt-1">{mockVan.name}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
          <span>{mockVan.capacity}</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="font-semibold text-white">{mockVan.price}</span>
        </div>
        {/* Reveal on hover */}
        <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
          <div className="flex flex-wrap gap-2 mt-3">
            {mockVan.features.map((f) => (
              <span key={f} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== VARIANT C: Holographic Accent ===== */
function VanCardC() {
  return (
    <motion.div
      className="relative bg-surface-elevated rounded-xl overflow-hidden max-w-sm"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Holographic top border */}
      <div className="h-1.5 holographic-base" />
      {/* Image placeholder */}
      <div className="aspect-[16/9] bg-primary/10 flex items-center justify-center">
        <span className="font-archivo text-sm text-muted">Van photo</span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-archivo-condensed font-semibold text-xl">{mockVan.name}</h3>
            <p className="font-archivo text-xs text-secondary mt-1">{mockVan.type}</p>
          </div>
          <span className="font-archivo-condensed font-semibold text-lg holographic-text">{mockVan.price}</span>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {mockVan.features.map((f) => (
            <span key={f} className="text-xs px-3 py-1.5 border border-border rounded-full text-secondary">
              {f}
            </span>
          ))}
          <span className="text-xs px-3 py-1.5 border border-border rounded-full text-secondary">{mockVan.capacity}</span>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="flex-1 px-4 py-3 bg-primary text-surface font-archivo-condensed font-semibold text-sm uppercase tracking-wider">
            Prenota
          </button>
          <button className="px-4 py-3 border border-border text-primary font-archivo-condensed font-semibold text-sm uppercase tracking-wider hover:bg-primary/5 transition-colors">
            Info
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CardGrid({ children, label }: { children: React.ReactNode; label: { name: string; description: string } }) {
  return (
    <div>
      <VariantLabel {...label} />
      <div className="p-8 md:p-12 bg-surface">
        <div className="flex flex-wrap gap-8 justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function VanCardPreviewPage() {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dev/previews" className="font-archivo text-sm text-secondary hover:text-primary transition-colors">
              &larr; Previews
            </a>
            <span className="font-archivo-condensed font-semibold text-lg uppercase">
              Van Card Variants
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-16">
        <CardGrid label={{ name: 'Variant A — Clean Card', description: 'White card, image top, specs below, subtle hover lift' }}>
          <VanCardA />
        </CardGrid>

        <CardGrid label={{ name: 'Variant B — Full-bleed Image', description: 'Image fills card, text overlay at bottom with gradient scrim, features reveal on hover' }}>
          <VanCardB />
        </CardGrid>

        <CardGrid label={{ name: 'Variant C — Holographic Accent', description: 'Card with holographic strip, price as holo text, specs as tags' }}>
          <VanCardC />
        </CardGrid>
      </main>
    </div>
  );
}
