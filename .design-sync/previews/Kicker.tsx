import * as React from 'react';
import { Kicker } from '@laidies/design-system';

/**
 * Note: .kicker is only styled when scoped under .section-head in laidies.css,
 * so each cell composes the Kicker inside its natural section-head context.
 */

export function EveryWednesday() {
  return (
    <div className="section-head" style={{ marginBottom: 0 }}>
      <Kicker>Every Wednesday in town</Kicker>
    </div>
  );
}

export function WithStar() {
  return (
    <div className="section-head" style={{ marginBottom: 0 }}>
      <Kicker>★ Meet the town</Kicker>
    </div>
  );
}

export function TownDirectory() {
  return (
    <div className="section-head" style={{ marginBottom: 0 }}>
      <Kicker>The town directory</Kicker>
    </div>
  );
}
