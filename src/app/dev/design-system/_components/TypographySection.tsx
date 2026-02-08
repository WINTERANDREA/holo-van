'use client';

const fontWeights = [
  { weight: 100, name: 'Thin' },
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 600, name: 'SemiBold' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'ExtraBold' },
  { weight: 900, name: 'Black' },
];

const typographyScale = [
  { name: 'H1 / Hero', font: 'condensed', weight: 600, size: '4rem', lineHeight: '1', sample: 'TRAVELLERS ONLY', uppercase: true },
  { name: 'H2 / Section', font: 'condensed', weight: 600, size: '2.5rem', lineHeight: '1.1', sample: 'LA LIBERTA E OVUNQUE', uppercase: true },
  { name: 'H3 / Card Title', font: 'condensed', weight: 400, size: '1.5rem', lineHeight: '1.2', sample: 'Camper Van', uppercase: false },
  { name: 'Body Large', font: 'archivo', weight: 400, size: '1.125rem', lineHeight: '1.6', sample: 'Premium camper van rental for authentic travelers.', uppercase: false },
  { name: 'Body', font: 'archivo', weight: 400, size: '1rem', lineHeight: '1.5', sample: 'Freedom is everywhere. We just give you the means to reach it.', uppercase: false },
  { name: 'Caption', font: 'archivo', weight: 500, size: '0.875rem', lineHeight: '1.4', sample: 'HOLO VAN', uppercase: true },
  { name: 'Button', font: 'condensed', weight: 600, size: '0.875rem', lineHeight: '1', sample: 'PRENOTA', uppercase: true },
];

const fluidSizes = [
  { name: 'text-fluid-hero', clamp: 'clamp(3rem, 8vw + 1rem, 9rem)', usage: 'Hero headlines' },
  { name: 'text-fluid-h1', clamp: 'clamp(2.5rem, 5vw + 1rem, 5rem)', usage: 'Page titles' },
  { name: 'text-fluid-h2', clamp: 'clamp(2rem, 4vw + 0.5rem, 3.5rem)', usage: 'Section titles' },
  { name: 'text-fluid-h3', clamp: 'clamp(1.25rem, 2vw + 0.5rem, 1.75rem)', usage: 'Card titles' },
  { name: 'text-fluid-body-lg', clamp: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)', usage: 'Lead paragraphs' },
  { name: 'text-fluid-body', clamp: 'clamp(0.875rem, 0.5vw + 0.5rem, 1rem)', usage: 'Body text' },
  { name: 'text-fluid-caption', clamp: 'clamp(0.75rem, 0.5vw + 0.375rem, 0.875rem)', usage: 'Captions, labels' },
];

export function TypographySection() {
  return (
    <div className="space-y-12">
      {/* Font Families */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Archivo */}
        <div>
          <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Archivo</h3>
          <p className="text-sm text-secondary mb-4">Body text, paragraphs, UI elements</p>
          <div className="space-y-3">
            {fontWeights.map(({ weight, name }) => (
              <div key={weight} className="flex items-baseline gap-4">
                <span className="w-20 text-xs text-muted">{weight} {name}</span>
                <span className="font-archivo text-xl" style={{ fontWeight: weight }}>
                  HOLO VAN - Travellers Only
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Archivo ExtraCondensed */}
        <div>
          <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Archivo ExtraCondensed</h3>
          <p className="text-sm text-secondary mb-4">Headlines, titles, buttons</p>
          <div className="space-y-3">
            {fontWeights.map(({ weight, name }) => (
              <div key={weight} className="flex items-baseline gap-4">
                <span className="w-20 text-xs text-muted">{weight} {name}</span>
                <span className="font-archivo-condensed text-xl" style={{ fontWeight: weight }}>
                  HOLO VAN - Travellers Only
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-6">Typography Scale</h3>
        <div className="space-y-6">
          {typographyScale.map((item) => (
            <div key={item.name} className="border-b border-border pb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-secondary w-32">{item.name}</span>
                <span className="text-xs text-muted">
                  {item.font === 'condensed' ? 'Archivo ExtraCondensed' : 'Archivo'} / {item.weight} / {item.size}
                </span>
              </div>
              <p
                className={item.font === 'condensed' ? 'font-archivo-condensed' : 'font-archivo'}
                style={{
                  fontWeight: item.weight,
                  fontSize: item.size,
                  lineHeight: item.lineHeight,
                  textTransform: item.uppercase ? 'uppercase' : 'none',
                }}
              >
                {item.sample}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fluid Typography */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-6">Fluid Typography Scale</h3>
        <p className="text-sm text-secondary mb-6">Scales smoothly between viewport sizes using clamp(). Resize your browser to see the effect.</p>
        <div className="space-y-6">
          {fluidSizes.map((item) => (
            <div key={item.name} className="border-b border-border pb-6">
              <div className="flex items-center gap-4 mb-2">
                <code className="text-xs bg-primary/5 px-2 py-1 rounded">{item.name}</code>
                <span className="text-xs text-muted">{item.clamp}</span>
                <span className="text-xs text-secondary">{item.usage}</span>
              </div>
              <p className={`font-archivo-condensed font-semibold ${item.name}`}>
                THE JOURNEY STARTS NOW
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
