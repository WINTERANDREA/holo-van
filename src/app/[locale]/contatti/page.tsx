import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { ContactFAQ } from './ContactFAQ';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');

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

        {/* Two-column layout */}
        <section className="pb-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-12 md:gap-16">
            {/* Form (left, wider) */}
            <ScrollReveal className="md:col-span-3">
              <ContactForm />
            </ScrollReveal>

            {/* Info + FAQ (right) */}
            <div className="md:col-span-2 space-y-12">
              <ScrollReveal delay={0.1}>
                <ContactInfo />
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <ContactFAQ />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
