'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { PanInfo } from 'framer-motion';

interface UseCarouselOptions {
  itemCount: number;
  gap?: number;
  peekOffset?: number;
}

export function useCarousel({ itemCount, gap = 16, peekOffset = 56 }: UseCarouselOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure container width with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardWidth = Math.max(0, containerWidth - peekOffset);

  const getOffset = useCallback(() => {
    return -activeIndex * (cardWidth + gap);
  }, [activeIndex, cardWidth, gap]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const velocity = info.velocity.x;
      const offset = info.offset.x;

      let newIndex = activeIndex;

      // Velocity-based snap (fast flick)
      if (Math.abs(velocity) > 300) {
        newIndex = velocity < 0 ? activeIndex + 1 : activeIndex - 1;
      }
      // Distance-based fallback (slow drag past 10% of card width)
      else if (Math.abs(offset) > cardWidth * 0.1) {
        newIndex = offset < 0 ? activeIndex + 1 : activeIndex - 1;
      }

      // Clamp to valid range
      newIndex = Math.max(0, Math.min(itemCount - 1, newIndex));
      setActiveIndex(newIndex);
    },
    [activeIndex, cardWidth, itemCount],
  );

  const dragConstraints = {
    left: -(itemCount - 1) * (cardWidth + gap),
    right: 0,
  };

  return {
    containerRef,
    activeIndex,
    setActiveIndex,
    cardWidth,
    getOffset,
    handleDragEnd,
    dragConstraints,
  };
}
