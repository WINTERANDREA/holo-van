'use client';

import { useState } from 'react';

const holoColors = [
  { name: 'Pink', hex: '#FFB8D0', tailwind: 'bg-holo-pink' },
  { name: 'Peach', hex: '#FFD4A8', tailwind: 'bg-holo-peach' },
  { name: 'Yellow', hex: '#FFFFA8', tailwind: 'bg-holo-yellow' },
  { name: 'Mint', hex: '#B8FFB8', tailwind: 'bg-holo-mint' },
  { name: 'Cyan', hex: '#A8FFF4', tailwind: 'bg-holo-cyan' },
  { name: 'Blue', hex: '#B8D4FF', tailwind: 'bg-holo-blue' },
  { name: 'Lavender', hex: '#E0B8FF', tailwind: 'bg-holo-lavender' },
];

const primaryColors = [
  { name: 'Charcoal', hex: '#2D2926', tailwind: 'bg-holo-charcoal', light: false },
  { name: 'Off-White', hex: '#FAFAFA', tailwind: 'bg-holo-offwhite', light: true },
];

const semanticTokens = [
  { name: 'surface', lightValue: '#FAFAFA', darkValue: '#1A1817', usage: 'Page backgrounds' },
  { name: 'surface-elevated', lightValue: '#FFFFFF', darkValue: '#2D2926', usage: 'Cards, modals' },
  { name: 'primary', lightValue: '#2D2926', darkValue: '#FAFAFA', usage: 'Primary text' },
  { name: 'secondary', lightValue: 'rgba(45,41,38,0.6)', darkValue: 'rgba(250,250,250,0.7)', usage: 'Secondary text' },
  { name: 'muted', lightValue: 'rgba(45,41,38,0.4)', darkValue: 'rgba(250,250,250,0.4)', usage: 'Muted text, placeholders' },
  { name: 'border', lightValue: 'rgba(45,41,38,0.1)', darkValue: 'rgba(250,250,250,0.1)', usage: 'Borders, dividers' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-xs text-muted hover:text-primary transition-colors">
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function ColorsSection() {
  return (
    <div className="space-y-12">
      {/* Holographic Gradient Preview */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Gradient</h3>
        <div className="h-32 rounded-xl holographic-base" />
        <p className="mt-2 text-sm text-secondary">
          CSS class: <code className="bg-primary/5 px-2 py-0.5 rounded">holographic-base</code>
        </p>
      </div>

      {/* Holographic Spectrum */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Spectrum</h3>
        <div className="grid grid-cols-7 gap-4">
          {holoColors.map((color) => (
            <div key={color.name} className="text-center">
              <div
                className="h-24 rounded-lg shadow-sm border border-border"
                style={{ backgroundColor: color.hex }}
              />
              <p className="mt-2 font-archivo font-medium text-sm">{color.name}</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <code className="text-xs text-secondary">{color.hex}</code>
                <CopyButton text={color.hex} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Colors */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Primary Colors</h3>
        <div className="grid grid-cols-2 gap-6">
          {primaryColors.map((color) => (
            <div
              key={color.name}
              className={`p-6 rounded-xl ${color.tailwind} ${color.light ? 'border border-border' : ''}`}
            >
              <p className={`font-archivo font-semibold text-lg ${color.light ? 'text-holo-charcoal' : 'text-white'}`}>
                {color.name}
              </p>
              <div className={`flex items-center gap-2 mt-2 ${color.light ? 'text-holo-charcoal/60' : 'text-white/60'}`}>
                <code className="text-sm">{color.hex}</code>
                <CopyButton text={color.hex} />
              </div>
              <p className={`text-sm mt-1 ${color.light ? 'text-holo-charcoal/40' : 'text-white/40'}`}>
                Tailwind: {color.tailwind}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Tokens */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Semantic Color Tokens</h3>
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-elevated">
                <th className="text-left p-4 font-archivo font-semibold">Token</th>
                <th className="text-left p-4 font-archivo font-semibold">Light</th>
                <th className="text-left p-4 font-archivo font-semibold">Dark</th>
                <th className="text-left p-4 font-archivo font-semibold">Usage</th>
              </tr>
            </thead>
            <tbody>
              {semanticTokens.map((token) => (
                <tr key={token.name} className="border-b border-border last:border-0">
                  <td className="p-4 font-mono text-xs">--color-{token.name}</td>
                  <td className="p-4">
                    <code className="text-xs">{token.lightValue}</code>
                  </td>
                  <td className="p-4">
                    <code className="text-xs">{token.darkValue}</code>
                  </td>
                  <td className="p-4 text-secondary">{token.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
