'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ColorsSection } from './_components/ColorsSection';
import { TypographySection } from './_components/TypographySection';
import { LogosSection } from './_components/LogosSection';
import { StickersSection } from './_components/StickersSection';
import { DarkModeSection } from './_components/DarkModeSection';
import { BackgroundsSection } from './_components/BackgroundsSection';
import { ComponentsSection } from './_components/ComponentsSection';
import { EffectsSection } from './_components/EffectsSection';

const sections = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'logos', label: 'Logos' },
  { id: 'stickers', label: 'Stickers' },
  { id: 'dark-mode', label: 'Dark Mode' },
  { id: 'backgrounds', label: 'Backgrounds' },
  { id: 'components', label: 'Components' },
  { id: 'effects', label: 'Effects' },
];

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-archivo-condensed font-semibold text-3xl uppercase tracking-wide">
        {title}
      </h2>
      <p className="mt-1 font-archivo text-secondary">{subtitle}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-archivo-condensed font-semibold text-lg uppercase">
            HOLO VAN Design System
          </span>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="font-archivo text-sm text-secondary hover:text-primary transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-16">
          <h1 className="font-archivo-condensed font-semibold text-6xl uppercase">
            Design System
          </h1>
          <p className="mt-4 font-archivo text-lg text-secondary max-w-2xl">
            The complete visual identity guide for HOLO VAN.
            Brand elements, typography, colors, and components.
          </p>
          <p className="mt-2 text-sm text-muted">
            Dev-only route - not accessible in production
          </p>
        </header>

        {/* Sections */}
        <section id="colors" className="mb-24 scroll-mt-24">
          <SectionHeader title="Colors" subtitle="Holographic spectrum, primary palette, and semantic tokens" />
          <ColorsSection />
        </section>

        <section id="typography" className="mb-24 scroll-mt-24">
          <SectionHeader title="Typography" subtitle="Archivo font family in all weights + fluid scale" />
          <TypographySection />
        </section>

        <section id="logos" className="mb-24 scroll-mt-24">
          <SectionHeader title="Logos" subtitle="All variants and color versions" />
          <LogosSection />
        </section>

        <section id="stickers" className="mb-24 scroll-mt-24">
          <SectionHeader title="Stickers" subtitle="Brand decorative elements in 4 variants (hover for usage)" />
          <StickersSection />
        </section>

        <section id="dark-mode" className="mb-24 scroll-mt-24">
          <SectionHeader title="Dark Mode" subtitle="Light vs dark theme comparison and token mapping" />
          <DarkModeSection />
        </section>

        <section id="backgrounds" className="mb-24 scroll-mt-24">
          <SectionHeader title="Backgrounds" subtitle="Holographic texture, CSS gradients, and legibility tests" />
          <BackgroundsSection />
        </section>

        <section id="components" className="mb-24 scroll-mt-24">
          <SectionHeader title="Components" subtitle="Buttons, cards, inputs, and interactive elements" />
          <ComponentsSection />
        </section>

        <section id="effects" className="mb-24 scroll-mt-24">
          <SectionHeader title="Effects" subtitle="Animations and holographic backgrounds" />
          <EffectsSection />
        </section>
      </main>
    </div>
  );
}
