# Independent re-judge — Blend & Snap weekly-pack manifest Repair 1

**Date:** 2026-07-25  
**Reviewer role:** independent product/learning, trust, brand,
UX/accessibility and frontend/data judge; not the maker  
**Original review:** `independent-review-weekly-pack-manifest-2026-07-25.md`  
**Overall verdict:** **FAIL — REPAIR 1 materially improves the product, but two
bounded P0s remain before another re-judge**  
**Release verdict:** **FIX BEFORE LAUNCH; NOT LAUNCH-ADMITTED**  
**External/owner holds:** preserved — native 200% browser zoom, VoiceOver,
Safari/mobile Safari, newcomer comprehension, Ali visual approval, release
artifact approval, deployment and public-origin verification

## Executive ruling

Repair 1 resolves the original high-salience contradiction. The stale
“new every Wednesday · cards included” pixels are fully covered by an opaque,
focusable and truthful Study Pack note. It is the topmost hit target at the old
flyer's centre, has a useful accessible label, and reads “Availability checked
before every order.” Desktop rendered inspection confirms that the correction
looks like an intentional corkboard note rather than a disclaimer placed
elsewhere.

The Welcome Tour, town directory and Episode 01–04 rails now make the same
availability-governed promise. Episode 04 says exactly two of four Pack pieces
are ready, calls its Cards unavailable, and keeps the Quiz adjacent rather than
inside the Pack. Episodes 01–03 expose held Cards only as “Cards are not
available yet.” Public component rows no longer display production language.

The exact maker hashes reproduced. The manifest validator, all 51 deterministic
cross-entry checks, all 59 source-rendered checks and all 59 fresh-artifact
checks pass.

The gate still does not pass for two reasons:

1. the public runtime artifact serves `evidence` and `evidenceOwner` fields at
   `/content/blend-snap-weekly-packs.json`. A visitor does not see those strings
   in the café interface, but the delivered JSON still exposes “Architecture
   exists,” “server-authoritative,” “unproven” and other internal
   release-control language. That is not the required separation between a
   public contract and a stewardship evidence ledger; and
2. all five fail-closed fixtures update `#bsSpecialDesc`, which has no
   `role=status` or live-region semantics, then empty `#bsComponents`, the only
   nearby `aria-live` region. The failure message is therefore outside the live
   region, its live region has no text, and focus remains on `BODY`. The
   deterministic suite proves visual text and disabled controls, not an
   accessible failure announcement.

These are narrow architecture/accessibility defects. They do not reverse the
real visual, cross-entry, component-status, persistence or focus improvements.

## Weighted judgment

Scores are out of 20. Product quality, accuracy/trust and positive LAiDIES
brand contribution retain independent 17/20 floors.

| Gate | Weight | Score | Weighted contribution | Verdict |
|---|---:|---:|---:|---|
| Product intent and learning quality | 25% | 18/20 | 22.50 | **PASS LOCALLY; newcomer hold remains** |
| Accuracy, status, persistence and reward trust | 25% | 16/20 | 20.00 | **FAIL — internal evidence remains in the public runtime payload** |
| Positive LAiDIES brand contribution | 20% | 17/20 | 17.00 | **PASS AT FLOOR; Ali visual hold remains** |
| UX and accessibility | 15% | 16/20 | 12.00 | **FAIL — fail-closed announcement contract is incomplete** |
| Frontend/data/technical integrity | 10% | 17/20 | 8.50 | **PASS, with public/private schema and timeout debt** |
| Cross-product integrity and maintainability | 5% | 18/20 | 4.50 | **PASS** |
| **Total** | **100%** |  | **84.50/100** | **FAIL** |

The trust floor and required accessibility P0 cannot be compensated by the
passing total.

## Original P0 disposition

| Original P0 | Re-judge result | Evidence |
|---|---|---|
| Remove the false visible card/weekly guarantee | **PASS** | Opaque correction is topmost at the old flyer's centre, has a truthful accessible label and visibly covers the entire stale Study Pack flyer. |
| Reconcile every entry point | **PASS** | Welcome Tour explains ready/held/planned/unavailable; directory says availability varies; Episode 01–04 rails all say “Availability checked at the café.” |
| Separate public reasons from internal evidence | **PARTIAL / FAIL** | Rendered menu and receipts use `publicNote` and contain no internal phrases, but the exact public JSON still ships `evidence` and `evidenceOwner`. |
| Add a contradiction gate | **PASS WITH A KNOWN LIMIT** | The 51-check source gate and 59-check rendered gate cover café, overlay geometry/hit testing, tour, directory, four rails and manifest notes. Independent rendered inspection confirms the visual cover. The automated gate does not OCR the underlying candidate image, so the opaque-cover assertion remains essential. |
| 320/390, keyboard and reduced motion; preserve external accessibility limits | **PASS LOCALLY WITH HOLDS** | Independent 320px probe: `clientWidth=320`, `scrollWidth=320`, five component rows and reduced motion recognized. The 59 checks reproduce 390px, keyboard receipt operation and reduced-motion focus. Native zoom, VoiceOver and Safari remain explicit holds. |
| Announcements and focus for current, historical and fail-closed states | **PARTIAL / FAIL** | Current and historical receipt focus and close-return pass. In a manifest-failure probe, fallback is visible but active element is `BODY`; `#bsSpecialDesc` has no role/live semantics and the polite `#bsComponents` region is empty. The other four fixtures use the same failure path. |

## Product, status and cross-entry evidence

- Manifest: schema `1.0.0`; four published episode menus; 12 available,
  three held, four planned and one unavailable; fresh through 2026-08-01.
