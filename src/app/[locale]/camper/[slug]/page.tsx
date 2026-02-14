import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { getAllVans, getVanBySlug, getRelatedVans, toVanCardData, localeToIntl, shared } from '@/lib/vans';
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
  const tSleeping = await getTranslations('sleepingConfig');
  const tExtras = await getTranslations('vanExtras');
  const tRules = await getTranslations('vanRules');
  const tCancellation = await getTranslations('cancellation');

  const intlLocale = localeToIntl[locale] ?? 'it-IT';
  const price = van.pricePerDay != null ? formatPrice(van.pricePerDay, intlLocale) : null;

  // Build specs (skip empty values)
  const specs = [
    { label: t('specLabels.manufacturer'), value: van.specs.manufacturer },
    { label: t('specLabels.model'), value: van.specs.model },
    { label: t('specLabels.sleeps'), value: String(van.specs.sleeps) },
    { label: t('specLabels.seats'), value: String(van.specs.seats) },
    ...(van.specs.engine ? [{ label: t('specLabels.engine'), value: van.specs.engine }] : []),
    { label: t('specLabels.transmission'), value: t(`transmissions.${van.specs.transmission}`) },
    ...(van.specs.year ? [{ label: t('specLabels.year'), value: String(van.specs.year) }] : []),
  ];

  // Build features with keys for icon mapping + translated labels
  const features = van.features.map((f) => ({ key: f, label: tFeatures(f) }));

  // Description from vanData namespace
  const description = tVanData(`${van.slug}.description`);

  // Sleeping configuration with keys
  const sleepingConfig = van.sleepingConfig.map((key) => ({ key, label: tSleeping(key) }));

  // Included extras
  const includedExtras = shared.includedExtras.map((key) => tExtras(key));

  // Optional extras
  const optionalExtras = shared.optionalExtras.map((key) => ({
    name: tExtras(key),
    description: tExtras(`${key}-description`),
  }));

  // Rules with type keys for icon mapping
  const rules = [
    { type: 'minimumAge', label: tRules('minimumAge', { age: shared.rules.minimumDriverAge }), allowed: true },
    { type: 'pets', label: shared.rules.petsAllowed ? tRules('petsAllowed') : tRules('petsNotAllowed'), allowed: shared.rules.petsAllowed },
    { type: 'smoking', label: shared.rules.smokingAllowed ? tRules('smokingAllowed') : tRules('smokingNotAllowed'), allowed: shared.rules.smokingAllowed },
    { type: 'festival', label: shared.rules.festivalFriendly ? tRules('festivalFriendly') : tRules('festivalNotAllowed'), allowed: shared.rules.festivalFriendly },
  ];

  // Cancellation
  const cancellationPolicy = {
    type: tCancellation(shared.cancellationPolicy.type),
    rules: shared.cancellationPolicy.rules.map((rule) => ({
      condition: tCancellation(rule.condition),
      refund: tCancellation(rule.refund),
    })),
  };

  // Pickup
  const pickup = {
    city: shared.pickup.city,
    country: shared.pickup.country,
    note: t('pickupNote'),
  };

  // Related vans mapped to VanData for VanCard
  const relatedRaw = getRelatedVans(slug, 3);
  const relatedVans = relatedRaw.map((rv) =>
    toVanCardData(rv, locale, (k) => tFeatures(k), (k) => tVans(k))
  );

  // Van type: manufacturer + model
  const vanType = `${van.manufacturer} ${van.model}`;

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
          priceComingSoon={t('priceComingSoon')}
          rawPricePerDay={van.pricePerDay}
          images={van.images}
          specs={specs}
          features={features}
          description={description}
          sleepingConfig={sleepingConfig}
          includedExtras={includedExtras}
          optionalExtras={optionalExtras}
          rules={rules}
          cancellationPolicy={cancellationPolicy}
          pickup={pickup}
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
            sleepingTitle: t('sleepingTitle'),
            includedTitle: t('includedTitle'),
            optionalExtrasTitle: t('optionalExtrasTitle'),
            rulesTitle: t('rulesTitle'),
            cancellationTitle: t('cancellationTitle'),
            pickupTitle: t('pickupTitle'),
            details: tVans('details'),
            book: tVans('bookNow'),
            info: tVans('info'),
          }}
        />
      </main>
    </>
  );
}
