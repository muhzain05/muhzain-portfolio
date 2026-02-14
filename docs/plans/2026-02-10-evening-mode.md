# Evening Mode Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extend the warm editorial portfolio with a lantern-lit "evening mode" — a dark theme that feels intentional, atmospheric, and calm.

**Architecture:** A `ThemeContext` manages `'light' | 'evening'` state, writes `data-theme="evening"` to `<html>`, and orchestrates a sequential transition: colors swap first going into evening, lanterns fade out first going back to day. A global `LanternPool` component replaces the old page-specific `LanternLayer` and manages a living pool of 7–8 lanterns with independent lifecycles, only visible in evening mode.

**Tech Stack:** React 18, Framer Motion 12, Tailwind CSS v4, CSS custom properties (`data-theme` override pattern)

---

## Key Files Reference

- `src/context/ThemeContext.jsx` — CREATE (new)
- `src/components/lanterns/LanternPool.jsx` — CREATE (new)
- `src/index.css` — MODIFY (add evening vars + transitions)
- `src/App.jsx` — MODIFY (add ThemeProvider, LanternPool)
- `src/components/Navbar.jsx` — MODIFY (toggle + resume link)
- `src/components/ui/CustomCursor.jsx` — MODIFY (heavier spring + evening glow)
- `src/pages/About.jsx` — MODIFY (Experience + Education sections)
- `src/pages/Home.jsx` — MODIFY (remove LanternLayer)
- `src/pages/Resume.jsx` — check if LanternLayer is used there too

---

## Task 1: ThemeContext

**Files:**
- Create: `src/context/ThemeContext.jsx`

**Step 1: Create the file**

```jsx
// src/context/ThemeContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const LANTERN_FADE_MS = 650;

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [lanternVisible, setLanternVisible] = useState(
    () => (localStorage.getItem('theme') || 'light') === 'evening'
  );

  // Sync data-theme attribute and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      // Light → Evening: colors switch first, lanterns fade in after
      setThemeState('evening');
      setTimeout(() => setLanternVisible(true), 50);
    } else {
      // Evening → Day: lanterns fade out first, then colors switch
      setLanternVisible(false);
      setTimeout(() => setThemeState('light'), LANTERN_FADE_MS);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, lanternVisible }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

**Step 2: Verify it builds**

```bash
cd /Users/muhammadzainasad/Documents/Documents\ -\ Zain/Portfolio/muhzain-portfolio/.worktrees/redesign && npm run build 2>&1 | tail -5
```
Expected: no errors about ThemeContext (it's not imported anywhere yet).

**Step 3: Commit**

```bash
git add src/context/ThemeContext.jsx
git commit -m "feat: add ThemeContext for light/evening mode orchestration"
```

---

## Task 2: Evening CSS Variables + Color Transitions

**Files:**
- Modify: `src/index.css`

**Step 1: Add evening theme overrides after the `@theme {}` block**

Add this after the closing `}` of the `@theme {}` block (after line 32):

```css
/* ===== EVENING MODE OVERRIDES ===== */

[data-theme="evening"] {
  --color-bg: #2A1F16;
  --color-fg: #F1E6D6;
  --color-muted: #CBBBA7;
  --color-accent: #D4A373;
  --color-border: #4A3828;
  --color-hover: #3B2D1F;
  --color-card: #33251A;
  --navbar-bg-scrolled: rgba(42, 31, 22, 0.92);
}
```

**Step 2: Add `--navbar-bg-scrolled` to light mode in `:root` (inside `@layer base`)**

In the `:root {}` block (around line 37), add:
```css
--navbar-bg-scrolled: rgba(250, 248, 245, 0.9);
```

**Step 3: Add smooth color transitions to `body`**

In the `body {}` rule (around line 98), add:
```css
transition: background-color 0.4s ease, color 0.4s ease;
```

And add a general rule after the `body {}` block:
```css
/* Smooth theme transitions */
@media (prefers-reduced-motion: no-preference) {
  h1, h2, h3, h4, h5, h6, p, a, nav {
    transition: color 0.4s ease;
  }
}
```

**Step 4: Verify in browser**

```bash
# Dev server should already be running at http://localhost:5173
# Manually set data-theme="evening" on <html> in DevTools to check colors
```

Check: background is `#2A1F16`, text is warm beige, no cool grays anywhere.

