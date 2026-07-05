import * as React from 'react';
import { Masthead, Button, BrandWord } from '@laidies/design-system';

// Shorter than the real 1664x936 town art so the whole masthead (image +
// eyebrow + tagline + CTA + sub) fits the capture cell's vertical budget.
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1664 560"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#341446"/><stop offset="1" stop-color="#9b3f5f"/></linearGradient></defs><rect width="1664" height="560" fill="url(#g)"/><text x="832" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="120" letter-spacing="12" fill="#fffdfb">SUNNYVAiLE</text><text x="832" y="380" text-anchor="middle" font-family="Georgia, serif" font-size="40" font-style="italic" fill="#e8b4c8">pop. women just like you</text></svg>`;
const heroSrc = 'data:image/svg+xml;utf8,' + encodeURIComponent(heroSvg);

export function Canonical() {
  return (
    <Masthead
      imageSrc={heroSrc}
      imageAlt="Welcome to SUNNYVAiLE — MAiN Street storefronts lit by a pink sunset."
      eyebrow={<>★ Welcome to <BrandWord>SUNNYVAiLE</BrandWord> · Population: women just like you</>}
      tagline={
        <>
          AI fluency and community for women with full calendars, high standards, and no patience
          for beige tech explanations. Girl power meets machine power — in a Y2K small town where
          every section has an address. New episodes arrive on Wednesdays (obviously).
        </>
      }
      cta={
        <Button variant="primary" href="/chick-flicks.html">
          Pick up this week's episode →
        </Button>
      }
      sub={
        <>
          New in town? <a href="/visitors-centre.html">Stop by the Welcome Wagon first →</a>
        </>
      }
    />
  );
}

export function NoImage() {
  return (
    <Masthead
      eyebrow={<>★ Welcome to <BrandWord>SUNNYVAiLE</BrandWord> · Population: women just like you</>}
      tagline={
        <>
          Girl power meets machine power — in a Y2K small town where every section has an address.
        </>
      }
      cta={
        <Button variant="primary" href="/chick-flicks.html">
          Pick up this week's episode →
        </Button>
      }
      sub={
        <>
          New in town? <a href="/visitors-centre.html">Stop by the Welcome Wagon first →</a>
        </>
      }
    />
  );
}

export function TaglineOnly() {
  return (
    <Masthead
      eyebrow={<>★ Every Wednesday in town</>}
      tagline={
        <>
          The Wednesday walk-through, stop by stop — a new episode at The Chick Flicks, a Study
          Pack at Blend &amp; Snap, and this week's episode song on KSVL <BrandWord>RAiDIO</BrandWord>.
        </>
      }
    />
  );
}
