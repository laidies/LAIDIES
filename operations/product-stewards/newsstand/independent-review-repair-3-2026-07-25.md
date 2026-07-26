# NewsStand independent review of canonical reader repair 3

**Date:** 2026-07-25  
**Review type:** independent product, accuracy/trust, brand,
UX/accessibility and technical review of the bounded history-recovery
candidate  
**Candidate evidence:**
`build-evidence-canonical-reader-repair-3-2026-07-25.md`  
**Boundary:** local source, deterministic tests and synthetic rendered Chrome
journeys only; no maker/state/queue edit, credentials, deployment,
publication, external mutation, visuals or Git

## Verdict

**PASS — BOUNDED HISTORY REPAIR. NEWSSTAND RELEASE HOLD REMAINS.**

Repair 3 closes NS-R2-IR-01. Browser Back no longer clears the story hash while
leaving the article mounted. Paper and archive-search views are now represented
as restorable history state, including the selected paper or exact query,
originating result, focus destination and scroll vicinity. Forward re-runs the
canonical availability decision rather than reviving cached story markup.

The supplied 73-check browser suite passed, and independent repeated-navigation
sequences did not reproduce the prior defect or find an equivalent replacement.
Three consecutive search-story Back/Forward cycles consistently restored:

- empty hash on Back and the story hash on Forward;
- query `verification`;
- exactly one eligible result card on Back;
- zero article bodies on Back and one on Forward;
- focus on the originating result on Back and reader heading on Forward; and
- the originating scroll vicinity.

An independent availability-change sequence also passed: after opening the
eligible Tribune story, going Back, changing that story to retracted in the
synthetic local dataset and going Forward, the reader showed zero article
bodies and a retraction state. Forward therefore re-evaluates current
availability.

This pass is deliberately narrow. It does not approve Health, the final Weekly
visual, the three generic homepage descriptions, Safari/VoiceOver, a release
artifact, producer/public rollback, deployment or public publication.

## Independent scorecard

| Gate | Score | Floor | Verdict | Basis |
|---|---:|---:|---|---|
| Product/editorial quality | 18/20 | 17 | PASS | The four publication jobs, quiet/held/current states, reader, correction model and now-coherent history journey form a useful editorial product. |
| Accuracy, safety and trust | 19/20 | 17 | PASS LOCALLY | Direct, search, paper, Back and Forward paths all re-run fail-closed access decisions; corrected, retracted, stale and held states do not leak blocked bodies. Public rollback remains unproven. |
| Positive LAiDIES brand contribution | 15/20 | 17 | HOLD | Paige, the physical NewsStand and evidence-first voice are strong. Three generic homepage strings and unapproved legacy Wednesday artwork remain outside this repair. |
| UX/accessibility | 14/15 | required gate | PASS LOCALLY | Keyboard activation, result/heading focus, Back/Forward restoration, 390px reflow, reduced motion and zoom proxy pass. Safari/VoiceOver remain external. |
| Technical/release integrity | 14/15 | required gate | PASS LOCALLY | Schema, contract, 73 rendered checks, availability re-evaluation and global suites pass. No hash-bound release artifact or deployed-origin proof exists. |

The bounded history repair clears its independent product, trust, UX and
technical gates. The complete release still cannot clear the non-compensable
brand floor or external release gates.

## Exact reviewed candidate

| Artifact | SHA-256 |
|---|---|
| `newsstand.html` | `5a84ec6cc6313b85a24dfd623d959a142876912ec76fcbe903e40248edb8152c` |
| `content/newsstand.css` | `375899e5cdcb33ecfba9c10d038473e0b43f1108ca1093ce7e0ffcf5568afebe` |
| `content/newsstand-stories.js` | `699e59389259c94143f5eeb50e1f1d4beaa0e1235a947f52c3a561e12e4400f0` |
| `content/newsstand-reader-contract.js` | `a0071c3c056563d721d374b7578c9915706b49ca7db419623f80035ae65f758a` |
| `content/newsstand.schema.json` | `e6e550ac025bc37e9d5026608707310e348dae394c7d5583c54999f9d0d967ed` |
| `scripts/test-newsstand-reader-contract.mjs` | `1a364210d407ee4f9c52d5635150ef75b5e404a55184347a8ced06d024eb1a42` |
| `scripts/test-newsstand-reader-browser.mjs` | `aaa31cd7315f8e36cc0cfdfccb1926eb80bd1ecbc9b957027a3faf1db1042061` |
| `scripts/validate-newsstand-stories.mjs` | `52c131f7d02d370741a22ec2304d7f472856de9c3775cb90efbd6b392abfd0b5` |

No release artifact is claimed by this evidence.

## Fresh supplied verification

