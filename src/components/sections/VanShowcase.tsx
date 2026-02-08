'use client';

import { VanCard, type VanData } from '@/components/ui/VanCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
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

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden -mx-6 px-6">
          {vans.map((van, i) => (
            <ScrollReveal key={van.slug} delay={i * 0.1} className="snap-start flex-shrink-0 w-[80vw] max-w-sm">
              <VanCard van={van} variant="clean" />
            </ScrollReveal>
          ))}
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
