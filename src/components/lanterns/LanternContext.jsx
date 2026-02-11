import { createContext, useContext, useState } from 'react';

const LanternContext = createContext({
  enabled: true,
  setEnabled: () => {},
});

export function LanternProvider({ children }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <LanternContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </LanternContext.Provider>
  );
}

export function useLanterns() {
  return useContext(LanternContext);
}
