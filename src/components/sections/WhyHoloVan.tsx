'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { StickerBadge } from '@/components/ui/StickerBadge';
import { cn } from '@/lib/utils';

interface WhyHoloVanProps {
  className?: string;
}

export function WhyHoloVan({ className }: WhyHoloVanProps) {
  const t = useTranslations('whyHoloVan');

  const pillars = [
    {
      key: 'freedom',
      sticker: 'stay-wild' as const,
      size: 160,
      rotation: -8,
      offset: { x: -30, y: 10 },
    },
    {
      key: 'routes',
      sticker: 'more-adventure' as const,
      size: 150,
      rotation: 6,
      offset: { x: 20, y: -5 },
    },
    {
      key: 'community',
      sticker: 'real-travellers' as const,
      size: 170,
      rotation: -4,
      offset: { x: -15, y: 15 },
    },
  ];

  return (
    <section className={cn('py-24 px-6 bg-surface-alt', className)}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-archivo-condensed font-semibold text-fluid-h2 uppercase tracking-tight text-primary">
              {t('sectionTitle')}
            </h2>
            <p className="font-archivo text-secondary mt-3 max-w-lg mx-auto">
              {t('sectionSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map(({ key, sticker, size, rotation, offset }, i) => (
            <ScrollReveal key={key} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="mb-4"
                  style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                >
                  <StickerBadge
                    sticker={sticker}
                    size={size}
                    rotation={rotation}
                    animate
                    entrance
                    interactive
                    entranceDelay={0.3 + i * 0.2}
                  />
                </div>
                <h3 className="font-archivo-condensed font-semibold text-xl uppercase tracking-wider text-primary mb-3">
                  {t(`${key}.title`)}
                </h3>
                <p className="font-archivo text-secondary max-w-xs">
                  {t(`${key}.description`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
