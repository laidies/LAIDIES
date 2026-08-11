# Dream Phone working-preview build packet

**Status:** REJECTED PREVIEW REMOVED; ACTUAL JUST CALL RESTORED LOCALLY; ALL
PRIOR PREVIEW VISUAL/UX PASSES INVALIDATED; ALI REVIEW OPEN; NOT DEPLOYED; NOT
PUBLICLY VERIFIED

## Visitor outcome

Dream Phone is one recognizable SUNNYVAiLE telephone booth with two equal
choices:

1. **Just Call** — a short, playful, prewritten character call with functional
   remixes, special codes and session-only call history.
2. **Play the Full Game** — a three-case claim game in which the player must
   collect distributed evidence before making a committal verdict.

The exact exterior establishes arrival. Selecting Just Call reveals the full
pink Dream Phone/player card as the actual controlled object, with live keypad,
display, random-heart and recent-call zones mapped over its printed geometry.
The live answer/remix panel sits with that instrument, followed by 25 compact
image-bearing caller cards. The visible system uses blue-sky and white grounds
plus the documented hot pink, purple, yellow, cyan and teal punctuation.

## Executable candidate

- `games/dream-phone-preview.html` — redirect only; removes the rejected build
- `games/dream-phone.html` — restored actual page and Just Call implementation
- `games/dream-phone-bundles.js` — unchanged authored call/remix source
- `scripts/test-dream-phone-preview.mjs`

The candidate is local on the isolated branch. No deploy or public-route change
has occurred.

## Interaction contract

### Just Call

- Exactly 25 image-bearing caller cards bind 75 rotating authored bundles and
  300 output/secret/speaker/hangup responses.
- A named player card, the image-mapped keypad and typed number produce the same
  caller; the random heart chooses among regular callers.
- `*67` arms caller-ID blocking; the player must then dial Deb for her bundle.
- `*69` redials the last digits and advances that caller's bundle.
- `867-5309` reaches Jenny as an unlabelled discovery.
- Call History displays the last eight calls. Restorable response state remains
  an explicit future enhancement; it was not invented during parity recovery.
- Share a Secret, Speaker Phone and Mom Says Hang Up produce distinct
  caller-specific functions; they are not alternate labels on one response.

### Full Game

- Each case has exactly three normal callers.
- The three-call union covers the required clauses; no individual caller covers
  them all or declares the verdict.
- For Real and As If remain disabled until all three normal calls are complete.
- Hold Up remains available before the evidence is complete, records an honest
  pause and returns the player to calling; it cannot skip the case.
- `*67` adds a hidden partial perspective once; `*69` deepens the exact last
  lead once; Jenny suggests a next question; Speaker Phone compares evidence
  already heard. None is required for a fair solve or creates complete
  coverage.
- Game history can select two already-heard normal callers for Speaker Phone;
  it restores and compares only their exact recorded evidence.
- Source-held cases accept a provisional player choice but explicitly do not
  score it or reveal an answer.
- Each result gives prevention rules and a reusable prompt tailored to the
  actual failure pattern in that case.
- The end card teaches preventive AI rules: define scope/date/source/units,
  use current-information tools when needed, separate fact from inference, and
  make unverified claims fail honestly instead of being fabricated.

## Source and freshness boundary

- Sky Dancers is the only evidence-admitted case.
- Pokémon and Tamagotchi are explicitly labelled **mechanics preview · source
  held**. They demonstrate the interaction contract but do not receive source
  admission or public-release authority here.
- Every case binds `checkedAt` and `reviewBy`. A stale or malformed case fails
  closed in the runtime contract.
- Provider-specific settings guidance is omitted. The result uses bounded,
  provider-neutral rules and a reusable prompt until current official product
  documentation is separately admitted.

## Acceptance commands and observations

Run:

```sh
node scripts/check-inline-js.js
node scripts/test-dream-phone-preview.mjs
```

The restoration test is calibrated with missing-phone, invented-Puffy and
incomplete-bundle fixtures; all must be rejected. Browser acceptance requires:

- 1440px, 390px and 320px have no horizontal overflow;
- all visible buttons are at least 44 CSS px in both dimensions;
- the two entry choices are equal and fully explained;
- the full phone is the leading operated object at desktop and mobile;
- all 25 caller images load and every Just Call code/remix/history control works;
- game verdict gates and powers follow the contract above;
- keyboard focus remains visible and reduced motion is supported; and
- exact screenshots are saved under `evidence-preview-2026-08-10/`.

Ali's 2026-08-10 screenshot invalidated the entire previous preview and every
PASS attached to it: it had generic rectangles, no actual phone, flat text
cards, invented callers and wrong visitor copy. The failed preview CSS, JS and
contract are deleted rather than repaired. Existing screenshots remain only as
known-bad evidence. The current restoration has source-parity verification but
no valid continuous-screen visual/UX PASS; Ali's recheck is the acceptance
trigger because automated localhost capture is browser-policy blocked.

## Authority boundary

No public deploy, spending, backend change, reward/account integration or source
admission is authorized. Ali remains the acceptance owner for this recovered
surface and any later public release. The next trigger is her visual/interaction
verdict on the served restored page; full-game completion remains separate.
