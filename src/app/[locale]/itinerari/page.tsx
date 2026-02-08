import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { StickerBadge } from '@/components/ui/StickerBadge';
import { Badge } from '@/components/ui/Badge';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ItinerariPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.itineraries');

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-16 px-6 bg-surface">
          <div className="max-w-7xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="font-archivo-condensed font-semibold text-fluid-hero uppercase tracking-tight text-primary">
                {t('title')}
              </h1>
              <p className="font-archivo text-fluid-body-lg text-secondary mt-4 max-w-lg mx-auto">
                {t('subtitle')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="pb-24 px-6 bg-surface">
          <div className="max-w-md mx-auto text-center">
            <ScrollReveal>
              <div className="flex justify-center mb-8">
                <StickerBadge sticker="more-adventure" size={120} animate />
              </div>
              <Badge variant="holographic" size="md">{t('comingSoon')}</Badge>
              <p className="font-archivo text-secondary mt-6 leading-relaxed">
                {t('comingSoonText')}
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
