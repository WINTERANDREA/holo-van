'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@/components/ui/Tag';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { VanType } from '@/lib/vans';

export type SortOption = 'default' | 'price-low' | 'price-high';

interface VanFilterBarProps {
  selectedType: VanType | null;
  onTypeChange: (type: VanType | null) => void;
  selectedCapacity: number | null;
  onCapacityChange: (capacity: number | null) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  vanTypes: VanType[];
  capacityOptions: number[];
  resultCount: number;
}

export function VanFilterBar({
  selectedType,
  onTypeChange,
  selectedCapacity,
  onCapacityChange,
  sortBy,
  onSortChange,
  vanTypes,
  capacityOptions,
  resultCount,
}: VanFilterBarProps) {
  const t = useTranslations('pages.catalog.filters');
  const tVans = useTranslations('vans');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    if (sortOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [sortOpen]);

  const sortLabel =
    sortBy === 'price-low'
      ? t('sortPriceLow')
      : sortBy === 'price-high'
        ? t('sortPriceHigh')
        : t('sortDefault');

  return (
    <div className="space-y-4 mb-10">
      {/* Row 1: Type chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        <Tag
          selected={selectedType === null}
          onSelect={() => onTypeChange(null)}
        >
          {t('allTypes')}
        </Tag>
        {vanTypes.map((type) => (
          <Tag
            key={type}
            selected={selectedType === type}
            onSelect={() => onTypeChange(selectedType === type ? null : type)}
          >
            {tVans(`vanTypes.${type}`)}
          </Tag>
        ))}
      </div>

      {/* Row 2: Capacity + Sort */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <Tag
            selected={selectedCapacity === null}
            onSelect={() => onCapacityChange(null)}
          >
            {t('allCapacities')}
          </Tag>
          {capacityOptions.map((cap) => (
            <Tag
              key={cap}
              selected={selectedCapacity === cap}
              onSelect={() => onCapacityChange(selectedCapacity === cap ? null : cap)}
            >
              {t('capacityLabel', { count: cap })}
            </Tag>
          ))}
        </div>

        {/* Sort dropdown */}
        <div ref={sortRef} className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-archivo transition-colors cursor-pointer',
              'border-border text-secondary hover:border-primary hover:text-primary',
            )}
          >
            <span className="hidden sm:inline">{t('sortLabel')}:</span> {sortLabel}
            <svg
              className={cn('w-3 h-3 transition-transform', sortOpen && 'rotate-180')}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 z-20 bg-surface-elevated border border-border rounded-lg shadow-lg overflow-hidden min-w-[200px]"
              >
                {(['default', 'price-low', 'price-high'] as SortOption[]).map((option) => {
                  const label =
                    option === 'price-low'
                      ? t('sortPriceLow')
                      : option === 'price-high'
                        ? t('sortPriceHigh')
                        : t('sortDefault');
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onSortChange(option);
                        setSortOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2.5 text-xs font-archivo transition-colors cursor-pointer',
                        sortBy === option
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-secondary hover:bg-primary/5 hover:text-primary',
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Result count (subtle) */}
      <p className="font-archivo text-xs text-muted">
        {resultCount} {resultCount === 1 ? 'van' : 'vans'}
      </p>
    </div>
  );
}
