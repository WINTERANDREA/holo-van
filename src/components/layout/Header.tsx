'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Link } from '@/i18n/navigation';
import { MobileMenu } from './MobileMenu';
import { HamburgerButton } from '@/components/ui/HamburgerButton';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useScrollState } from '@/hooks/useScrollState';
import { cn } from '@/lib/utils';

interface HeaderProps {
  /** Set to "holographic" on pages with holographic bg (homepage) to force dark text at top */
  heroStyle?: 'holographic';
}

export function Header({ heroStyle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isScrolled, isAtTop, direction } = useScrollState(50);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  // Single flag: true when glassmorphism bg is visible
  const hasScrolledBg = isScrolled && !isAtTop;

  // On holographic bg at top → force dark text/logo (pastel bg is always light)
  // On normal pages at top → theme-aware (dark text in light mode, light text in dark mode)
  const forceDarkAtTop = heroStyle === 'holographic' && !hasScrolledBg;

  const logoSrc = forceDarkAtTop || !isDark
    ? '/images/logo-horizontal-positive.png'
    : '/images/logo-horizontal-negative.png';

  const shouldHide = direction === 'down' && isScrolled && !isMobileMenuOpen;

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300',
          isAtTop && 'bg-transparent',
          isScrolled && !isAtTop && 'bg-surface/80 backdrop-blur-md border-b border-border',
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: shouldHide ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className={cn(
          'max-w-7xl mx-auto flex items-center justify-between transition-colors duration-300',
          forceDarkAtTop ? 'text-holo-charcoal' : 'text-primary',
        )}>
          {/* Left nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <MagneticLink href="/camper">{t('vans')}</MagneticLink>
            <MagneticLink href="/prenota">{t('book')}</MagneticLink>
          </nav>

          {/* Center: Logo (always centered) */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src={logoSrc}
              alt="HOLO VAN"
              width={120}
              height={40}
              className="h-10 w-auto hover:scale-105 active:scale-[0.98] transition-transform"
              priority
            />
          </Link>

          {/* Right nav links + theme toggle + language switcher (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <MagneticLink href="/itinerari">{t('routes')}</MagneticLink>
            <MagneticLink href="/contatti">{t('contact')}</MagneticLink>
            <ThemeToggle />
            <LanguageSwitcher variant={forceDarkAtTop ? 'dark' : 'auto'} />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
