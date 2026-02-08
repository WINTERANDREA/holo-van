import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { HolographicBackground } from '@/components/effects/HolographicBackground';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { VanShowcase } from '@/components/sections/VanShowcase';
import { WhyHoloVan } from '@/components/sections/WhyHoloVan';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('vans');

  return (
    <>
      <HolographicBackground />
      <Header />
      <main>
        <Hero />
        <VanShowcase
          title={t('sectionTitle')}
          subtitle={t('sectionSubtitle')}
        />
        <WhyHoloVan />
      </main>
    </>
  );
}
