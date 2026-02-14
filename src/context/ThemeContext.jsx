import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ThemeContext = createContext(null);

const LANTERN_FADE_MS = 650;

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem('theme') || 'light'
  );
  const [lanternVisible, setLanternVisible] = useState(
    () => (localStorage.getItem('theme') || 'light') === 'evening'
  );
  const timeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (theme === 'light') {
      setThemeState('evening');
      timeoutRef.current = setTimeout(() => setLanternVisible(true), 50);
    } else {
      setLanternVisible(false);
      timeoutRef.current = setTimeout(() => setThemeState('light'), LANTERN_FADE_MS);
    }
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, lanternVisible }),
    [theme, toggleTheme, lanternVisible]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
