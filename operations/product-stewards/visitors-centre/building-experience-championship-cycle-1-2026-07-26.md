# Visitor's Centre building-experience championship — Cycle 1

**Status:** OWNER-REVIEW CANDIDATE READY — independent visual judgment and owner
ruling remain open.  
**Production:** unchanged. No git, integration, deployment or publication.

## Trigger and recovered truth

Ali identified that the building design was not finished and that owner visual
gates had been invoked before credible finished candidates existed. The prior
92/100 repair rejudge remains valid only for its contract/reliability scope. It
does not prove finished building design.

The locked building intent is the LIBRAiRY whole-room/object grammar:

> Get oriented: take the map, see what every building does, and start the
> optional guided tour.

The exact town map, an equal named directory, first-arrival orientation, optional
tour/trailer/postcard objects and current destination limitations must all
operate as one Visitor's Centre room. A long card stack, essay, dashboard or
separate postcard product is not the building.

## Incumbent evidence

Fresh headless captures were made from the current source at clean newcomer and
active-tour returning states:

- desktop 1440: 3,502px document height;
- mobile 390: 3,785px document height;
- all 17 map/directory routes present;
- returning state correctly reports tour stop 6;
- no horizontal overflow.

The opening room is credible. The rest of the incumbent breaks into detached
directory, tour, first-15-minutes, postcard and founder-note sections. Mobile
turns the room into a small strip and makes the visitor traverse more than
twice the candidate's height.

Evidence:
`operations/design-explorations/visitors-centre-building-championship-20260726/evidence/incumbent/`.

## Research synthesis

Official NPS orientation guidance supports a site-specific map whose present
location is the dominant cue and whose labels match the visitor environment.
TfL's Legible London material supports one coherent map/sign system instead of
competing mental models. WCAG 2.2 requires the digital translation to retain an
equivalent route at 320px, keyboard focus and reflow.

SUNNYVAiLE translation:

1. locate the visitor;
2. show the town;
3. offer the same 17 places by name;
4. reveal one place's current job/limitation in the same object;
5. keep tour, trailer and postcard optional;
6. leave completion truth with the receiving product.

Full sources and placement inventory:
`operations/design-explorations/visitors-centre-building-championship-20260726/research-and-placement-inventory.md`.

## Visual production

Exactly three independent ImageGen direction boards were produced:

1. Wall Map Welcome — incumbent-control direction;
2. Fold-Out Map Counter — challenger;
3. Panorama Dispatch Wall — challenger.

All were bound to the site visual lock and production SUNNYVAiLE environment
authority. No person was generated because the greeter identity is unassigned.
Every output was inspected at full resolution. The Wall Map Welcome and Panorama
Dispatch Wall boards are quarantined; nothing was overwritten.

The selected direction received two production derivatives:

- text-free 1505×1045 desktop compositing plate;
- independently recomposed 1024×1536 mobile plate.

The built candidate composites the exact approved final-v5 map in HTML. No
generated map approximation is used as town truth.

Prompts, inputs, outputs, hashes, roles and dispositions:
`operations/design-explorations/visitors-centre-building-championship-20260726/art/prompt-ledger.md`.

## Competition score (/20)

| Anonymous direction | Product | Accuracy / trust | Brand | UX / accessibility | Technical | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| I — incumbent | 16 | 18 | 16 | 16 | 18 | HOLD — product/brand floors miss |
| II — Fold-Out Map Counter | 19 | 18 | 19 | 18 | 18 | SELECTED OWNER-REVIEW CANDIDATE |
| III — Panorama Dispatch Wall | 18 | 17 | 19 | 17 | 16 | credible; integration risk |

Required product, trust and brand floors are 17/20. Direction II clears all
floors. The scoring was rubric-blinded but performed by the maker; it is not
independent approval.

Full red-team:
`operations/design-explorations/visitors-centre-building-championship-20260726/direction-competition.md`.

## Built owner-review candidate

Candidate:
`operations/design-explorations/visitors-centre-building-championship-20260726/candidate/index.html`.

It implements:

- one room and one fold-out desk instead of stacked sections;
- exact final-v5 map with 17 desktop hotspots;
- equal 17-name select, disclosure list and no-JS link fallback;
- exact copied state/summary/limitation/href contracts;
- focus transfer into reveal and Escape return;
- clean newcomer and active-tour returning states;
- 320/390 purpose-built mobile art and reflow;
- reduced-motion behavior;
- optional tour, trailer and postcard handoffs;
- no founder note, generated greeter or postcard-form duplication.

The candidate document is 1,774px at 1440, 1,727px at 390 and 1,637px at 320.
It is isolated and noindexed.

## Verification

Command:

```text
node operations/design-explorations/visitors-centre-building-championship-20260726/test-candidate.mjs
```

Result: **PASS — 79 checks, 0 failures**.

Coverage:

- no-JS all-17 fallback;
- exact map source;
- 17 select/list/map routes;
- clean and active-tour returning states;
- held FAiRY destination truth and route;
- focus transfer and Escape return;
- desktop 1440, mobile 390 and mobile 320;
- reduced motion;
- horizontal overflow;
- selected and unselected screenshots.

Runtime: Playwright Core 1.61.1, headless Google Chrome 150.0.7871.187.

Evidence:
`operations/design-explorations/visitors-centre-building-championship-20260726/candidate/evidence/`.

Limitations: headless Chrome is not native Safari or VoiceOver. DOM and
screenshots are not human comprehension, independent visual approval, analytics
or public verification.

The existing production-source contract suite was also run:

```text
node scripts/test-visitors-centre-contract.mjs
```

Result: **FAIL — pre-existing shared-tour KSVL mismatch**. The shared tour says
“Listen to creator-confirmed LAiDIES originals at KSVL 99.9,” while the
Visitor's Centre contract requires the tour to state that public listening is
held. The Visitor's Centre fallback separately says opening the station does
not prove playback. This task prohibited shared-source edits, so the mismatch is
recorded as an integration blocker rather than silently repaired.

## Gates

| Gate | Status |
| --- | --- |
| Locked intent recovered | PASS |
| Current newcomer/returning rendered evidence | PASS |
| Map/tour/directory/postcard/product dependency map | PASS |
| Official pattern research | PASS |
| Incumbent + two material challengers | PASS |
| Required art generated and inspected | PASS |
| Rejected art quarantined | PASS |
| Maker score clears 17 product/trust/brand floors | PASS |
| Isolated desktop/mobile owner-review candidate | PASS |
| Automated candidate QA | PASS |
| Current shared Visitor's Centre contract suite | FAIL — KSVL tour wording |
| Independent visual judgment | OPEN |
| Ali owner visual ruling | OPEN |
| Native Safari / VoiceOver / 200% human review | OPEN |
| Human first-arrival comprehension | OPEN |
| Production integration | PROHIBITED |
| Public verification | OPEN |

## Decision

Show Fold-Out Map Counter to Ali as a credible finished owner-review candidate.
Do not integrate it. A later maker must use the build packet only after both an
independent visual judgment and explicit owner ruling.
