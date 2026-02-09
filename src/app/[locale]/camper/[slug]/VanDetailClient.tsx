'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { VanCard, type VanData } from '@/components/ui/VanCard';
import { VanGallery } from './VanGallery';
import { CarouselDots } from '@/components/ui/CarouselDots';
import { Link } from '@/i18n/navigation';
import { useCarousel } from '@/hooks/useCarousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface SpecItem {
  label: string;
  value: string;
}

interface VanDetailClientProps {
  vanName: string;
  vanType: string;
  price: string;
  perDay: string;
  priceFrom: string;
  rawPricePerDay: number;
  images: string[];
  specs: SpecItem[];
  features: string[];
  description: string;
  relatedVans: VanData[];
  labels: {
    backToCatalog: string;
    specsTitle: string;
    featuresTitle: string;
    descriptionTitle: string;
    bookCta: string;
    stickyBook: string;
    relatedTitle: string;
    photosComingSoon: string;
    details: string;
    book: string;
    info: string;
  };
}

export function VanDetailClient({
  vanName,
  vanType,
  price,
  perDay,
  priceFrom,
  images,
  specs,
  features,
  description,
  relatedVans,
  labels,
}: VanDetailClientProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { amount: 0.5 });
  const { matches: isMobile } = useMediaQuery('(max-width: 767px)');
  const { matches: prefersReducedMotion } = useMediaQuery('(prefers-reduced-motion: reduce)');

  const relatedCarousel = useCarousel({ itemCount: relatedVans.length, gap: 16, peekOffset: 56 });

  const cardLabels = { details: labels.details, book: labels.book, info: labels.info };

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-32 pb-4 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <Link
              href="/camper"
              className="inline-flex items-center gap-2 font-archivo text-sm text-secondary hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {labels.backToCatalog}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery (left) */}
          <ScrollReveal>
            <VanGallery
              images={images}
              vanName={vanName}
              photosComingSoon={labels.photosComingSoon}
            />
          </ScrollReveal>

          {/* Info Panel (right) */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-6">
              {/* Name & Type */}
              <div>
                <Badge variant="holographic" size="md">{vanType}</Badge>
                <h1 className="font-archivo-condensed font-semibold text-fluid-hero uppercase tracking-tight text-primary mt-2">
                  {vanName}
                </h1>
                <p className="font-archivo-condensed font-semibold text-2xl holographic-text mt-1">
                  {priceFrom} {price}<span className="text-base font-normal text-secondary">{perDay}</span>
                </p>
              </div>

              {/* Specs Grid */}
              <div>
                <h3 className="font-archivo-condensed font-semibold text-lg uppercase tracking-wider text-primary mb-3">
                  {labels.specsTitle}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {specs.map((spec) => (
                    <div key={spec.label} className="px-4 py-3 bg-surface-alt rounded-lg">
                      <p className="font-archivo text-[10px] uppercase tracking-wider text-muted">{spec.label}</p>
                      <p className="font-archivo font-medium text-sm text-primary mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-archivo-condensed font-semibold text-lg uppercase tracking-wider text-primary mb-3">
                  {labels.featuresTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {features.map((feat) => (
                    <Badge key={feat} variant="outline" size="sm">{feat}</Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-archivo-condensed font-semibold text-lg uppercase tracking-wider text-primary mb-3">
                  {labels.descriptionTitle}
                </h3>
                <p className="font-archivo text-secondary leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Book CTA */}
              <div ref={ctaRef}>
                <Button variant="primary" size="lg" className="w-full">
                  {labels.bookCta}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Vans */}
      {relatedVans.length > 0 && (
        <section className="pb-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="font-archivo-condensed font-semibold text-fluid-h2 uppercase tracking-tight text-primary mb-10">
                {labels.relatedTitle}
              </h2>
            </ScrollReveal>

            {/* Mobile: carousel */}
            <div className="md:hidden">
              {prefersReducedMotion ? (
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-1 -mx-1">
                  {relatedVans.map((van) => (
                    <div key={van.slug} className="snap-center flex-shrink-0 w-[calc(100%-56px)]">
                      <Link href={`/camper/${van.slug}`}>
                        <VanCard van={van} variant="clean" labels={cardLabels} />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-hidden" ref={relatedCarousel.containerRef}>
                  <motion.div
                    className="flex gap-4"
                    drag="x"
                    dragElastic={0.15}
                    dragConstraints={relatedCarousel.dragConstraints}
                    onDragEnd={relatedCarousel.handleDragEnd}
                    animate={{ x: relatedCarousel.getOffset() }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
                  >
                    {relatedVans.map((van) => (
                      <div
                        key={van.slug}
                        className="flex-shrink-0"
                        style={{ width: relatedCarousel.cardWidth || 'calc(100% - 56px)' }}
                      >
                        <Link href={`/camper/${van.slug}`}>
                          <VanCard van={van} variant="clean" labels={cardLabels} />
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}
              <CarouselDots
                count={relatedVans.length}
                activeIndex={relatedCarousel.activeIndex}
                onDotClick={relatedCarousel.setActiveIndex}
              />
            </div>

            {/* Desktop: 3-col grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {relatedVans.map((van, i) => (
                <ScrollReveal key={van.slug} delay={i * 0.15}>
                  <Link href={`/camper/${van.slug}`}>
                    <VanCard van={van} variant="clean" labels={cardLabels} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Mobile CTA Bar */}
      {isMobile && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: ctaInView ? 100 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={cn(
            'fixed bottom-0 left-0 right-0 z-30',
            'bg-surface-elevated/95 backdrop-blur-md',
            'border-t border-border',
            'px-6 py-3',
            'flex items-center justify-between gap-4',
          )}
        >
          <div>
            <p className="font-archivo-condensed font-semibold text-lg holographic-text">
              {price}<span className="text-sm font-normal text-secondary">{perDay}</span>
            </p>
          </div>
          <Button variant="primary" size="md">
            {labels.stickyBook}
          </Button>
        </motion.div>
      )}
    </>
  );
}
