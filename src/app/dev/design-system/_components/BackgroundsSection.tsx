'use client';

import Image from 'next/image';

export function BackgroundsSection() {
  return (
    <div className="space-y-12">
      {/* Holographic Background Photo */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Background Photo</h3>
        <p className="text-sm text-secondary mb-4">Physical holographic texture photograph (3MB). Use as hero bg, section accent, or texture overlay.</p>
        <div className="relative h-80 rounded-xl overflow-hidden">
          <Image
            src="/images/holographic-background.jpg"
            alt="Holographic background texture"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* CSS Gradient Variants */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">CSS Gradient Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* holographic-base */}
          <div>
            <div className="h-48 rounded-xl holographic-base" />
            <p className="mt-2 text-sm text-secondary">
              <code className="bg-primary/5 px-2 py-0.5 rounded">.holographic-base</code>
            </p>
            <p className="text-xs text-muted mt-1">135deg, 400% size, 15s animation</p>
          </div>

          {/* holographic-overlay */}
          <div>
            <div className="h-48 rounded-xl holographic-overlay" />
            <p className="mt-2 text-sm text-secondary">
              <code className="bg-primary/5 px-2 py-0.5 rounded">.holographic-overlay</code>
            </p>
            <p className="text-xs text-muted mt-1">-45deg, 300% size, 20s reverse</p>
          </div>

          {/* Combined with blur */}
          <div>
            <div className="relative h-48 rounded-xl overflow-hidden">
              <div className="absolute inset-0 holographic-base" />
              <div className="absolute inset-0 holographic-overlay opacity-60" />
              <div className="absolute inset-0 backdrop-blur-3xl" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <span className="font-archivo-condensed font-semibold text-lg text-holo-charcoal">Combined + Blur</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-secondary">
              <code className="bg-primary/5 px-2 py-0.5 rounded">base + overlay + blur</code>
            </p>
            <p className="text-xs text-muted mt-1">Used in HolographicBackground component</p>
          </div>
        </div>
      </div>

      {/* Text Legibility Tests */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Text on Gradient Legibility</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dark text on gradient */}
          <div className="relative h-48 rounded-xl overflow-hidden">
            <div className="absolute inset-0 holographic-base" />
            <div className="absolute inset-0 holographic-overlay opacity-60" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
              <p className="font-archivo-condensed font-semibold text-3xl text-holo-charcoal uppercase">Dark Text</p>
              <p className="font-archivo text-sm text-holo-charcoal/70 mt-2">Secondary paragraph text on holographic gradient</p>
            </div>
          </div>

          {/* Light text on darker gradient */}
          <div className="relative h-48 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-holo-charcoal" />
            <div className="absolute inset-0 holographic-base opacity-30" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
              <p className="font-archivo-condensed font-semibold text-3xl text-white uppercase">Light Text</p>
              <p className="font-archivo text-sm text-white/70 mt-2">Secondary paragraph text on dark + holographic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
