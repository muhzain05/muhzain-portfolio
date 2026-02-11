import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useTheme } from '@/context/ThemeContext';

const leftLinks = [
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/#projects' },
];

const rightLinks = [
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 transition-colors duration-300"
      style={{
        backgroundColor: hasScrolled ? 'var(--navbar-bg-scrolled)' : 'transparent',
        backdropFilter: hasScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-8 py-5 flex items-center justify-between">
        {/* Left links - desktop */}
        <div className="hidden md:flex items-center gap-10">
          {leftLinks.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </div>

        {/* Center wordmark */}
        <Link
          to="/"
          className="font-serif text-2xl tracking-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Zain
        </Link>

        {/* Right links - desktop */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink label="About" to="/about" />
          <a
            href="https://drive.google.com/file/d/PLACEHOLDER_RESUME_ID/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-wide uppercase text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
          >
            Resume
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className="block w-6 h-0.5 bg-[var(--color-fg)] transition-transform duration-300"
            style={{
              transform: isMenuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 bg-[var(--color-fg)] transition-opacity duration-300"
            style={{ opacity: isMenuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-[var(--color-fg)] transition-transform duration-300"
            style={{
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[var(--color-bg)] z-20 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {allLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-serif tracking-tight text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://drive.google.com/file/d/PLACEHOLDER_RESUME_ID/view"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-serif tracking-tight text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Resume
              </a>
              <div className="mt-2">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ label, to }) {
  return (
    <Link
      to={to}
      className="text-sm font-medium tracking-wide uppercase text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors duration-300"
      style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
    >
      {label}
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="text-sm font-medium tracking-wide uppercase transition-colors duration-300"
      style={{
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.08em',
        color: theme === 'evening' ? 'var(--color-accent)' : 'var(--color-muted)',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'none',
      }}
      aria-label={theme === 'evening' ? 'Switch to day mode' : 'Switch to evening mode'}
    >
      {theme === 'evening' ? 'Day' : 'Evening'}
    </button>
  );
}
