'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

function VariantLabel({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-surface border-b border-border px-6 py-4">
      <h2 className="font-archivo-condensed font-semibold text-2xl uppercase">{name}</h2>
      <p className="font-archivo text-sm text-secondary mt-1">{description}</p>
    </div>
  );
}

/* ===== VARIANT A: Minimal Impact ===== */
function HeroVariantA() {
  return (
    <div>
      <VariantLabel
        name="Variant A — Minimal Impact"
        description="Clean white bg, huge condensed headline, subtle holographic text accent. Current direction, refined."
      />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface">
        <div className="text-center z-10 px-4 max-w-5xl mx-auto">
          <motion.p
            className="font-archivo-condensed text-sm tracking-[0.3em] text-secondary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            TRAVELLERS ONLY
          </motion.p>

          <motion.h1
            className="font-archivo-condensed font-semibold text-fluid-hero text-primary tracking-tight leading-[0.9]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            IL VIAGGIO INIZIA ADESSO.
          </motion.h1>

          <motion.p
            className="mt-6 md:mt-8 font-archivo text-fluid-body-lg text-secondary max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            La libert&agrave; &egrave; ovunque. Noi ti diamo solo il mezzo per raggiungerla.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10"
          >
            <button className="inline-block px-8 py-4 bg-primary text-surface font-archivo-condensed font-semibold tracking-wider relative overflow-hidden group cursor-pointer">
              <span className="relative z-10">SCOPRI I CAMPER</span>
              <span className="absolute inset-0 holographic-base opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-6 h-10 border-2 border-muted rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-muted rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ===== VARIANT B: Holographic Immersion ===== */
function HeroVariantB() {
  return (
    <div>
      <VariantLabel
        name="Variant B — Holographic Immersion"
        description="Full holographic gradient background, split layout with sticker elements floating at edges."
      />
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Holographic background */}
        <div className="absolute inset-0 holographic-base" />
        <div className="absolute inset-0 holographic-overlay opacity-60" />
        <div className="absolute inset-0 backdrop-blur-3xl" />

        {/* Floating sticker decorations */}
        <div className="absolute top-20 right-10 w-24 h-24 opacity-60 rotate-12">
          <Image src="/design-system/stickers/holographic/stay-wild.png" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute bottom-32 left-10 w-20 h-20 opacity-50 -rotate-6">
          <Image src="/design-system/stickers/holographic/real-travel.png" alt="" fill className="object-contain" unoptimized />
        </div>
        <div className="absolute top-40 left-20 w-16 h-16 opacity-40 rotate-3">
          <Image src="/design-system/stickers/holographic/more-adventure.png" alt="" fill className="object-contain" unoptimized />
        </div>

        {/* Content - split layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-archivo-condensed text-sm tracking-[0.3em] text-secondary mb-4">
              TRAVELLERS ONLY
            </p>
            <h1 className="font-archivo-condensed font-semibold text-fluid-h1 text-primary tracking-tight leading-[0.9]">
              IL VIAGGIO<br />INIZIA<br />ADESSO.
            </h1>
            <p className="mt-6 font-archivo text-fluid-body-lg text-secondary max-w-md">
              La libert&agrave; &egrave; ovunque. Noi ti diamo solo il mezzo per raggiungerla.
            </p>
            <div className="mt-8">
              <button className="px-8 py-4 bg-primary text-surface font-archivo-condensed font-semibold tracking-wider">
                SCOPRI I CAMPER
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {/* Placeholder for van image/3D */}
            <div className="w-full max-w-md aspect-[4/3] bg-primary/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-primary/20">
              <span className="font-archivo text-sm text-muted">Van image / 3D viewer</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== VARIANT C: Dark & Bold ===== */
function HeroVariantC() {
  return (
    <div>
      <VariantLabel
        name="Variant C — Dark & Bold"
        description="Charcoal background, white text, holographic accent as text fill or accent line. Cinematic feel."
      />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-holo-charcoal">
        {/* Subtle holographic shimmer */}
        <div className="absolute inset-0 holographic-base opacity-15" />

        {/* Holographic accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 holographic-base" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Logo negative */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/logo-horizontal-negative.png"
              alt="HOLO VAN"
              width={160}
              height={50}
              className="h-12 w-auto"
              unoptimized
            />
          </motion.div>

          <motion.h1
            className="font-archivo-condensed font-semibold text-fluid-hero holographic-text tracking-tight leading-[0.9]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            IL VIAGGIO INIZIA ADESSO.
          </motion.h1>

          <motion.p
            className="mt-6 md:mt-8 font-archivo text-fluid-body-lg text-white/60 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            La libert&agrave; &egrave; ovunque. Noi ti diamo solo il mezzo per raggiungerla.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10"
          >
            <button className="px-8 py-4 bg-holo-offwhite text-holo-charcoal font-archivo-condensed font-semibold tracking-wider relative overflow-hidden group cursor-pointer">
              <span className="relative z-10">SCOPRI I CAMPER</span>
              <span className="absolute inset-0 holographic-base opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 holographic-base" />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function HeroPreviewPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dev/previews" className="font-archivo text-sm text-secondary hover:text-primary transition-colors">
              &larr; Previews
            </a>
            <span className="font-archivo-condensed font-semibold text-lg uppercase">
              Hero Variants
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-16">
        <HeroVariantA />
        <HeroVariantB />
        <HeroVariantC />
      </main>
    </div>
  );
}
