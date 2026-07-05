import * as React from 'react';
import { ToolsGrid, ToolCard, BrandWord } from '@laidies/design-system';

export function QuickAccessRail() {
  return (
    <ToolsGrid>
      <ToolCard
        eyebrow="Tool · Anywhere"
        name={<>Ask L<BrandWord>Ai</BrandWord>DY</>}
        where={<>At the <BrandWord>FAiRY</BrandWord> Godmother's House · Willow Lane</>}
        ctaLabel="Open Ask LAiDY"
        href="/games/fairy-godmother.html"
      >
        Your in-house AI assistant. Ask the FAiRY Godmother. Bring the question — she'll bring
        the answer.
      </ToolCard>
      <ToolCard
        eyebrow="Tool · Tarot"
        name={<>Mme <BrandWord>CLAi-O</BrandWord></>}
        where={<>Her Shop · <BrandWord>MAiN</BrandWord> Street · No. 6</>}
        ctaLabel="Consult the oracle"
        href="/games/madame-claio.html"
      >
        Pull a card. Get the read, the message, and the move. The town fortune-teller answers
        what to do.
      </ToolCard>
      <ToolCard
        eyebrow="Tool · Drink picker"
        name="Businesswomen's Special"
        where={<>The <BrandWord>BRONZE AiGE</BrandWord> · <BrandWord>MAiN</BrandWord> Street · No. 5</>}
        ctaLabel="Pick your drink"
        href="/bronze-aige.html"
      >
        Spin for your happy-hour drink. Coven has a reservation at 4 — yours doesn't need one.
      </ToolCard>
      <ToolCard
        eyebrow="Tool · Call-in advice"
        name="Dream Phone"
        where={<>The Phone Booth · Corner of <BrandWord>MAiN</BrandWord> &amp; Cathedral Hill</>}
        ctaLabel="Make the call"
        href="/games/dream-phone.html"
      >
        Pick up the receiver. Ask your question. Pick the voice — Receipts, Boundary, Bestie.
        The right LAiDY answers.
      </ToolCard>
      <ToolCard
        eyebrow="Tool · Members only"
        name="Girl Talk"
        where="The Sorority House · Wisteria Lane"
        ctaLabel="Play Girl Talk"
        href="/sorority-house.html"
      >
        Truth or dare for the LAiDIES. Dares ask you to post in the chat rooms — members at the
        door.
      </ToolCard>
    </ToolsGrid>
  );
}

export function ThreeCards() {
  return (
    <ToolsGrid>
      <ToolCard
        eyebrow="Errand · Post Office"
        name="Check your mail"
        where={<>The L<BrandWord>Ai</BrandWord>DIES Post Office · Civic Square</>}
        ctaLabel="Open your PO box"
        href="/post-office.html"
      >
        Sign for the Wednesday delivery. Read the note. See what came in from other LAiDIES this
        week.
      </ToolCard>
      <ToolCard
        eyebrow="Errand · Post Office"
        name="Send a gift"
        where={<>The L<BrandWord>Ai</BrandWord>DIES Post Office · Civic Square</>}
        ctaLabel="Wrap it up"
        href="/post-office.html"
      >
        Ship a note, a charm, or a saint card to someone in town. The Post Office handles the
        delivery.
      </ToolCard>
      <ToolCard
        eyebrow="Tool · Members only"
        name="Girl Talk"
        where="The Sorority House · Wisteria Lane"
        ctaLabel="Play Girl Talk"
        href="/sorority-house.html"
      >
        Truth or dare for the LAiDIES. Dares ask you to post in the chat rooms — members at the
        door.
      </ToolCard>
    </ToolsGrid>
  );
}
