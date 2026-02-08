'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'holographic';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-surface hover:opacity-90',
  secondary:
    'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-surface',
  ghost:
    'bg-transparent text-primary hover:bg-primary/5',
  holographic:
    'holographic-base text-holo-charcoal hover:opacity-90',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group inline-flex items-center justify-center
        font-archivo-condensed font-semibold uppercase tracking-wider
        transition-colors duration-200
        disabled:opacity-50 disabled:pointer-events-none
        cursor-pointer relative overflow-hidden
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 holographic-base opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
