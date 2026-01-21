'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  const tTagline = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="text-center z-10 px-4 max-w-5xl mx-auto">
        {/* Tagline */}
        <motion.p
          className="font-archivo-condensed text-sm tracking-[0.3em] text-holo-charcoal/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {tTagline('tagline')}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          className="font-archivo-condensed font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-holo-charcoal tracking-tight leading-[0.9]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 font-archivo text-lg md:text-xl text-holo-charcoal/70 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-10 md:mt-12"
        >
          <motion.button
            className="inline-block px-8 py-4 bg-holo-charcoal text-white font-archivo-condensed font-semibold tracking-wider relative overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {}}
          >
            <span className="relative z-10">{t('cta')}</span>
            {/* Holographic hover fill */}
            <span className="absolute inset-0 holographic-base opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-holo-charcoal/30 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-holo-charcoal/50 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
