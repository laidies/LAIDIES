# Independent review — Blend & Snap weekly-pack manifest

**Date:** 2026-07-25  
**Reviewer role:** independent product/learning, trust, brand, UX/accessibility
and frontend/data judge  
**Candidate:** exact maker hashes recorded in
`evidence-weekly-pack-manifest-maker-2026-07-25.md`  
**Overall verdict:** **FAIL — BOUNDED REPAIR REQUIRED; NOT LAUNCH-ADMITTED**

## Executive ruling

The manifest/controller repair is real and materially better than the prior
product. The café now fails closed, distinguishes component jobs and statuses,
suppresses routes for non-ready work, tells the truth about device-local
memory, and survives storage denial. The maker's exact five hashes match; its
deterministic suite and all 49 rendered checks independently reran and passed.
Additional same-count remapping, hidden-route, invalid-date and complete
storage-denial probes also failed closed or degraded honestly.

The candidate nevertheless fails launch admission because the manifest truth
is contradicted by prominent user-facing Blend & Snap and town entry points:

1. the café's own large corkboard artwork says **“STUDY PACK PICKUP · new every
   Wednesday · cards included”** while the manifest holds Episodes 01–03 cards
   and says Episode 04 cards are unavailable;
2. the welcome tour still promises “a fresh pack of trading cards tucked
   inside”;
3. Episode 02–04 rails still advertise `Try-On · Cheat Sheet · Cards`, including
   Episode 04, which the manifest says has no card pack; and
4. the town directory still describes `Study Pack / trading cards` without the
   candidate's availability boundary.

A small caption below the corkboard does not neutralize the much more prominent
false flyer. This directly violates the operating spec's prohibition on
guaranteed weekly drops and ready-card implications. The public menu also
renders internal production language such as “collection authority repair,”
“Architecture exists,” and “Episode index declares,” making an otherwise
excellent café feel partly like a release-control dashboard.

The candidate has strong local plumbing, but LAiDIES cannot ask visitors to
trust the status chips while its image and tour promise the opposite.

## Weighted judgment

Weights reflect this product's coordination/trust role. Scores are out of 20;
quality, trust and LAiDIES brand retain the non-compensable 17/20 floors.

| Gate | Weight | Score | Weighted contribution | Verdict |
|---|---:|---:|---:|---|
| Product intent and learning quality | 25% | 16/20 | 20.00 | **FAIL** |
| Accuracy, status, persistence and reward trust | 25% | 13/20 | 16.25 | **FAIL** |
| Positive LAiDIES brand contribution | 20% | 15/20 | 15.00 | **FAIL** |
| UX and accessibility | 15% | 16/20 | 12.00 | **FAIL — evidence incomplete** |
| Frontend/data/technical integrity | 10% | 18/20 | 9.00 | **PASS** |
| Cross-product integrity and maintainability | 5% | 12/20 | 3.00 | **FAIL** |
| **Total** | **100%** |  | **75.25/100** | **FAIL** |

The technical score cannot compensate for the failed trust, quality and brand
floors.

## Gate findings

### 1. Product intent and learning quality — FAIL, 16/20

What passes:

- ORDER remains the primary action and opens a useful in-place menu/receipt.
- Episode, Study Sheet, Try-On, Cheat Sheet, Cards and Quiz have distinct jobs.
- The current menu says only two of four pack pieces are ready and explicitly
  places the Quiz beside—not inside—the Pack.
- Planned/held/unavailable rows remain visible rather than disappearing.
- The receipt provides one coherent next action without calling navigation
  study or completion.

Why it does not clear 17:

- The visible cross-product promises teach the opposite model: cards appear
  guaranteed even when the canonical manifest withholds them.
- No representative newcomer evidence shows that a user can explain all six
  jobs or why Quiz is separate. Source clarity is promising, but the
  operating-spec transfer criterion is not yet evidenced.
- Public status reasons expose implementation process rather than helping the
  visitor understand what she can do now.

### 2. Accuracy, status, persistence and reward trust — FAIL, 13/20

