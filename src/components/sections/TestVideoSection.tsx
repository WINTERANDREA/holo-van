'use client';

import { VideoHolographicBg } from '@/components/effects/VideoHolographicBg';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

export function TestVideoSection() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      <VideoHolographicBg overlay="light" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center">
        <ScrollReveal variant="fade-up">
          <h2 className="font-archivo-condensed text-[clamp(3rem,10vw,8rem)] font-semibold uppercase leading-[0.9] tracking-tight text-holo-charcoal">
            Travellers Only
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl font-archivo text-lg font-medium text-holo-charcoal/70 md:text-xl">
            Real journeys. No resorts. No comfort zones.
            <br />
            Just the open road and your story.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
