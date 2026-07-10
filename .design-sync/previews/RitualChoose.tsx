import * as React from 'react';
import { RitualChoose } from '@laidies/design-system';

export function ChooseYourTour() {
  return (
    <RitualChoose
      kicker="★ Choose your tour for this Wednesday"
      title="Express or Full Tour — either counts."
    >
      Both routes tick off your week. The Express Tour is one stop (this week's episode). The Full
      Tour walks all eight. Pick what fits your calendar — your Tour Guide keeps track either way.
    </RitualChoose>
  );
}

export function TitleOnly() {
  return (
    <RitualChoose
      kicker="★ This Wednesday"
      title="One stop or eight — the town keeps count."
    />
  );
}
