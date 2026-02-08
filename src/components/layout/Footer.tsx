'use client';

import Image from 'next/image';

interface FooterProps {
  translations?: {
    newsletter?: { title?: string; subtitle?: string; placeholder?: string; cta?: string };
    columns?: {
      explore?: { title?: string; vans?: string; routes?: string; groupTrips?: string };
      info?: { title?: string; about?: string; faq?: string; contact?: string };
      legal?: { title?: string; privacy?: string; terms?: string; cookies?: string };
    };
    copyright?: string;
    tagline?: string;
  };
}

const defaultTranslations = {
  newsletter: {
    title: 'RESTA IN VIAGGIO',
    subtitle: 'Iscriviti per itinerari esclusivi e offerte.',
    placeholder: 'La tua email',
    cta: 'ISCRIVITI',
  },
  columns: {
    explore: { title: 'ESPLORA', vans: 'I Camper', routes: 'Itinerari', groupTrips: 'Viaggi di Gruppo' },
    info: { title: 'INFO', about: 'Chi Siamo', faq: 'FAQ', contact: 'Contatti' },
    legal: { title: 'LEGALE', privacy: 'Privacy', terms: 'Termini', cookies: 'Cookie' },
  },
  copyright: `© ${new Date().getFullYear()} HOLO VAN. Tutti i diritti riservati.`,
  tagline: 'TRAVELLERS ONLY',
};

export function Footer({ translations }: FooterProps) {
  const t = { ...defaultTranslations, ...translations };

  return (
    <footer className="bg-holo-charcoal text-white relative">
      {/* Holographic top accent */}
      <div className="h-1 holographic-base" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <h3 className="font-archivo-condensed font-semibold text-xl uppercase tracking-wider">
              {t.newsletter?.title}
            </h3>
            <p className="font-archivo text-sm text-white/60 mt-1">
              {t.newsletter?.subtitle}
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder={t.newsletter?.placeholder}
              className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/10 font-archivo text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 holographic-base text-holo-charcoal font-archivo-condensed font-semibold text-sm uppercase tracking-wider cursor-pointer"
            >
              {t.newsletter?.cta}
            </button>
          </form>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/design-system/logos/extended-payoff/HV_Extended_Payoff_NEGATIVE.png"
              alt="HOLO VAN"
              width={180}
              height={60}
              className="h-12 w-auto"
              unoptimized
            />
            <p className="font-archivo text-xs text-white/40 mt-4 max-w-[200px]">
              {t.tagline}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider mb-4">
              {t.columns?.explore?.title}
            </h4>
            <ul className="space-y-2">
              {[t.columns?.explore?.vans, t.columns?.explore?.routes, t.columns?.explore?.groupTrips].map(
                (label) =>
                  label && (
                    <li key={label}>
                      <a href="#" className="font-archivo text-sm text-white/60 hover:text-white transition-colors">
                        {label}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider mb-4">
              {t.columns?.info?.title}
            </h4>
            <ul className="space-y-2">
              {[t.columns?.info?.about, t.columns?.info?.faq, t.columns?.info?.contact].map(
                (label) =>
                  label && (
                    <li key={label}>
                      <a href="#" className="font-archivo text-sm text-white/60 hover:text-white transition-colors">
                        {label}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider mb-4">
              {t.columns?.legal?.title}
            </h4>
            <ul className="space-y-2">
              {[t.columns?.legal?.privacy, t.columns?.legal?.terms, t.columns?.legal?.cookies].map(
                (label) =>
                  label && (
                    <li key={label}>
                      <a href="#" className="font-archivo text-sm text-white/60 hover:text-white transition-colors">
                        {label}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="font-archivo text-xs text-white/40">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
