import * as React from 'react';
import { SaintsRail, SaintCard } from '@laidies/design-system';

/* Encoded so it survives CSS url() — quotes/spaces break unquoted url(). */
const portrait = (label: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#f9e6ee"/><text x="150" y="158" font-family="Georgia" font-size="22" fill="#4b2148" text-anchor="middle">' +
      label +
      '</text></svg>'
  );

export function PatronSaints() {
  return (
    <SaintsRail>
      <SaintCard imageSrc={portrait('Cher')} name="Cher Horowitz" lane="Early adoption" href="/sanctuary.html">
        Cher had a wardrobe recommender in 1995. The story isn't that the tech existed. It's
        that she was first in the cafeteria to use it.
      </SaintCard>
      <SaintCard imageSrc={portrait('Elle')} name="Elle Woods" lane="Receipts" href="/sanctuary.html">
        Elle walked into court with the perm rule, the timeline, and the witness already lined
        up. She didn't bring receipts. She had them.
      </SaintCard>
      <SaintCard imageSrc={portrait('Miranda')} name="Miranda Priestly" lane="Standards" href="/sanctuary.html">
        Miranda knew the cerulean's whole history before it touched a closet. Knowing what
        you're looking at is the difference between a yes and a yes-with-changes.
      </SaintCard>
    </SaintsRail>
  );
}

export function MixedPortraits() {
  return (
    <SaintsRail>
      <SaintCard imageSrc={portrait('Buffy')} name="Buffy Summers" lane="Slaying the tools" href="/sanctuary.html">
        Buffy runs toward the vampire. Everybody else is still in the parking lot trying to get
        away.
      </SaintCard>
      <SaintCard name="Regina George" lane="Dangerous confidence" href="/sanctuary.html">
        Regina told Cady the skirt was cute, then told someone else it was ugly. Same skirt.
        Different audience. Polished delivery — and the receipts are still in the Burn Book.
      </SaintCard>
      <SaintCard name="Elle Woods" lane="Receipts" href="/sanctuary.html">
        Elle walked into court with the perm rule, the timeline, and the witness already lined
        up. She didn't bring receipts. She had them.
      </SaintCard>
    </SaintsRail>
  );
}
