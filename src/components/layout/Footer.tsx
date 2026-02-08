'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');

  const exploreLinks = [
    { label: t('explore.vans'), href: '/camper' },
    { label: t('explore.routes'), href: '/itinerari' },
    { label: t('explore.groupTrips'), href: '/viaggi-gruppo' },
  ];

  const infoLinks = [
    { label: t('info.about'), href: '/contatti' },
    { label: t('info.faq'), href: '/contatti#faq' },
    { label: t('info.contact'), href: '/contatti' },
  ];

  const legalLinks = [
    { label: t('legal.privacy'), href: '/privacy' },
    { label: t('legal.terms'), href: '/termini' },
    { label: t('legal.cookies'), href: '/privacy' },
  ];

  return (
    <footer className="bg-holo-charcoal text-white relative">
      {/* Holographic top accent */}
      <div className="h-1 holographic-base" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <h3 className="font-archivo-condensed font-semibold text-xl uppercase tracking-wider">
              {t('newsletter.title')}
            </h3>
            <p className="font-archivo text-sm text-white/60 mt-1">
              {t('newsletter.subtitle')}
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/10 font-archivo text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 holographic-base text-holo-charcoal font-archivo-condensed font-semibold text-sm uppercase tracking-wider cursor-pointer"
            >
              {t('newsletter.cta')}
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
              TRAVELLERS ONLY
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider mb-4">
              {t('explore.title')}
            </h4>
            <ul className="space-y-2">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-archivo text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider mb-4">
              {t('info.title')}
            </h4>
            <ul className="space-y-2">
              {infoLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-archivo text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider mb-4">
              {t('legal.title')}
            </h4>
            <ul className="space-y-2">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-archivo text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="font-archivo text-xs text-white/40">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
