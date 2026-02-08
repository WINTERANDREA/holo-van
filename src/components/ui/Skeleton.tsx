import { cn } from '@/lib/utils';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

export function Skeleton({ width, height, rounded = 'md', className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-primary/5 animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5',
        roundedClasses[rounded],
        className
      )}
      style={{ width, height }}
    />
  );
}
