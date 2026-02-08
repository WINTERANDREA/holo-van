'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function VariantLabel({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-surface border-b border-border px-6 py-4">
      <h2 className="font-archivo-condensed font-semibold text-2xl uppercase">{name}</h2>
      <p className="font-archivo text-sm text-secondary mt-1">{description}</p>
    </div>
  );
}

/* ===== VARIANT A: Asymmetric Grid ===== */
function SectionVariantA() {
  return (
    <div>
      <VariantLabel
        name="Variant A — Asymmetric Grid"
        description="Large image left, text right, staggered on scroll. Offset grid creating visual tension."
      />
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <p className="font-archivo-condensed text-sm tracking-[0.3em] text-muted uppercase mb-2">Perch&eacute; HOLO VAN</p>
            <h2 className="font-archivo-condensed font-semibold text-fluid-h2 uppercase leading-tight">
              LA LIBERT&Agrave;<br />&Egrave; OVUNQUE
            </h2>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Large image - 7 cols */}
            <div className="md:col-span-7">
              <div className="aspect-[4/3] bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="font-archivo text-sm text-muted">Lifestyle photo</span>
              </div>
            </div>
            {/* Text - 5 cols, offset down */}
            <div className="md:col-span-5 md:mt-24">
              <h3 className="font-archivo-condensed font-semibold text-fluid-h3 uppercase">Non un noleggio. Un&apos;esperienza.</h3>
              <p className="font-archivo text-secondary mt-4 leading-relaxed">
                Ogni van &egrave; preparato per il viaggio perfetto. Cucina, letto, tetto pop-up —
                tutto quello che serve per vivere la strada come un vero viaggiatore.
              </p>
              <button className="mt-6 px-6 py-3 bg-primary text-surface font-archivo-condensed font-semibold text-sm uppercase tracking-wider">
                Scopri di pi&ugrave;
              </button>
            </div>
          </div>

          {/* Second row - reversed */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-24">
            <div className="md:col-span-5 md:col-start-1">
              <h3 className="font-archivo-condensed font-semibold text-fluid-h3 uppercase">Itinerari curati per te</h3>
              <p className="font-archivo text-secondary mt-4 leading-relaxed">
                Non sai dove andare? Abbiamo percorsi testati personalmente
                lungo le coste e montagne pi&ugrave; belle d&apos;Italia.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="aspect-[4/3] bg-primary/10 rounded-2xl flex items-center justify-center">
                <span className="font-archivo text-sm text-muted">Route/map photo</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== VARIANT B: Full-width Strips ===== */
function SectionVariantB() {
  return (
    <div>
      <VariantLabel
        name="Variant B — Full-width Strips"
        description="Alternating light/dark bands, full-bleed sections, strong contrast."
      />
      {/* Light strip */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <p className="font-archivo-condensed text-sm tracking-[0.3em] text-muted uppercase mb-2">Il nostro modo</p>
          <h2 className="font-archivo-condensed font-semibold text-fluid-h2 text-primary uppercase">
            NON SIAMO UN NOLEGGIO
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Libert\u00E0 totale', 'Itinerari insider', 'Community vera'].map((title, i) => (
            <div key={title} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/5 flex items-center justify-center">
                <Image
                  src={`/design-system/stickers/${['stay-wild', 'more-adventure', 'real-travellers'][i]}.png`}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="font-archivo-condensed font-semibold text-xl text-primary uppercase">{title}</h3>
              <p className="font-archivo text-sm text-secondary mt-2 max-w-xs mx-auto">
                La libert&agrave; non si prenota. Si vive. Ogni giorno, ogni strada, ogni tramonto.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dark strip */}
      <section className="py-24 px-6 bg-holo-charcoal relative overflow-hidden">
        <div className="absolute inset-0 holographic-base opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-archivo-condensed font-semibold text-fluid-h2 text-white uppercase leading-tight">
              VIVI LA STRADA.<br />NON IL RESORT.
            </h2>
            <p className="font-archivo text-white/60 mt-4 leading-relaxed max-w-md">
              Svegliati dove vuoi. Cucina vista mare. Dormi sotto le stelle.
              Questo &egrave; quello che facciamo.
            </p>
          </div>
          <div className="aspect-video bg-white/10 rounded-2xl flex items-center justify-center">
            <span className="font-archivo text-sm text-white/40">Van lifestyle video</span>
          </div>
        </div>
      </section>

      {/* Holographic strip */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 holographic-base" />
        <div className="absolute inset-0 holographic-overlay opacity-60" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-archivo-condensed font-semibold text-fluid-h2 text-holo-charcoal uppercase">
            PRONTO A PARTIRE?
          </h2>
          <p className="font-archivo text-holo-charcoal/70 mt-4">
            Scegli il tuo van. Scegli la tua avventura. Il resto viene da s&eacute;.
          </p>
          <button className="mt-8 px-8 py-4 bg-holo-charcoal text-white font-archivo-condensed font-semibold tracking-wider">
            PRENOTA ORA
          </button>
        </div>
      </section>
    </div>
  );
}

/* ===== VARIANT C: Magazine Editorial ===== */
function SectionVariantC() {
  return (
    <div>
      <VariantLabel
        name="Variant C — Magazine Editorial"
        description="Mixed sizes, editorial feel with large typography, asymmetric layouts."
      />
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          {/* Big editorial header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-8">
              <h2 className="font-archivo-condensed font-semibold text-fluid-hero uppercase leading-[0.85] tracking-tight">
                FREEDOM<br />IS EVERYWHERE
              </h2>
            </div>
            <div className="md:col-span-4 flex items-end">
              <p className="font-archivo text-secondary leading-relaxed">
                We don&apos;t rent vans. We hand you the key to a different life.
                No plans, no schedules, no resort mentality.
              </p>
            </div>
          </div>

          {/* Mixed-size image grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="font-archivo text-sm text-muted">Hero lifestyle photo</span>
            </div>
            <div className="aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="font-archivo text-xs text-muted">Detail</span>
            </div>
            <div className="aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="font-archivo text-xs text-muted">Interior</span>
            </div>
            <div className="aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="font-archivo text-xs text-muted">Route</span>
            </div>
            <div className="aspect-square bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="font-archivo text-xs text-muted">People</span>
            </div>
          </div>

          {/* Quote pullout */}
          <div className="my-20 max-w-3xl mx-auto text-center">
            <div className="h-1 w-20 mx-auto mb-8 holographic-base rounded-full" />
            <blockquote className="font-archivo-condensed font-light text-fluid-h2 text-primary leading-tight italic">
              &ldquo;The best view comes after the hardest climb. And sometimes, after parking the van.&rdquo;
            </blockquote>
            <div className="h-1 w-20 mx-auto mt-8 holographic-base rounded-full" />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '12+', label: 'Camper van' },
              { number: '50+', label: 'Itinerari' },
              { number: '1000+', label: 'Viaggiatori' },
              { number: '∞', label: 'Avventure' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-archivo-condensed font-semibold text-fluid-h1 holographic-text">{stat.number}</p>
                <p className="font-archivo text-sm text-secondary uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SectionsPreviewPage() {
  return (
    <div className="min-h-screen bg-surface">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dev/previews" className="font-archivo text-sm text-secondary hover:text-primary transition-colors">
              &larr; Previews
            </a>
            <span className="font-archivo-condensed font-semibold text-lg uppercase">
              Section Layout Variants
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-16">
        <SectionVariantA />
        <SectionVariantB />
        <SectionVariantC />
      </main>
    </div>
  );
}
