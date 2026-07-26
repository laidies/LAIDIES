# Chick Flicks independent exact-artifact review

**Review date:** 2026-07-25  
**Reviewer role:** independent judge; not the maker  
**Trigger:** `EXACT_ARTIFACT_CATALOGUE_AND_DISCOVERY_TEST`  
**Overall verdict:** **FAIL — bounded repair required before re-review**  
**Release/publication authority:** none  
**Media verdict:** unchanged — trailer and Episodes 1–4 motion films remain
**HOLD**  
**Visual verdict:** unchanged — `candidate-v1` room and rental-card art still
require Ali/Brand owner approval

## Decision

This candidate is a substantial improvement. The exact current five-tape
manifest is represented honestly; source and artifact are byte-identical for
the scoped files; released, forthcoming and broken-destination states are
distinct; issue handoffs are safe and real; favourites are explicitly
device-local; network/index/cover failures generally fail closed; keyboard,
reduced-motion and responsive happy paths work; and the trailer is promoted
only as an illustrated, captioned listen-along.

The independent gate does not pass because the catalogue is not yet governed by
its claimed authoritative index. The `All tapes` wall is hardcoded to Episodes
1–5: an added published Episode 6 becomes the stated latest release and enables
the latest-rental action while remaining absent from the wall. Any unknown or
cancelled status is advertised as “coming soon.” Destination requests have no
timeout, so one delayed `HEAD` can leave the whole store in an indefinite
checking state without retry. The recovery action also loses focus when it
hides itself. Shared homepage/tour/directory copy continues to make unsupported
“this week” claims.

Accuracy/trust is a non-compensable gate and scores below 17/20. No release,
publication, owner-visual or media approval follows from the passing checks.

## Exact candidate and artifact identity

**Artifact:** `/tmp/laidies-chick-flicks-candidate.BDB8aW`  
**Observed files:** 1,075 including `build-report.json`  
**Observed disk use:** approximately 1.1 GB (`du`); maker-reported apparent
payload is 958.41 MiB and remains above the builder’s 750 MiB advisory
threshold.

| Candidate file | Source SHA-256 | Artifact SHA-256 | Identity |
|---|---|---|---|
| `chick-flicks.html` | `61d29f676498a5a99a1fa075d1593f1657f408defb90f7423d520dc687c26146` | same | **PASS** |
| `content/chick-flicks.css` | `4dd6caed267a5b9f5ddf30f901714afc7934b4d20a25536e559fbf20873f38f0` | same | **PASS** |
| `content/episode-index.json` | `52f0d24e7a9ab4aa6d44164864a7f101c04fe2d8652158c646e4fefec52a240a` | same | **PASS** |
| `scripts/test-chick-flicks-contract.mjs` | `d841f485c0d37b1f28f401e8984291b8e8a6cada41b101d0bb2a95c5c22ae151` | not a public artifact input | recorded |
| `scripts/test-chick-flicks-browser.mjs` | `5a7e588387e8984e3e1ba39fbeca8ef0efd3162502de3216c146edf816055fac` | not a public artifact input | recorded |

All four published issue pages and all five current VHS box assets are present
in the artifact. This proves the local artifact tested here, not a release
commit, deployment or public-origin byte match.

## Reproduced maker checks

| Check | Independent result |
|---|---|
| Source/data contract | **PASS — 10/10 checks** |
| Source browser suite | **PASS — 16/16 journeys** |
| Exact-artifact browser suite | **PASS — 16/16 journeys** |
| Inline JavaScript | **PASS — 353 scripts / 132 pages** |
| Local links | **PASS — 1,940 references / 110 pages** |
| Town integrity | **PASS** |
| Product steward system | **PASS — 65 products, 3/3 active** |

The exact browser suites reproduced:

- correct EP 04 latest-released and four-released/one-forthcoming truth;
- every aisle, including the deliberate empty Creative state;
- keyboard selection and focus on released/forthcoming detail;
- safe EP 01 issue handoff and device-only last-rental state;
- reversible device-only favourite and blocked-storage truth;
- stale dates without manufactured current-week language;
- missing, empty, duplicate and malformed index failure;
- external, unsafe and missing issue rejection;
- broken-cover fallback without disabling a valid issue;
- retry without reload;
- reduced-motion scrolling;
- 320/390/1280 reflow, 44px targets and the 200% proxy; and
- illustrated, captioned trailer listen-along wording.

Those checks are valid but incomplete: they bind the current five-record shape
and do not exercise index growth, unrecognized statuses, indefinitely delayed
requests or recovery focus.

## Weighted gate score