| Check | Result |
|---|---|
| `node scripts/validate-newsstand-stories.mjs` | PASS — schema 1.0.0, four canonical publications, one visible, one held, no legacy `wednesday` key |
| `node scripts/test-newsstand-reader-contract.mjs` | PASS — 10 state fixtures plus rollback drill |
| `node scripts/test-newsstand-reader-browser.mjs` | PASS — 73 rendered checks |
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS — 10 fixtures; no publication action |
| `node scripts/check-inline-js.js` | PASS — 353 scripts across 132 pages |
| `node scripts/check-local-links.js` | PASS — 1,943 references across 110 pages |
| `node scripts/check-town.js` | PASS |
| `node scripts/check-product-stewards.mjs` | PASS — 65 products and 3/3 active lanes |

## Previously observed Back defect

Repair 2 behavior was:

- story hash removed by Back;
- one article body remained;
- prior cards/query were not restored; and
- focus remained on `#ns-reader-title`.

Repair 3 behavior is:

| Journey | Back result | Forward result |
|---|---|---|
| Paper listing → story | Empty hash; matching paper cards; originating story result focused; prior scroll vicinity | Story hash/body restored; reader heading focused |
| Search `verification` → story | Empty hash; exact query; one eligible result; originating result focused; prior scroll vicinity | Story hash/body restored; reader heading focused |
| Direct story → empty hash | Reader closed; article and notice markup removed; relevant paper control focused | No stale body is reconstructed without an eligible story route |
| Corrected search result → story | Corrected query/card/status and result focus restored | Corrected body and notice re-evaluated |
| Retracted/stale/held direct route → empty hash | Reader closes with no blocked body | Forward re-runs the current blocked-state decision |

The source now:

- sets `history.scrollRestoration = "manual"`;
- snapshots hashless paper/search/closed state;
- binds the prior view to the story history entry;
- handles empty-hash restoration explicitly;
- reconstructs search or paper cards rather than retaining story DOM;
- restores the originating result/control and scroll vicinity; and
- runs `renderHash` again for every non-empty hash.

## Independent alternate sequences

### Repeated search history

Starting state:

```json
{
  "hash": "",
  "query": "verification",
  "articles": 0,
  "cards": 1,
  "focus": "#label-is-not-a-truth-detector",
  "scroll": 720
}
```

Across three Back/Forward cycles:

- every Back restored the query, one card, zero articles and originating
  result focus;
- every Forward restored the story hash, one article and reader-heading
  focus; and
- restored Back scroll remained within 129 pixels of the captured position,
  inside the suite's 200-pixel focus/layout tolerance.

### Availability re-evaluation

After the eligible story was opened and then left with Back, its synthetic
status was changed to `retracted` with a local evidence record. Forward
produced:

```json
{
  "hash": "#label-is-not-a-truth-detector",
  "articles": 0,
  "cards": 0,
  "focus": "ns-reader-title",
  "access": "retracted"
}
```

The old body was not revived.

### Direct close

Clearing the hash on a direct eligible-story arrival closed the paper counter,
removed the article and left no search cards or stale access notice. Supplied
tests separately confirm the relevant Tribune control receives focus.

## State, correction and access review

The canonical contract continues to pass the earlier trust gates:

- dataset-wide hold blocks direct hashes, paper listings and archive search;
- a stale story is excluded even when another publication keeps the overall
  dataset current;
- unavailable is distinguished from overdue;
- corrected stories preserve body plus a visible correction notice;
- retracted stories preserve route and notice but expose no body;
- the Health story remains held and absent from listing, search and direct
  body rendering; and
- correction/retraction fixture records remain bound to the same source IDs
  as the approved Tribune evidence.

Keyboard Enter works for search submission and story-result activation.
Explicit “Put the paper back” continues to restore the search button or paper
selector as appropriate.

## Remaining release gates

### Brand and homepage

The three previously identified homepage strings remain:

1. `NewsStand · stories translated by LAiDIES`;
2. `Big stories and tracked themes`; and
3. `NewsStand · Big stories and tracked themes`.

They should use the canonical source-checked, four-job,
current-or-honestly-quiet descriptor through the homepage owner. Repair 3 was
correct not to edit outside its boundary.

The Weekly selector still uses a visibly Wednesday-labelled legacy image. Its
accessible name and visible overlay honestly identify it as archive art, so it
is not a truth leak; it is not an owner-approved final Weekly visual.

### Accessibility and release

Still required:

- native Safari plus VoiceOver or another real screen-reader journey;
- Ali's final Weekly visual decision;
- an exact hash-bound release artifact;
- a controlled producer → artifact → deployment correction/retraction and
  rollback drill;
- authorized deployment and deployed-origin verification; and
- continued hold of Health until its independent editorial/content gate
  clears.

## Learning scan

**Reusable success:** browser history must store the product state that the
reader is leaving, not only the URL it is entering. Search query, selected
paper, originating result, focus destination and scroll vicinity are one
restorable user state.

**Prevention rule:** every hash-driven detail reader requires Back, Forward,
repeated Back/Forward, explicit close and availability-change tests. A cached
story body must never outrank the current access decision.

**Possible Behind the Build angle:** “The URL went Back. The newspaper did
not—until we taught browser history what the reader had actually been doing.”

**Final status:** **REPAIR 3 INDEPENDENT PASS — NEWSSTAND RELEASE HOLD.**
