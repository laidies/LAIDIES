import * as React from 'react';
import { DirectoryGrid, DirectoryCard, BrandWord } from '@laidies/design-system';

export function TownDirectory() {
  return (
    <DirectoryGrid>
      <DirectoryCard
        address={<>★ <BrandWord>MAiN</BrandWord> Street · No. 1</>}
        name="The Welcome Wagon"
        href="/visitors-centre.html"
      >
        First stop. Start Here + About.
      </DirectoryCard>
      <DirectoryCard
        address={<>★ <BrandWord>MAiN</BrandWord> Street · No. 2</>}
        name="The NewsStand"
        href="/newsstand.html"
      >
        Today · Wednesday · Tribune.
      </DirectoryCard>
      <DirectoryCard
        address={<>★ <BrandWord>MAiN</BrandWord> Street · No. 7</>}
        name="The Chick Flicks"
        href="/chick-flicks.html"
      >
        The season. Video rental shop.
      </DirectoryCard>
      <DirectoryCard
        address={<>★ <BrandWord>MAiN</BrandWord> Street · No. 8</>}
        name="The Blend &amp; Snap"
        href="/blend-snap.html"
      >
        Coffee shop. Study Pack lives here.
      </DirectoryCard>
      <DirectoryCard address="★ Schoolhouse Road" name={<><BrandWord>SUNNYVAiLE</BrandWord> High</>} href="/sunnyvaile-high.html">
        Season 1 · 101 classes. Pop quiz.
      </DirectoryCard>
      <DirectoryCard address="★ Cathedral Hill" name={<>The <BrandWord>SANCTUAiRY</BrandWord></>} href="/sanctuary.html">
        Patron Saints + The Coven.
      </DirectoryCard>
    </DirectoryGrid>
  );
}

export function FourStops() {
  return (
    <DirectoryGrid>
      <DirectoryCard
        address={<>★ <BrandWord>RAiDIO</BrandWord> Tower · KSVL</>}
        name={<>Community <BrandWord>RAiDIO</BrandWord></>}
        href="/radio.html"
      >
        Music broadcast all day.
      </DirectoryCard>
      <DirectoryCard
        address={<>★ <BrandWord>MAiN</BrandWord> Street · No. 9</>}
        name={<><BrandWord>MAiKEOVER</BrandWord> on <BrandWord>MAiN</BrandWord>(e)</>}
        href="/maikeover.html"
      >
        Beauty parlor · Residence Card maker.
      </DirectoryCard>
      <DirectoryCard address="★ Wisteria Lane" name="The Sorority House" href="/sorority-house.html">
        Delta LAi Nu · members only.
      </DirectoryCard>
      <DirectoryCard address="★ Civic Square" name={<>The L<BrandWord>Ai</BrandWord>DIES Post Office</>} href="/post-office.html">
        Sign up for the Wednesday Postcard.
      </DirectoryCard>
    </DirectoryGrid>
  );
}
