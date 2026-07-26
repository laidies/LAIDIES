# NewsStand Cycle 6 Repair 1 maker evidence

**Status:** BUILT LOCALLY — INDEPENDENT REJUDGE REQUIRED; release remains
**HOLD — FIX BEFORE LAUNCH**

## Bounded repair

This repair addresses only the independent Cycle 6 P0 findings about proposal
authority, four-paper job routing and nondeterministic browser history. It did
not retrieve a feed, publish/edit a story, approve imagery, use credentials,
write a public service or deploy.

1. `scripts/evaluate-newsstand-autopublish.mjs` is now a review router. Its
   only outcomes are `REJECT` and `HOLD_FOR_INDEPENDENT_REVIEW`; it has
   `authorityPresent: false`. Candidate labels, scores, source classifications,
   booleans and checks are explicitly non-evidence. No independent signed/hash
   authority is implemented or claimed.
2. Candidate structural proposals now name one distinct editorial job. The
   router rejects a Daily pretending to be a synthesis, a one-item routine
   update labelled Weekly, an unqualified Breaking proposal and a Tribune that
   omits a separate position. A structurally complete proposal still holds for
   independent review.
3. The reader history path exposes `data-ns-restoration=pending|settled`, a
   restoration ID, observed restored scroll and a `newsstand:history-restored`
   event. The browser test waits on that contract rather than a timeout, then
   verifies repeated paper/search Back journeys.

## Maker checks

| Check | Result |
|---|---|
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS — four distinct publication proposals route to hold; reject/reroute cases pass; no candidate can authorize publication |
| `node scripts/test-newsstand-reader-contract.mjs` | PASS — 10 deterministic state fixtures plus observable history contract |
| `node scripts/validate-newsstand-stories.mjs` | PASS — schema 1.0.0; four canonical publications; 1 visible; 1 held |
| `node scripts/test-newsstand-reader-browser.mjs` | PASS — 89 rendered checks; three repeated paper/search history cycles at 620/900 px, focus, cards, query and scroll |
| fresh `node scripts/build-public-site.mjs /tmp/laidies-newsstand-cycle6-r1.g96ELq` | BUILT LOCALLY — 1,087 files; 959.59 MiB; existing 750 MiB warning remains |
| fresh artifact byte identity | PASS — `newsstand.html`, reader contract, stories and CSS SHA-256 match source |
| `NEWSSTAND_ROOT=/tmp/laidies-newsstand-cycle6-r1.g96ELq node scripts/test-newsstand-reader-browser.mjs` ×3 | PASS — 89 rendered checks on each artifact run |

Runtime SHA-256: `newsstand.html`
`0cef9bd920ba9f745a001c7b9391905d3e898b40bdaadb25f6d500624a847bcc`;
reader contract
`a0071c3c056563d721d374b7578c9915706b49ca7db419623f80035ae65f758a`;
stories
`699e59389259c94143f5eeb50e1f1d4beaa0e1235a947f52c3a561e12e4400f0`;
CSS `375899e5cdcb33ecfba9c10d038473e0b43f1108ca1093ce7e0ffcf5568afebe`.

## Still held

Independent producer-to-reader authority, source retrieval/identity/hash and
claim-entailment verification, real publication transactions, all editorial
and visual approvals, native Safari/VoiceOver, measurement, deployment and
public verification remain open. The 959 MiB whole-site artifact warning is a
separate release risk.

## Independent rejudge allowlist

- `newsstand.html`
- `content/newsstand-reader-contract.js` (runtime dependency; unchanged)
- `content/newsstand-stories.js` (runtime dependency; unchanged)
- `content/newsstand.css` (runtime dependency; unchanged)
- `scripts/evaluate-newsstand-autopublish.mjs`
- `scripts/test-newsstand-autopublish-policy.mjs`
- `scripts/test-newsstand-reader-contract.mjs`
- `scripts/test-newsstand-reader-browser.mjs`
- `operations/newsstand-autopublish-policy.json`
- `operations/newsstand-candidate.schema.json`
- `operations/newsstand-earned-autonomy.md`
- `operations/newsstand-editorial-radar.md`
- `operations/product-stewards/newsstand/{OPERATING-SPEC.md,backlog.md,state.json,build-evidence-cycle-6-repair-1-2026-07-26.md}`

Do not treat the dossier, candidate fixtures, policy or any candidate proposal
as public runtime authority. Do not package `/operations/`, fixtures, raw
inputs, review evidence or credentials in a public artifact.
