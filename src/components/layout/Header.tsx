'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MobileMenu } from './MobileMenu';
import { HamburgerButton } from '@/components/ui/HamburgerButton';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MagneticLink } from '@/components/ui/MagneticLink';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');

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
              src="/images/logo-horizontal-positive.png"
              alt="HOLO VAN"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </motion.a>

          {/* Right nav links + language switcher (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <MagneticLink href="#">{t('routes')}</MagneticLink>
            <MagneticLink href="#">{t('contact')}</MagneticLink>
            <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
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
