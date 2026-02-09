'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/Skeleton';
import { CarouselDots } from '@/components/ui/CarouselDots';
import { useCarousel } from '@/hooks/useCarousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface VanGalleryProps {
  images: string[];
  vanName: string;
  photosComingSoon: string;
}

const PLACEHOLDER_COUNT = 4;

function GalleryPlaceholder({ vanName, label }: { vanName: string; label: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-primary/5">
      <Skeleton className="w-full h-full" rounded="sm" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
        <span className="font-archivo-condensed font-semibold text-lg text-muted/30 uppercase tracking-wider">
          {vanName}
        </span>
        <span className="font-archivo text-xs text-muted/40">
          {label}
        </span>
      </div>
    </div>
  );
}

export function VanGallery({ images, vanName, photosComingSoon }: VanGalleryProps) {
  const hasImages = images.length > 0;
  const slideCount = hasImages ? images.length : PLACEHOLDER_COUNT;
  const [activeIndex, setActiveIndex] = useState(0);
  const { matches: isMobile } = useMediaQuery('(max-width: 767px)');
  const { matches: prefersReducedMotion } = useMediaQuery('(prefers-reduced-motion: reduce)');
  const carousel = useCarousel({ itemCount: slideCount, gap: 0, peekOffset: 0 });

  // Mobile: swipeable carousel
  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
          {prefersReducedMotion ? (
            <div className="flex overflow-x-auto snap-x snap-mandatory w-full h-full">
              {Array.from({ length: slideCount }, (_, i) => (
                <div key={i} className="snap-center flex-shrink-0 w-full h-full">
                  <GalleryPlaceholder vanName={vanName} label={photosComingSoon} />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden w-full h-full" ref={carousel.containerRef}>
              <motion.div
                className="flex w-full h-full"
                drag="x"
                dragElastic={0.15}
                dragConstraints={carousel.dragConstraints}
                onDragEnd={carousel.handleDragEnd}
                animate={{ x: carousel.getOffset() }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
              >
                {Array.from({ length: slideCount }, (_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 h-full"
                    style={{ width: carousel.cardWidth || '100%' }}
                  >
                    <GalleryPlaceholder vanName={vanName} label={photosComingSoon} />
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
        <CarouselDots
          count={slideCount}
          activeIndex={carousel.activeIndex}
          onDotClick={carousel.setActiveIndex}
        />
      </div>
    );
  }

  // Desktop: main image + thumbnail row
  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <GalleryPlaceholder vanName={vanName} label={photosComingSoon} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              'flex-1 aspect-[4/3] rounded-lg overflow-hidden relative transition-all cursor-pointer',
              activeIndex === i
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface'
                : 'opacity-60 hover:opacity-100',
            )}
          >
            <GalleryPlaceholder vanName={vanName} label="" />
          </button>
        ))}
      </div>
    </div>
  );
}
