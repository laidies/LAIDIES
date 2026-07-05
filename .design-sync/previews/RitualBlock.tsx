import * as React from 'react';
import {
  RitualBlock,
  RitualList,
  RitualBeat,
  RitualBonus,
  PlayButton,
} from '@laidies/design-system';

export function FullTour() {
  return (
    <RitualBlock heading="Full Tour" progress="2 of 8 stops ticked" ctaLabel="Start the walk">
      <RitualList>
        <RitualBeat n={1} label="Post Office" desc="Check the mail — this week's letter" checked href="/post-office.html" />
        <RitualBeat n={2} label="The Chick Flicks" desc="Pick up this week's episode" checked href="/chick-flicks.html" />
        <RitualBeat n={3} label="Blend & Snap" desc="Grab the Study Pack with your coffee" href="/blend-snap.html" />
        <RitualBeat n={4} label="SUNNYVAiLE High" desc="Take the Pop Quiz" href="/sunnyvaile-high.html" />
        <RitualBeat n={5} label="The NewsStand" desc="Read this week's AI round-up" href="/newsstand.html" />
      </RitualList>
    </RitualBlock>
  );
}

export function WithBonus() {
  return (
    <RitualBlock heading="Full Tour">
      <RitualList>
        <RitualBeat n={1} label="KSVL RAiDIO" desc="Tune in to 99.9 FM" href="/radio.html" />
        <RitualBeat n={2} label="The SANCTUAiRY" desc="Light a candle for a Patron Saint" href="/sanctuary.html" />
      </RitualList>
      <RitualBonus
        eyebrow="Bonus stop"
        hook={<>Finish all eight and earn <span className="ritual-bonus-reward">this week's charm</span>.</>}
        action={<PlayButton>♪ Hear the Wednesday Anthem · THE LAiDIES</PlayButton>}
      >
        Your Tour Guide keeps track. Charms live on your Residence Card.
      </RitualBonus>
    </RitualBlock>
  );
}
