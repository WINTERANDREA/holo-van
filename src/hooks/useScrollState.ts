'use client';

import { useState, useEffect, useRef } from 'react';

interface ScrollState {
  y: number;
  direction: 'up' | 'down' | null;
  isScrolled: boolean;
  isAtTop: boolean;
}

export function useScrollState(threshold = 50): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    direction: null,
    isScrolled: false,
    isAtTop: true,
  });
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const direction = y > lastY.current ? 'down' : y < lastY.current ? 'up' : state.direction;

      setState({
        y,
        direction,
        isScrolled: y > threshold,
        isAtTop: y < 10,
      });

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, state.direction]);

  return state;
}
