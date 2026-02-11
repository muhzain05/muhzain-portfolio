import { useLanterns } from './LanternContext';
import { Lantern } from './Lantern';

const lanternConfigs = {
  home: [
    { x: '8%', y: '12%', size: 32, opacity: 0.4, driftDuration: 9, parallaxRate: 0.05 },
    { x: '85%', y: '8%', size: 22, opacity: 0.3, driftDuration: 11, parallaxRate: 0.08 },
    { x: '92%', y: '35%', size: 18, opacity: 0.25, driftDuration: 7, parallaxRate: 0.12 },
    { x: '5%', y: '55%', size: 26, opacity: 0.35, driftDuration: 10, parallaxRate: 0.06 },
    { x: '78%', y: '65%', size: 20, opacity: 0.2, driftDuration: 8, parallaxRate: 0.1 },
  ],
  about: [
    { x: '90%', y: '15%', size: 28, opacity: 0.35, driftDuration: 10, parallaxRate: 0.07 },
    { x: '6%', y: '40%', size: 20, opacity: 0.25, driftDuration: 8, parallaxRate: 0.09 },
    { x: '88%', y: '60%', size: 16, opacity: 0.2, driftDuration: 12, parallaxRate: 0.05 },
  ],
  default: [
    { x: '88%', y: '10%', size: 22, opacity: 0.25, driftDuration: 9, parallaxRate: 0.07 },
    { x: '7%', y: '50%', size: 18, opacity: 0.2, driftDuration: 11, parallaxRate: 0.06 },
  ],
};

export function LanternLayer({ page = 'default' }) {
  const { enabled } = useLanterns();

  if (!enabled) return null;

  const lanterns = lanternConfigs[page] || lanternConfigs.default;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {lanterns.map((config, i) => (
        <Lantern key={`${page}-lantern-${i}`} {...config} />
      ))}
    </div>
  );
}
