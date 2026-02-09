import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { getAllVans, getVanBySlug, getRelatedVans, toVanCardData, localeToIntl } from '@/lib/vans';
import { formatPrice } from '@/lib/utils';
import { VanDetailClient } from './VanDetailClient';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllVans().map((van) => ({ slug: van.slug }));
}

export default async function VanDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const van = getVanBySlug(slug);
  if (!van) notFound();

  const t = await getTranslations('pages.vanDetail');
  const tCatalog = await getTranslations('pages.catalog');
  const tFeatures = await getTranslations('vanFeatures');
  const tVans = await getTranslations('vans');
  const tVanData = await getTranslations('vanData');

  const intlLocale = localeToIntl[locale] ?? 'it-IT';
  const price = formatPrice(van.pricePerDay, intlLocale);

  // Build specs
  const specs = [
    { label: t('specLabels.sleeps'), value: String(van.specs.sleeps) },
    { label: t('specLabels.seats'), value: String(van.specs.seats) },
    { label: t('specLabels.engine'), value: van.specs.engine },
    { label: t('specLabels.transmission'), value: t(`transmissions.${van.specs.transmission}`) },
    { label: t('specLabels.length'), value: van.specs.length },
    { label: t('specLabels.year'), value: String(van.specs.year) },
  ];

  // Build translated features
  const features = van.features.map((f) => tFeatures(f));

  // Description from vanData namespace
  const description = tVanData(`${van.slug}.description`);

  // Related vans mapped to VanData for VanCard
  const relatedRaw = getRelatedVans(slug, 3);
  const relatedVans = relatedRaw.map((rv) =>
    toVanCardData(rv, locale, (k) => tFeatures(k), (k) => tVans(k))
  );

  // Van type translated
  const vanType = tVans(`vanTypes.${van.type}`);

  return (
    <>
      <Header />
      <main>
        <VanDetailClient
          vanName={van.name}
          vanType={vanType}
          price={price}
          perDay={t('perDay')}
          priceFrom={t('priceFrom')}
          rawPricePerDay={van.pricePerDay}
          images={van.images}
          specs={specs}
          features={features}
          description={description}
          relatedVans={relatedVans}
          labels={{
            backToCatalog: tCatalog('backToCatalog'),
            specsTitle: t('specs'),
            featuresTitle: t('features'),
            descriptionTitle: t('description'),
            bookCta: t('book'),
            stickyBook: t('stickyBook'),
            relatedTitle: t('relatedTitle'),
            photosComingSoon: t('photosComingSoon'),
            details: tVans('details'),
            book: tVans('bookNow'),
            info: tVans('info'),
          }}
        />
      </main>
    </>
  );
}
