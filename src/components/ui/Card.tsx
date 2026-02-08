'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  holoAccent?: boolean;
}

export function Card({ children, className = '', hover = true, holoAccent = false }: CardProps) {
  return (
    <motion.div
      className={`
        bg-surface-elevated border border-border rounded-xl overflow-hidden
        ${holoAccent ? 'relative' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' } : undefined}
      transition={{ duration: 0.3 }}
    >
      {holoAccent && (
        <div className="absolute top-0 left-0 right-0 h-1 holographic-base" />
      )}
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 pb-6 ${className}`}>
      {children}
    </div>
  );
}
