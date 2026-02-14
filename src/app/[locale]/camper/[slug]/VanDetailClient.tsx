'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { VanCard, type VanData } from '@/components/ui/VanCard';
import { FeatureIcon, RuleIcon } from '@/components/ui/FeatureIcon';
import { VanGallery } from './VanGallery';
import { CarouselDots } from '@/components/ui/CarouselDots';
import { Link } from '@/i18n/navigation';
import { useCarousel } from '@/hooks/useCarousel';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

// ── Types ────────────────────────────────────────────────

interface SpecItem {
  label: string;
  value: string;
}

interface Feature {
  key: string;
  label: string;
}

interface SleepingItem {
  key: string;
  label: string;
}

interface OptionalExtra {
  name: string;
  description: string;
}

interface RuleItem {
  type: string;
  label: string;
  allowed: boolean;
}

interface CancellationRule {
  condition: string;
  refund: string;
}

interface CancellationPolicy {
  type: string;
  rules: CancellationRule[];
}

interface Pickup {
  city: string;
  country: string;
  note: string;
}

interface VanDetailClientProps {
  vanName: string;
  vanType: string;
  price: string | null;
  perDay: string;
  priceFrom: string;
  priceComingSoon: string;
  rawPricePerDay: number | null;
  images: string[];
  specs: SpecItem[];
  features: Feature[];
  description: string;
  sleepingConfig: SleepingItem[];
  includedExtras: string[];
  optionalExtras: OptionalExtra[];
  rules: RuleItem[];
  cancellationPolicy: CancellationPolicy;
  pickup: Pickup;
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
    sleepingTitle: string;
    includedTitle: string;
    optionalExtrasTitle: string;
    rulesTitle: string;
    cancellationTitle: string;
    pickupTitle: string;
    details: string;
    book: string;
    info: string;
  };
}

// ── Section Title ────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h3 className="font-archivo-condensed font-semibold text-base uppercase tracking-wider text-primary whitespace-nowrap">
        {children}
      </h3>
      <div className="h-px flex-1 holographic-base holo-decorative-tier rounded-full" />
    </div>
  );
}

// ── Component ────────────────────────────────────────────