| Gate | Weight | Score | Verdict | Judgment |
|---|---:|---:|---|---|
| Product intent and catalogue quality | 20 | **18/20** | **PASS** | A clear, useful and unusually memorable episode storefront. Released/forthcoming distinction and issue-first handoff are strong. |
| Accuracy, status and trust | 20 | **16/20** | **FAIL** | Current five-record truth passes, but unknown statuses become promises and shared entries still manufacture “this week.” |
| LAiDIES brand, visual and media discipline | 15 | **18/20 equivalent (13.5/15)** | **PASS WITH HOLDS** | Strong rental-store metaphor and visual hierarchy. No motion-film approval is implied. Final `candidate-v1` visual approval remains external. |
| UX and accessibility | 15 | **15/20 equivalent (11.25/15)** | **FAIL** | Core keyboard/mobile/reduced-motion/reflow journeys pass; indefinite loading and retry focus loss do not. VoiceOver, contrast and real 200% browser zoom remain open. |
| Technical/data integrity and maintainability | 20 | **12/20** | **FAIL** | Safe URLs and exact destinations are strong, but the wall is hardcoded outside the authoritative index, status schema is permissive and request recovery is unbounded. |
| Cross-product and release impact | 10 | **13/20 equivalent (6.5/10)** | **FAIL / HOLD** | The canonical storefront is coherent, but homepage/tour/directory freshness language, absent Screening Room dossier, media holds and artifact-size advisory remain unresolved. |

**Weighted total: 77.25/100 — FAIL.**

Non-compensable floors:

- product/content quality: **18/20 — PASS**;
- accuracy/trust: **16/20 — FAIL**; and
- positive brand contribution: **18/20 — PASS WITH OWNER VISUAL HOLD**.

## Gate evidence

### Released, forthcoming and current truth — partial PASS

For the exact current manifest:

- Episodes 1–4 are `published`, have safe same-origin issue paths and return
  successful destination checks;
- Episode 5 is `draft` and appears as forthcoming without a rental action;
- EP 04 is the highest-numbered rentable record and is accurately called
  **latest released**;
- stale release dates do not create “this Wednesday,” “new this week” or
  “current release” language; and
- the loading and failure screens make no release claim.

However, `releaseState()` treats every non-`published` value as forthcoming.
An independent fixture containing only:

```json
{"number":1,"title":"Cancelled item","status":"cancelled","issueUrl":null}
```

rendered the tape as `data-release-state="forthcoming"`, announced “Cancelled
item, coming soon,” and counted it as one coming-soon tape. A cancelled,
removed, held, typoed or unknown status is not evidence of forthcoming release.

### Authoritative catalogue and index growth — FAIL

`AISLES.all` is hardcoded to `[1, 2, 3, 4, 5]` rather than derived from the
validated index. In an independent fixture that added published Episode 6 with
a verified local issue destination:

- the page headline became `EP 06 IS THE LATEST RELEASED TAPE`;
- the latest-rental button became enabled; but
- the wall still contained only `01, 02, 03, 04, 05`.

The most important new tape therefore disappears from the catalogue while the
arrival banner promotes it. This breaks the promise that Chick Flicks is the
canonical storefront generated from one authoritative index and creates a
weekly maintenance trap.

Topic aisles may remain curated, but `All tapes` must include every valid index
record, and every record must either have deliberate aisle membership or a
visible unfiled/default policy that fails CI when editorial mapping is absent.

### Issue handoff safety — PASS for the exact artifact

- URL parsing requires same-origin HTTP(S) and an `/issues/*.html` path.
- Published entries become rentable only after a successful destination
  request.
- External, `javascript:`, missing and broken local routes do not expose a
  rental link.
- The tested EP 01 action navigated to `/issues/issue-01.html`, whose title
  matched the indexed episode.
- Selection and navigation do not claim watching, listening, learning,
  completion, reward or account persistence.

This is strong bounded evidence. It must be repeated against the release
artifact and public origin because redirects/provider behavior can differ.

### Network, malformed data and cover recovery — partial PASS

Missing/503, empty, duplicate and structurally malformed indexes fail closed;
retry restores the catalogue; unsafe and missing issue destinations become
unavailable; and a broken cover receives a readable fallback while a verified
issue remains rentable.

There is no `AbortController`, timeout or equivalent deadline around the index
fetch or per-episode destination checks. When one valid destination `HEAD` was
delayed, the page remained at `Checking the tape manifest…`; the rent button
was disabled and no retry was visible. A permanently stalled request can
therefore strand the whole catalogue indefinitely, contrary to the operating
specification’s bounded delayed-fetch recovery rule.

### Local favourites and returning state — PASS

- `laidies_favorite_episode` and `laidies_cf_last_rental` are described only as
  browser/device state.
- Favourite add/remove is reversible.
- A blocked favourite write reports failure without “saved,” Resident Card,
  member, account or cross-device language.
- Stale favourite IDs are not converted into a current catalogue claim.
- A rental click is only an issue handoff; last-rental storage is not treated
  as completion.

No identity, durable reward or account path is inferred.

### Keyboard, focus, live regions and reduced motion — partial PASS

**Passes**

- native buttons/links support keyboard use;
- tape selection focuses `#cfRental`;
- forthcoming selection focuses an honest unavailable result;
- aisle counts use `role="status"` and `aria-live="polite"`;
- rental detail is an atomic polite live region;
- reduced motion substitutes `auto` scrolling and removes relevant transforms;
- 320/390/1280 widths do not create document overflow in Chrome;
- primary aisle/tape targets meet the tested 44px minimum.

