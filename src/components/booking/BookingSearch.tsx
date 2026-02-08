'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface BookingSearchProps {
  variant?: 'inline' | 'stacked';
  onSearch?: (data: { location: string; pickup: string; returnDate: string }) => void;
  labels?: {
    location?: string;
    pickup?: string;
    returnDate?: string;
    cta?: string;
  };
  className?: string;
}

export function BookingSearch({
  variant = 'inline',
  onSearch,
  labels = {},
  className,
}: BookingSearchProps) {
  const {
    location = 'PARTO DA',
    pickup = 'PARTENZA IL',
    returnDate = 'RIENTRO IL',
    cta = 'PRENOTA',
  } = labels;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSearch?.({
      location: fd.get('location') as string,
      pickup: fd.get('pickup') as string,
      returnDate: fd.get('return') as string,
    });
  };

  const isInline = variant === 'inline';

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'bg-surface-elevated/90 backdrop-blur-sm border border-border rounded-xl p-4',
        isInline ? 'flex flex-col md:flex-row md:items-end gap-4' : 'flex flex-col gap-4',
        className
      )}
    >
      <Input
        name="location"
        label={location}
        placeholder="Roma, Milano, Napoli..."
        className={isInline ? 'md:flex-1' : ''}
      />
      <Input
        name="pickup"
        label={pickup}
        type="date"
        className={isInline ? 'md:flex-1' : ''}
      />
      <Input
        name="return"
        label={returnDate}
        type="date"
        className={isInline ? 'md:flex-1' : ''}
      />
      <Button type="submit" variant="holographic" size="lg" className={isInline ? 'md:self-end' : ''}>
        {cta}
      </Button>
    </form>
  );
}
