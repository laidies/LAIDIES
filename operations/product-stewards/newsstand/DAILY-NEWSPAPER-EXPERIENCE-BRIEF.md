# The Daily newspaper experience — captured product direction

**Status:** CAPTURED — MERGE CANDIDATE / NOT A RELEASE CONTRACT
**Date:** 2026-07-29
**Trigger:** Ali proposed that the Homepage daily column become a compact
front-page preview of a complete newspaper experience at the NewsStand.

## Product relationship

The Homepage does not contain the whole newspaper. It surfaces a concise,
useful selection from today’s paper and provides small contextual handoffs.
The NewsStand owns the complete paper: its visual newspaper form, editorial
sections, archive, sources, corrections and recurring town columns.

This direction must preserve the four locked NewsStand publication jobs:

- **The Breaking:** rare, qualified interruption;
- **The Daily:** the current newspaper and edited consequential briefing;
- **The Weekly:** durable synthesis;
- **The Tribune:** sourced argument.

The Daily newspaper may contain several sections. Those sections do not become
new competing editions.

## Proposed Daily sections

### Evidence desk — real and source-checked

- Breaking News when the qualification threshold is met;
- Daily News and practical analysis;
- Paige’s AI tip or another approved recurring advice column;
- links into relevant Concepts, Classes, Library references and deeper
  NewsStand coverage; and
- visible sources, dates, uncertainty, correction state and what the story
  means for a less-technical reader.

No provider announcement, benchmark claim, policy claim or security incident
is published as fact without the current NewsStand validation chain.

### Recurring columns — real content with an entertaining newspaper frame

- Mme CLAi-O’s daily reading;
- Promptoscope;
- Song of the Day with a working listen action;
- Did You Know?;
- optional puzzle, quiz or practical prompt; and
- clearly dated town notices.

Each column needs an owner, freshness contract, empty state and underlying
destination. The paper must not invent an item merely to fill a hole.

### SUNNYVAiLE desk — explicitly fictional

- funny town weather;
- clearly labelled fictional town news;
- a light gossip/notices column that may tease approved upcoming events; and
- recurring comic details that reward returning readers.

Fictional town material must be visually and textually distinguishable from
source-checked AI reporting. It cannot fabricate real-world facts, imply an
unapproved launch or use invented quotations attributed to JoJo, Paige or any
other town character. Direct character lines require approved canon text.

### Classifieds — future resident feature

Possible post types:

- trading card wanted / available;
- study buddy wanted;
- group chat or event interest;
- someone to grab drinks with; and
- other narrowly admitted community requests.

This is not authorized for implementation until the community/account owners
specify:

- who may post and what verified identity is shown;
- permitted categories and prohibited content;
- moderation, reporting, blocking and appeal;
- automatic expiry and deletion;
- safe contact relay without exposing private email, phone or precise
  location;
- age, alcohol, harassment and offline-meeting safeguards;
- edit/cancel/fulfilled states; and
- empty, failure and abuse-recovery journeys.

The initial newspaper build must not ship a decorative or non-working
classified form.

## Visual and interaction direction

- The complete Daily should look and behave like a colourful LAiDIES newspaper,
  not a generic dashboard or a stack of white cards.
- Newspaper hierarchy must make section, headline, image, date, source and
  article relationship immediately clear.
- Use real editorial images and paper/object craft; CSS borders cannot stand in
  for all newspaper art.
- Sourced reporting and fictional SUNNYVAiLE columns need unmistakable but
  related visual desks.
- Desktop may use a front-page spread; mobile must preserve reading order,
  attribution, sources and section identity without tiny newspaper text.
- Homepage highlights remain concise and visible. Small links may open the
  underlying article, reading, song, concept or full NewsStand.

## Acceptance before build or publication

1. Bind the exact Daily content schema and section owners.
2. Produce one representative full issue containing both sourced reporting and
   clearly fictional town material.
3. Prove a clear-day issue without filler or fake urgency.
4. Test first-time comprehension: which items are real reporting, recurring
   columns and fictional town fun?
5. Test desktop, 390 px, keyboard, zoom, screen reader, correction and stale
   states.
6. Independently judge editorial quality, source accuracy, LAiDIES brand
   contribution and newspaper usability.
7. Keep classifieds out until its separate community safety and service
   contract passes.

No part of this capture authorizes publication, deployment, account changes or
user-generated content.

## Current derivative-data truth

The governed Paige-tip and Promptoscope intake now lives in
`content/daily-learning-derivatives.json` under
`content/daily-learning-derivatives.schema.json`. Its validator is
`node scripts/check-daily-learning-derivatives.mjs`.

This is an intake and suppression contract, not publication approval. A daily
unit must retain exact source claim/content IDs, canonical destination,
freshness/expiry, correction state and independent review evidence. Held,
expired, corrected or retracted source material fails closed. When no eligible
unit exists, the approved empty state appears; the system does not invent a tip
or horoscope to fill space.
