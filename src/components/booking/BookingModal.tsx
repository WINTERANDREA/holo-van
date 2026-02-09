'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BookingSearch } from './BookingSearch';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  labels: {
    location?: string;
    pickup?: string;
    returnDate?: string;
    cta?: string;
  };
}

export function BookingModal({ isOpen, onClose, labels }: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Bottom sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="relative bg-surface-elevated rounded-t-3xl shadow-2xl overflow-hidden">
              {/* Holographic accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 holographic-base holo-force-vibrant" />

              {/* Drag handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted hover:text-primary transition-colors"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Content */}
              <div className="px-6 pt-2 pb-8">
                <h3 className="font-archivo-condensed font-semibold text-xl text-primary tracking-wide mb-6">
                  {labels.cta || 'PRENOTA'}
                </h3>
                <BookingSearch
                  variant="stacked"
                  labels={labels}
                  className="!bg-transparent !border-0 !p-0"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
