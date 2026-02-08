'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

export interface VanData {
  slug: string;
  name: string;
  type: string;
  capacity: string;
  pricePerDay: string;
  features: string[];
  image?: string;
}

type VanCardVariant = 'clean' | 'overlay' | 'holographic';

interface VanCardProps {
  van: VanData;
  variant?: VanCardVariant;
  className?: string;
}

function ImagePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
      <Skeleton className="w-full h-full" rounded="sm" />
    </div>
  );
}

function CleanCard({ van, className }: { van: VanData; className?: string }) {
  return (
    <motion.div
      className={cn('bg-surface-elevated border border-border rounded-xl overflow-hidden', className)}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-card-hover)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-[4/3] relative">
        <ImagePlaceholder />
      </div>
      <div className="p-6">
        <p className="font-archivo text-xs text-muted uppercase tracking-wider">{van.type}</p>
        <h3 className="font-archivo-condensed font-semibold text-xl mt-1">{van.name}</h3>
        <div className="flex items-center gap-4 mt-3 text-sm text-secondary">
          <span>{van.capacity}</span>
          <span className="w-1 h-1 rounded-full bg-muted" />
          <span className="font-semibold text-primary">{van.pricePerDay}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {van.features.map((f) => (
            <Tag key={f}>{f}</Tag>
          ))}
        </div>
        <Button variant="primary" size="md" className="w-full mt-6">
          Dettagli
        </Button>
      </div>
    </motion.div>
  );
}

function OverlayCard({ van, className }: { van: VanData; className?: string }) {
  return (
    <motion.div
      className={cn('relative rounded-xl overflow-hidden aspect-[3/4] group cursor-pointer', className)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-holo-charcoal/20">
        <ImagePlaceholder />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-holo-charcoal via-holo-charcoal/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="font-archivo text-xs uppercase tracking-wider text-white/60">{van.type}</p>
        <h3 className="font-archivo-condensed font-semibold text-2xl mt-1">{van.name}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
          <span>{van.capacity}</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="font-semibold text-white">{van.pricePerDay}</span>
        </div>
        <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
          <div className="flex flex-wrap gap-2 mt-3">
            {van.features.map((f) => (
              <span key={f} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HolographicCard({ van, className }: { van: VanData; className?: string }) {
  return (
    <motion.div
      className={cn('relative bg-surface-elevated rounded-xl overflow-hidden', className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-1.5 holographic-base holo-decorative-tier" />
      <div className="aspect-[16/9] relative">
        <ImagePlaceholder />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-archivo-condensed font-semibold text-xl">{van.name}</h3>
            <p className="font-archivo text-xs text-secondary mt-1">{van.type}</p>
          </div>
          <span className="font-archivo-condensed font-semibold text-lg holographic-text">{van.pricePerDay}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {van.features.map((f) => (
            <Badge key={f} variant="outline" size="sm">{f}</Badge>
          ))}
          <Badge variant="outline" size="sm">{van.capacity}</Badge>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="primary" size="md" className="flex-1">
            Prenota
          </Button>
          <Button variant="secondary" size="md">
            Info
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function VanCard({ van, variant = 'clean', className }: VanCardProps) {
  switch (variant) {
    case 'overlay':
      return <OverlayCard van={van} className={className} />;
    case 'holographic':
      return <HolographicCard van={van} className={className} />;
    default:
      return <CleanCard van={van} className={className} />;
  }
}
