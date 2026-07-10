import * as React from 'react';
import { DirectoryCard, BrandWord } from '@laidies/design-system';

export function ChickFlicks() {
  return (
    <DirectoryCard
      address={<>★ <BrandWord>MAiN</BrandWord> Street · No. 7</>}
      name="The Chick Flicks"
      href="/chick-flicks.html"
    >
      The season. Video rental shop.
    </DirectoryCard>
  );
}

export function BrandName() {
  return (
    <DirectoryCard
      address={<>★ <BrandWord>MAiN</BrandWord> Street · No. 3</>}
      name={<>The Town <BrandWord>LIBRAiRY</BrandWord></>}
      href="/library.html"
    >
      The Grimoire reference shelves.
    </DirectoryCard>
  );
}

export function LongAddress() {
  return (
    <DirectoryCard
      address={<>★ Corner of <BrandWord>MAiN</BrandWord> &amp; Cathedral Hill</>}
      name="The Phone Booth"
      href="/games/dream-phone.html"
    >
      Dream Phone. Call in for advice.
    </DirectoryCard>
  );
}

export function CivicSquare() {
  return (
    <DirectoryCard address="★ Civic Square" name="Town Hall" href="/town-hall.html">
      Mayor Deb's office.
    </DirectoryCard>
  );
}
