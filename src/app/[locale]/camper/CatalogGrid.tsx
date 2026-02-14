'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { VanCard } from '@/components/ui/VanCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { StickerBadge } from '@/components/ui/StickerBadge';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getAllVans, toVanCardData } from '@/lib/vans';

interface CatalogGridProps {
  locale: string;
}

export function CatalogGrid({ locale }: CatalogGridProps) {
  const tVans = useTranslations('vans');
  const tFeatures = useTranslations('vanFeatures');
  const tCatalog = useTranslations('pages.catalog');

  const allVans = useMemo(() => getAllVans(), []);

  const cardLabels = {
    details: tVans('details'),
    book: tVans('bookNow'),
    info: tVans('info'),
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Van Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
      >
        {allVans.map((van, i) => {
          const cardData = toVanCardData(van, locale, (k) => tFeatures(k), (k) => tVans(k));
          return (
            <motion.div
              key={van.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ScrollReveal delay={i * 0.08}>
                <Link href={`/camper/${van.slug}`}>
                  <VanCard van={cardData} variant="clean" labels={cardLabels} />
                </Link>
              </ScrollReveal>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Coming Soon */}
      <ScrollReveal delay={0.3}>
        <div className="text-center mt-20 relative">
          <div className="absolute -top-4 right-1/4 rotate-12 hidden md:block">
            <StickerBadge sticker="more-adventure" size={80} />
          </div>
          <p className="font-archivo-condensed font-semibold text-xl uppercase tracking-tight text-primary">
            {tCatalog('comingSoon')}
          </p>
          <p className="font-archivo text-secondary mt-2 max-w-md mx-auto">
            {tCatalog('comingSoonText')}
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
