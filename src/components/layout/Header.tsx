'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { MobileMenu } from './MobileMenu';
import { HamburgerButton } from '@/components/ui/HamburgerButton';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark'
    ? '/images/logo-horizontal-negative.png'
    : '/images/logo-horizontal-positive.png';

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <MagneticLink href="#">{t('vans')}</MagneticLink>
            <MagneticLink href="#">{t('book')}</MagneticLink>
          </nav>

          {/* Center: Logo (always centered) */}
          <motion.a
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={logoSrc}
              alt="HOLO VAN"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </motion.a>

          {/* Right nav links + theme toggle + language switcher (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <MagneticLink href="#">{t('routes')}</MagneticLink>
            <MagneticLink href="#">{t('contact')}</MagneticLink>
            <ThemeToggle />
            <LanguageSwitcher />
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
