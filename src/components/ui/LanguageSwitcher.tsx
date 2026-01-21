'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/routing';

const locales: { code: Locale; label: string }[] = [
  { code: 'it', label: 'IT' },
  { code: 'ru', label: 'RU' },
  { code: 'ja', label: 'JP' },
];

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function LanguageSwitcher({ variant = 'dark', className = '' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const activeColor = variant === 'dark' ? 'text-holo-charcoal' : 'text-white';
  const inactiveColor = variant === 'dark' ? 'text-holo-charcoal/40' : 'text-white/40';

  return (
    <div className={`flex gap-3 ${className}`}>
      {locales.map(({ code, label }) => (
        <motion.button
          key={code}
          onClick={() => switchLocale(code)}
          className={`text-sm font-archivo-condensed font-semibold tracking-wider transition-colors ${
            locale === code ? activeColor : inactiveColor
          } hover:${activeColor}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
