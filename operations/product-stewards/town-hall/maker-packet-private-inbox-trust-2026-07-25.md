# Town Hall Maker Packet — Private Inbox Trust

**Date:** 2026-07-25  
**Status:** VERIFIED LOCALLY — INDEPENDENT JUDGE, LIVE INTAKE, STAFF OPERATIONS, OWNER VISUAL REVIEW AND RELEASE REMAIN HELD

## Problem

Town Hall's comment-card UI implied reading and staff notification that had not
been proved. More seriously, the anonymous client chained an inserted-row read
onto a write even though the inspected RLS policy permits anonymous insert but
not anonymous read. That could persist a card and still surface an error,
encouraging a duplicate. Signed-in intake also copied session email without an
approved purpose or retention contract.

## Evidence

- Source and baseline migration trace.
- Town Hall charter, deep dive, backlog and newly created operating spec.
- W3C status-message guidance, OWASP input/DoS guidance and Supabase RLS
  documentation, accessed 2026-07-25.
- Fresh synthetic desktop/mobile rendered evidence with every external request
  denied.
- Exact generated public artifact: 1,078 files / 961.4 MiB; Town Hall page and
  controller byte-identical to source.

No real feedback, Supabase mutation, credential, production request, deployment
or publication was used.

## Intended outcome

A visitor can explore the three-station room and submit through a locally
testable private-inbox contract that:

- distinguishes accepted delivery from reading/review/reply;
- sends only the minimum declared fields;
- does not require a post-insert read;
- preserves the note on every failure or unknown outcome;
- exposes progress/results accessibly; and
- truthfully scopes Town Regular and previous-card cues to this device.

## Work breakdown and craft owners

| Work | Maker owner | Required independent owner |
| --- | --- | --- |
| Product/civic promise and journey spec | Town Hall champion | Product/trust judge |
| Feedback controller and minimal payload | Frontend maker | Security/privacy judge |
| RLS/write-contract reconciliation | Platform maker | Backend/RLS judge |
| Keyboard/mobile/live-status behavior | UX/accessibility maker | Accessibility judge |
| Visual room/form capture | Product maker | Ali for final art/taste decision |
| Staging intake, abuse controls and triage | Future backend + operations makers | Security/privacy/staff-operations judges |

## Implemented local slice

- Created `OPERATING-SPEC.md`.
- Extracted feedback behavior into `content/site/town-hall-feedback.js`.
- Added a deliberate `__testOnly` adapter seam for injected synthetic sessions,
  receipts and failures.
- Removed `submitter_email` and post-insert `.select().single()`.
- Added bounded success, rejected, configuration/auth and ambiguous-outcome
  states; unknown outcomes warn against duplicates.
- Added `role=status`, polite atomic live announcements, matching length
  constraints and visible radio-chip focus.
- Narrowed arrival, Comments and Town Regular claims to private/device-local
  truth.
- Added deterministic source and browser tests.

## Dependencies

- Current Supabase auth/table/RLS contract.
- A future isolated server intake and its staging resources.
- An authorised staff owner for triage, retention, access and incidents.
- Shared identity/Closet contract for the device-local Town Regular handoff.
- Ali for final room-art direction and any public accountability model.

## Acceptance tests

1. `node scripts/check-town-hall-contract.mjs`
2. `PLAYWRIGHT_CORE_PATH=... node scripts/test-town-hall-browser.mjs`
3. Repeat browser suite with `TOWN_HALL_ROOT` pointing at the exact generated
   public artifact.
4. `node scripts/check-local-links.js`
5. `node scripts/check-inline-js.js`
6. `node scripts/check-town.js`
7. `node scripts/validate-public-metadata.mjs <artifact>`
8. `git diff --check -- <Town Hall maker scope>`

## Independent judges

Required before release:

- product/brand/trust;
- accessibility/UX;
- privacy/security/RLS;
- backend reliability and ambiguous-outcome handling; and
- Ali visual approval for the inherited/interim room treatment.

The maker does not approve its own work.

## Integration and release gate

The local page/controller/test changes may enter an integrated candidate only
after independent judgement. Launch promotion of the feedback form remains
`HOLD` until an isolated server intake, abuse controls and the staff lifecycle
are implemented and proven. Deployment/public verification are separate,
authorised steps.

## Measurement

After privacy approval, measure only controlled aggregate station/start/accepted
and failure-class events. Never include note, subject, email, name, user ID or
raw service error. Pair aggregates with authorised minimised triage review;
volume alone is not trust or satisfaction.

## Rollback

Remove the new controller script reference and restore the prior inline
controller only if an integrated candidate fails before release. Do not restore
the false-read copy, session-email collection or anonymous returning-row read.
If the eventual server intake is unhealthy, disable/hide the form with honest
unavailability copy while preserving the Mayor and Noticeboard stations.

## Maker self-score

| Dimension | Score | Reason |
| --- | ---: | --- |
| Product quality | 18/20 | Core room and feedback states are coherent; staff lifecycle remains held. |
| Accuracy, safety and trust | 19/20 | Claims and payload are minimised; live abuse controls are not yet built. |
| Positive LAiDIES brand contribution | 17/20 | Civic voice remains playful without false promises; final room art still needs Ali. |
| Implementation and evidence | 19/20 | Source plus exact-artifact deterministic suites pass; no live integration proof. |

This is a maker score, not an independent verdict.
