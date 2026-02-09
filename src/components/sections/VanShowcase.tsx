'use client';

import { motion } from 'framer-motion';
import { VanCard, type VanData } from '@/components/ui/VanCard';
import { CarouselDots } from '@/components/ui/CarouselDots';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { useCarousel } from '@/hooks/useCarousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const mockVans: VanData[] = [
  {
    slug: 'california-ocean',
    name: 'California Ocean',
    type: 'Camper Van',
    capacity: '4 posti',
    pricePerDay: '€120/giorno',
    features: ['Tetto pop-up', 'Cucina integrata', 'Doccia esterna'],
  },
  {
    slug: 'grand-california',
    name: 'Grand California',
    type: 'Motorhome',
    capacity: '4 posti',
    pricePerDay: '€150/giorno',
    features: ['Bagno integrato', 'Letto matrimoniale', 'Cucina full'],
  },
  {
    slug: 'caddy-california',
    name: 'Caddy California',
    type: 'Mini Camper',
    capacity: '2 posti',
    pricePerDay: '€80/giorno',
    features: ['Compatto', 'Tetto pop-up', 'Cucina estraibile'],
  },
];

interface VanShowcaseProps {
  title?: string;
  subtitle?: string;
  vans?: VanData[];
  className?: string;
}

export function VanShowcase({
  title = 'I NOSTRI CAMPER',
  subtitle = 'Scegli il tuo compagno di viaggio.',
  vans = mockVans,
  className,
}: VanShowcaseProps) {
  const { matches: prefersReducedMotion } = useMediaQuery('(prefers-reduced-motion: reduce)');
  const carousel = useCarousel({ itemCount: vans.length, gap: 16, peekOffset: 56 });

  return (
    <section className={cn('py-24 px-6 bg-surface', className)}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-archivo-condensed font-semibold text-fluid-h2 uppercase tracking-tight">
              {title}
            </h2>
            <p className="font-archivo text-secondary mt-3 max-w-md mx-auto">
              {subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile: Framer Motion drag carousel (reduced-motion: CSS scroll fallback) */}
        <div className="md:hidden">
          {prefersReducedMotion ? (
            /* Reduced motion fallback — simple CSS scroll */
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-6 -mx-6">
              {vans.map((van) => (
                <div key={van.slug} className="snap-center flex-shrink-0 w-[calc(100%-56px)]">
                  <VanCard van={van} variant="clean" />
                </div>
              ))}
            </div>
          ) : (
            /* Full carousel with spring physics */
            <ScrollReveal>
              <div className="overflow-hidden" ref={carousel.containerRef}>
                <motion.div
                  className="flex gap-4 carousel-track"
                  drag="x"
                  dragElastic={0.15}
                  dragConstraints={carousel.dragConstraints}
                  onDragEnd={carousel.handleDragEnd}
                  animate={{ x: carousel.getOffset() }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
                >
                  {vans.map((van) => (
                    <div
                      key={van.slug}
                      className="flex-shrink-0"
                      style={{ width: carousel.cardWidth || 'calc(100% - 56px)' }}
                    >
                      <VanCard van={van} variant="clean" />
                    </div>
                  ))}
                </motion.div>
              </div>
            </ScrollReveal>
          )}
          <CarouselDots
            count={vans.length}
            activeIndex={carousel.activeIndex}
            onDotClick={carousel.setActiveIndex}
          />
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {vans.map((van, i) => (
            <ScrollReveal key={van.slug} delay={i * 0.15}>
              <VanCard van={van} variant="clean" />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
