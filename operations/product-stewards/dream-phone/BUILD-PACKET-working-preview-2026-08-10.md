# Dream Phone working-preview build packet

**Status:** BUILT LOCALLY; INDEPENDENT VISUAL/UX PASS; READY FOR ALI DIRECTION
REVIEW; NOT DEPLOYED; NOT PUBLICLY VERIFIED

## Visitor outcome

Dream Phone is one recognizable SUNNYVAiLE telephone booth with two equal
choices:

1. **Just Call** — a short, playful, prewritten character call with functional
   remixes, special codes and session-only call history.
2. **Play the Full Game** — a three-case claim game in which the player must
   collect distributed evidence before making a committal verdict.

The exact established exterior is the page environment and the only threshold:
the entry view begins outside the booth, then the selected experience opens
inside that same booth while its handset remains visible beside the live
controls. Mobile uses a compact booth/handset strip rather than repeating a
second exterior. The visible system uses the documented 90s
colour pops—hot pink, purple, yellow, sky blue and teal—within the mature
LAiDIES editorial/comic hierarchy. The rejected generic teal operator-console
direction is prohibited by `operations/dream-phone-design-decisions.md`.

## Executable candidate

- `games/dream-phone-preview.html`
- `games/dream-phone-preview.css`
- `games/dream-phone-preview.js`
- `games/dream-phone-preview-contract.mjs`
- `scripts/test-dream-phone-preview.mjs`

The candidate is an internal preview route. It does not replace or redirect the
current public Dream Phone route.

## Interaction contract

### Just Call

- A named directory button and a typed number produce the same caller.
- `*67` reaches a screened perspective.
- `*69` returns to the last ordinary caller for one fresh clarification.
- `867-5309` reaches Jenny for the best next question.
- Call History reopens the exact prior response without advancing a bundle or
  creating a new call.
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
node --check games/dream-phone-preview.js
node scripts/test-dream-phone-preview.mjs
```

The contract test is calibrated with an intentionally omniscient caller and a
stale guidance fixture; both must be rejected. Browser acceptance requires:

- 1440px, 390px and 320px have no horizontal overflow;
- all visible buttons are at least 44 CSS px in both dimensions;
- the two entry choices are equal and fully explained;
- all Just Call special codes, remixes and history work;
- game verdict gates and powers follow the contract above;
- keyboard focus remains visible and reduced motion is supported; and
- exact screenshots are saved under `evidence-preview-2026-08-10/`.

At 2026-08-10 16:04 PDT, the calibrated contract, JavaScript syntax check and
scoped diff check passed. Independent artifact-first UX review confirmed the
five repaired game blockers: held cases are not scored, early Hold cannot skip,
guidance is case-specific, `*67`/`*69` retain their jobs, and history restores
useful remix/Speaker state. The final redial edge was also closed: `*69` now
returns Deb after a private `*67` call.

Independent visual review passed the candidate for Ali direction review. It
confirmed the booth is now the playable frame, the outside-to-active-phone
transition is legible, both entry doors are equal, the 90s colour system is
present and the former repeated mobile exterior is gone. The non-blocking
mobile first-fold note was polished by reducing the establishing image height
at 430px and below; refreshed 390px and 320px screenshots bind that change.

## Authority boundary

No public deploy, production-route replacement, spending, backend change,
reward/account integration or source admission is authorized. Ali remains the
acceptance owner for visual direction and any later public release. The next
trigger is independent visual/UX review of this exact candidate, followed by
Ali direction review only if the candidate clears the applicable presentation
gate.
