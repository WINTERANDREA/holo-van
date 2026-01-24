'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ===== DATA =====

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

const sections = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'logos', label: 'Logos' },
  { id: 'stickers', label: 'Stickers' },
  { id: 'components', label: 'Components' },
  { id: 'effects', label: 'Effects' },
];

// ===== UTILITIES =====

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-holo-charcoal/50 hover:text-holo-charcoal transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-archivo-condensed font-semibold text-3xl text-holo-charcoal uppercase tracking-wide">
        {title}
      </h2>
      <p className="mt-1 font-archivo text-holo-charcoal/60">{subtitle}</p>
    </div>
  );
}

// ===== SECTIONS =====

function ColorPaletteSection() {
  return (
    <div className="space-y-12">
      {/* Holographic Gradient Preview */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Gradient</h3>
        <div className="h-32 rounded-xl holographic-base" />
        <p className="mt-2 text-sm text-holo-charcoal/60">
          CSS class: <code className="bg-holo-charcoal/5 px-2 py-0.5 rounded">holographic-base</code>
        </p>
      </div>

      {/* Holographic Spectrum */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Spectrum</h3>
        <div className="grid grid-cols-7 gap-4">
          {holoColors.map((color) => (
            <div key={color.name} className="text-center">
              <div
                className="h-24 rounded-lg shadow-sm border border-holo-charcoal/10"
                style={{ backgroundColor: color.hex }}
              />
              <p className="mt-2 font-archivo font-medium text-sm">{color.name}</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <code className="text-xs text-holo-charcoal/60">{color.hex}</code>
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
              className={`p-6 rounded-xl ${color.tailwind} ${color.light ? 'border border-holo-charcoal/10' : ''}`}
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
    </div>
  );
}

function TypographySection() {
  return (
    <div className="space-y-12">
      {/* Font Families */}
      <div className="grid grid-cols-2 gap-8">
        {/* Archivo */}
        <div>
          <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Archivo</h3>
          <p className="text-sm text-holo-charcoal/60 mb-4">Body text, paragraphs, UI elements</p>
          <div className="space-y-3">
            {fontWeights.map(({ weight, name }) => (
              <div key={weight} className="flex items-baseline gap-4">
                <span className="w-20 text-xs text-holo-charcoal/40">{weight} {name}</span>
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
          <p className="text-sm text-holo-charcoal/60 mb-4">Headlines, titles, buttons</p>
          <div className="space-y-3">
            {fontWeights.map(({ weight, name }) => (
              <div key={weight} className="flex items-baseline gap-4">
                <span className="w-20 text-xs text-holo-charcoal/40">{weight} {name}</span>
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
            <div key={item.name} className="border-b border-holo-charcoal/10 pb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm text-holo-charcoal/60 w-32">{item.name}</span>
                <span className="text-xs text-holo-charcoal/40">
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
    </div>
  );
}

function LogosSection() {
  const [bgMode, setBgMode] = useState<'light' | 'dark'>('light');

  return (
    <div className="space-y-8">
      {/* Background Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setBgMode('light')}
          className={`px-4 py-2 text-sm font-archivo rounded-lg transition-colors ${
            bgMode === 'light'
              ? 'bg-holo-charcoal text-white'
              : 'bg-holo-charcoal/10 text-holo-charcoal hover:bg-holo-charcoal/20'
          }`}
        >
          Light Background
        </button>
        <button
          onClick={() => setBgMode('dark')}
          className={`px-4 py-2 text-sm font-archivo rounded-lg transition-colors ${
            bgMode === 'dark'
              ? 'bg-holo-charcoal text-white'
              : 'bg-holo-charcoal/10 text-holo-charcoal hover:bg-holo-charcoal/20'
          }`}
        >
          Dark Background
        </button>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-3 gap-6">
        {logoVariants.map((logo) => (
          <LogoCard key={logo.name} logo={logo} bgMode={bgMode} />
        ))}
      </div>
    </div>
  );
}

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
    <div className="border border-holo-charcoal/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-holo-charcoal/10">
        <h4 className="font-archivo-condensed font-semibold">{logo.name}</h4>
        <p className="text-xs text-holo-charcoal/60 mt-1">{logo.description}</p>
      </div>

      {/* Version Tabs */}
      <div className="flex border-b border-holo-charcoal/10">
        {logo.versions.map((version) => (
          <button
            key={version}
            onClick={() => setActiveVersion(version)}
            className={`flex-1 px-3 py-2 text-xs font-archivo transition-colors ${
              activeVersion === version
                ? 'bg-holo-charcoal text-white'
                : 'text-holo-charcoal/60 hover:bg-holo-charcoal/5'
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

function StickersSection() {
  return (
    <div className="grid grid-cols-5 gap-6">
      {stickers.map((sticker) => (
        <div key={sticker.name} className="group text-center">
          <div className="relative aspect-square rounded-xl bg-holo-charcoal/5 p-4 flex items-center justify-center overflow-hidden">
            <Image
              src={`/design-system/stickers/${sticker.file}`}
              alt={sticker.name}
              width={150}
              height={150}
              className="object-contain transition-transform group-hover:scale-110"
              unoptimized
            />
            {/* Usage tooltip on hover */}
            <div className="absolute inset-0 bg-holo-charcoal/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
              <p className="text-white text-xs text-center">{sticker.usage}</p>
            </div>
          </div>
          <p className="mt-2 font-archivo text-sm">{sticker.name}</p>
        </div>
      ))}
    </div>
  );
}

function ComponentsSection() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div className="space-y-12">
      {/* Buttons */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Buttons</h3>
        <div className="flex gap-4 flex-wrap">
          <button className="px-6 py-3 bg-holo-charcoal text-white font-archivo-condensed font-semibold uppercase tracking-wide rounded-lg hover:bg-holo-charcoal/90 transition-colors">
            Primary Button
          </button>
          <button className="px-6 py-3 border-2 border-holo-charcoal text-holo-charcoal font-archivo-condensed font-semibold uppercase tracking-wide rounded-lg hover:bg-holo-charcoal hover:text-white transition-colors">
            Secondary Button
          </button>
          <button className="px-6 py-3 text-holo-charcoal font-archivo-condensed font-semibold uppercase tracking-wide hover:underline transition-colors">
            Ghost Button
          </button>
          <button className="px-6 py-3 holographic-base text-holo-charcoal font-archivo-condensed font-semibold uppercase tracking-wide rounded-lg hover:opacity-90 transition-opacity">
            Holographic Button
          </button>
        </div>
      </div>

      {/* Hamburger Button */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Hamburger Button</h3>
        <p className="text-sm text-holo-charcoal/60 mb-4">Click to toggle state</p>
        <button
          onClick={() => setHamburgerOpen(!hamburgerOpen)}
          className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-holo-charcoal/5 rounded-lg"
        >
          <motion.span
            className="w-6 h-0.5 bg-holo-charcoal rounded-full"
            animate={hamburgerOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-holo-charcoal rounded-full"
            animate={hamburgerOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-holo-charcoal rounded-full"
            animate={hamburgerOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Magnetic Link Demo */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Magnetic Link</h3>
        <p className="text-sm text-holo-charcoal/60 mb-4">Hover to see magnetic effect</p>
        <MagneticLinkDemo />
      </div>

      {/* Input Fields */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Input Fields</h3>
        <div className="flex gap-4 max-w-md">
          <input
            type="text"
            placeholder="Text input"
            className="flex-1 px-4 py-3 border border-holo-charcoal/20 rounded-lg font-archivo focus:outline-none focus:border-holo-charcoal transition-colors"
          />
          <input
            type="text"
            placeholder="Filled"
            defaultValue="HOLO VAN"
            className="flex-1 px-4 py-3 border border-holo-charcoal/20 rounded-lg font-archivo focus:outline-none focus:border-holo-charcoal transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

function MagneticLinkDemo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href="#"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block font-archivo-condensed font-semibold text-xl uppercase relative group"
    >
      I CAMPER
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-holo-charcoal group-hover:w-full transition-all duration-300" />
    </motion.a>
  );
}

function EffectsSection() {
  return (
    <div className="space-y-12">
      {/* Holographic Background */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Background</h3>
        <div className="relative h-64 rounded-xl overflow-hidden">
          <div className="absolute inset-0 holographic-base opacity-80" />
          <div className="absolute inset-0 holographic-overlay opacity-60" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <p className="font-archivo-condensed font-semibold text-4xl text-holo-charcoal uppercase">
              Layered Effect
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm text-holo-charcoal/60">
          Three layers: <code className="bg-holo-charcoal/5 px-1 rounded">holographic-base</code> +
          <code className="bg-holo-charcoal/5 px-1 rounded">holographic-overlay</code> +
          <code className="bg-holo-charcoal/5 px-1 rounded">backdrop-blur-3xl</code>
        </p>
      </div>

      {/* Holographic Text */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Holographic Text</h3>
        <p className="font-archivo-condensed font-semibold text-6xl uppercase holographic-text">
          Travellers Only
        </p>
        <p className="mt-2 text-sm text-holo-charcoal/60">
          CSS class: <code className="bg-holo-charcoal/5 px-2 py-0.5 rounded">holographic-text</code>
        </p>
      </div>

      {/* Animation Curves */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Motion Easing</h3>
        <div className="flex gap-4">
          <motion.div
            className="w-16 h-16 bg-holo-charcoal rounded-lg"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="flex flex-col justify-center">
            <p className="font-archivo font-medium">Custom Easing</p>
            <code className="text-sm text-holo-charcoal/60">[0.22, 1, 0.36, 1]</code>
          </div>
        </div>
      </div>

      {/* Stagger Animation */}
      <div>
        <h3 className="font-archivo-condensed font-semibold text-xl mb-4">Stagger Animation</h3>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-12 h-12 rounded-lg"
              style={{ backgroundColor: holoColors[i].hex }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== MAIN PAGE =====

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-holo-offwhite">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-holo-offwhite/90 backdrop-blur-sm border-b border-holo-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-archivo-condensed font-semibold text-lg uppercase">
            HOLO VAN Design System
          </span>
          <div className="flex gap-6">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-archivo text-sm text-holo-charcoal/60 hover:text-holo-charcoal transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-16">
          <h1 className="font-archivo-condensed font-semibold text-6xl text-holo-charcoal uppercase">
            Design System
          </h1>
          <p className="mt-4 font-archivo text-lg text-holo-charcoal/60 max-w-2xl">
            The complete visual identity guide for HOLO VAN.
            Brand elements, typography, colors, and components.
          </p>
          <p className="mt-2 text-sm text-holo-charcoal/40">
            Dev-only route - not accessible in production
          </p>
        </header>

        {/* Sections */}
        <section id="colors" className="mb-24 scroll-mt-24">
          <SectionHeader title="Colors" subtitle="Holographic spectrum and primary palette" />
          <ColorPaletteSection />
        </section>

        <section id="typography" className="mb-24 scroll-mt-24">
          <SectionHeader title="Typography" subtitle="Archivo font family in all weights" />
          <TypographySection />
        </section>

        <section id="logos" className="mb-24 scroll-mt-24">
          <SectionHeader title="Logos" subtitle="All variants and color versions" />
          <LogosSection />
        </section>

        <section id="stickers" className="mb-24 scroll-mt-24">
          <SectionHeader title="Stickers" subtitle="Brand decorative elements (hover for usage)" />
          <StickersSection />
        </section>

        <section id="components" className="mb-24 scroll-mt-24">
          <SectionHeader title="Components" subtitle="UI building blocks" />
          <ComponentsSection />
        </section>

        <section id="effects" className="mb-24 scroll-mt-24">
          <SectionHeader title="Effects" subtitle="Animations and holographic backgrounds" />
          <EffectsSection />
        </section>
      </main>
    </div>
  );
}
