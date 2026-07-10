import * as React from 'react';
import { QuickTripBlock, QuickTripOption, QuickTripDivider, BrandWord } from '@laidies/design-system';

const thumb =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='92' height='92'><rect width='92' height='92' fill='%23f9e6ee'/><text x='46' y='52' font-family='Georgia' font-size='11' fill='%234b2148' text-anchor='middle'>Ep art</text></svg>";

export function ExpressTour() {
  return (
    <QuickTripBlock
      heading="Express Tour"
      intro="One stop, in and out. Read this week's episode; you're done. The Full Tour is on the right when you've got the time."
      footer={
        <>
          Mid-season? <strong>See all episodes →</strong>
        </>
      }
      footerHref="/chick-flicks.html"
    >
      <QuickTripOption
        imageSrc={thumb}
        imageAlt="Episode 1 art"
        eyebrow="★ New here? Start at the start."
        title="Episode 1 · On Wednesdays We Use AI"
        ctaLabel="Start from the beginning →"
        href="/issues/issue-01.html"
      >
        The one in which she realizes AI is already being added to the invisible load, says
        "ugh, as if," and opens the tab anyway.
      </QuickTripOption>
      <QuickTripDivider>— or drop in this week —</QuickTripDivider>
      <QuickTripOption
        imageSrc={thumb}
        imageAlt="This week's episode art"
        eyebrow="★ This week · Episode 04"
        title={
          <>
            A SL<BrandWord>Ai</BrandWord>YER Needs a Watcher
          </>
        }
        ctaLabel="Pick up this week's episode →"
        href="/chick-flicks.html"
      >
        The one in which she opens five browser tabs — one per tool — and asks not which tool
        is best, but <em>who is right for this scene.</em>
      </QuickTripOption>
    </QuickTripBlock>
  );
}

export function NoIntroNoFooter() {
  return (
    <QuickTripBlock heading="Quick errands">
      <QuickTripOption
        imageSrc={thumb}
        imageAlt="Post Office window"
        eyebrow="★ Civic Square"
        title="Check your mail at the Post Office"
        ctaLabel="Open your PO box →"
        href="/post-office.html"
      >
        Sign for the Wednesday delivery and see what came in from other LAiDIES this week.
      </QuickTripOption>
      <QuickTripDivider>— or, when you have a minute —</QuickTripDivider>
      <QuickTripOption
        imageSrc={thumb}
        imageAlt="KSVL RAiDIO tower"
        eyebrow={
          <>
            ★ KSVL <BrandWord>RAiDIO</BrandWord> · 99.9 FM
          </>
        }
        title="Tune in to the Wednesday Anthem"
        ctaLabel="Turn the dial →"
        href="/radio.html"
      >
        Don't just learn from books. Learn from hooks.
      </QuickTripOption>
    </QuickTripBlock>
  );
}
