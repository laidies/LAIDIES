# Post Office — Independent Repair 2 Rejudge

**Date:** 2026-07-26  
**Scope:** archive uniqueness, atomicity and retry behavior in Repair 2  
**Decision:** **FAIL — COLLECTION INTEGRITY PASSES; REPEATED RETRY LOSES KEYBOARD FOCUS**  
**Score:** **86/100**  
**Mutation boundary:** report only; no implementation, state, registry, queue,
Git, deployment, provider, credential or external-service mutation.

## Executive verdict

Repair 2 closes the collection-identity P1 found by the 87/100 Repair 1
rejudge. Duplicate episode numbers, duplicate canonical issue URLs, ambiguous
numeric identities, noncanonical paths and mixed valid/invalid collections
all fail the whole archive closed before any card, image or link is created.
No independent hostile fixture produced an attacker-origin attempt or a
completed external request.

The bounded rejudge nevertheless fails. When a keyboard user activates
**Retry the archive check** and validation fails again, `archiveFailure()`
replaces the focused button with a new button but does not move focus to it or
to the replacement status. Focus falls to `<body>`. The same result occurs in
source and the newly built exact artifact.

The visible Retry control remains available, so this is not a collection
integrity or service-truth regression. It is an incomplete accessible recovery
loop: a keyboard or assistive-technology user must rediscover the archive
controls after every failed retry.

Repair 1's provider, signature, privacy and shared-copy behavior remains
accepted. This FAIL is limited to Repair 2's repeated-retry acceptance.

## Weighted score and floors

| Dimension | Score | Rejudge |
|---|---:|---|
| Product usefulness and coherence | 18/20 | Pass — the archive is atomic and provides an honest recovery action. |
| Accuracy, privacy and trust | 19/20 | Pass — malformed or ambiguous collections cannot create publication or delivery claims, partial DOM or attacker requests. |
| LAiDIES brand contribution | 18/20 | Pass — the Post Office remains a clear, useful counter rather than a fake delivery/account funnel. |
| UX and accessibility | 14/20 | Fail — repeated keyboard retry drops focus to the document body. |
| Technical and data integrity | 17/20 | Pass — whole-archive uniqueness and canonical-path integrity hold; recovery focus state is incomplete. |
| **Total** | **86/100** | **Fix and rejudge** |

The heavily weighted product, trust/privacy and LAiDIES-brand floors all pass.
The explicit Repair 2 recovery acceptance does not.

## Collection-level independent attacks

The maker's 90-check source and artifact suites pass. I separately injected
16 hostile published collections:

1. duplicate episode number with different issue URLs;
2. duplicate canonical issue URL with different episode numbers;
3. leading-slash/no-leading-slash canonical URL collision;
4. numeric-string episode identity;
5. floating-point episode identity;
6. zero episode identity;
7. negative episode identity;
8. `NaN`-like string identity;
9. case-variant issue route;
10. issue query;
11. issue fragment;
12. percent-encoded issue path;
13. backslash issue path;
14. traversal issue path;
15. valid row mixed with an invalid local row; and
16. valid row mixed with attacker-origin image and issue paths.

Every source and artifact case produced:

- zero archive cards;
- zero partial or repeated cards;
- zero archive links;
- zero archive images;
- zero attacker-origin attempts; and
- zero completed external requests.

The implementation validates the complete published collection into a
temporary admitted array before `archive.replaceChildren()` and before any
`href` or `src` assignment. Exact positive-integer episode numbers are unique,
and issue URLs are unique after the Repair 1 canonical local-path gate.

## P0 repair required

### PO-R2-J1 — Failed Retry replaces the focused control without restoring focus

Independent source and artifact sequence:

1. serve a collection with a duplicate episode number;
2. wait for the fail-closed archive and visible Retry button;
3. focus Retry;
4. activate it with Enter;
5. return the same invalid collection;
6. wait for the replacement Retry button.

Observed in both environments:

```json
{"tag":"BODY","className":"svb-page po-page"}
```

Expected: focus moves to the replacement Retry button or an intentional
focusable recovery/status target. The implementation currently disables the
old button, reruns the fetch, then `replaceChildren()` removes that focused
button. `archiveFailure()` creates the next control but does not focus it.

Required bounded repair:

1. distinguish initial-load failure from a user-initiated retry;
2. after a failed retry, move focus to the newly rendered Retry control or a
   deliberate recovery heading/status with a clear accessible name;
