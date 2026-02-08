import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { routing } from '@/i18n/routing';
import { Footer } from '@/components/layout/Footer';
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "HOLO VAN - Travellers Only",
  description: "Premium camper van rental for real travelers",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-archivo antialiased bg-surface text-primary">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
