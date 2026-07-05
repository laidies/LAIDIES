import * as React from 'react';
import { EpisodeCard, BrandWord } from '@laidies/design-system';

const episodeArt =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='400' height='300' fill='%23f9e6ee'/><text x='200' y='155' font-family='Georgia' font-size='20' fill='%234b2148' text-anchor='middle'>Episode art</text></svg>";

/* On the live site the episode card sits in a grid column ~420px wide. */
const Column = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 420 }}>{children}</div>
);

export function ThisWeek() {
  return (
    <Column>
    <EpisodeCard
      imageSrc={episodeArt}
      imageAlt="Episode 4 art"
      eyebrow="This week at The Chick Flicks"
      title={
        <>
          Episode 4 · A SL<BrandWord>Ai</BrandWord>YER Needs a Watcher
        </>
      }
      ctaLabel="Pick up this week's episode"
      href="/chick-flicks.html"
    >
      The one in which she opens five browser tabs — one per tool — and asks not which tool is
      best, but <em>who is right for this scene.</em>
    </EpisodeCard>
    </Column>
  );
}

export function NoImage() {
  return (
    <Column>
    <EpisodeCard
      eyebrow="From the season shelf"
      title="Episode 1 · On Wednesdays We Use AI"
      ctaLabel="Start from the beginning"
      href="/issues/issue-01.html"
    >
      The one in which she realizes AI is already being added to the invisible load, says
      "ugh, as if," and opens the tab anyway.
    </EpisodeCard>
    </Column>
  );
}

export function DefaultCta() {
  return (
    <Column>
    <EpisodeCard
      imageSrc={episodeArt}
      imageAlt="Episode 2 art"
      eyebrow="Last Wednesday in SUNNYVAiLE"
      title="Episode 2 · Bring Your Receipts"
      href="/issues/issue-02.html"
    >
      The one in which she stops arguing from memory and starts arguing from
      <em> the paper trail</em> — with a little help from the LIBRAiRY shelves.
    </EpisodeCard>
    </Column>
  );
}