3. do not steal focus on the initial background archive failure;
4. prove two consecutive keyboard retries each leave focus at the intended
   recovery target;
5. retain zero cards/links/images and zero attacker attempts after each retry;
6. rerun the complete source and fresh-artifact suites.

## Repair 1 behavior preserved

Source and artifact contract/browser evidence continues to prove:

- archive images and destinations use admitted canonical local paths;
- protocol-relative, external, encoded, backslash, control, traversal,
  query/hash and unexpected routes fail closed;
- optional Signed handles remain bounded presentation/share text only;
- note and handle remain absent from public URLs, storage and custom analytics
  fields;
- newsletter UI names Buttondown and never treats popup initiation as a
  subscription receipt;
- the Post Office account-status section collects no email and claims no
  account or magic-link result;
- shared homepage, header, directory, welcome-tour and Chick Flicks wording
  retains request/held/local truth; and
- no sign-in, subscription, delivery, opening, join or reward outcome is
  invented.

## Independent mechanical evidence

### Source

- Post Office local contract: **PASS**.
- Post Office browser suite: **PASS — 90 checks**.
- External attempts blocked by the deterministic suite: **69**.
- External requests completed: **0**.
- Independent archive matrix: **PASS — 16 denial collections**.
- Independent repeated keyboard retry: **FAIL on first retry — focus becomes
  `<body>`**.
- Inline JavaScript: **PASS — 352 scripts / 132 pages**.
- Local links: **PASS — 1,966 references / 110 pages**.
- Town consistency: **PASS**.
- Product steward system: **PASS — 65 products / 1 of 3 active lanes**.

### Newly built exact artifact

- Path: `/tmp/laidies-post-office-r2-rejudge.wckizs`
- Builder: **PASS — 1,082 files / 959.58 MiB**.
- Build report: **0 missing / 0 oversized**.
- Existing internal warning above 750 MiB remains.
- Public metadata: **PASS**.
- Post Office local contract: **PASS**.
- Post Office browser suite: **PASS — 90 checks**.
- External attempts blocked by the deterministic suite: **69**.
- External requests completed: **0**.
- Independent archive matrix: **PASS — 16 denial collections**.
- Independent repeated keyboard retry: **FAIL on first retry — focus becomes
  `<body>`**.

Source/artifact SHA-256 parity:

| Runtime file | SHA-256 |
|---|---|
| `content/site/post-office.js` | `bf76de59f1a61f76ecf055599d181969e9fc279eafeedc7f6556e5f4c876462a` |
| `post-office.html` | `0553f954fcdd8dd360389ec8a5225e4caa420a5440be799b9534211e38071b6c` |
| `postcard.html` | `058a55537782f0082c141d602cf520c6b87f13b44e383d33e5e1e8d9cc0b8dfd` |
| `content/site/sv-welcome-tour.js` | `5d36298d6c41b0476a356da223ca43926cadec78ff2b43073b4c613053071511` |
| `content/site/sunnyvaile-directory.js` | `f96b8b7f3fcec181f7953a251888b09e87c6e7092b36b586b10fb4c2967b5151` |
| `content/site/sv-global-header.js` | `f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93` |
| `index.html` | `1a07003d01a9344898eda7fd359581fa60fe491622e0219fb82374e8f49c2d79` |
| `chick-flicks.html` | `990b4123d4945499c00aee5ed63791b2d6be3ab4404f61e6cdcd6aa1abbc4381` |

## Preserved holds

- Buttondown acceptance, confirmation, duplicate, unsubscribe, delivery and
  failure receipts;
- Supabase magic-link request/callback/session lifecycle;
- Clarity masking, actual analytics payloads and CDN/provider legacy-query
  retention;
- native Safari, VoiceOver, TalkBack, browser zoom/reflow and real mobile
  sharing;
- owner visual approval;
- referral/reward lifecycle;
- the 959.58 MiB artifact-size release-owner decision;
- deployment identity and public-origin verification.

No sign-in, subscription, email delivery, postcard delivery/open, account,
reward, deploy or public-live claim is accepted by this report.

## Learning scan

**Failure:** the recovery action was recreated visually but its interaction
state was discarded with the old DOM node.

**Prevention rule:** when a user-triggered retry replaces its own failure UI,
test focus after the replacement—not only that another button is visible.
Exercise at least two consecutive failures.

**Behind the Build angle:** “The retry button came back. The keyboard cursor
did not.”

The canonical painpoints ledger was not edited because this rejudge was
explicitly report-only.
