'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'default' | 'underline';
}

export function Input({ label, variant = 'default', className = '', ...props }: InputProps) {
  const baseClasses = 'w-full font-archivo bg-transparent text-primary placeholder:text-muted transition-colors duration-200 focus:outline-none';

  const variantClasses = {
    default: 'px-4 py-3 border border-border rounded-lg focus:border-primary',
    underline: 'px-0 py-3 border-b-2 border-border focus:border-primary rounded-none',
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-archivo font-medium text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${variantClasses[variant]}`}
        {...props}
      />
    </div>
  );
}
