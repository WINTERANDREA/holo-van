'use client';

import { useRef, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

interface MagneticLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}

export function MagneticLink({ children, href, className = '', onClick }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`relative font-archivo-condensed font-semibold text-sm tracking-wider text-primary transition-transform duration-200 group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      {/* Animated underline */}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
