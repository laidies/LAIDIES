# Post Office service-truth Repair 3 — maker evidence

**Date:** 2026-07-26  
**Status:** **BUILT AND VERIFIED LOCALLY — independent Repair 3 rejudge required**  
**Trigger:** `independent-rejudge-service-truth-repair-2-2026-07-26.md`
returned 86/100 FAIL because a repeated failed archive Retry recreated its
button but dropped keyboard focus to the document body.

## Exact bounded repair

`content/site/post-office.js` now carries an explicit `focusRecovery` state
through `loadArchive()` and `archiveFailure()`:

- initial background load calls `loadArchive(false)`;
- initial failure renders the visible recovery without stealing focus;
- activating Retry calls `loadArchive(true)`; and
- if that user-triggered check fails, the replacement Retry button receives
  focus after the failure DOM is rendered.

No archive admission, provider, newsletter, account, postcard, signature,
privacy, analytics, reward, shared copy or public behavior changed.

## Expanded retry proof

The deterministic source and artifact browser suite now:

1. renders a duplicate-number archive failure;
2. confirms initial failure does not focus Retry;
3. focuses Retry and activates it with Enter;
4. confirms a new archive request occurred;
5. confirms the replacement Retry is visible and focused;
6. confirms zero cards, links and images;
7. confirms zero attacker-origin attempts;
8. repeats steps 3–7 a second consecutive time; and
9. retains the final zero-external-completion assertion.

The previously independent 16-case archive matrix also passes in source and
artifact, including both focused retries.

## Source verification

```text
Post Office local contract: PASS
Post Office browser: PASS · 101 checks
External attempts blocked by deterministic harness: 69
External requests completed: 0
Independent archive matrix: PASS · 16 denials / 2 focused retries
Inline JavaScript: PASS · 352 scripts / 132 pages
Local links: PASS · 1,966 references / 110 pages
Town consistency: PASS
Product steward checker: PASS · 65 products
Scoped diff-check: PASS
```

## Fresh exact artifact

```text
Path: /tmp/laidies-post-office-r3-maker.e18LSL
Builder: 1,082 files / 959.58 MiB
Build report: 0 missing / 0 oversized
Builder warning: artifact exceeds 750 MiB
Public metadata validator: PASS
Artifact local contract: PASS
Artifact browser: PASS · 101 checks
External attempts blocked: 69
External requests completed: 0
Independent archive matrix: PASS · 16 denials / 2 focused retries
Source/artifact runtime byte parity: PASS
```

Matching source/artifact SHA-256:

| Runtime file | SHA-256 |
|---|---|
| `content/site/post-office.js` | `0c88f5508fda90c1b157c12b256fa1eb0e725fdd3f8eb3da6c32397700c6977c` |
| `post-office.html` | `0553f954fcdd8dd360389ec8a5225e4caa420a5440be799b9534211e38071b6c` |
| `postcard.html` | `058a55537782f0082c141d602cf520c6b87f13b44e383d33e5e1e8d9cc0b8dfd` |

## Preserved evidence and holds

- Repair 1 independent PASS at 87/100 remains unchanged.
- Repair 2 independent FAIL at 86/100 remains unchanged historical evidence.
- Repair 2 whole-archive positive-integer uniqueness, canonical issue-URL
  uniqueness and atomic rendering remain intact.
- Buttondown provider acceptance/confirmation/duplicate/unsubscribe/delivery
  and failure receipts remain held.
- Supabase magic-link and session lifecycle remains held.
- Clarity masking, provider payload and CDN legacy-query evidence remain held.
- Native Safari, VoiceOver, TalkBack, browser zoom/reflow and real mobile
  sharing remain held.
- Owner visual approval, referral/reward lifecycle, artifact-size decision,
  deployment identity and public-origin verification remain held.

No sign-in, subscription, email delivery, postcard delivery/open, account,
reward, deploy or public-live claim is accepted by this maker evidence.

## Independent Repair 3 rejudge contract

The judge should rerun the local contract and 101-check browser suite against
source and a newly built exact artifact, then independently:

1. confirm initial archive failure does not steal focus;
2. activate Retry with Enter against an invalid archive twice consecutively;
3. confirm each replacement Retry is visible and focused;
4. confirm each retry performs another request;
5. confirm zero cards, partial DOM, links, images, attacker attempts and
   completed external requests;
6. retain the 16-case archive identity/path matrix;
7. preserve all Repair 1 provider/signature/privacy/shared-copy behavior; and
8. preserve every nonlocal hold.

## Learning scan

**Failure repaired:** a recreated recovery control was visually present but
lost the interaction state carried by the control it replaced.

**Prevention rule:** after user-triggered asynchronous recovery replaces its
own DOM, restore focus deliberately; do not steal focus for background/initial
failures. Test at least two consecutive failures.

**Behind the Build angle:** “The retry button came back—and this time the
keyboard cursor came with it.”

The parent release owner should reconcile this rule into the canonical
painpoints ledger. This bounded repair did not edit shared operations.
