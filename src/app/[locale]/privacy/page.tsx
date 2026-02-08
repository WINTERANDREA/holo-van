import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.privacy');

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24 px-6 bg-surface">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h1 className="font-archivo-condensed font-semibold text-fluid-h2 uppercase tracking-tight text-primary">
                {t('title')}
              </h1>
              <p className="font-archivo text-sm text-muted mt-2">
                {t('lastUpdated')}
              </p>
              <div className="mt-8 border-t border-border pt-8">
                <p className="font-archivo text-secondary leading-relaxed">
                  {t('content')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
