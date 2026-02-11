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
