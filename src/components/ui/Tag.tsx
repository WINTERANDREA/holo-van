'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TagProps {
  children: string;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ children, selected = false, onSelect, onRemove, className }: TagProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-archivo transition-colors cursor-pointer',
        selected
          ? 'border-primary bg-primary text-surface'
          : 'border-border text-secondary hover:border-primary hover:text-primary',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {onRemove && selected && (
        <span
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 text-current opacity-60 hover:opacity-100"
        >
          &times;
        </span>
      )}
    </motion.button>
  );
}
