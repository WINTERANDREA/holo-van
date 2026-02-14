import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { HolographicBackground } from '@/components/effects/HolographicBackground';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { VanShowcase } from '@/components/sections/VanShowcase';
import { WhyHoloVan } from '@/components/sections/WhyHoloVan';
import { TestVideoSection } from '@/components/sections/TestVideoSection';
import { getAllVans, toVanCardData } from '@/lib/vans';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('vans');
  const tFeatures = await getTranslations('vanFeatures');

  // Get all vans mapped to VanCard format (currently 2 real vans)
  const showcaseVans = getAllVans()
    .map((van) => toVanCardData(van, locale, (k) => tFeatures(k), (k) => t(k)));

  const cardLabels = {
    details: t('details'),
    book: t('bookNow'),
    info: t('info'),
  };

  return (
    <>
      <HolographicBackground />
      <Header heroStyle="holographic" />
      <main>
        <Hero />
        <VanShowcase
          title={t('sectionTitle')}
          subtitle={t('sectionSubtitle')}
          vans={showcaseVans}
          cardLabels={cardLabels}
        />
        <WhyHoloVan />
        <TestVideoSection />
      </main>
    </>
  );
}
