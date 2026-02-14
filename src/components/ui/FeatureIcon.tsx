import { cn } from '@/lib/utils';

interface FeatureIconProps {
  feature: string;
  className?: string;
  size?: number;
}

/**
 * Maps a feature i18n key to an inline SVG icon.
 * All icons use `currentColor` so they inherit the parent's text color,
 * making them fully theme-aware (light/dark mode) with zero extra config.
 */
export function FeatureIcon({ feature, className, size = 24 }: FeatureIconProps) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: cn('flex-shrink-0', className),
  };

  switch (feature) {
    // ── Kitchen ──────────────────────────────────────────
    case 'kitchen-with-sink':
      return (
        <svg {...svgProps}>
          <path d="M3 7h18v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" />
          <path d="M8 7V3h8v4" />
          <circle cx="12" cy="14" r="3" />
          <path d="M12 11v6" />
        </svg>
      );

    case 'gas-stove':
      return (
        <svg {...svgProps}>
          <rect x="3" y="11" width="18" height="10" rx="1" />
          <circle cx="8" cy="16" r="2" />
          <circle cx="16" cy="16" r="2" />
          <path d="M8 7c0-2 1-4 0-4s0 2 0 4" />
          <path d="M16 7c0-2 1-4 0-4s0 2 0 4" />
        </svg>
      );

    case 'fridge':
      return (
        <svg {...svgProps}>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M5 10h14" />
          <path d="M9 6v2" />
          <path d="M9 14v4" />
        </svg>
      );

    case 'kitchen-kit':
      return (
        <svg {...svgProps}>
          <path d="M6 3v6a3 3 0 0 0 6 0V3" />
          <path d="M9 3v18" />
          <path d="M9 21H6" />
          <path d="M9 21h3" />
          <path d="M17 3c0 0 1 2 1 5s-1 5-1 5" />
          <path d="M17 13v8" />
          <path d="M14 21h6" />
        </svg>
      );

    case 'indoor-dining-table':
      return (
        <svg {...svgProps}>
          <rect x="3" y="8" width="18" height="2" rx="1" />
          <path d="M5 10v8" />
          <path d="M19 10v8" />
          <path d="M8 10v6" />
          <path d="M16 10v6" />
        </svg>
      );

    // ── Bathroom ─────────────────────────────────────────
    case 'portable-toilet':
      return (
        <svg {...svgProps}>
          <rect x="6" y="8" width="12" height="13" rx="2" />
          <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M6 14h12" />
        </svg>
      );

    case 'outdoor-shower':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="5" r="3" />
          <path d="M8 19v-5a4 4 0 0 1 8 0v5" />
          <path d="M5 19h14" />
          <path d="M10 10l-2 3" />
          <path d="M14 10l2 3" />
        </svg>
      );

    case 'indoor-hot-shower':
      return (
        <svg {...svgProps}>
          <path d="M4 4h4v8a4 4 0 0 0 8 0V4h4" />
          <path d="M12 12v3" />
          <path d="M10 18l-1 3" />
          <path d="M14 18l1 3" />
          <path d="M9 21h6" />
          <path d="M8 4c0-1 1-2 2-2h4c1 0 2 1 2 2" />
        </svg>
      );

    case 'wc-with-shower':
      return (
        <svg {...svgProps}>
          <path d="M6 21V11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10" />
          <path d="M4 21h16" />
          <path d="M12 2v4" />
          <path d="M10 4h4" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      );

    // ── Vehicle & Safety ─────────────────────────────────
    case 'tow-hook':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="17" r="4" />
          <circle cx="12" cy="17" r="1.5" />
          <path d="M12 13V5" />
          <path d="M8 5h8" />
        </svg>
      );

    case 'safety-kit':
      return (
        <svg {...svgProps}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );

    case 'backup-camera':
      return (
        <svg {...svgProps}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.5" />
          <path d="M2 8h2" />
          <path d="M20 8h2" />
        </svg>
      );

    // ── Camping & Outdoor ────────────────────────────────
    case 'camping-cable':
      return (
        <svg {...svgProps}>
          <path d="M12 2v4" />
          <path d="M9 6h6" />
          <path d="M10 6v3" />
          <path d="M14 6v3" />
          <rect x="7" y="9" width="10" height="4" rx="1" />
          <path d="M12 13v3" />
          <path d="M8 19a4 4 0 0 1 8 0" />
          <path d="M6 22h12" />
        </svg>
      );

    case 'awning':
      return (
        <svg {...svgProps}>
          <path d="M3 7l9-4 9 4" />
          <path d="M3 7v4c0 1 2 2 4.5 2S12 12 12 11s2.5-2 4.5-2 4.5 1 4.5 2V7" />
          <path d="M3 11v10" />
          <path d="M21 11v10" />
        </svg>
      );

    case 'water-hose':
      return (
        <svg {...svgProps}>
          <path d="M21 12c0 4-3 7-7 7H7" />
          <path d="M3 12c0-4 3-7 7-7h7" />
          <circle cx="7" cy="19" r="2" />
          <path d="M17 3l2 2-2 2" />
        </svg>
      );

    case 'solar-panels':
      return (
        <svg {...svgProps}>
          <rect x="2" y="8" width="20" height="12" rx="1" />
          <path d="M2 12h20" />
          <path d="M2 16h20" />
          <path d="M8 8v12" />
          <path d="M14 8v12" />
          <path d="M12 2v3" />
          <path d="M8 3l1 2" />
          <path d="M16 3l-1 2" />
        </svg>
      );

    case 'autonomous-heating':
      return (
        <svg {...svgProps}>
          <path d="M12 21a9 9 0 0 0 0-18" />
          <path d="M12 3a6 6 0 0 1 0 12" />
          <path d="M12 15a3 3 0 0 0 0-6" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );

    case 'air-conditioning':
      return (
        <svg {...svgProps}>
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );

    case 'bike-rack':
      return (
        <svg {...svgProps}>
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M6 17l4-7h4l4 7" />
          <path d="M10 10l-1-3h6l-1 3" />
          <path d="M12 5V3" />
        </svg>
      );

    case 'bed-linen':
      return (
        <svg {...svgProps}>
          <path d="M2 17V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9" />
          <path d="M2 17h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z" />
          <path d="M6 6v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <path d="M14 6V5a2 2 0 0 0-2-2" />
        </svg>
      );

    case 'water-tanks':
      return (
        <svg {...svgProps}>
          <path d="M12 2L6 8v8a6 6 0 0 0 12 0V8L12 2Z" />
          <path d="M6 12h12" />
          <path d="M10 16c0-1 1-2 2-2s2 1 2 2" />
        </svg>
      );

    case 'rear-storage':
      return (
        <svg {...svgProps}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 13h20" />
          <path d="M10 13v-2h4v2" />
        </svg>
      );

    case 'camping-roof':
      return (
        <svg {...svgProps}>
          <path d="M3 21V11l9-8 9 8v10" />
          <path d="M9 21v-6h6v6" />
          <path d="M6 11l6-5 6 5" />
        </svg>
      );

    case 'radio-aux-usb':
      return (
        <svg {...svgProps}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <circle cx="10" cy="12" r="3" />
          <path d="M16 9h1" />
          <path d="M16 12h1" />
          <path d="M16 15h1" />
          <path d="M4 10h1" />
          <path d="M4 14h1" />
        </svg>
      );

    case 'cleaning-kit':
      return (
        <svg {...svgProps}>
          <path d="M12 2v6" />
          <path d="M9 8h6" />
          <path d="M8 8l-1 13h10l-1-13" />
          <path d="M10 12h4" />
          <path d="M10 16h4" />
        </svg>
      );

    case 'assistance-24-7':
      return (
        <svg {...svgProps}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      );

    case 'leveling-wedges':
      return (
        <svg {...svgProps}>
          <path d="M2 20h20" />
          <path d="M4 20l6-10h4l6 10" />
          <path d="M7 15h10" />
        </svg>
      );

    default:
      // Fallback: generic dot icon
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}

/**
 * Maps rule types to themed SVG icons.
 */
export function RuleIcon({ rule, className, size = 20 }: { rule: string; className?: string; size?: number }) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: cn('flex-shrink-0', className),
  };

  switch (rule) {
    case 'minimumAge':
      return (
        <svg {...svgProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M19 8v6" />
          <path d="M16 11h6" />
        </svg>
      );
    case 'pets':
      return (
        <svg {...svgProps}>
          <circle cx="11" cy="4" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="4" cy="8" r="2" />
          <path d="M8 14c-1.5 2-1.5 4 0 6" />
          <path d="M14 14c1.5 2 1.5 4 0 6" />
          <path d="M8 14h6" />
          <path d="M8 20h6" />
        </svg>
      );
    case 'smoking':
      return (
        <svg {...svgProps}>
          <rect x="2" y="14" width="16" height="4" rx="1" />
          <path d="M18 14v4" />
          <path d="M20 14v4" />
          <path d="M22 14v4" />
          <path d="M18 9c0-2.5 2-2.5 2-5" />
          <path d="M22 9c0-2.5-2-2.5-2-5" />
        </svg>
      );
    case 'festival':
      return (
        <svg {...svgProps}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" />
          <path d="M4 22v-7" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      );
  }
}
