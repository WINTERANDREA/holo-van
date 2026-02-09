'use client';

import { motion } from 'framer-motion';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function HamburgerButton({ isOpen, onClick, className = '' }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-6 flex flex-col justify-between ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <motion.span
        className="absolute left-0 w-full h-0.5 bg-current origin-center"
        animate={{
          top: isOpen ? '50%' : '0%',
          rotate: isOpen ? 45 : 0,
          y: isOpen ? '-50%' : 0
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-0 top-1/2 w-full h-0.5 bg-current -translate-y-1/2 origin-center"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute left-0 w-full h-0.5 bg-current origin-center"
        animate={{
          bottom: isOpen ? '50%' : '0%',
          rotate: isOpen ? -45 : 0,
          y: isOpen ? '50%' : 0
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </button>
  );
}
