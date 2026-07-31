# Control Room handoff — shared header 320px repair candidate v1

**System:** Platform Reliability / shared header  
**Owner task:** `019f9f59-6f59-7500-af47-455f39d1c0c5`  
**Candidate:** `SVGH-320-2026-07-26-v1`  
**Status:** VERIFIED LOCALLY — HOMEPAGE + VISITOR INDEPENDENT ACCEPTANCE REQUIRED  
**Evidence time:** 2026-07-26 12:42:57 PDT  
**Maker lock used:** checksum-bound `content/site/sv-global-header.js`,
Platform-owned tests and Platform dossier evidence

## Visible product result

The raw shared header now fits a 320px reflow viewport without changing labels
or removing Account status, Join or Menu:

```text
before: nav right=333.94px, document=334px, viewport=320px — HOLD
after:  nav right=312px,    document=320px, viewport=320px — PASS
```

The candidate uses the same compact spacing already accepted route-locally by
Visitor's Centre. Desktop and 390 computed style/geometry remain identical to
the pre-change run because the new rule applies only at ≤340px.

## Exact frozen candidate

```text
source before  f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93
source after   807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa
receipt        299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049
evidence       1a36e936a35558bc2297a35090fabc63825e750d7d260b641bcf18bca1c94370
matrix result  1bf8f531985515201d8927b42747d12492bb018cd7f16b96f8e15794006e4c7c
raw test       faec28899a0477d0039c9cc4cdc62641ea7671be9da4dbe27558e5125db1f047
matrix test    4aec9082fa1beb640ce40b1ec545c2658e426824a2a119bdc1550e7f55a5ddff
```

Bound page inputs:

```text
Homepage          c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772
Visitor's Centre  de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743
Sorority House    350be1c0f055a61fed0db9299e57a4408b6883ab6651e0838f25a4b3fcfdde79
```

Durable files:

- `shared-header/v1/shared-header-320-repair-candidate-v1-2026-07-26.json`;
- `evidence-shared-header-320-repair-candidate-v1-2026-07-26.md`;
- `shared-header/v1/evidence-candidate/matrix-result.json`;
- `shared-header/v1/evidence-candidate/` — 12 checksum-bound screenshots.

## Tests observed

```text
SHARED HEADER 320 CHARACTERIZATION PASS shared_status=PASS raw_nav_right=312 visitor_nav_right=312
SHARED HEADER CONSUMER MATRIX PASS routes=3 js=9 no_js=3 keyboard=3 zoom200_proxy=3
VISITORS CENTRE CONTRACT PASS
SORORITY HOUSE BROWSER PASS checks=138 external_provider_attempts=0
PASS: Post Office local contract (privacy, truthful failures, source binding)
SUNNYVAiLE HIGH CONTRACT PASS (13 checks)
PRODUCT STEWARD SYSTEM PASS owner_entry_product=platform-reliability:PASS
```

The matrix covers Homepage, Visitor and Sorority at 1440/390/320, three no-JS
states, reduced motion, unchanged labels, keyboard activation, Menu open,
Escape close and focus retention. The 320 matrix is the bounded local reflow
proxy for a 640px layout viewport at 200% browser zoom; native browser zoom,
Safari and VoiceOver remain independent-owner/release proof.

## Files changed and boundaries held

Changed:

- `content/site/sv-global-header.js` — one ≤340px compact rule;
- Platform-owned shared-header tests/evidence;
- Platform state/backlog/handoff and learning record.

Not changed:

- sitewide tokens, font families, navigation labels or route content;
- Homepage, Visitor or Sorority source;
- Brand candidates;
- live/public/deploy state;
- accounts, providers, credentials or spending;
- aggregate measurement contract/snapshot/test.

Aggregate measurement provider delivery remains **BLOCKED** and its three
bound hashes remain unchanged.

## Independent acceptance and next action

Platform is the maker, not the sole judge.

1. Town Entry / Homepage owner independently tests exact header candidate
   `807bbe6…` against Homepage `c437da1…`.
2. Visitor's Centre owner independently tests the same candidate against route
   `de8e536…`, including its current local containment and native page
   semantics.
3. Control Room admits or holds only those exact receipts. Any source/page
   hash change requires a new candidate receipt and affected matrix rerun.
4. Do not remove Visitor's route-local containment until its owner separately
   accepts that cleanup under a route lock.

No deploy/public authority was requested or used. Integration is not complete
until both named independent owners accept the frozen candidate.