- Every menu contains all five component jobs plus the separately described
  Quiz relationship.
- Only `available` components receive routes.
- Episode 01–03 Cards are `held`, have no route and render “Cards are not
  available yet.”
- Episode 04 Cards are `unavailable`, have no route and render “Not made for
  Episode 04” / “Episode 04 does not include a card pack.”
- The Study Sheet remains planned and does not invent a route.
- Storage-denied usual and pack-marker journeys remain operable and honest.
- Opened-menu memory remains device-local and never means studied, completed,
  synced or rewarded.
- Missing manifest, missing index, stale manifest, missing component and index
  mismatch disable ORDER, suppress component links and expose only the released
  Episode fallback.
- Welcome Tour, directory and Episode 01–04 rail copy all fail closed.
- The charter now matches the implementation: the marker records opening the
  pack menu on this device.

## Exact candidate and artifact

Fresh artifact:
`/tmp/laidies-blend-snap-rejudge.UnXBFy`

Builder result: 1,076 public files plus `build-report.json`, 961.34 MiB. The
750 MiB advisory warning remains an external release-owner concern.

All scoped public source/artifact pairs were byte-identical:

| File | SHA-256 |
|---|---|
| `blend-snap.html` | `08de97e35346a012acb9fd36a443afa40237861a975ae5818daac85ee00398de` |
| `content/blend-snap-weekly-packs.json` | `4fca1c36058133ef39196d0d34a72c104af25163afd9ad32757e56655333cdde` |
| `content/site/sv-welcome-tour.js` | `20f00850a4d6cdd460a9e5bdd36ce43c9bd897af6c94ddacd393a19756c0ee7e` |
| `content/site/sunnyvaile-directory.js` | `12661e58bc52646b16002ecbe34e739588c559a3c698eb45bdb18fbbf02195be` |
| `issues/issue-01.html` | `af7b3bacd267174b0e08dce51e809ad9fc3e3d3cde7d2fe38d5e596a81c69c1f` |
| `issues/issue-02.html` | `f9641c4f32b1c21d1616bef9308cdbe80afb1ebbed6a9ead5ac82ce5c0c5565d` |
| `issues/issue-03.html` | `aac8f9b723e51f862a12206c45e5d4827e47be144e08b9ec470f1f6beefea877` |
| `issues/issue-04.html` | `fdba77bed63e35bb8110931e3687dbc61e07c50bf65ab8ffc3bfbedc21a60e88` |

Test/contract hashes also match maker evidence:

- validator:
  `1df90186ce1323219be5e8a8e9aef435f63e559bb3e4d6742bf1b885ff92cf60`
- cross-entry:
  `38cd43b71c1b2a5d1dd2097da27ea0fb20d1e7152455ccace0508a8931c8f2c2`
- rendered browser:
  `30d020ecd2f78ac0773f1b75fdfb5ec7e8ba5e9cce47dd0aa88a63264819fa93`
- charter:
  `cb5933cfb10ad9aa8c6e84b300e33472d27f71521d1305575df5ce6ba3f1d25f`

## Exact rerun results

```text
node scripts/validate-blend-snap-packs.mjs --as-of=2026-07-25
PASS — 4 menus · 12 available · 3 held · 4 planned · 1 unavailable

node scripts/test-blend-snap-cross-entry.mjs
PASS — 51 deterministic checks

node scripts/test-blend-snap-browser.mjs
PASS — 59 rendered source checks

BLEND_SNAP_ROOT=/tmp/laidies-blend-snap-rejudge.UnXBFy \
  node scripts/test-blend-snap-browser.mjs
PASS — 59 rendered fresh-artifact checks

node scripts/check-inline-js.js
PASS — 353 scripts / 132 pages

node scripts/check-local-links.js
PASS — 1,941 references / 110 pages

node scripts/check-town.js
PASS

node scripts/check-product-stewards.mjs
PASS — 65 products; 3/3 active

node scripts/validate-public-metadata.mjs <fresh artifact>
PASS
```

## Bounded Repair 2 before re-judge

1. **Split the public runtime contract from stewardship evidence.**
   - Ship only the component fields the browser needs: identity, job, status,
     visitor-safe label/note and admitted route.
   - Keep `evidence`, `evidenceOwner`, verification rationale and internal
     authority in a non-public validation ledger or strip them during the
     public build.
   - Make the validator compare public and internal records while an
     exact-artifact test rejects internal phrases/fields in the delivered JSON.

2. **Create one stable accessible pack-status channel.**
   - Put loading, ready and failure text in a persistent `role=status`,
     `aria-live=polite`, `aria-atomic=true` region, or an equivalent tested
     pattern.
   - Do not rely on clearing an otherwise empty live region.
   - Assert the accessible name/role and announced failure text for all five
     fail-closed fixtures.
   - Preserve logical focus: initial asynchronous failure should not
     unexpectedly steal focus; if a retry is added, a user-triggered retry
     should focus its loading result and return to the visible retry on failure.

3. **Keep the existing P1 maintenance item bounded with the repair.**
   - Add an abort deadline and retry for manifest/index loading, or remove the
     unimplemented late-response promise from the operating contract.

Then rerun 51 deterministic checks, 59 source checks, 59 fresh-artifact checks
and new public-payload/live-status adversarial cases. Native zoom, VoiceOver,
Safari, newcomer comprehension, Ali visual approval, artifact-size, release
and public-origin gates remain separate holds and must not be claimed by that
repair.

No product source, data, tests, state, backlog, queue, painpoint, Git,
deployment, publication or external system was changed by this re-judge.
