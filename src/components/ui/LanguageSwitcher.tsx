'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/routing';

const locales: { code: Locale; label: string }[] = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'ja', label: 'JP' },
];

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
}

export function LanguageSwitcher({ variant = 'auto', className = '' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const getColors = () => {
    if (variant === 'light') {
      return { active: 'text-white', inactive: 'text-white/40' };
    }
    if (variant === 'dark') {
      return { active: 'text-holo-charcoal', inactive: 'text-holo-charcoal/40' };
    }
    // auto: follows semantic tokens
    return { active: 'text-primary', inactive: 'text-muted' };
  };

  const { active, inactive } = getColors();

  return (
    <div className={`flex gap-3 ${className}`}>
      {locales.map(({ code, label }) => (
        <motion.button
          key={code}
          onClick={() => switchLocale(code)}
          className={`text-sm font-archivo-condensed font-semibold tracking-wider transition-colors ${
            locale === code ? active : inactive
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
