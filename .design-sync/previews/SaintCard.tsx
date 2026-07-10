import * as React from 'react';
import { SaintCard } from '@laidies/design-system';

/* Encoded so it survives CSS url() — quotes/spaces break unquoted url(). */
const cherPortrait =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#f9e6ee"/><text x="150" y="158" font-family="Georgia" font-size="22" fill="#4b2148" text-anchor="middle">Cher</text></svg>'
  );

/* On the site a saint card is a 240px flex item inside the rail. */
const CardSlot = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 240 }}>{children}</div>
);

export function CherWithPortrait() {
  return (
    <CardSlot>
      <SaintCard imageSrc={cherPortrait} name="Cher Horowitz" lane="Early adoption" href="/sanctuary.html">
        Cher had a wardrobe recommender in 1995. The story isn't that the tech existed. It's
        that she was first in the cafeteria to use it.
      </SaintCard>
    </CardSlot>
  );
}

export function ElleNoPortrait() {
  return (
    <CardSlot>
      <SaintCard name="Elle Woods" lane="Receipts" href="/sanctuary.html">
        Elle walked into court with the perm rule, the timeline, and the witness already lined
        up. She didn't bring receipts. She had them.
      </SaintCard>
    </CardSlot>
  );
}

export function BuffyShortRule() {
  return (
    <CardSlot>
      <SaintCard name="Buffy Summers" lane="Slaying the tools" href="/sanctuary.html">
        Buffy runs toward the vampire. Everybody else is still in the parking lot trying to get
        away.
      </SaintCard>
    </CardSlot>
  );
}
