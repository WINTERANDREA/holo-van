'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { StickerBadge } from '@/components/ui/StickerBadge';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validate(fd: FormData): FormErrors {
    const errs: FormErrors = {};
    const name = (fd.get('name') as string)?.trim();
    const email = (fd.get('email') as string)?.trim();
    const subject = (fd.get('subject') as string)?.trim();
    const message = (fd.get('message') as string)?.trim();

    if (!name) errs.name = t('errors.nameRequired');
    if (!email) errs.email = t('errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('errors.emailInvalid');
    if (!subject) errs.subject = t('errors.subjectRequired');
    if (!message) errs.message = t('errors.messageRequired');

    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Server action stub — log and simulate delay
    console.log('Contact form submission:', {
      name: fd.get('name'),
      email: fd.get('email'),
      subject: fd.get('subject'),
      message: fd.get('message'),
    });

    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  const subjectKeys = ['general', 'booking', 'vans', 'routes', 'partnership'] as const;

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <StickerBadge sticker="real-travel" size={96} animate />
          </motion.div>
          <p className="font-archivo-condensed font-semibold text-xl text-primary mt-6">
            {t('success')}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-archivo font-medium text-secondary mb-2">
              {t('name')}
            </label>
            <input
              name="name"
              type="text"
              placeholder={t('namePlaceholder')}
              className="w-full font-archivo bg-transparent text-primary placeholder:text-muted px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors duration-200"
            />
            {errors.name && (
              <p className="text-sm text-[var(--color-warning)] mt-1 font-archivo">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-archivo font-medium text-secondary mb-2">
              {t('email')}
            </label>
            <input
              name="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              className="w-full font-archivo bg-transparent text-primary placeholder:text-muted px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors duration-200"
            />
            {errors.email && (
              <p className="text-sm text-[var(--color-warning)] mt-1 font-archivo">{errors.email}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-archivo font-medium text-secondary mb-2">
              {t('subject')}
            </label>
            <select
              name="subject"
              defaultValue=""
              className="w-full font-archivo bg-transparent text-primary px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors duration-200 cursor-pointer"
            >
              <option value="" disabled className="text-muted">
                {t('subjectPlaceholder')}
              </option>
              {subjectKeys.map((key) => (
                <option key={key} value={key}>
                  {t(`subjects.${key}`)}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="text-sm text-[var(--color-warning)] mt-1 font-archivo">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-archivo font-medium text-secondary mb-2">
              {t('message')}
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder={t('messagePlaceholder')}
              className="w-full font-archivo bg-transparent text-primary placeholder:text-muted px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
            />
            {errors.message && (
              <p className="text-sm text-[var(--color-warning)] mt-1 font-archivo">{errors.message}</p>
            )}
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t('sending') : t('send')}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