**Step 5: Commit**

```bash
git add src/index.css
git commit -m "feat: add evening mode CSS variables and color transitions"
```

---

## Task 3: Navbar Theme Toggle + Resume Link

**Files:**
- Modify: `src/components/Navbar.jsx`

**Step 1: Import `useTheme` and update Resume link**

Replace the top of `Navbar.jsx` — add the import and update `rightLinks`:

```jsx
import { useTheme } from '@/context/ThemeContext';
```

In the `rightLinks` array, change Resume entry:
```jsx
const rightLinks = [
  { label: 'About', to: '/about' },
];
```
Resume will be rendered as a standalone `<a>` (external), not a `<Link>`.

**Step 2: Add toggle and resume link to the desktop right section**

Replace the "Right links - desktop" `<div>`:

```jsx
{/* Right links - desktop */}
<div className="hidden md:flex items-center gap-10">
  {rightLinks.map((link) => (
    <NavLink key={link.label} {...link} />
  ))}
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
```

**Step 3: Add the `ThemeToggle` component at the bottom of the file**

```jsx
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
```

**Step 4: Add ThemeToggle to the mobile menu overlay too**

Inside the mobile menu `<div className="flex flex-col items-center gap-8">`, add after the links:
```jsx
<div className="mt-4">
  <ThemeToggle />
</div>
```

**Step 5: Update Navbar scrolled background to use CSS var**

In the `<nav>` style prop, change the hardcoded rgba to:
```jsx
backgroundColor: hasScrolled ? 'var(--navbar-bg-scrolled)' : 'transparent',
```

**Step 6: Verify**

Open browser. The toggle should appear. Clicking "Evening" should set `data-theme="evening"` on `<html>` and change colors. "Day" should revert.

