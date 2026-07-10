import * as React from 'react';
import { RitualBeat, RitualList, BrandWord } from '@laidies/design-system';

export function FullTourEightStops() {
  return (
    <RitualList>
      <RitualBeat n={1} label="NewsStand" desc="the week's headlines" href="/newsstand.html" />
      <RitualBeat n={2} label="The Chick Flicks" desc="pick up this week's episode" href="/chick-flicks.html" />
      <RitualBeat n={3} label="The Blend & Snap" desc="grab coffee, study the notes" href="/blend-snap.html" />
      <RitualBeat n={4} label={<><BrandWord>SUNNYVAiLE</BrandWord> High</>} desc="take the pop quiz" href="/sunnyvaile-high.html" />
      <RitualBeat n={5} label="Free time" desc="wander town — your call" href="/mall.html" />
      <RitualBeat n={6} label={<><BrandWord>MAiKEOVER</BrandWord> on <BrandWord>MAiN</BrandWord>(e)</>} desc="see your card, freshen up" href="/maikeover.html" />
      <RitualBeat n={7} label={<>The <BrandWord>BRONZE AiGE</BrandWord></>} desc="happy hour and live music" href="/bronze-aige.html" />
      <RitualBeat n={8} label={<>Delta <BrandWord>LAi</BrandWord> Nu</>} desc={<>Girl Talk with the <BrandWord>LAiDIES</BrandWord></>} href="/sorority-house.html" />
    </RitualList>
  );
}

export function MidWeekProgress() {
  return (
    <RitualList>
      <RitualBeat n={1} label="NewsStand" desc="the week's headlines" checked href="/newsstand.html" />
      <RitualBeat n={2} label="The Chick Flicks" desc="pick up this week's episode" checked href="/chick-flicks.html" />
      <RitualBeat n={3} label="The Blend & Snap" desc="grab coffee, study the notes" checked href="/blend-snap.html" />
      <RitualBeat n={4} label={<><BrandWord>SUNNYVAiLE</BrandWord> High</>} desc="take the pop quiz" href="/sunnyvaile-high.html" />
      <RitualBeat n={5} label="Free time" desc="wander town — your call" href="/mall.html" />
    </RitualList>
  );
}
