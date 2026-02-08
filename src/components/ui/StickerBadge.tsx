'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
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
  className,
}: StickerBadgeProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const resolvedVariant =
    variant === 'auto'
      ? mounted && resolvedTheme === 'dark'
        ? 'transparent'
        : 'holographic'
      : variant;

  const src = getPath(sticker, resolvedVariant);

  return (
    <motion.div
      className={cn('relative inline-block', className)}
      style={{ width: size, height: size, rotate: rotation }}
      animate={animate ? { rotate: [rotation - 2, rotation + 2, rotation] } : undefined}
      transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <Image
        src={src}
        alt={sticker}
        fill
        className="object-contain"
        unoptimized
      />
    </motion.div>
  );
}
