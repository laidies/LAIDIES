import * as React from 'react';
import { SectionHead, BrandWord } from '@laidies/design-system';

export function Centered() {
  return (
    <SectionHead
      kicker="Every Wednesday in town"
      title={<>Wednesday in <BrandWord>SUNNYVAiLE</BrandWord>.</>}
    >
      The Wednesday walk-through, stop by stop: a new episode at The Chick Flicks, a Study
      Pack at Blend &amp; Snap, and this week's Wednesday Anthem on KSVL RAiDIO.
    </SectionHead>
  );
}

export function LeftAligned() {
  return (
    <SectionHead
      align="left"
      kicker="★ Girl power meets machine power"
      title={<><BrandWord>LAiDIES</BrandWord> teaches AI in the language you already speak.</>}
    />
  );
}

export function KickerOnly() {
  return <SectionHead kicker="Meet the town" title="Every place has an address." />;
}
