'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const linkVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  })
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('nav');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const links = [
    { key: 'vans' as const, href: '/camper' },
    { key: 'book' as const, href: '/prenota' },
    { key: 'routes' as const, href: '/itinerari' },
    { key: 'contact' as const, href: '/contatti' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-surface overflow-hidden"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Holographic accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full holographic-base opacity-20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center"
            aria-label="Close menu"
          >
            <motion.span
              className="absolute w-8 h-0.5 bg-primary"
              initial={{ rotate: 0 }}
              animate={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute w-8 h-0.5 bg-primary"
              initial={{ rotate: 0 }}
              animate={{ rotate: -45 }}
              transition={{ duration: 0.3 }}
            />
          </button>

          {/* Chameleon decoration */}
          <motion.div
            className="absolute bottom-20 right-8 w-24 h-24 opacity-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Image
              src={isDark ? '/design-system/logos/extended/HV_Extended_COLOR.png' : '/design-system/logos/extended/HV_Extended_COLOR_Inv.png'}
              alt=""
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Links */}
          <nav className="flex flex-col justify-center h-full px-8">
            {links.map(({ key, href }, i) => (
              <motion.div
                key={key}
                custom={i}
                variants={linkVariants}
                initial="closed"
                animate="open"
              >
                <Link
                  href={href}
                  className="block font-archivo-condensed font-semibold text-5xl sm:text-6xl text-primary py-4 hover:holographic-text transition-all duration-300"
                  onClick={onClose}
                >
                  {t(key)}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Language switcher */}
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <LanguageSwitcher variant="auto" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
