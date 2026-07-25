# Visitor's Centre clean-entry evidence — 2026-07-25

**Status:** REPORT READY — candidate inspection plus local static transport only. The requested browser/device checks were not available and are not represented as passes.

## Candidate

Tested the dated local artifact at `operations/launch/eod-2026-07-25/local-public-artifact/`, bound by the complete sorted file-hash manifest SHA-256 `f304735e284015569fa5388e9cf52959af2bfaff48b4cac726948187cc56989a`. `visitors-centre.html` SHA-256 is `633b02d9f8f09d63677c86817bd50294016c26fc34bc56f7e35cba77e6cb2052`.

The live source tree was not used as a release candidate because it is dirty. No source artifact was changed.

## Bounded journey matrix

| Required state | Result | Observation |
|---|---|---|
| Homepage → Centre route exists | PASS (static/HTTP) | Homepage contains labelled `/visitors-centre.html` links; Centre returned HTTP 200 from the candidate server. |
| Named directory → Library reveal → route arrival | PASS (static/HTTP) | Shared directory defines `library` as “SUNNYVAiLE LIBRAiRY” with `/library.html`. Centre `openCard()` sets its CTA href to that exact destination; Library returned HTTP 200. This is route-arrival evidence only. |
| Destination reveal/live announcement | PARTIAL (static only) | Centre has `#vc-building-card` with `aria-live="polite"`, and selection updates title, one-line description and CTA. No assistive-technology/browser announcement was tested. |
| Map parity / named non-map choice | PARTIAL (static only) | `#vc-directory` is a native select populated from the same shared building data as map spots. Mobile/desktop usability and map interaction were not rendered. |
| Back / Escape / focus restoration | FAIL | Back button closes the card, but no Escape handler exists in Centre code and no focus is returned to the initiating directory/spot. This fails the explicit operating-spec requirement. |
| Shared-directory data failure | FAIL (static finding) | `var buildings = window.SV_BUILDINGS || []` means failed/missing shared script leaves an empty select and no Centre-specific plain named fallback or homepage recovery link. This fails the required degraded state. |
| Reduced motion | PARTIAL (static only) | Candidate contains `@media (prefers-reduced-motion: reduce)` transition/scroll overrides; actual rendering not tested. |
| 390×844, desktop, keyboard-only, no-JS, real mobile Safari | NOT TESTED | Browser control had no available browser; no rendered or device run could be performed. |
| Postcard honesty | FAIL (static finding) | Successful native-share promise resolves to visible text “Sent from the Visitor’s Centre.” The Centre contract says it cannot claim sent/delivered/opened without an authoritative lifecycle event. This is out of scope to repair here, but it blocks a full honesty pass. |
| Member/newsletter claim truth | FAIL (static finding) | First-route copy says Resident Card can “unlock the member route” and Post Office can get a Wednesday release “delivered”; public-promise registry limits account/newsletter lifecycle proof. These need owner-label reconciliation before promotion. |

## Interpretation

The only passing completion is bounded intentional **arrival** at `/library.html` as a correctly named route. It does not establish that the visitor read a book, received help, subscribed, watched media, became a member, earned a reward, or completed any receiving-product journey (BTB-069).

The room-first direction is not judged visually here; Ali’s visual ruling remains pending. The candidate’s shared directory file is generally numbered, but the Visitor’s Centre own map controls are built separately without number text; no map-memory behavior was observed in this static check.

## Blockers / smallest repair scope

1. Implement and test Centre Escape close plus focus restoration to the initiating select/map control.
2. Provide a visible named destination/homepage fallback when `SV_BUILDINGS` is unavailable.
3. Replace unobservable postcard/member/newsletter completion wording with action-true handoff wording, after owner review.
4. Repeat the browser matrix at desktop and 390×844, including reduced motion, shared-data failure, no-JS, keyboard/focus and clean-user comprehension, against a newly exact-bound artifact.

## Learning scan

No new painpoint entry was added because these are direct confirmations of the existing VC-03/VC-04 release gates and BTB-069, not a newly discovered class of failure. Reusable prevention rule: a directory's route reveal and HTTP 200 prove navigation wiring only; the recovery, focus and receiving-product outcome must each have their own evidence.
