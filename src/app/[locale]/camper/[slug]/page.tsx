import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { Link } from '@/i18n/navigation';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const vanNames: Record<string, string> = {
  'california-ocean': 'California Ocean',
  'grand-california': 'Grand California',
  'caddy-california': 'Caddy California',
  'crafter-camper': 'Crafter Camper',
  'multivan-style': 'Multivan Style',
  'california-beach': 'California Beach',
};

export default async function VanDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.vanDetail');
  const tPages = await getTranslations('pages.catalog');

  const vanName = vanNames[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-8 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <Link
                href="/camper"
                className="inline-flex items-center gap-2 font-archivo text-sm text-secondary hover:text-primary transition-colors mb-6"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                {tPages('backToCatalog')}
              </Link>
              <h1 className="font-archivo-condensed font-semibold text-fluid-hero uppercase tracking-tight text-primary">
                {vanName}
              </h1>
            </ScrollReveal>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Image placeholder */}
            <ScrollReveal>
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                <Skeleton className="w-full h-full" rounded="sm" />
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.15}>
              <div className="space-y-8">
                <div>
                  <Badge variant="holographic" size="md">{t('comingSoon')}</Badge>
                  <p className="font-archivo text-secondary mt-4 leading-relaxed">
                    {t('comingSoonText')}
                  </p>
                </div>

                <div>
                  <h3 className="font-archivo-condensed font-semibold text-lg uppercase tracking-wider text-primary mb-3">
                    {t('specs')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['4 posti', 'Diesel', 'Manuale', '5.9m'].map((spec) => (
                      <div key={spec} className="px-4 py-3 border border-border rounded-lg">
                        <span className="font-archivo text-sm text-secondary">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-archivo-condensed font-semibold text-lg uppercase tracking-wider text-primary mb-3">
                    {t('features')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Tetto pop-up', 'Cucina', 'Doccia', 'WiFi', 'Pannelli solari'].map((feat) => (
                      <Badge key={feat} variant="outline" size="sm">{feat}</Badge>
                    ))}
                  </div>
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  {t('book')}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
