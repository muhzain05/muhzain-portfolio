import { createContext, useContext } from 'react';

export const LanternContext = createContext({ enabled: true, setEnabled: () => {} });
export const useLanterns = () => useContext(LanternContext);
