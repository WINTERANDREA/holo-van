'use client';

import { motion } from 'framer-motion';
import { VanCard, type VanData } from '@/components/ui/VanCard';
import { CarouselDots } from '@/components/ui/CarouselDots';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { useCarousel } from '@/hooks/useCarousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface VanShowcaseProps {
  title?: string;
  subtitle?: string;
  vans: VanData[];
  cardLabels?: { details?: string; book?: string; info?: string };
  className?: string;
}

export function VanShowcase({
  title = 'I NOSTRI CAMPER',
  subtitle = 'Scegli il tuo compagno di viaggio.',
  vans,
  cardLabels,
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
                  <Link href={`/camper/${van.slug}`}>
                    <VanCard van={van} variant="clean" labels={cardLabels} />
                  </Link>
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
                      <Link href={`/camper/${van.slug}`}>
                        <VanCard van={van} variant="clean" labels={cardLabels} />
                      </Link>
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

        {/* Desktop: responsive grid — 2-col for ≤2 vans, 3-col for 3+ */}
        <div className={cn(
          'hidden md:grid gap-8',
          vans.length <= 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3',
        )}>
          {vans.map((van, i) => (
            <ScrollReveal key={van.slug} delay={i * 0.15}>
              <Link href={`/camper/${van.slug}`}>
                <VanCard van={van} variant="clean" labels={cardLabels} />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