What passes:

- Only `available` items receive links.
- The current manifest truth is internally coherent: 12 available, three
  held, four planned and one unavailable.
- Current/past receipt state says opened on this device, not studied,
  completed, synced or rewarded.
- Full `getItem`/`setItem`/`removeItem` denial still permits ordering and gives
  honest memory copy.
- Try-On blocked-save copy leaves the user's text visible and does not say
  “Saved.”

Blocking defects:

- `blend-snap-corkboard-comic-candidate-v1.png` visibly guarantees “new every
  Wednesday · cards included.”
- `content/site/sv-welcome-tour.js` promises “a fresh pack of trading cards
  tucked inside.”
- Episode rails advertise Cards where the manifest holds or excludes them.
- The caption-versus-art contradiction is especially serious: two mutually
  exclusive states exist on the same page.

### 3. Positive LAiDIES brand contribution — FAIL, 15/20

Strengths:

- The JoJo counter, saturated café palette, ORDER ritual, in-place receipt and
  “just here for coffee” permission feel distinctly LAiDIES rather than like a
  generic learning dashboard.
- Desktop and mobile compositions remain cohesive, hospitable and visually
  memorable.
- No new unapproved visual was introduced by this candidate.

Defects:

- A beautiful, high-salience image carrying false product copy damages the
  brand more than a plain truthful placeholder would.
- User-facing copy such as “collection authority repair,” “Architecture
  exists” and “Episode index declares” reads like internal QA.
- Final visual approval remains an Ali taste gate, as the operating spec
  correctly records.

### 4. UX and accessibility — FAIL pending required evidence, 16/20

Verified locally:

- Native keyboard ORDER opens the receipt.
- Focus moves to the receipt heading and returns to the originating current or
  historical trigger on close.
- New, returning, historical, storage-denied and five failure states remain
  operable and truthful.
- 390px and an additional 320px probe had no document overflow; the large
  heading wrapped rather than being cut off.
- Reduced-motion media state is recognized and receipt focus remains correct.
- Full-page desktop/mobile receipt renders were inspected and the text menu is
  available independently of the image hotspots.

Still missing from the acceptance contract:

- native 200% browser zoom evidence;
- VoiceOver or equivalent screen-reader announcement/order verification;
- Safari/mobile-Safari evidence; and
- representative comprehension of the dense status/reason language.

The maker's 49 checks do not cover 320px, native zoom or a screen reader, even
though its evidence packet names them for independent review.

### 5. Frontend and data integrity — PASS, 18/20

Verified:

- Candidate SHA-256 hashes exactly match maker evidence.
- Schema, real dates, freshness, published-episode parity, duplicate/missing
  components, route safety/existence and card-admission rules pass the
  deterministic validator.
- Missing manifest/index, stale manifest, missing component and index mismatch
  disable every ORDER control, remove component links and expose the truthful
  Episode fallback.
- Additional independent probes passed:
  - same-count episode-slug remapping → disabled/fallback/no links;
  - non-available component with hidden route → disabled/fallback/no links;
  - invalid `verifiedOn` date → disabled/fallback/no links; and
  - all Web Storage methods throwing → receipt still opens with honest copy.
- Inline JS, local links, town consistency, scoped diff and steward-system
  checks pass.

Open maintainability risks:

- Browser and build-time validators duplicate the schema manually and already
  enforce slightly different detail; one shared validator or generated
  runtime contract would reduce drift.
- No bounded fetch timeout/retry exists, despite the operating spec naming late
  asynchronous responses.

### 6. Cross-product integrity and maintainability — FAIL, 12/20

The build packet named Episode Experience, Trading Cards and High as affected
champions, but the exact current cross-copy remains contradictory. The maker
evidence identifies only the Episode-page handoff and misses the welcome tour,
town directory and false text embedded in the café's own corkboard image.

The charter also still says the pack marker is written when the issue link is
opened, while the operating spec and implementation now write “pack menu
opened” when the receipt opens. That documentation drift will cause a later
agent to reintroduce incorrect behavior or copy.

