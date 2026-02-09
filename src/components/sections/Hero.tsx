'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BookingSearch } from '@/components/booking/BookingSearch';
import { BookingModal } from '@/components/booking/BookingModal';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Hero() {
  const t = useTranslations('hero');
  const tTagline = useTranslations();
  const tBooking = useTranslations('booking');
  const { matches: isDesktop } = useMediaQuery('(min-width: 768px)');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const bookingLabels = {
    location: tBooking('location'),
    pickup: tBooking('pickup'),
    returnDate: tBooking('return'),
    cta: tBooking('search'),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="text-center z-10 px-4 max-w-5xl mx-auto">
        {/* Tagline */}
        <motion.p
          className="font-archivo-condensed text-sm tracking-[0.3em] text-holo-charcoal/70 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {tTagline('tagline')}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          className="font-archivo-condensed font-semibold text-fluid-hero text-holo-charcoal tracking-tight leading-[0.9]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 md:mt-8 font-archivo text-fluid-body-lg text-holo-charcoal/70 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Mobile: single CTA that opens booking sheet */}
        {!isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10"
          >
            <motion.button
              className="inline-flex items-center gap-3 px-10 py-4 bg-holo-charcoal text-holo-offwhite font-archivo-condensed font-semibold tracking-wider text-lg relative overflow-hidden group cursor-pointer rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsBookingOpen(true)}
            >
              <span className="relative z-10">{tBooking('search')}</span>
              <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {/* Holographic hover fill */}
              <span className="absolute inset-0 holographic-base opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </motion.div>
        )}

        {/* Desktop: inline booking form */}
        {isDesktop && (
          <>
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-12"
            >
              <motion.button
                className="inline-block px-8 py-4 bg-holo-charcoal text-holo-offwhite font-archivo-condensed font-semibold tracking-wider relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {}}
              >
                <span className="relative z-10">{t('cta')}</span>
                {/* Holographic hover fill */}
                <span className="absolute inset-0 holographic-base opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </motion.div>

            {/* Booking Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 max-w-3xl mx-auto"
            >
              <BookingSearch
                variant="inline"
                labels={bookingLabels}
              />
            </motion.div>
          </>
        )}
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
            className="w-1.5 h-1.5 bg-holo-charcoal/30 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Mobile booking bottom sheet */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        labels={bookingLabels}
      />
    </section>
  );
}
