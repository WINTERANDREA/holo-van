import { formatPrice } from '@/lib/utils';
import type { VanData } from '@/components/ui/VanCard';
import fleetData from '@/data/fleet.json';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VanSpecs {
  sleeps: number;
  seats: number;
  engine?: string;
  transmission: 'manual' | 'automatic';
  year?: number;
  manufacturer: string;
  model: string;
}

export interface VanDataFull {
  slug: string;
  name: string;
  manufacturer: string;
  model: string;
  capacity: number;
  pricePerDay: number | null;
  features: string[];       // i18n keys — looked up via vanFeatures namespace
  highlights: string[];     // Top 3 selling points (i18n keys)
  sleepingConfig: string[]; // i18n keys — looked up via sleepingConfig namespace
  facilities: Record<string, string | boolean>;
  specs: VanSpecs;
  images: string[];         // Empty for now — Skeleton shown
}

export interface FleetShared {
  host: { name: string; location: string; languages: string[] };
  pickup: { city: string; country: string; exactLocationOnConfirmation: boolean };
  insurance: { vehicleInsured: boolean };
  cancellationPolicy: {
    type: string;
    rules: { condition: string; refund: string }[];
  };
  includedExtras: string[];
  optionalExtras: string[];
  shuttleAirports: string[];
  rules: {
    minimumDriverAge: number;
    festivalFriendly: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
  };
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
// Data — transform fleet.json into VanDataFull[]
// ---------------------------------------------------------------------------

const vans: VanDataFull[] = fleetData.vans.map((v) => ({
  slug: v.slug,
  name: v.name,
  manufacturer: v.manufacturer,
  model: v.model,
  capacity: v.seats,
  pricePerDay: v.priceFrom,
  features: v.features,
  highlights: v.highlights,
  sleepingConfig: v.sleepingConfig,
  facilities: v.facilities as unknown as Record<string, string | boolean>,
  specs: {
    sleeps: v.sleeps,
    seats: v.seats,
    engine: v.engine ?? undefined,
    transmission: v.transmission as 'manual' | 'automatic',
    year: v.year ?? undefined,
    manufacturer: v.manufacturer,
    model: v.model,
  },
  images: v.images,
}));

export const shared: FleetShared = fleetData.shared as FleetShared;

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
  return vans.filter((v) => v.slug !== slug).slice(0, limit);
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
    type: `${van.manufacturer} ${van.model}`,
    capacity: `${van.capacity} ${tVans('capacity')}`,
    pricePerDay: van.pricePerDay != null
      ? `${formatPrice(van.pricePerDay, intlLocale)}${tVans('perDay')}`
      : tVans('priceComingSoon'),
    features: van.highlights.map((f) => tFeatures(f)),
    image: van.images[0],
  };
}
