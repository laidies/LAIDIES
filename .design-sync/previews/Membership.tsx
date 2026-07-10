import * as React from 'react';
import { Membership, BrandWord } from '@laidies/design-system';

export function InTheWorks() {
  return (
    <Membership
      ribbon="In the works"
      title="Design your Residence Card."
      ctaLabel="Membership opens soon"
    >
      Everything the newsletter gets you — plus a card that unlocks the Sorority House chat rooms
      (Wins · Dear <BrandWord>LAiDIES</BrandWord> · Burn Book · Girl Talk), the Charm Hunt, gifting
      through the Post Office, and your Closet. Every stop in town saves onto it.
    </Membership>
  );
}

export function DefaultRibbon() {
  return (
    <Membership title={<>The full residency at <BrandWord>MAiKEOVER</BrandWord>.</>} ctaLabel="The chair is being prepped">
      Walk into <BrandWord>MAiKEOVER</BrandWord>, pick your colors, leave a resident. The chair is
      being prepped — back soon.
    </Membership>
  );
}

export function NoCta() {
  return (
    <Membership ribbon="In the works" title="Design your Residence Card.">
      Every stop in town saves onto it — charms, stickers, badges, and your Closet.
    </Membership>
  );
}
