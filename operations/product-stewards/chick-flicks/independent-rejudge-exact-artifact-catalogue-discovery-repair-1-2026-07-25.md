# Chick Flicks independent exact-artifact repair re-judge

**Review date:** 2026-07-25  
**Reviewer role:** independent judge; not the maker  
**Trigger:** re-judge of every P0 in
`independent-review-exact-artifact-catalogue-discovery-2026-07-25.md`  
**Overall bounded verdict:** **PASS — local catalogue/discovery repair clears
the P0 re-review gate**  
**Release/publication authority:** none  
**Media verdict:** unchanged — trailer and Episodes 1–4 motion films remain
**HOLD**  
**Visual verdict:** unchanged — `candidate-v1` room and rental-card art still
require Ali/Brand owner approval

## Decision

The bounded P0 repair passes. The episode index now governs the whole catalogue,
including newly added, removed and renumbered records. Only `draft` promises a
forthcoming tape; every other non-released or unrecognized state remains
unavailable. Manifest and destination requests have a five-second default
deadline and fail closed. Retry focus moves through loading, repeated failure
and restored success. Homepage, directory, tour, check-in and trailer-issue
copy no longer manufacture a weekly release. Source and exact artifact each
passed all 22 rendered journeys.

This is a local catalogue/discovery verdict only. It does not approve motion
media, the two candidate visuals, public-origin behavior, Screening Room
ownership, assistive-technology readiness, launch, deployment or publication.

## Exact repair candidate and identity

**Artifact:** `/tmp/laidies-chick-flicks-repair2.iScgNR`  
**Observed files:** 1,077 including `build-report.json`  
**Builder report:** 1,076 public files; 961.34 MiB; zero missing and zero
individually oversized files  
**Disk use:** approximately 1.1 GB  
**Builder advisory:** still above 750 MiB

| Governed file | Independently reproduced SHA-256 | Source/artifact identity |
|---|---|---|
| `chick-flicks.html` | `b1c83c4ef4085cf61c6ff0471455936744bd4bfccbf3a3c814bd098553e55e26` | **PASS** |
| `content/chick-flicks.css` | `f8565a5ee7128afef3a6beccbf7c998858ccb4fa9d6d14bfc225e70ea4490338` | **PASS** |
| `content/episode-index.json` | `52f0d24e7a9ab4aa6d44164864a7f101c04fe2d8652158c646e4fefec52a240a` | **PASS** |
| `index.html` | `3133089a5b15b7c8d772a6bddb9ee0cf285123a3c80561cc743cca17d800974c` | **PASS** |
| `content/site/sunnyvaile-directory.js` | `12661e58bc52646b16002ecbe34e739588c559a3c698eb45bdb18fbbf02195be` | **PASS** |
| `content/site/sv-tour-checkin.js` | `d43d331f8bc52053ede1de1fc502ba4ce1c28c3eb6b52857f2a244562a8ce52c` | **PASS** |
| `content/site/sv-welcome-tour.js` | `20f00850a4d6cdd460a9e5bdd36ce43c9bd897af6c94ddacd393a19756c0ee7e` | **PASS** |
| `issues/issue-trailer.html` | `a4163288535e2fec8a882bf92ab81afd1e38e5e1382626d90b06165f3b86a339` | **PASS** |

The four released issue pages, trailer issue and all five current VHS box
assets were independently compared and are byte-identical between source and
artifact.

Test identities:

- contract:
  `8e6c63355c1a26f8f7bff026f4a4202a0cf3bdf08b8d7984b8b8d50053ad3551`
- browser:
  `3eab3e4a665cc6bc2f89c52bf82682fba6c27677147c7fdfedb89235c0ca22a9`

## Independently reproduced evidence

| Evidence | Independent result |
|---|---|
| Expanded source/data contract | **PASS — 11/11 checks** |
| Source browser suite | **PASS — 22/22 journeys** |
| Exact-artifact browser suite | **PASS — 22/22 journeys** |
| Governed source/artifact hashes | **PASS — all identical** |
| Released issue/trailer/box artifact identity | **PASS — 10/10 files** |
| Scoped diff check | **PASS** |

The two 22-journey runs independently reproduced:

- truthful EP 04 latest-released and four-released/one-draft inventory;
- every aisle and the deliberate empty Creative aisle;
- released/forthcoming keyboard focus and exact EP 01 issue handoff;
- device-only rental/favourite truth and blocked-storage recovery;
- stale dates without current-week invention;
- missing, empty, duplicate and malformed index failures;
- added EP 06 visible as latest in All tapes and Unfiled;
- removed EP 02 and renumbered EP 08 reflected without page-code changes;
- `draft` as the only forthcoming status;
- cancelled, removed, held, unknown and missing statuses as unavailable;
- external, unsafe and missing issue rejection;
- broken-cover fallback without disabling a valid issue;
- retry without reload;
- delayed-index timeout;
- indefinitely delayed destination timeout followed by failed and successful
  retries;
- loading focus, visible-retry focus and restored-latest-action focus;
- reduced-motion keyboard behavior;
- 320/390/1280 reflow and 44px primary targets;
- the existing 200% CSS proxy;
- illustrated, captioned trailer listen-along wording; and
- reconciled homepage, directory, welcome-tour, tour-check-in and trailer-issue
  wording.

