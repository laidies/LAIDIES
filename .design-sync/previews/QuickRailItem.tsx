import * as React from 'react';
import { QuickRailItem } from '@laidies/design-system';

/**
 * The label only appears on hover (the circle expands leftward), so static
 * cells show the resting circle + gold glyph state.
 */

export function TuneInKSVL() {
  return <QuickRailItem icon="♪" label="Tune in KSVL" href="/radio.html" title="KSVL RAiDIO, 99.9" />;
}

export function RailStack() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
      <QuickRailItem icon="✿" label="Start here" href="/visitors-centre.html" title="Welcome Wagon" />
      <QuickRailItem icon="✉" label="Check the mail" href="/post-office.html" title="Post Office · mail & gifts" />
      <QuickRailItem icon="✧" label="Light a candle" href="/sanctuary.html" title="The SANCTUAiRY · Patron Saints" />
    </div>
  );
}
