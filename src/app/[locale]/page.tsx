import { setRequestLocale } from 'next-intl/server';
import { HolographicBackground } from '@/components/effects/HolographicBackground';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <HolographicBackground />
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
