'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VanCard } from '@/components/ui/VanCard';
import { VanFilterBar, type SortOption } from '@/components/sections/VanFilterBar';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getAllVans, getVanTypes, getCapacityOptions, toVanCardData } from '@/lib/vans';
import type { VanType } from '@/lib/vans';

interface CatalogGridProps {
  locale: string;
}

export function CatalogGrid({ locale }: CatalogGridProps) {
  const tVans = useTranslations('vans');
  const tFeatures = useTranslations('vanFeatures');
  const tFilters = useTranslations('pages.catalog.filters');

  const [selectedType, setSelectedType] = useState<VanType | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const allVans = useMemo(() => getAllVans(), []);
  const vanTypes = useMemo(() => getVanTypes(), []);
  const capacityOptions = useMemo(() => getCapacityOptions(), []);

  const filteredVans = useMemo(() => {
    let result = allVans;

    if (selectedType) {
      result = result.filter((v) => v.type === selectedType);
    }
    if (selectedCapacity) {
      result = result.filter((v) => v.capacity === selectedCapacity);
    }

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    return result;
  }, [allVans, selectedType, selectedCapacity, sortBy]);

  const cardLabels = {
    details: tVans('details'),
    book: tVans('bookNow'),
    info: tVans('info'),
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCapacity(null);
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <VanFilterBar
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedCapacity={selectedCapacity}
        onCapacityChange={setSelectedCapacity}
        sortBy={sortBy}
        onSortChange={setSortBy}
        vanTypes={vanTypes}
        capacityOptions={capacityOptions}
        resultCount={filteredVans.length}
      />

      {filteredVans.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredVans.map((van, i) => {
              const cardData = toVanCardData(van, locale, (k) => tFeatures(k), (k) => tVans(k));
              return (
                <motion.div
                  key={van.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
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
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <p className="font-archivo-condensed font-semibold text-xl uppercase tracking-tight text-primary">
            {tFilters('noResults')}
          </p>
          <p className="font-archivo text-secondary mt-2">
            {tFilters('noResultsHint')}
          </p>
          <Button variant="ghost" size="md" className="mt-6" onClick={clearFilters}>
            {tFilters('clearFilters')}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
