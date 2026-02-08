'use client';

import { VanCard, type VanData } from '@/components/ui/VanCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { Link } from '@/i18n/navigation';

const mockVans: VanData[] = [
  {
    slug: 'california-ocean',
    name: 'California Ocean',
    type: 'Camper Van',
    capacity: '4 posti',
    pricePerDay: '\u20AC120/giorno',
    features: ['Tetto pop-up', 'Cucina integrata', 'Doccia esterna'],
  },
  {
    slug: 'grand-california',
    name: 'Grand California',
    type: 'Motorhome',
    capacity: '4 posti',
    pricePerDay: '\u20AC150/giorno',
    features: ['Bagno integrato', 'Letto matrimoniale', 'Cucina full'],
  },
  {
    slug: 'caddy-california',
    name: 'Caddy California',
    type: 'Mini Camper',
    capacity: '2 posti',
    pricePerDay: '\u20AC80/giorno',
    features: ['Compatto', 'Tetto pop-up', 'Cucina estraibile'],
  },
  {
    slug: 'crafter-camper',
    name: 'Crafter Camper',
    type: 'Large Van',
    capacity: '6 posti',
    pricePerDay: '\u20AC180/giorno',
    features: ['Spazioso', 'Doccia interna', 'Pannelli solari'],
  },
  {
    slug: 'multivan-style',
    name: 'Multivan Style',
    type: 'Camper Van',
    capacity: '4 posti',
    pricePerDay: '\u20AC130/giorno',
    features: ['Design moderno', 'Tetto pop-up', 'WiFi'],
  },
  {
    slug: 'california-beach',
    name: 'California Beach',
    type: 'Camper Van',
    capacity: '4 posti',
    pricePerDay: '\u20AC110/giorno',
    features: ['Tetto pop-up', 'Compatto', 'Facile da guidare'],
  },
];

export function CatalogGrid() {
  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      {mockVans.map((van, i) => (
        <ScrollReveal key={van.slug} delay={i * 0.1}>
          <Link href={`/camper/${van.slug}`}>
            <VanCard van={van} variant="clean" />
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
