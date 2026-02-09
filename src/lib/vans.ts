import { formatPrice } from '@/lib/utils';
import type { VanData } from '@/components/ui/VanCard';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type VanType = 'camper-van' | 'motorhome' | 'mini-camper' | 'large-van';

export interface VanSpecs {
  sleeps: number;
  seats: number;
  engine: string;
  transmission: 'manual' | 'automatic';
  length: string;
  year: number;
}

export interface VanDataFull {
  slug: string;
  name: string;
  type: VanType;
  capacity: number;
  pricePerDay: number;
  features: string[];       // i18n keys — looked up via vanFeatures namespace
  highlights: string[];     // Top 3 selling points (i18n keys)
  specs: VanSpecs;
  images: string[];         // Empty for now — Skeleton shown
}

// ---------------------------------------------------------------------------
// Locale helpers
// ---------------------------------------------------------------------------

export const localeToIntl: Record<string, string> = {
  it: 'it-IT',
  en: 'en-US',
  ru: 'ru-RU',
  ja: 'ja-JP',
};

// ---------------------------------------------------------------------------
// Mock data — 8 vans (2 per type)
// ---------------------------------------------------------------------------

const vans: VanDataFull[] = [
  {
    slug: 'california-ocean',
    name: 'California Ocean',
    type: 'camper-van',
    capacity: 4,
    pricePerDay: 120,
    features: ['popup-roof', 'kitchen', 'outdoor-shower'],
    highlights: ['popup-roof', 'kitchen', 'outdoor-shower'],
    specs: { sleeps: 4, seats: 4, engine: 'Diesel 2.0 TDI', transmission: 'manual', length: '4.9m', year: 2023 },
    images: [],
  },
  {
    slug: 'grand-california',
    name: 'Grand California',
    type: 'motorhome',
    capacity: 4,
    pricePerDay: 150,
    features: ['indoor-bathroom', 'double-bed', 'full-kitchen'],
    highlights: ['indoor-bathroom', 'double-bed', 'full-kitchen'],
    specs: { sleeps: 4, seats: 4, engine: 'Diesel 2.0 TDI', transmission: 'automatic', length: '5.9m', year: 2024 },
    images: [],
  },
  {
    slug: 'caddy-california',
    name: 'Caddy California',
    type: 'mini-camper',
    capacity: 2,
    pricePerDay: 80,
    features: ['compact', 'popup-roof', 'pull-out-kitchen'],
    highlights: ['compact', 'popup-roof', 'pull-out-kitchen'],
    specs: { sleeps: 2, seats: 4, engine: 'Diesel 2.0 TDI', transmission: 'manual', length: '4.5m', year: 2023 },
    images: [],
  },
  {
    slug: 'crafter-camper',
    name: 'Crafter Camper',
    type: 'large-van',
    capacity: 6,
    pricePerDay: 180,
    features: ['spacious', 'indoor-bathroom', 'solar-panels'],
    highlights: ['spacious', 'indoor-bathroom', 'solar-panels'],
    specs: { sleeps: 6, seats: 6, engine: 'Diesel 2.0 TDI', transmission: 'automatic', length: '7.0m', year: 2024 },
    images: [],
  },
  {
    slug: 'multivan-style',
    name: 'Multivan Style',
    type: 'camper-van',
    capacity: 4,
    pricePerDay: 130,
    features: ['modern-design', 'popup-roof', 'wifi'],
    highlights: ['modern-design', 'popup-roof', 'wifi'],
    specs: { sleeps: 4, seats: 5, engine: 'Diesel 2.0 TDI', transmission: 'automatic', length: '4.9m', year: 2024 },
    images: [],
  },
  {
    slug: 'california-beach',
    name: 'California Beach',
    type: 'camper-van',
    capacity: 4,
    pricePerDay: 110,
    features: ['popup-roof', 'compact', 'easy-to-drive'],
    highlights: ['popup-roof', 'compact', 'easy-to-drive'],
    specs: { sleeps: 4, seats: 4, engine: 'Diesel 2.0 TDI', transmission: 'manual', length: '4.9m', year: 2022 },
    images: [],
  },
  {
    slug: 'sprinter-explorer',
    name: 'Sprinter Explorer',
    type: 'large-van',
    capacity: 4,
    pricePerDay: 170,
    features: ['solar-panels', 'full-kitchen', 'air-conditioning'],
    highlights: ['solar-panels', 'full-kitchen', 'air-conditioning'],
    specs: { sleeps: 4, seats: 4, engine: 'Diesel 2.2 CDI', transmission: 'automatic', length: '6.4m', year: 2024 },
    images: [],
  },
  {
    slug: 'mini-countryman-camp',
    name: 'Mini Countryman Camp',
    type: 'mini-camper',
    capacity: 2,
    pricePerDay: 75,
    features: ['compact', 'easy-to-drive', 'awning'],
    highlights: ['compact', 'easy-to-drive', 'awning'],
    specs: { sleeps: 2, seats: 4, engine: 'Diesel 1.5', transmission: 'manual', length: '4.3m', year: 2023 },
    images: [],
  },
];

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getAllVans(): VanDataFull[] {
  return vans;
}

export function getVanBySlug(slug: string): VanDataFull | undefined {
  return vans.find((v) => v.slug === slug);
}

export function getRelatedVans(slug: string, limit = 3): VanDataFull[] {
  const current = getVanBySlug(slug);
  if (!current) return vans.slice(0, limit);
  return vans
    .filter((v) => v.slug !== slug && v.type === current.type)
    .concat(vans.filter((v) => v.slug !== slug && v.type !== current.type))
    .slice(0, limit);
}

export function getVanTypes(): VanType[] {
  return [...new Set(vans.map((v) => v.type))];
}

export function getCapacityOptions(): number[] {
  return [...new Set(vans.map((v) => v.capacity))].sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Bridge to existing VanCard interface
// ---------------------------------------------------------------------------

/**
 * Maps a VanDataFull to the VanData shape expected by <VanCard>.
 * `t` is a translation function (e.g. from useTranslations or getTranslations)
 * that resolves feature keys and capacity/perDay labels.
 */
export function toVanCardData(
  van: VanDataFull,
  locale: string,
  tFeatures: (key: string) => string,
  tVans: (key: string, values?: Record<string, unknown>) => string,
): VanData {
  const intlLocale = localeToIntl[locale] ?? 'it-IT';
  return {
    slug: van.slug,
    name: van.name,
    type: tVans(`vanTypes.${van.type}`),
    capacity: `${van.capacity} ${tVans('capacity')}`,
    pricePerDay: `${formatPrice(van.pricePerDay, intlLocale)}${tVans('perDay')}`,
    features: van.features.map((f) => tFeatures(f)),
  };
}
