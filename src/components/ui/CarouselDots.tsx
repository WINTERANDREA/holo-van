'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export function CarouselDots({ count, activeIndex, onDotClick, className }: CarouselDotsProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2 mt-6', className)} role="tablist">
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === activeIndex;
        return (
          <motion.button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onDotClick(i)}
            className={cn(
              'h-2 rounded-full transition-colors',
              isActive ? 'holographic-base' : 'bg-primary/20',
            )}
            animate={{ width: isActive ? 24 : 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        );
      })}
    </div>
  );
}
