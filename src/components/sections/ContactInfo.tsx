'use client';

import { useTranslations } from 'next-intl';

export function ContactInfo() {
  const t = useTranslations('contact.info');

  return (
    <div className="space-y-8">
      <h3 className="font-archivo-condensed font-semibold text-xl uppercase tracking-wider text-primary">
        {t('title')}
      </h3>

      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-archivo text-secondary">{t('address')}</span>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="font-archivo text-secondary hover:text-primary transition-colors">
            {t('phone')}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <a href={`mailto:${t('email')}`} className="font-archivo text-secondary hover:text-primary transition-colors">
            {t('email')}
          </a>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-muted mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="font-archivo text-secondary">{t('hours')}</span>
        </div>
      </div>

      {/* Social */}
      <div>
        <h4 className="font-archivo-condensed font-semibold text-sm uppercase tracking-wider text-primary mb-3">
          {t('social')}
        </h4>
        <div className="flex gap-4">
          {/* Instagram */}
          <a href="#" className="w-10 h-10 flex items-center justify-center border border-border rounded-lg text-muted hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* TikTok */}
          <a href="#" className="w-10 h-10 flex items-center justify-center border border-border rounded-lg text-muted hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.81.11v-3.49a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.83a8.28 8.28 0 0 0 3.76.9V6.28a4.83 4.83 0 0 1 0 .41z" />
            </svg>
          </a>
          {/* Facebook */}
          <a href="#" className="w-10 h-10 flex items-center justify-center border border-border rounded-lg text-muted hover:text-primary hover:border-primary transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
