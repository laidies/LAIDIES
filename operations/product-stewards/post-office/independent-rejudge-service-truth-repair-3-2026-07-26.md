# Post Office — Independent Repair 3 Rejudge

**Date:** 2026-07-26  
**Scope:** Repair 3 repeated archive-Retry focus behavior  
**Decision:** **PASS — bounded Repair 3 accepted locally; product promotion remains held**  
**Score:** **91/100**

## Executive verdict

Repair 3 closes the only failure in the 86/100 Repair 2 rejudge. Initial
background archive failure renders recovery without stealing focus. After a
keyboard user focuses **Retry the archive check** and activates it with Enter,
each failed request replaces the failure UI and deliberately focuses the new
Retry button.

The independent source and fresh-artifact matrix repeated this sequence three
times against both a duplicate collection and a mixed valid/attacker-invalid
collection. Every activation made a fresh archive request. Every replacement
Retry was visible and focused. No attempt produced a card, link, image,
partial DOM, attacker-origin request or completed external request.

Repair 2 archive uniqueness/atomicity and the accepted Repair 1 provider,
signature, privacy and shared-copy behavior remain intact.

## Weighted score and floors

| Dimension | Score | Rejudge |
|---|---:|---|
| Product usefulness and coherence | 18/20 | Pass |
| Accuracy, privacy and trust | 19/20 | Pass |
| LAiDIES brand contribution | 18/20 | Pass |
| UX and accessibility | 18/20 | **Pass — repeated keyboard recovery is complete locally** |
| Technical and data integrity | 18/20 | Pass |
| **Total** | **91/100** | **Bounded PASS** |

The UX floor that failed Repair 2 now passes. Native assistive-technology
evidence remains a separate release hold.

## Exact focus lifecycle

The implementation distinguishes the two contexts:

```text
initial background load -> loadArchive(false)
user activates Retry    -> loadArchive(true)
failed user retry       -> archiveFailure(true) -> replacement Retry.focus()
```

Accepted behavior:

- initial failure does not move focus to Retry;
- Retry is a native button and Enter activates it;
- the old button is disabled before the request;
- an invalid response rebuilds the fail-closed recovery;
- only a user-triggered retry restores focus to the replacement button;
- repeated retries do not degrade to document-body focus.

## Independent repeated keyboard matrix

Two independent scenarios ran against source and the fresh artifact:

1. duplicate episode number with different issue URLs;
2. one valid row mixed with attacker-origin image and issue paths.

For each scenario:

- initial request count: 1;
- consecutive Enter retries: 3;
- final archive request count: 4;
- every retry made a fresh request;
- every replacement Retry was visible and focused;
- initial failure did not focus Retry;
- cards after every attempt: 0;
- archive links/images after every attempt: 0;
- attacker-origin attempts: 0;
- completed external requests: 0.

This exceeds the required two consecutive retries and reproduces identically
in source and artifact.

## Archive integrity preserved

The complete published collection is still validated before DOM replacement
or assignment of any `href`/`src`. The 101-check suite preserves:

- positive-integer unique episode numbers;
- unique canonical issue URLs;
- slash-normalized collision rejection;
- numeric-string/case/encoded/backslash/control/traversal/query/hash rejection;
- mixed valid/invalid whole-archive failure;
- zero partial or repeated cards;
- zero attacker-origin attempts;
- honest publication language with no newsletter-delivery inference.

## Repair 1 behavior preserved

Source and artifact evidence continues to prove:

- optional Signed handles remain bounded preview/share text only;
- handle/note remain absent from canonical URLs, storage and custom analytics;
- Buttondown handoff is not treated as subscription or delivery;
- the held account-status counter collects no email and claims no account;
- shared header, homepage, directory, tour and Chick Flicks copy retains
  request/held/local truth;
- no sign-in, subscription, delivery, opening, joining or reward outcome is
  invented.

## Mechanical evidence

### Source

```text
Post Office local contract: PASS
Post Office browser: PASS · 101 checks
External attempts blocked by deterministic suite: 69
External requests completed: 0
Independent Retry matrix: PASS · 2 scenarios / 3 retries each
Inline JavaScript: PASS · 352 scripts / 132 pages
Local links: PASS · 1,966 references / 110 pages
Town consistency: PASS
```

### Fresh exact artifact

```text
Path: /tmp/laidies-post-office-r3-rejudge.EL1wfS
Builder: 1,082 files / 959.58 MiB
Existing warning: artifact exceeds 750 MiB
Public metadata validator: PASS
Artifact contract: PASS
Artifact browser: PASS · 101 checks
Independent Retry matrix: PASS · 2 scenarios / 3 retries each
Source/artifact runtime parity: PASS
```

Artifact hashes:

| Runtime file | SHA-256 |
|---|---|
| `content/site/post-office.js` | `0c88f5508fda90c1b157c12b256fa1eb0e725fdd3f8eb3da6c32397700c6977c` |
| `post-office.html` | `0553f954fcdd8dd360389ec8a5225e4caa420a5440be799b9534211e38071b6c` |
| `postcard.html` | `058a55537782f0082c141d602cf520c6b87f13b44e383d33e5e1e8d9cc0b8dfd` |

## Preserved holds

- Buttondown acceptance, confirmation, duplicate, unsubscribe, delivery and
  failure receipts;
- Supabase magic-link request/callback/session lifecycle;
- Clarity masking, actual provider payload and CDN legacy-query retention;
- native Safari, VoiceOver, TalkBack, zoom/reflow and real mobile sharing;
- owner visual approval;
- referral/reward lifecycle;
- the 959.58 MiB artifact-size decision;
- deployment identity and public-origin verification.

No sign-in, subscription, email delivery, postcard delivery/open, account,
reward, deploy or public-live claim is accepted by this report.

## Learning scan

**Reusable success:** focus restoration is conditional on user intent. Initial
background failure announces recovery without moving focus; a failed
user-triggered retry restores focus after replacing its own DOM.

**Prevention rule:** exercise multiple consecutive asynchronous failures and
assert both a new request and the final active element after every DOM
replacement.

The parent release owner should reconcile this lesson into the canonical
pain-points ledger. This independent rejudge intentionally changed no shared
operating record.
