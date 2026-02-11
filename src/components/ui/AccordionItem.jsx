import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function AccordionItem({ title, subtitle, period, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full py-8 flex items-center justify-between gap-4 text-left group"
      >
        <div>
          <h3
            className="text-xl md:text-2xl font-medium"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {title}
          </h3>
          <p className="text-sm text-[var(--color-muted)] mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <span className="text-sm text-[var(--color-muted)] hidden sm:block">
            {period}
          </span>
          <span
            className="text-2xl text-[var(--color-muted)] group-hover:text-[var(--color-fg)] transition-transform duration-300"
            style={{
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            +
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-sm text-[var(--color-muted)] leading-relaxed max-w-2xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
