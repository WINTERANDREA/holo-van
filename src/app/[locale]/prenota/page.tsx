import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { BookingSearch } from '@/components/booking/BookingSearch';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrenotaPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.booking');
  const tBooking = await getTranslations('booking');

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

        {/* Booking Search */}
        <section className="pb-12 px-6 bg-surface">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <BookingSearch
                variant="stacked"
                labels={{
                  location: tBooking('location'),
                  pickup: tBooking('pickup'),
                  returnDate: tBooking('return'),
                  cta: tBooking('search'),
                }}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Integration note */}
        <section className="pb-24 px-6 bg-surface">
          <div className="max-w-lg mx-auto text-center">
            <ScrollReveal delay={0.2}>
              <p className="font-archivo text-secondary leading-relaxed">
                {t('integrationNote')}
              </p>
              <div className="mt-6">
                <Link href="/contatti">
                  <Button variant="secondary" size="md">
                    {t('contactUs')}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
