'use client';

import { useTranslations } from 'next-intl';
import { MagneticLink } from '@/components/ui/MagneticLink';

export function Navigation() {
  const t = useTranslations('nav');

  const leftLinks = [
    { key: 'vans', href: '/camper' },
    { key: 'book', href: '/prenota' },
  ];

  const rightLinks = [
    { key: 'routes', href: '/itinerari' },
    { key: 'contact', href: '/contatti' },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {/* Left links */}
      <div className="flex items-center gap-8">
        {leftLinks.map(({ key, href }) => (
          <MagneticLink key={key} href={href}>
            {t(key)}
          </MagneticLink>
        ))}
      </div>

      {/* Spacer for logo */}
      <div className="w-32" />

      {/* Right links */}
      <div className="flex items-center gap-8">
        {rightLinks.map(({ key, href }) => (
          <MagneticLink key={key} href={href}>
            {t(key)}
          </MagneticLink>
        ))}
      </div>
    </nav>
  );
}
