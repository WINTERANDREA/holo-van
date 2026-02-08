'use client';

import { useState } from 'react';
import Image from 'next/image';

const stickers = [
  { name: 'WiFi', file: 'wifi.png', usage: 'Feature highlight (free WiFi)' },
  { name: 'Stay Wild', file: 'stay-wild.png', usage: 'Hero decoration, about section' },
  { name: 'Real Travel', file: 'real-travel.png', usage: 'Brand messaging' },
  { name: 'Real Travellers', file: 'real-travellers.png', usage: 'Community section' },
  { name: 'Not an Option', file: 'not-an-option.png', usage: 'Comparison sections' },
  { name: 'More Story', file: 'more-story.png', usage: 'Blog/stories section' },
  { name: 'More Adventure', file: 'more-adventure.png', usage: 'Itineraries section' },
  { name: 'Go to Resort', file: 'go-to-resort.png', usage: 'Counter-positioning (ironic)' },
  { name: 'Fuck Comfort', file: 'fuck-comfort.png', usage: 'Bold brand statement' },
  { name: 'Take Another', file: 'take-another.png', usage: 'Photo gallery, social' },
];

type StickerVariant = 'delivery' | 'holographic' | 'black' | 'transparent';

const variants: { key: StickerVariant; label: string; path: string; description: string }[] = [
  { key: 'delivery', label: 'Delivery', path: '/design-system/stickers/', description: 'Small, optimized (~28-49K)' },
  { key: 'holographic', label: 'Holographic', path: '/design-system/stickers/holographic/', description: 'Full holographic gradient (~203-339K)' },
  { key: 'black', label: 'Black', path: '/design-system/stickers/black/', description: 'Solid black, high contrast (~103-178K)' },
  { key: 'transparent', label: 'Transparent', path: '/design-system/stickers/transparent/', description: 'Color, no background (~129-220K)' },
];

export function StickersSection() {
  const [activeVariant, setActiveVariant] = useState<StickerVariant>('delivery');
  const [previewBg, setPreviewBg] = useState<'light' | 'dark'>('light');

  const currentVariant = variants.find(v => v.key === activeVariant)!;

  return (
    <div className="space-y-6">
      {/* Variant Tabs */}
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.key}
            onClick={() => setActiveVariant(variant.key)}
            className={`px-4 py-2 text-sm font-archivo rounded-lg transition-colors ${
              activeVariant === variant.key
                ? 'bg-primary text-surface'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            {variant.label}
          </button>
        ))}
      </div>

      {/* Info + Background Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary">{currentVariant.description}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewBg('light')}
            className={`px-3 py-1 text-xs font-archivo rounded transition-colors ${
              previewBg === 'light' ? 'bg-primary text-surface' : 'bg-primary/10 text-primary'
            }`}
          >
            Light BG
          </button>
          <button
            onClick={() => setPreviewBg('dark')}
            className={`px-3 py-1 text-xs font-archivo rounded transition-colors ${
              previewBg === 'dark' ? 'bg-primary text-surface' : 'bg-primary/10 text-primary'
            }`}
          >
            Dark BG
          </button>
        </div>
      </div>

      {/* Sticker Grid */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 p-6 rounded-xl ${
        previewBg === 'dark' ? 'bg-holo-charcoal' : 'bg-white border border-border'
      }`}>
        {stickers.map((sticker) => (
          <div key={sticker.name} className="group text-center">
            <div className="relative aspect-square rounded-xl p-4 flex items-center justify-center overflow-hidden">
              <Image
                src={`${currentVariant.path}${sticker.file}`}
                alt={sticker.name}
                width={150}
                height={150}
                className="object-contain transition-transform group-hover:scale-110"
                unoptimized
              />
              {/* Usage tooltip on hover */}
              <div className="absolute inset-0 bg-holo-charcoal/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded-xl">
                <p className="text-white text-xs text-center">{sticker.usage}</p>
              </div>
            </div>
            <p className={`mt-2 font-archivo text-sm ${previewBg === 'dark' ? 'text-white' : 'text-holo-charcoal'}`}>
              {sticker.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