**Step 7: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add theme toggle to navbar and update resume link to Google Drive"
```

---

## Task 4: LanternPool Component

**Files:**
- Create: `src/components/lanterns/LanternPool.jsx`

**Step 1: Create the LanternSVG sub-component**

This is a self-contained SVG lantern — no scroll parallax, just the shape:

```jsx
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
```

**Step 2: Create lifecycle helpers**

```jsx
function randomEdgePosition() {
  const zone = Math.random();
  if (zone < 0.35) {
    return { x: 2 + Math.random() * 9, y: 10 + Math.random() * 78 };
  } else if (zone < 0.7) {
    return { x: 89 + Math.random() * 9, y: 10 + Math.random() * 78 };
  } else {
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
```

**Step 3: Create the `LifecycleLantern` component**

```jsx
function LifecycleLantern({ id, x, y, size, driftY, driftX, driftDuration, maxOpacity, lifetime, fadeInDuration, fadeOutDuration, onExpired }) {
  const [isExiting, setIsExiting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const exitTimer = setTimeout(
      () => setIsExiting(true),
      lifetime - fadeOutDuration * 1000
    );
    return () => clearTimeout(exitTimer);
  }, [lifetime, fadeOutDuration]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, pointerEvents: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : maxOpacity }}
      transition={{
        duration: isExiting ? fadeOutDuration : fadeInDuration,
        ease: 'easeInOut',
      }}
      onAnimationComplete={() => { if (isExiting) onExpired(id); }}
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
```

**Step 4: Create the `LanternPool` pool manager**

```jsx
const DESKTOP_COUNT = 7;
const MOBILE_COUNT = 3;

export function LanternPool() {
  const { lanternVisible } = useTheme();
  const [lanterns, setLanterns] = useState([]);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  useEffect(() => {
    if (!lanternVisible) {
      setLanterns([]);
      return;
    }
    const count = isMobileRef.current ? MOBILE_COUNT : DESKTOP_COUNT;
    setLanterns(Array.from({ length: count }, () => createLantern()));
  }, [lanternVisible]);

  const handleExpired = useCallback((expiredId) => {
    setLanterns(prev => [
      ...prev.filter(l => l.id !== expiredId),
      createLantern(),
    ]);
  }, []);

  if (!lanternVisible) return null;

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
        {lanterns.map(lantern => (
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
```

**Step 5: Full file with all imports**

```jsx
// src/components/lanterns/LanternPool.jsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
// ... (paste all the above)
```

**Step 6: Verify build**

```bash
npm run build 2>&1 | tail -5
```

**Step 7: Commit**

```bash
git add src/components/lanterns/LanternPool.jsx
git commit -m "feat: add LanternPool with independent lifecycle management for evening mode"
```

---

## Task 5: Wire ThemeProvider + LanternPool into App

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/pages/Home.jsx` (remove LanternLayer)
- Modify: `src/pages/About.jsx` (remove LanternLayer — will be re-added in Task 7)
- Check and modify any other pages using LanternLayer

**Step 1: Check which pages use LanternLayer**

```bash
grep -r "LanternLayer" /Users/muhammadzainasad/Documents/Documents\ -\ Zain/Portfolio/muhzain-portfolio/.worktrees/redesign/src --include="*.jsx" -l
```

**Step 2: Update `src/App.jsx`**

Replace entire file content:

```jsx
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanternPool } from '@/components/lanterns/LanternPool';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Resume } from '@/pages/Resume';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { NotFound } from '@/pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <LanternPool />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
```

Note: `LanternProvider` is replaced by `ThemeProvider`. `LanternPool` is now global.

**Step 3: Remove `<LanternLayer>` from every page that uses it**

For each page returned by the grep in Step 1, remove:
- The `import { LanternLayer } from '@/components/lanterns/LanternLayer';` line
- The `<LanternLayer page="..." />` JSX element

**Step 4: Verify dev server**

```bash
# Check http://localhost:5173 — pages should load without errors
# LanternLayer is gone; LanternPool is invisible in light mode (lanternVisible = false)
# Toggle to Evening in navbar — lanterns should appear
```

**Step 5: Commit**

```bash
git add src/App.jsx src/pages/Home.jsx src/pages/About.jsx
git commit -m "feat: wire ThemeProvider and global LanternPool, remove per-page LanternLayer"
```

---

## Task 6: Custom Cursor Refinement

**Files:**
- Modify: `src/components/ui/CustomCursor.jsx`

**Step 1: Import `useTheme`**

Add to imports:
```jsx
import { useTheme } from '@/context/ThemeContext';
```

**Step 2: Update spring config and add evening glow**

Inside `CustomCursor()`:

Replace the spring config line:
```jsx
const springConfig = { damping: 45, stiffness: 90, mass: 1.8 };
```

Add theme access:
```jsx
const { theme } = useTheme();
```

**Step 3: Update the rendered `motion.div` styles**

Add `boxShadow` to the style prop, conditional on theme:
```jsx
style={{
  x,
  y,
  translateX: '-50%',
  translateY: '-50%',
  zIndex: 9999,
  position: 'fixed',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  mixBlendMode: 'difference',
  backgroundColor: 'white',
  borderRadius: '50%',
  boxShadow: theme === 'evening' ? '0 0 14px 2px rgba(212, 163, 115, 0.2)' : 'none',
}}
```

**Step 4: Verify**

Switch to evening mode in browser. Cursor should feel heavier/slower and have a faint warm glow. In light mode, snappy feel should be gone — it's now weighted.

**Step 5: Commit**

```bash
git add src/components/ui/CustomCursor.jsx
git commit -m "feat: heavier cursor spring physics and evening mode glow"
```

---

## Task 7: About Page — Experience + Education Sections

**Files:**
- Modify: `src/pages/About.jsx`

**Step 1: Import data**

Add to the top of About.jsx:
```jsx
import { experiences, education } from '@/data/experience';
```

**Step 2: Add Experience section after the last bio paragraph `SectionReveal`**

After the closing `</SectionReveal>` of the last bio paragraph (the "When not coding..." paragraph), add:

```jsx
{/* Experience */}
<SectionReveal delay={0.3}>
  <div style={{ marginTop: '5rem', marginBottom: '4rem' }}>
    <h2
      className="mb-10"
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.75rem',
        color: 'var(--color-fg)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '1rem',
      }}
    >
      Experience
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {experiences.map((exp) => (
        <div key={exp.id}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '0.25rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.0625rem',
                color: 'var(--color-fg)',
                fontWeight: 400,
              }}
            >
              {exp.role} — {exp.company}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: 'var(--color-muted)',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              {exp.period}
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: 'var(--color-muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</SectionReveal>

{/* Education */}
<SectionReveal delay={0.35}>
  <div style={{ marginBottom: '4rem' }}>
    <h2
      className="mb-10"
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.75rem',
        color: 'var(--color-fg)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        borderBottom: '1px solid var(--color-border)',
        paddingBottom: '1rem',
      }}
    >
      Education
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {education.map((edu, i) => (
        <div key={i}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '0.25rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.0625rem',
                color: 'var(--color-fg)',
                fontWeight: 400,
              }}
            >
              {edu.degree}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: 'var(--color-muted)',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              {edu.period}
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: 'var(--color-muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {edu.institution}
          </p>
          {edu.details && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9375rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                margin: '0.25rem 0 0 0',
                opacity: 0.75,
              }}
            >
              {edu.details}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</SectionReveal>
```

**Step 3: Verify**

Visit `/about` in browser. Below the bio text, clean Experience and Education sections should appear. No cards, no icons — just type and spacing. Works in both light and evening mode.

**Step 4: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: add Experience and Education sections to About page"
```

---

## Task 8: Final Polish + Verification

**Step 1: Test full evening mode transition**

- Start in light mode → click "Evening" → colors cross-fade, lanterns fade in after ~50ms
- Click "Day" → lanterns fade out over 600ms, then colors revert
- Refresh in evening mode → theme persists from localStorage, lanterns visible on load

**Step 2: Test lantern lifecycle**

- Switch to evening mode, wait 20–30 seconds
- Lanterns should independently fade out and be replaced by new ones
- At no point should all lanterns be gone simultaneously
- Drift should be barely perceptible

**Step 3: Test reduced motion**

- Enable `prefers-reduced-motion: reduce` in DevTools (Rendering tab)
- Lanterns should not render (LifecycleLantern returns null)
- Cursor should fall back to browser default
- Color transitions should still work (CSS handles this)

**Step 4: Test mobile**

- Resize to <768px → only 3 lanterns in pool instead of 7

**Step 5: Final commit if everything looks correct**

```bash
git add -A
git commit -m "feat: complete evening mode — theme toggle, lantern pool, cursor, about page"
```

---

## Checklist

- [ ] ThemeContext with sequential transition orchestration
- [ ] Evening CSS variables (warm dark, no pure black, no cool grays)
- [ ] Color transitions eased (400ms)
- [ ] Navbar theme toggle (text-only, "Evening" / "Day")
- [ ] Resume → Google Drive placeholder in new tab
- [ ] Navbar scrolled background theme-aware
- [ ] LanternPool with independent lifecycle (18–30s per lantern)
- [ ] 7–8 desktop / 3–4 mobile lanterns
- [ ] Edge-zone positioning (never over text)
- [ ] Lanterns only in evening mode
- [ ] Cursor: heavier spring (damping 45, stiffness 90, mass 1.8)
- [ ] Cursor: faint amber glow in evening mode
- [ ] About page: Experience section (4 entries)
- [ ] About page: Education section (1 entry)
- [ ] LanternLayer removed from all pages
- [ ] prefers-reduced-motion respected
- [ ] No pure black, no cool grays, no blue tones in evening palette
