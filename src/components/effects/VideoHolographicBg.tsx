'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Overlay = 'none' | 'light' | 'dark';

interface VideoHolographicBgProps {
  overlay?: Overlay;
  /** Playback speed: 1 = normal, 0.5 = half speed, 0.25 = quarter speed */
  speed?: number;
  className?: string;
}

const overlayClasses: Record<Overlay, string> = {
  none: '',
  light: 'bg-white/20 backdrop-blur-sm',
  dark: 'bg-black/20 backdrop-blur-sm',
};

export function VideoHolographicBg({
  overlay = 'none',
  speed = 0.5,
  className,
}: VideoHolographicBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    // If user prefers reduced motion, keep video paused (poster shows)
    if (prefersReduced) {
      video.pause();
      return;
    }

    video.playbackRate = speed;

    // Only play video when section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay blocked — poster frame will show
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/bg-effect-2.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/bg-effect-2-pingpong.mp4" type="video/mp4" />
      </video>

      {/* Optional overlay scrim for text legibility */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      )}
    </motion.div>
  );
}
