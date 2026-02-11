import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// ─── SVG Lantern Shape ────────────────────────────────────────────────────────

function LanternSVG({ size, color = '#D4A373' }) {
  const w = size;
  const h = size * 1.6;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 32 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Top hook */}
      <line x1="16" y1="0" x2="16" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Top cap */}
      <rect x="8" y="6" width="16" height="4" rx="2" fill={color} opacity="0.9" />
      {/* Body */}
      <ellipse cx="16" cy="28" rx="11" ry="16" fill={color} opacity="0.18" />
      <ellipse cx="16" cy="28" rx="11" ry="16" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Vertical ribs */}
      <line x1="10" y1="12" x2="8" y2="44" stroke={color} strokeWidth="0.75" opacity="0.4" />
      <line x1="16" y1="10" x2="16" y2="46" stroke={color} strokeWidth="0.75" opacity="0.4" />
      <line x1="22" y1="12" x2="24" y2="44" stroke={color} strokeWidth="0.75" opacity="0.4" />
      {/* Bottom cap */}
      <rect x="8" y="42" width="16" height="4" rx="2" fill={color} opacity="0.9" />
      {/* Glow bloom */}
      <ellipse cx="16" cy="28" rx="9" ry="13" fill={color} opacity="0.08" />
    </svg>
  );
}

// ─── Lifecycle Helpers ────────────────────────────────────────────────────────

function randomEdgePosition() {
  const zone = Math.random();
  if (zone < 0.35) {
    // Left edge strip
    return { x: 2 + Math.random() * 9, y: 10 + Math.random() * 78 };
  } else if (zone < 0.7) {
    // Right edge strip
    return { x: 89 + Math.random() * 9, y: 10 + Math.random() * 78 };
  } else {
    // Top band
    return { x: 15 + Math.random() * 68, y: 2 + Math.random() * 10 };
  }
}

let _idCounter = 0;

function createLantern() {
  return {
    id: _idCounter++,
    ...randomEdgePosition(),
    lifetime: 18000 + Math.random() * 12000,
    fadeInDuration: 3 + Math.random() * 2,
    fadeOutDuration: 4 + Math.random() * 2,
    size: 16 + Math.random() * 16,
    driftY: 6 + Math.random() * 4,
    driftX: 3 + Math.random() * 3,
    driftDuration: 12 + Math.random() * 8,
    maxOpacity: 0.5 + Math.random() * 0.35,
  };
}

// ─── Individual Lantern with Lifecycle ───────────────────────────────────────

function LifecycleLantern({
  id,
  x,
  y,
  size,
  driftY,
  driftX,
  driftDuration,
  maxOpacity,
  lifetime,
  fadeInDuration,
  fadeOutDuration,
  onExpired,
}) {
  const [isExiting, setIsExiting] = useState(false);
  const exitTimerRef = useRef(null);

  useEffect(() => {
    exitTimerRef.current = setTimeout(
      () => setIsExiting(true),
      lifetime - fadeOutDuration * 1000
    );
    return () => clearTimeout(exitTimerRef.current);
  }, [lifetime, fadeOutDuration]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : maxOpacity }}
      transition={{
        duration: isExiting ? fadeOutDuration : fadeInDuration,
        ease: 'easeInOut',
      }}
      onAnimationComplete={() => {
        if (isExiting) onExpired(id);
      }}
    >
      <motion.div
        animate={{
          y: [0, -driftY, driftY * 0.3, -driftY * 0.5, 0],
          x: [0, driftX * 0.5, -driftX * 0.3, driftX, 0],
        }}
        transition={{
          duration: driftDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <LanternSVG size={size} />
      </motion.div>
    </motion.div>
  );
}

// ─── Pool Manager ─────────────────────────────────────────────────────────────

const DESKTOP_COUNT = 7;
const MOBILE_COUNT = 3;

export function LanternPool() {
  const { lanternVisible } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lanterns, setLanterns] = useState([]);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  useEffect(() => {
    if (!lanternVisible || prefersReducedMotion) {
      setLanterns([]);
      return;
    }
    const count = isMobileRef.current ? MOBILE_COUNT : DESKTOP_COUNT;
    setLanterns(Array.from({ length: count }, () => createLantern()));
  }, [lanternVisible, prefersReducedMotion]);

  const handleExpired = useCallback((expiredId) => {
    setLanterns((prev) => [
      ...prev.filter((l) => l.id !== expiredId),
      createLantern(),
    ]);
  }, []);

  if (!lanternVisible || prefersReducedMotion) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {lanterns.map((lantern) => (
          <LifecycleLantern
            key={lantern.id}
            {...lantern}
            onExpired={handleExpired}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
