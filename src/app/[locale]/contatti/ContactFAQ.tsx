'use client';

import { useTranslations } from 'next-intl';
import { FAQ, type FAQItem } from '@/components/ui/FAQ';

export function ContactFAQ() {
  const t = useTranslations('contact.faq');

  // Build FAQ items from translations
  const items: FAQItem[] = [0, 1, 2, 3, 4].map((i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <div>
      <h3 className="font-archivo-condensed font-semibold text-xl uppercase tracking-wider text-primary mb-6">
        {t('title')}
      </h3>
      <FAQ items={items} />
    </div>
  );
}
