import * as React from 'react';
import { RitualBeat, RitualList, BrandWord } from '@laidies/design-system';

export function UncheckedAndChecked() {
  return (
    <RitualList>
      <RitualBeat
        n={1}
        label="NewsStand"
        desc="the week's headlines"
        href="/newsstand.html"
      />
      <RitualBeat
        n={2}
        label="The Chick Flicks"
        desc="pick up this week's episode"
        checked
        href="/chick-flicks.html"
      />
    </RitualList>
  );
}

export function LabelOnly() {
  return (
    <RitualList>
      <RitualBeat n={5} label="Free time" href="/mall.html" />
      <RitualBeat
        n={7}
        label={<>The <BrandWord>BRONZE AiGE</BrandWord></>}
        checked
        href="/bronze-aige.html"
      />
    </RitualList>
  );
}
