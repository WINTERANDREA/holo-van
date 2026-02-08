'use client';

import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function VariantLabel({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-surface border-b border-border px-6 py-4">
      <h2 className="font-archivo-condensed font-semibold text-2xl uppercase">{name}</h2>
      <p className="font-archivo text-sm text-secondary mt-1">{description}</p>
    </div>
  );
}

/* ===== VARIANT A: Dark Minimal ===== */
function FooterVariantA() {
  return (
    <div>
      <VariantLabel
        name="Variant A — Dark Minimal"
        description="Charcoal bg, negative logo, minimal links, holographic accent line. Clean and understated."
      />
      <footer className="bg-holo-charcoal text-white">
        {/* Holographic accent line */}
        <div className="h-1 holographic-base" />

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Logo */}
            <div>
              <Image
                src="/images/logo-horizontal-negative.png"
                alt="HOLO VAN"
                width={120}
                height={40}
                className="h-8 w-auto"
                unoptimized
              />
              <p className="font-archivo text-xs text-white/40 mt-3">TRAVELLERS ONLY</p>
            </div>

            {/* Links */}
            <nav className="flex gap-8">
              {['I Camper', 'Prenota', 'Itinerari', 'Contatti'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex gap-4">
              {['IG', 'FB', 'YT'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors font-archivo text-xs"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-archivo text-xs text-white/30">
              &copy; 2026 HOLO VAN. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-archivo text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="font-archivo text-xs text-white/30 hover:text-white/60 transition-colors">Termini</a>
              <a href="#" className="font-archivo text-xs text-white/30 hover:text-white/60 transition-colors">Cookie</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== VARIANT B: Rich Footer ===== */
function FooterVariantB() {
  return (
    <div>
      <VariantLabel
        name="Variant B — Rich Footer"
        description="Newsletter signup, social links grid, sticker decoration, multi-column. Feature-rich."
      />
      <footer className="bg-holo-charcoal text-white relative overflow-hidden">
        {/* Holographic accent */}
        <div className="h-1.5 holographic-base" />

        {/* Decorative sticker */}
        <div className="absolute top-12 right-12 w-24 h-24 opacity-20 rotate-12">
          <Image
            src="/design-system/stickers/transparent/stay-wild.png"
            alt=""
            width={96}
            height={96}
            className="object-contain"
            unoptimized
          />
        </div>

        {/* Newsletter section */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-archivo-condensed font-semibold text-2xl uppercase">Resta in viaggio</h3>
              <p className="font-archivo text-white/60 mt-2">
                Iscriviti per ricevere itinerari, offerte e storie dalla strada.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg font-archivo text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              <button className="px-6 py-3 holographic-base text-holo-charcoal font-archivo-condensed font-semibold text-sm uppercase tracking-wider rounded-lg">
                Iscriviti
              </button>
            </div>
          </div>
        </div>

        {/* Multi-column links */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1: Logo + description */}
            <div className="col-span-2 md:col-span-1">
              <Image
                src="/images/logo-horizontal-negative.png"
                alt="HOLO VAN"
                width={120}
                height={40}
                className="h-8 w-auto"
                unoptimized
              />
              <p className="font-archivo text-sm text-white/50 mt-4 leading-relaxed">
                Premium camper van rental per veri viaggiatori. La libert&agrave; &egrave; ovunque.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">Esplora</h4>
              <nav className="flex flex-col gap-3">
                {['I Camper', 'Prenota', 'Itinerari', 'Viaggi di Gruppo'].map((link) => (
                  <a key={link} href="#" className="font-archivo text-sm text-white/70 hover:text-white transition-colors">{link}</a>
                ))}
              </nav>
            </div>

            {/* Column 3: Info */}
            <div>
              <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">Info</h4>
              <nav className="flex flex-col gap-3">
                {['Chi siamo', 'FAQ', 'Contatti', 'Blog'].map((link) => (
                  <a key={link} href="#" className="font-archivo text-sm text-white/70 hover:text-white transition-colors">{link}</a>
                ))}
              </nav>
            </div>

            {/* Column 4: Social + contact */}
            <div>
              <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">Seguici</h4>
              <div className="flex gap-3 mb-6">
                {['IG', 'FB', 'YT', 'TT'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors font-archivo text-xs"
                  >
                    {social}
                  </a>
                ))}
              </div>
              <p className="font-archivo text-sm text-white/50">info@holo-van.com</p>
              <p className="font-archivo text-sm text-white/50 mt-1">+39 XXX XXX XXXX</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-archivo text-xs text-white/30">
            &copy; 2026 HOLO VAN. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-archivo text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="font-archivo text-xs text-white/30 hover:text-white/60 transition-colors">Termini e Condizioni</a>
            <a href="#" className="font-archivo text-xs text-white/30 hover:text-white/60 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function FooterPreviewPage() {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dev/previews" className="font-archivo text-sm text-secondary hover:text-primary transition-colors">
              &larr; Previews
            </a>
            <span className="font-archivo-condensed font-semibold text-lg uppercase">
              Footer Variants
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-16">
        <FooterVariantA />
        <div className="h-16 bg-surface" />
        <FooterVariantB />
      </main>
    </div>
  );
}
