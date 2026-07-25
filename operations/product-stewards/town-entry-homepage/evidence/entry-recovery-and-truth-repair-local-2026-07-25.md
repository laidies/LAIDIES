# Town Entry recovery and truth repair — local evidence — 2026-07-25

**Status:** BUILT LOCALLY — deterministic source guardrails passed, but the complete local journey remains unverified. This is not a release candidate, deployment, browser/device result, or public verification.

## Scoped repair

- `content/site/homepage.js` now rejects a non-OK episode-index response, uses the same evergreen fallback for an empty published index or fetch failure, and changes the static Episode 04 panel from `This week` to `Previously published` until current index data renders.
- `index.html` supplies the matching static evergreen Episode 04 wording and episode-specific CTAs.
- The repair does not decide current episode availability, validate the receiving route, or make the homepage's other editorial/news cues current.

## Deterministic checks run

On the dirty local source tree, on 2026-07-25:

| Check | Result | Scope/limit |
|---|---|---|
| `node --check content/site/homepage.js` | PASS | JavaScript syntax only. |
| `node scripts/test-entry-recovery-truth.mjs` | PASS | Confirms `response.ok` handling and evergreen fallback wording in the scoped source. |
| `node scripts/test-eod-product-claims.mjs` | PASS | Existing product-claim guardrail remained green. |
| `git diff --check` for scoped implementation/test files | PASS | No whitespace errors. |

## Remaining evidence gap

Desktop/390×844 clean-browser, failed-fetch injection, no-JS, keyboard, reduced-motion and public-origin checks remain **NOT TESTED**. No exact clean artifact was bound because the workspace is materially dirty. Per BTB-069, episode-route arrival remains entry-level navigation only, not receiving-product completion.

## Learning scan

No new qualifying painpoint: this repair directly applies existing BTB-069 and BTB-096 prevention rules. Reinforced rule: a static fallback must use evergreen wording until a successful, explicit current-data response proves that a current label is warranted.
