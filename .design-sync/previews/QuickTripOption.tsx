import * as React from 'react';
import { QuickTripOption, BrandWord } from '@laidies/design-system';

const thumb =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='92' height='92'><rect width='92' height='92' fill='%23f9e6ee'/><text x='46' y='52' font-family='Georgia' font-size='11' fill='%234b2148' text-anchor='middle'>Ep art</text></svg>";

export function StartAtTheStart() {
  return (
    <QuickTripOption
      imageSrc={thumb}
      imageAlt="Episode 1 art"
      eyebrow="★ New here? Start at the start."
      title="Episode 1 · On Wednesdays We Use AI"
      ctaLabel="Start from the beginning →"
      href="/issues/issue-01.html"
    >
      The one in which she realizes AI is already being added to the invisible load, says "ugh,
      as if," and opens the tab anyway.
    </QuickTripOption>
  );
}

export function ThisWeek() {
  return (
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
      The one in which she opens five browser tabs — one per tool — and asks not which tool is
      best, but <em>who is right for this scene.</em>
    </QuickTripOption>
  );
}

export function PopQuiz() {
  return (
    <QuickTripOption
      imageSrc={thumb}
      imageAlt="Pop Quiz art"
      eyebrow="★ Five minutes flat"
      title="This week's Pop Quiz"
      ctaLabel="Take the quiz →"
      href="/sunnyvaile-high.html"
    >
      One quick quiz at SUNNYVAiLE High before the bell. Your Tour Guide ticks the stop.
    </QuickTripOption>
  );
}

export function TitleAndCtaOnly() {
  return (
    <QuickTripOption
      imageSrc={thumb}
      imageAlt="Study Pack art"
      eyebrow="★ Grab and go"
      title={
        <>
          The Study Pack at Blend &amp; Snap
        </>
      }
      ctaLabel="Pick it up →"
      href="/blend-snap.html"
    />
  );
}
