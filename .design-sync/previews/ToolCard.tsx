import * as React from 'react';
import { ToolCard, BrandWord } from '@laidies/design-system';

export function AskLaidy() {
  return (
    <ToolCard
      eyebrow="Tool · Anywhere"
      name={
        <>
          Ask L<BrandWord>Ai</BrandWord>DY
        </>
      }
      where={
        <>
          At the <BrandWord>FAiRY</BrandWord> Godmother's House · Willow Lane
        </>
      }
      ctaLabel="Open Ask LAiDY"
      href="/games/fairy-godmother.html"
    >
      Your in-house AI assistant. Ask the FAiRY Godmother. Bring the question — she'll bring the
      answer.
    </ToolCard>
  );
}

export function MmeClaio() {
  return (
    <ToolCard
      eyebrow="Tool · Tarot"
      name={<>Mme <BrandWord>CLAi-O</BrandWord></>}
      where={
        <>
          Her Shop · <BrandWord>MAiN</BrandWord> Street · No. 6
        </>
      }
      ctaLabel="Consult the oracle"
      href="/games/madame-claio.html"
    >
      Pull a card. Get the read, the message, and the move. The town fortune-teller answers what
      to do.
    </ToolCard>
  );
}

export function NoWhereLine() {
  return (
    <ToolCard eyebrow="Errand · Post Office" name="Check your mail" ctaLabel="Open your PO box" href="/post-office.html">
      Sign for the Wednesday delivery. Read the note. See what came in from other LAiDIES this
      week.
    </ToolCard>
  );
}

export function DefaultCta() {
  return (
    <ToolCard
      eyebrow="Tool · Drink picker"
      name="Businesswomen's Special"
      where={
        <>
          The <BrandWord>BRONZE AiGE</BrandWord> · <BrandWord>MAiN</BrandWord> Street · No. 5
        </>
      }
      href="/bronze-aige.html"
    >
      Spin for your happy-hour drink. Coven has a reservation at 4 — yours doesn't need one.
    </ToolCard>
  );
}