## P0 disposition

### P0.1 — authoritative catalogue: PASS

`All tapes` returns `episodes.slice()` from the validated manifest rather than
a fixed episode list. Curated topic aisles remain separate. Records absent
from every curated mapping remain visible under **Unfiled**.

Adversarial results:

- added published EP 06 became the latest released tape and appeared in both
  All tapes and Unfiled;
- removing EP 02 removed it from the wall; and
- renumbering draft EP 05 to EP 08 put EP 08 on the wall and in Unfiled.

The previous failure—promoting a latest episode that was absent from the
catalogue—did not reproduce.

### P0.2 — strict release status: PASS

The runtime has three mechanical outcomes:

- verified `published` plus a safe successful local issue destination:
  `released`;
- `draft`: `forthcoming`; and
- published-but-unverified, cancelled, removed, held, unknown or missing:
  `unavailable`.

The hostile-status fixture produced exactly one forthcoming tape and five
unavailable tapes. None of the unavailable tape labels promised “coming
soon.”

### P0.3 — bounded verification: PASS

The exact candidate documents and implements a five-second default for both
manifest and destination requests using `AbortController`. The test-only
override shortens the same path without replacing it.

- A delayed index aborted into the honest catalogue-unavailable state with a
  visible Retry action.
- A delayed destination aborted the complete verification attempt rather than
  making the tape rentable or leaving the page checking indefinitely.
- No release claim survived either timeout.

### P0.4 — recovery focus: PASS

Retry now:

1. hides the old retry action and focuses `#cf-title` while it announces
   “Checking the tape manifest…”;
2. returns focus to the newly visible Retry action after another failure; and
3. focuses the restored latest-rental action after success, or the title when
   no verified release exists.

Both source and exact-artifact journeys reproduced all three transitions.

### P0.5 — freshness fan-out: PASS

The governed fan-out now uses released-state language:

- homepage: “Released episodes” and “latest released episode”;
- directory: “Latest released tape”;
- tour check-in: “Latest released episode”;
- welcome tour: “Pull a released episode”; and
- trailer issue: “Grab a released tape” / “Choose a released tape.”

The old Chick Flicks phrases—“this week’s rental,” “this week’s episode,”
“Pull this week’s episode,” “one tape a week” and “Grab this week’s”—were
absent from all five exact-artifact surfaces. The trailer remains explicitly
an illustrated, captioned listen-along.

## Weighted gate score

| Gate | Weight | Score | Verdict | Judgment |
|---|---:|---:|---|---|
| Product intent and catalogue quality | 20 | **19/20** | **PASS** | One authoritative index now governs the whole wall, with an explicit visible Unfiled policy. Human first-visit comprehension remains P1. |
| Accuracy, status and trust | 20 | **18/20** | **PASS** | Strict status handling, exact destination checks, timeout failure and cross-entry copy now agree. A wider dated freshness authority remains separate future work. |
| LAiDIES brand, visual and media discipline | 15 | **18/20 equivalent (13.5/15)** | **PASS WITH HOLDS** | The rental-store metaphor and listen-along boundary remain strong; candidate visuals and all motion films retain their external holds. |
| UX and accessibility | 15 | **18/20 equivalent (13.5/15)** | **PASS LOCALLY WITH HOLDS** | Keyboard, focus recovery, reduced motion, reflow and degraded states pass. Actual 200% zoom, contrast, Safari and VoiceOver remain unproved. |
| Technical/data integrity and maintainability | 20 | **19/20** | **PASS** | Dynamic catalogue growth, deliberate Unfiled handling, strict states, bounded requests and source/artifact identity remove the original maintenance failures. |
| Cross-product and release impact | 10 | **16/20 equivalent (8/10)** | **PASS FOR BOUNDED P0 / RELEASE HOLD** | Named entry copy is reconciled. Screening Room ownership, public-origin checks, media approval and artifact-size policy remain separate release dependencies. |

**Weighted total: 91/100 — BOUNDED PASS.**

Non-compensable floors:

- product/content quality: **19/20 — PASS**;
- accuracy/trust: **18/20 — PASS**; and
- positive LAiDIES brand contribution: **18/20 — PASS WITH OWNER VISUAL AND
  MEDIA HOLDS**.

## Remaining bounded repair

**No remaining P0 defect from the original review reproduced.**

The following are unchanged P1 or independent release gates and must not be
collapsed into this bounded pass:

1. representative clean-state comprehension;
2. actual 200% browser zoom;
3. independent colour-contrast evidence;
4. Safari and VoiceOver journeys across loading, retry, aisle, rental,
   favourite failure and broken-cover states;
5. Ali/Brand owner approval of both `candidate-v1` visuals;
6. independent clearance of the trailer and each Episodes 1–4 motion film;
7. Screening Room dossier/ownership;
8. public-origin, analytics/privacy and field-performance evidence; and
9. release-owner disposition of the 961.34 MiB artifact and 750 MiB advisory.

Until those applicable gates pass, do not describe Chick Flicks as fully
release-approved, do not approve or promote the motion films, and do not infer
visual approval from this catalogue/discovery judgment.

## Authority boundary

This record verifies the named local source and exact artifact only. It makes
no source, CSS, test, state, backlog, queue, painpoint, Git, deployment,
publication or external-system change and grants no public-release authority.