**Fails or remains unproved**

- activating Retry immediately hides the focused button; after successful
  recovery, focus is on `BODY`, not the restored catalogue heading, status or
  latest action;
- an indefinitely delayed request exposes no focusable retry/recovery action;
- the maker’s 200% result is a CSS zoom/reflow proxy rather than accepted
  browser zoom evidence; and
- Safari, VoiceOver and independent colour-contrast evidence are absent.

### Brand, visuals and media holds — PASS WITH EXPLICIT HOLDS

Rendered desktop and mobile inspection shows a distinctive video-store world,
clear latest-release hierarchy, legible released/forthcoming VHS labels,
consistent navy/cyan/pink/mint/paper styling and a useful rental-card detail.
The metaphor clarifies discovery rather than concealing the action.

The candidate correctly says:

- trailer **illustrated, captioned listen-along**;
- released tape opens the full issue;
- Screening Room is the receiving experience; and
- selection/favourite is not media completion.

It does not claim approval for trailer or Episodes 1–4 motion films. Existing
Episode Media Quality evidence keeps those films on HOLD. The two
`candidate-v1` room/rental-card assets are technically present and visually
coherent, but this independent technical/product review cannot grant Ali’s
visual approval.

### Cross-product impact — FAIL before release promotion

The storefront itself avoids unsupported freshness. Other reachable surfaces
do not:

- `index.html` calls Chick Flicks “this week’s episode”;
- `content/site/sunnyvaile-directory.js` advertises “This week’s rental”;
- `content/site/sv-tour-checkin.js` says “This week’s episode”; and
- `content/site/sv-welcome-tour.js` says “Pull this week’s episode” and “one
  tape a week.”

`issues/issue-trailer.html` also tells visitors to “Grab this week’s.” These are
not backed by the current index/freshness contract. The building cannot be
promoted as the one canonical storefront while its major entry points make a
different time-sensitive promise.

`watch.html` uses the correct illustrated-listen-along boundary, but the
registry-referenced Screening Room dossier is still absent. That missing
ownership contract and the media holds remain release dependencies, not
defects this packet may silently solve.

## Bounded repair packet

### P0 — required before independent re-review

1. **Make the index authoritative for the whole catalogue.**
   - Derive `All tapes` from every validated index record.
   - Keep curated topic mappings separately, but assert that every record has a
     deliberate mapping/default state.
   - Add source and exact-artifact tests for adding, removing and renumbering
     an episode. The latest released tape must always be visible on the wall.

2. **Define and enforce the release-status schema.**
   - Admit only named statuses with explicit behavior.
   - Show “coming soon” only for the status that authoritatively means
     forthcoming.
   - Reject or label cancelled, removed, held, unknown and missing statuses as
     unavailable; never turn them into a promise.
   - Add adversarial fixtures for each status.

3. **Bound manifest and destination verification.**
   - Add a documented abort timeout for the index and destination checks.
   - On timeout, fail closed with the same understandable retry state.
   - Test one delayed index, one indefinitely delayed destination and recovery
     after timeout in source and exact artifact.

4. **Repair recovery focus.**
   - When Retry hides, move focus to a loading status that announces the new
     attempt.
   - On success, move focus to the restored catalogue heading/latest action;
     on failure, return focus to the visible Retry action.
   - Add exact rendered assertions.

5. **Reconcile freshness fan-out.**
   - Episode Experience/Platform must replace or prove every “this week” /
     weekly-rental claim across homepage, directory, tour, check-in and trailer
     issue.
   - Add one semantic fan-out contract so shared entry copy cannot diverge from
     the index/freshness authority.

### P1 — required before release acceptance

6. Run clean-state comprehension with representative first-time visitors:
   identify the store’s job, released versus forthcoming, where “rent” goes,
   the starting episode and the next optional route.
7. Complete actual 200% browser zoom, independent contrast and
   Safari/VoiceOver journeys, including loading, retry, aisle result, rental
   result, favourite failure and broken cover.
8. Obtain Ali/Brand owner’s explicit ruling on both `candidate-v1` visuals.
   Technical inclusion and this brand score are not owner approval.
9. Preserve the trailer/Episodes 1–4 motion-film HOLD until Episode Media
   Quality independently clears each title; do not use Chick Flicks copy or
   visual approval to bypass that gate.
10. Address the release artifact’s 750 MiB advisory threshold through the
    release owner. Do not remove required media or alter the catalogue merely
    to lower size without dependency verification.

## Re-review conditions

Re-review a new hash-bound source and exact artifact after P0 repairs. Repeat
the ten contract checks, all sixteen existing journeys and the new
index-growth/status/timeout/focus/fan-out cases. A bounded PASS would establish
only local catalogue/discovery readiness. Public-origin, analytics/privacy,
owner-visual, Screening Room and motion-media approvals remain separate gates.
