'use client';

import { useState } from 'react';
import Image from 'next/image';

const logoVariants = [
  { name: 'Extended', folder: 'extended', versions: ['COLOR', 'COLOR_Inv', 'NEGATIVE'], description: 'Full logo with chameleon + wordmark', width: 300 },
  { name: 'Extended + Payoff', folder: 'extended-payoff', versions: ['POSITIVE', 'NEGATIVE', 'COLOR'], description: 'Full logo with tagline', width: 300 },
  { name: 'Type Horizontal', folder: 'type-horizontal', versions: ['POSITIVE', 'NEGATIVE', 'COLOR'], description: 'Horizontal wordmark only', width: 250 },
  { name: 'Type Horizontal + Payoff', folder: 'type-horizontal-payoff', versions: ['POSITIVE', 'NEGATIVE', 'COLOR'], description: 'Horizontal wordmark with tagline', width: 250 },
  { name: 'Type Vertical', folder: 'type-vertical', versions: ['NEGATIVE', 'COLOR'], description: 'Vertical stacked wordmark', width: 150 },
  { name: 'Type Vertical + Payoff', folder: 'type-vertical-payoff', versions: ['POSITIVE', 'NEGATIVE', 'COLOR'], description: 'Vertical wordmark with tagline', width: 150 },
  { name: 'Monogram 1', folder: 'monogram-1', versions: ['POSITIVE', 'NEGATIVE', 'COLOR'], description: 'Favicon, tiny spaces, loader', width: 100 },
  { name: 'Monogram 2', folder: 'monogram-2', versions: ['POSITIVE', 'NEGATIVE', 'COLOR'], description: 'Social media avatar, app icon', width: 100 },
  { name: 'Pictogram', folder: 'pictogram', versions: ['POSITIVE', 'NEGATIVE', 'COLOR'], description: 'Pure chameleon, decorative', width: 120 },
];

function LogoCard({ logo, bgMode }: { logo: typeof logoVariants[0]; bgMode: 'light' | 'dark' }) {
  const [activeVersion, setActiveVersion] = useState(logo.versions[0]);

  const getLogoPath = () => {
    const prefix = logo.folder === 'extended' ? 'HV_Extended' :
                   logo.folder === 'extended-payoff' ? 'HV_Extended_Payoff' :
                   logo.folder === 'type-horizontal' ? 'HV_Type_Horizontal' :
                   logo.folder === 'type-horizontal-payoff' ? 'HV_Type_Horizontal_Payoff' :
                   logo.folder === 'type-vertical' ? 'HV_Type_Vertical' :
                   logo.folder === 'type-vertical-payoff' ? 'HV_Type_Vertical_Payoff' :
                   logo.folder === 'monogram-1' ? 'HV_Monogram 1' :
                   logo.folder === 'monogram-2' ? 'HV_Monogram 2' :
                   'HV_Pictogram';
    return `/design-system/logos/${logo.folder}/${prefix}_${activeVersion}.png`;
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h4 className="font-archivo-condensed font-semibold">{logo.name}</h4>
        <p className="text-xs text-secondary mt-1">{logo.description}</p>
      </div>

      {/* Version Tabs */}
      <div className="flex border-b border-border">
        {logo.versions.map((version) => (
          <button
            key={version}
            onClick={() => setActiveVersion(version)}
            className={`flex-1 px-3 py-2 text-xs font-archivo transition-colors ${
              activeVersion === version
                ? 'bg-primary text-surface'
                : 'text-secondary hover:bg-primary/5'
            }`}
          >
            {version}
          </button>
        ))}
      </div>

      {/* Logo Preview */}
      <div
        className={`p-8 flex items-center justify-center min-h-[150px] ${
          bgMode === 'dark' ? 'bg-holo-charcoal' : 'bg-white'
        }`}
      >
        <Image
          src={getLogoPath()}
          alt={`${logo.name} - ${activeVersion}`}
          width={logo.width}
          height={100}
          className="object-contain max-h-[100px]"
          unoptimized
        />
      </div>
    </div>
  );
}

export function LogosSection() {
  const [bgMode, setBgMode] = useState<'light' | 'dark'>('light');

  return (
    <div className="space-y-8">
      {/* Background Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setBgMode('light')}
          className={`px-4 py-2 text-sm font-archivo rounded-lg transition-colors ${
            bgMode === 'light'
              ? 'bg-primary text-surface'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          Light Background
        </button>
        <button
          onClick={() => setBgMode('dark')}
          className={`px-4 py-2 text-sm font-archivo rounded-lg transition-colors ${
            bgMode === 'dark'
              ? 'bg-primary text-surface'
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          Dark Background
        </button>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logoVariants.map((logo) => (
          <LogoCard key={logo.name} logo={logo} bgMode={bgMode} />
        ))}
      </div>
    </div>
  );
}