## Exact rerun evidence

```text
node scripts/validate-blend-snap-packs.mjs --as-of=2026-07-25
PASS — schema 1.0.0 · 4 menus · 12 available · 3 held · 4 planned · 1 unavailable

node scripts/test-blend-snap-browser.mjs
PASS — 49 rendered checks

node scripts/check-inline-js.js
PASS — 353 scripts across 132 live pages

node scripts/check-local-links.js
PASS — 1,940 references across 110 pages

node scripts/check-town.js
PASS

node scripts/check-product-stewards.mjs
PASS — 65 products; 3/3 active

scoped git diff --check
PASS
```

Exact hashes independently matched:

| Artifact | SHA-256 |
|---|---|
| `blend-snap.html` | `382cd2f58095bf6dcbffa7bcb594de08dfff89b4eb6f7e3e67bbe06c74d20fe5` |
| `try-on.html` | `168eae8f0adb704abae51aa43f2282e4aa206585c7b7708d4a370797a18140a0` |
| `content/blend-snap-weekly-packs.json` | `1f5be9d9d4a80c8baff1cb098179859b2294ed6ad1f298bfef3d58ea12277f75` |
| `scripts/validate-blend-snap-packs.mjs` | `78316de61dc310441ee81b3af06e84ef1de95e8c684f45b60912775a6fa7b346` |
| `scripts/test-blend-snap-browser.mjs` | `fc123bf606502cf1e6e1d02e9711a44f55113a94ad370c46cda7bbe4f0a7215c` |

Rendered inspection used local headless Google Chrome at 1280px, 390px and
320px. Temporary screenshots were kept outside the repository and are not
release evidence.

## Bounded repair packet

### P0 — truth and brand admission

1. **Remove the false visible card guarantee.** Replace, revise or hide the
   corkboard artwork/status flyer so it does not say cards are included or
   guarantee a new Wednesday pack. This is a visual/copy repair requiring the
   normal Ali/brand gate; the current caption is insufficient.
2. **Reconcile every entry point.** At minimum repair:
   - `content/site/sv-welcome-tour.js`;
   - `content/site/sunnyvaile-directory.js`;
   - Episode 01–04 Study Pack rail copy; and
   - any indexed/search/social metadata carrying guaranteed-card or complete
     pack language.
   Entry copy should promise an episode pack **menu whose availability varies**,
   not cards or completeness.
3. **Separate public reason from internal evidence.** Add a concise
   user-facing status explanation to each manifest component and keep
   `evidence`, owner and authority detail for validators/dossier use. Do not
   render “collection authority repair,” “Architecture exists” or source-index
   implementation language to visitors.
4. **Add a contradiction gate.** Deterministically scan owned and known
   downstream copy for forbidden guarantees (`cards included`, fixed weekly
   drop, complete pack, all caught up) and verify the approved visual contains
   no contradictory embedded copy.

### P0 — independent accessibility completion

5. Run the exact repaired candidate at 320/390, native 200% zoom, keyboard and
   reduced motion; complete VoiceOver/Safari or explicitly hide/limit the
   launch promise until that evidence exists.
6. Test announcements and focus for current receipt, historical receipt and
   each fail-closed state—not only focus IDs.

### P1 — contract and maintenance

7. Reconcile `CHARTER.md` with the locked “pack menu opened on this device”
   event.
8. Add a bounded data-load timeout/retry state or remove the unimplemented
   late-response promise from the operating spec.
9. Run a small newcomer comprehension check: distinguish the six format jobs,
   identify the two Episode 04 pack pieces actually ready, and explain why the
   Quiz is adjacent.

## Retest and admission rule

Re-run the deterministic and rendered suites plus the new contradiction,
native-zoom/screen-reader and comprehension gates on one exact candidate.
Product quality, trust and brand must each score at least 17/20 independently.
No deployment or public verification should begin before those repairs pass.

No source, manifest, test, state, backlog, queue, painpoint, Git, deployment or
external system was changed by this independent review.
