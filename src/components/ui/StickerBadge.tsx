'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

type StickerName =
  | 'wifi'
  | 'stay-wild'
  | 'real-travel'
  | 'real-travellers'
  | 'not-an-option'
  | 'more-story'
  | 'more-adventure'
  | 'go-to-resort'
  | 'fuck-comfort'
  | 'take-another';

type StickerVariant = 'delivery' | 'holographic' | 'black' | 'transparent' | 'auto';

interface StickerBadgeProps {
  sticker: StickerName;
  variant?: StickerVariant;
  size?: number;
  rotation?: number;
  animate?: boolean;
  entrance?: boolean;
  interactive?: boolean;
  entranceDelay?: number;
  className?: string;
}

function getPath(sticker: StickerName, variant: StickerVariant): string {
  if (variant === 'delivery') return `/design-system/stickers/${sticker}.png`;
  return `/design-system/stickers/${variant}/${sticker}.png`;
}

export function StickerBadge({
  sticker,
  variant = 'auto',
  size = 64,
  rotation = 0,
  animate = false,
  entrance = false,
  interactive = false,
  entranceDelay = 0,
  className,
}: StickerBadgeProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { matches: prefersReducedMotion } = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => setMounted(true), []);

  const resolvedVariant =
    variant === 'auto'
      ? mounted && resolvedTheme === 'dark'
        ? 'holographic'
        : 'transparent'
      : variant;

  const src = getPath(sticker, resolvedVariant);

  const skipAnimations = prefersReducedMotion || !mounted;

  // Organic idle wobble — asymmetric multi-axis for natural feel
  const idleAnimation = animate && !skipAnimations
    ? {
        rotate: [rotation, rotation + 2.5, rotation - 1.5, rotation + 1, rotation],
        y: [0, -3, 1, -2, 0],
        scale: [1, 1.02, 0.99, 1.01, 1],
      }
    : undefined;

  const idleTransition = animate && !skipAnimations
    ? { duration: 6, repeat: Infinity, ease: 'easeInOut' as const }
    : undefined;

  // Entrance "slap-down" animation
  const entranceVariants: Variants = {
    hidden: { scale: 0, rotate: rotation + 20, opacity: 0 },
    visible: {
      scale: 1,
      rotate: rotation,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15,
        delay: entranceDelay,
      },
    },
  };

  return (
    <motion.div
      className={cn('relative inline-block', className)}
      style={{ width: size, height: size, rotate: skipAnimations ? rotation : undefined }}
      // Entrance
      {...(entrance && !skipAnimations
        ? {
            variants: entranceVariants,
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: true },
          }
        : { style: { width: size, height: size, rotate: rotation } })}
      // Idle wobble (runs after entrance completes)
      animate={idleAnimation}
      transition={idleTransition}
      // Interactive hover + tap
      whileHover={
        interactive && !skipAnimations
          ? { scale: 1.1, rotate: rotation + 5, transition: { type: 'spring', stiffness: 500, damping: 15 } }
          : undefined
      }
      whileTap={interactive && !skipAnimations ? { scale: 0.92 } : undefined}
    >
      <Image
        src={src}
        alt={sticker}
        fill
        className="object-contain sticker-shadow"
        unoptimized
      />
    </motion.div>
  );
}
