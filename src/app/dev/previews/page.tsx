'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';

const previews = [
  { name: 'Hero Variants', href: '/dev/previews/hero', description: '3 hero section designs for client review' },
  { name: 'Van Card Variants', href: '/dev/previews/van-card', description: '3 van card component designs' },
  { name: 'Section Layout Variants', href: '/dev/previews/sections', description: '3 content section layout approaches' },
  { name: 'Footer Variants', href: '/dev/previews/footer', description: '2 footer designs' },
];

export default function PreviewsIndexPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/dev/design-system" className="font-archivo text-sm text-secondary hover:text-primary transition-colors">
              &larr; Design System
            </a>
            <span className="font-archivo-condensed font-semibold text-lg uppercase">
              Creative Previews
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="font-archivo-condensed font-semibold text-fluid-h1 uppercase">
            Creative Previews
          </h1>
          <p className="mt-4 font-archivo text-lg text-secondary max-w-2xl">
            Design variants for client review. Each page shows multiple approaches
            for the same section, rendered in both light and dark mode.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {previews.map((preview) => (
            <a
              key={preview.name}
              href={preview.href}
              className="group block p-6 bg-surface-elevated border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <h2 className="font-archivo-condensed font-semibold text-xl uppercase group-hover:holographic-text transition-all">
                {preview.name}
              </h2>
              <p className="mt-2 font-archivo text-sm text-secondary">
                {preview.description}
              </p>
              <span className="inline-block mt-4 font-archivo-condensed font-semibold text-sm text-muted group-hover:text-primary uppercase tracking-wider transition-colors">
                View Variants &rarr;
              </span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
