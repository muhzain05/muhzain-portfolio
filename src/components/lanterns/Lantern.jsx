import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function Lantern({
  x = '50%',
  y = '50%',
  size = 24,
  opacity = 0.5,
  driftAmount = 8,
  driftDuration = 8,
  parallaxRate = 0.1,
  color = 'var(--color-accent)',
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 3000], [0, 3000 * parallaxRate]);

  if (prefersReducedMotion) {
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size * 1.4,
          opacity: opacity * 0.6,
        }}
      >
        <LanternSVG color={color} />
      </div>
    );
  }

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size * 1.4,
        y: parallaxY,
      }}
      animate={{
        y: [0, -driftAmount, 0],
        opacity: [opacity * 0.6, opacity, opacity * 0.6],
      }}
      transition={{
        y: {
          duration: driftDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        opacity: {
          duration: driftDuration * 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      <LanternSVG color={color} />
    </motion.div>
  );
}

function LanternSVG({ color }) {
  return (
    <svg viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M12 0 L12 4" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <rect x="8" y="4" width="8" height="2" rx="1" fill={color} opacity="0.7" />
      <ellipse cx="12" cy="17" rx="10" ry="12" fill={color} opacity="0.15" />
      <ellipse cx="12" cy="17" rx="8" ry="10" fill={color} opacity="0.08" />
      <ellipse cx="12" cy="16" rx="4" ry="5" fill={color} opacity="0.2" />
      <rect x="9" y="28" width="6" height="2" rx="1" fill={color} opacity="0.5" />
      <path d="M12 30 L12 34" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