export function VanDetailClient({
  vanName,
  vanType,
  price,
  perDay,
  priceFrom,
  priceComingSoon,
  images,
  specs,
  features,
  description,
  sleepingConfig,
  includedExtras,
  optionalExtras,
  rules,
  cancellationPolicy,
  pickup,
  relatedVans,
  labels,
}: VanDetailClientProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { amount: 0.5 });
  const { matches: isMobile } = useMediaQuery('(max-width: 767px)');
  const { matches: prefersReducedMotion } = useMediaQuery('(prefers-reduced-motion: reduce)');

  const relatedCarousel = useCarousel({ itemCount: relatedVans.length, gap: 16, peekOffset: 56 });

  const cardLabels = { details: labels.details, book: labels.book, info: labels.info };

  const priceDisplay = price
    ? <>{priceFrom} {price}<span className="text-base font-normal text-secondary">{perDay}</span></>
    : <span className="text-base">{priceComingSoon}</span>;

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

      {/* ═══ Hero: Gallery + Info Panel ═══ */}
      <section className="pb-12 px-6 bg-surface">
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
            <div className="space-y-8">
              {/* Name, Type & Price */}
              <div>
                <Badge variant="holographic" size="md">{vanType}</Badge>
                <h1 className="font-archivo-condensed font-semibold text-fluid-hero uppercase tracking-tight text-primary mt-2">
                  {vanName}
                </h1>
                <p className="font-archivo-condensed font-semibold text-2xl holographic-text mt-1">
                  {priceDisplay}
                </p>
              </div>

              {/* ── Vehicle Specs ── */}
              <div>
                <SectionTitle>{labels.specsTitle}</SectionTitle>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between items-baseline py-2 border-b border-border/50">
                      <span className="font-archivo text-xs uppercase tracking-wider text-muted">{spec.label}</span>
                      <span className="font-archivo font-medium text-sm text-primary">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Sleeping Configuration ── */}
              {sleepingConfig.length > 0 && (
                <div>
                  <SectionTitle>{labels.sleepingTitle}</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sleepingConfig.map((bed) => (
                      <div key={bed.key} className="flex items-center gap-3 px-4 py-3 bg-surface-alt rounded-lg">
                        <div className="w-9 h-9 rounded-lg bg-holo-lavender/15 flex items-center justify-center text-holo-lavender">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
                          </svg>
                        </div>
                        <span className="font-archivo text-sm text-primary">{bed.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Book CTA ── */}
              <div ref={ctaRef}>
                <Button variant="primary" size="lg" className="w-full">
                  {labels.bookCta}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ Full-Width Features Grid ═══ */}
      <section className="py-16 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionTitle>{labels.featuresTitle}</SectionTitle>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feat, i) => (
              <ScrollReveal key={feat.key} delay={Math.min(i * 0.03, 0.3)}>
                <div className="group flex items-center gap-3 px-4 py-3.5 bg-surface-elevated border border-border rounded-xl transition-all duration-300 hover:border-holo-cyan/40 hover:shadow-[0_0_20px_-5px_var(--holo-cyan)]">
                  <div className="w-10 h-10 rounded-xl holographic-base holo-decorative-tier flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <FeatureIcon feature={feat.key} size={20} className="text-holo-charcoal" />
                  </div>
                  <span className="font-archivo text-sm text-primary leading-tight">{feat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Description ═══ */}
      <section className="pb-16 px-6 bg-surface">
        <div className="max-w-7xl mx-auto max-w-prose">
          <ScrollReveal>
            <SectionTitle>{labels.descriptionTitle}</SectionTitle>
            <p className="font-archivo text-secondary leading-relaxed text-base">
              {description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ Info Cards Grid ═══ */}
      <section className="pb-16 px-6 bg-surface">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* What's Included */}
          <ScrollReveal>
            <div className="h-full bg-surface-elevated border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 holographic-base holo-decorative-tier" />
              <h3 className="font-archivo-condensed font-semibold text-base uppercase tracking-wider text-primary mb-5">
                {labels.includedTitle}
              </h3>
              <ul className="space-y-3">
                {includedExtras.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="font-archivo text-sm text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Optional Extras */}
          <ScrollReveal delay={0.1}>
            <div className="h-full bg-surface-elevated border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 holographic-base holo-decorative-tier" />
              <h3 className="font-archivo-condensed font-semibold text-base uppercase tracking-wider text-primary mb-5">
                {labels.optionalExtrasTitle}
              </h3>
              <ul className="space-y-4">
                {optionalExtras.map((extra) => (
                  <li key={extra.name} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-holo-blue/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-holo-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14" /><path d="M5 12h14" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-archivo font-medium text-sm text-primary">{extra.name}</p>
                      <p className="font-archivo text-xs text-muted mt-0.5 leading-relaxed">{extra.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Rules */}
          <ScrollReveal delay={0.2}>
            <div className="h-full bg-surface-elevated border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 holographic-base holo-decorative-tier" />
              <h3 className="font-archivo-condensed font-semibold text-base uppercase tracking-wider text-primary mb-5">
                {labels.rulesTitle}
              </h3>
              <ul className="space-y-3">
                {rules.map((rule) => (
                  <li key={rule.type} className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                      rule.allowed ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning',
                    )}>
                      <RuleIcon rule={rule.type} size={18} />
                    </div>
                    <span className="font-archivo text-sm text-primary">{rule.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Cancellation Policy */}
          <ScrollReveal delay={0.1}>
            <div className="h-full bg-surface-elevated border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 holographic-base holo-decorative-tier" />
              <h3 className="font-archivo-condensed font-semibold text-base uppercase tracking-wider text-primary mb-5">
                {labels.cancellationTitle}
              </h3>
              <Badge variant="holographic" size="sm" className="mb-4">{cancellationPolicy.type}</Badge>
              <ul className="space-y-3">
                {cancellationPolicy.rules.map((rule) => (
                  <li key={rule.condition} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-holo-peach/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-holo-peach" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-archivo text-xs text-muted">{rule.condition}</p>
                      <p className="font-archivo font-medium text-sm text-primary mt-0.5">{rule.refund}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Pickup Location */}
          <ScrollReveal delay={0.2}>
            <div className="h-full bg-surface-elevated border border-border rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 holographic-base holo-decorative-tier" />
              <h3 className="font-archivo-condensed font-semibold text-base uppercase tracking-wider text-primary mb-5">
                {labels.pickupTitle}
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl holographic-base holo-decorative-tier flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-holo-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-archivo font-medium text-sm text-primary">{pickup.city}, {pickup.country}</p>
                  <p className="font-archivo text-xs text-muted mt-1.5 leading-relaxed">{pickup.note}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ Related Vans ═══ */}
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

            {/* Desktop: grid */}
            <div className={cn(
              'hidden md:grid gap-8',
              relatedVans.length <= 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3',
            )}>
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

      {/* ═══ Sticky Mobile CTA Bar ═══ */}
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
              {price ? (
                <>{price}<span className="text-sm font-normal text-secondary">{perDay}</span></>
              ) : (
                <span className="text-sm">{priceComingSoon}</span>
              )}
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
