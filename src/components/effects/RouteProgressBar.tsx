'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';

type ProgressState = 'idle' | 'loading' | 'completing';

function RouteProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = useState<ProgressState>('idle');
  const prevPathRef = useRef(pathname);
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect navigation START via click interception on <a> tags
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.hasAttribute('download') ||
        anchor.getAttribute('target') === '_blank'
      ) {
        return;
      }

      // Only trigger if navigating to a different path
      const currentPath = window.location.pathname;
      try {
        const url = new URL(href, window.location.origin);
        if (url.pathname !== currentPath) {
          setState('loading');
        }
      } catch {
        // Invalid URL, ignore
      }
    };

    // Handle browser back/forward
    const handlePopState = () => {
      setState('loading');
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Detect navigation END via pathname change
  useEffect(() => {
    if (prevPathRef.current !== pathname && state === 'loading') {
      setState('completing');

      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
      completionTimerRef.current = setTimeout(() => {
        setState('idle');
      }, 500);
    }
    prevPathRef.current = pathname;
  }, [pathname, searchParams, state]);

  // Safety timeout: force complete if navigation hangs
  useEffect(() => {
    if (state === 'loading') {
      safetyTimerRef.current = setTimeout(() => {
        setState('completing');
        setTimeout(() => setState('idle'), 500);
      }, 10000);
      return () => {
        if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      };
    }
  }, [state]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  // Skip entirely if user prefers reduced motion
  if (prefersReducedMotion) return null;

  const isVisible = state === 'loading' || state === 'completing';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-[3px] overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <motion.div
            className="h-full rounded-r-full"
            style={{
              background:
                'linear-gradient(90deg, #FFB8D0, #FFD4A8, #FFFFA8, #B8FFB8, #A8FFF4, #B8D4FF, #E0B8FF, #FFB8D0)',
              backgroundSize: '200% 100%',
              boxShadow:
                '0 0 12px rgba(168, 255, 244, 0.5), 0 0 6px rgba(255, 184, 208, 0.3)',
            }}
            initial={{ width: '0%' }}
            animate={{
              width: state === 'completing' ? '100%' : '85%',
              backgroundPosition: ['0% 0%', '200% 0%'],
            }}
            transition={{
              width:
                state === 'completing'
                  ? { duration: 0.2, ease: 'easeOut' }
                  : { duration: 8, ease: [0.08, 0.82, 0.17, 1] },
              backgroundPosition: {
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function RouteProgressBar() {
  return (
    <Suspense fallback={null}>
      <RouteProgressBarInner />
    </Suspense>
  );
}
