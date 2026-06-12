# Clubhouse Polly Pocket Mockup Agent Council Review - 2026-06-08

Scope: create a separate mockup for the lAIdies Clubhouse Polly Pocket concept. Do not change the live `index.html` clubhouse implementation and do not touch the Member Pass workstream.

## Council Decision

Gate: MOCKUP ONLY

The direction should be prototyped as a visual clamshell toy before implementation. The previous live edit failed because it made a generic launcher instead of a believable Polly Pocket room and skipped the council gate.

## Relevant Agents

| Agent | Verdict | Required mockup behavior |
| --- | --- | --- |
| Chief Design Agent | IMPROVE | The pink compact must be the first-read visual. Inside must feel like a miniature 90s/Y2K room, not a card grid. |
| UX / Product Experience Agent | IMPROVE | The toy should act as a map. Clicking or tapping an item opens a larger preview, but the real activity cards remain separate until approved. |
| Accessibility & Responsive Agent | IMPROVE | Mobile cannot rely on tiny hotspots or hover. Use large labeled buttons in a side/bottom rail; hover/focus/tap highlights the matching area in the toy. |
| Art Direction & Asset Agent | IMPROVE | Use existing lAIdies assets as placeholder object art, but frame them as objects in the room. Avoid treating asset cards as the final room design. |
| Mme CLAI-O Agent | PASS WITH GUARDRAILS | Mme CLAI-O can be the strongest bottom-room object: crystal ball, tarot/cards, and phone on a table. Preserve the current voice; do not use generic tarot copy. |
| Roadmap Agent | PASS | Keep this as a prototype file until Ali approves the design direction. Do not replace the live clubhouse from the mockup automatically. |
| Member Card Agent | PASS | Member Pass is out of scope and should remain separate. |

## Mockup Requirements

- Closed state: pink compact says `LAIDIES CLUBHOUSE`.
- Open state: full clamshell with top lid and bottom room.
- Top lid: issue shelf with released packs opaque/clickable and future packs outlined/translucent.
- Bottom room: permanent activity objects grouped as room fixtures.
- Desktop: side rail buttons highlight matching room/shelf item on hover/focus and open preview on click.
- Mobile: bottom horizontal rail with large tap targets; tap highlights matching item and opens preview.
- Clickable objects slowly glow so users understand what can be opened.

## Implementation Boundary

Create only:

- `operations/agents/clubhouse-polly-pocket-mockup.html`

No live homepage changes without a fresh council pass and Ali approval.

## Calibration Pass - 2026-06-08

- Scope remained mockup-only; no live homepage or Member Pass files changed.
- Generated a revised open compact image so the pack covers read `Episode` instead of `LAIDIES CLUBHOUSE`.
- Adjusted hotspot alignment only: Weekly Jams lower, 13-18 slightly lower, DJ Booth shorter, Mme CLAI-O smaller, and Girl Talk lower to reduce overlap.
- Follow-up hotspot alignment only: moved Mme CLAI-O down, Businesswomen's Special left, DJ Booth down, 19-24 down, and Dream Phone down-left.

## Live Implementation Pass - 2026-06-08

Gate: LIVE IMPLEMENTATION APPROVED BY ALI

- Moved the approved generated compact concept into the live `#fun-games` website section as the Clubhouse entry map.
- Kept the Member Pass card untouched and separate.
- Kept existing live activity cards and panels in place; the compact routes users to those existing surfaces instead of replacing them.
- Used generated image assets for the compact and sticker sheet; CSS is only used for layout, hotspots, glow states, and responsive controls.
- Updated live behavior so activity cards stay hidden until a compact hotspot, sticker control, top/bottom open-all button, or direct hash link reveals them.
- Added separate `Open Top Shell` and `Open Bottom Room` controls; both layers can stay revealed at the same time.

## Live Interaction Copy Pass - 2026-06-08

Gate: SMALL LIVE INTERACTION CHANGE

- Replaced the layer controls with three clearer open-all controls: weekly fun and games, always-open fun and games, and all fun and games.
- Updated the open-all controls so each reveal scrolls to the related activity area after loading.
- Updated the Madame CLAI-O reading output title to read as a centered script-style reading label, without a trailing colon.
- Member Pass remained untouched and separate.
