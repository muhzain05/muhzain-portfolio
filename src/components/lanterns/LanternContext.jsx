import PropTypes from 'prop-types';
import { useState } from 'react';
import { LanternContext } from './lanternState';

export function LanternProvider({ children }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <LanternContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </LanternContext.Provider>
  );
}


LanternProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
