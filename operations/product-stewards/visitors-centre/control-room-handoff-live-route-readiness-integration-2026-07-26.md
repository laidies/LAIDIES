# Control Room handoff — Visitor's Centre live-route readiness integration

**Product/system ID:** `visitors-centre`  
**Owner task ID:** `019f9f74-65db-7003-a43f-fa8965f4b675`  
**Dispatch source:** `019f9ac4-28d9-73b2-b54e-2fc5641749f2`  
**Exact status:** **VERIFIED LOCALLY — INDEPENDENTLY ADMITTED LOCAL LIVE-ROUTE
INTEGRATION; NOT DEPLOYED OR PUBLIC; OWNER RECEIPTS AND NATIVE/HUMAN/PUBLIC
GATES REMAIN.**  
**Evidence time:** 2026-07-26 12:02:25 PDT (America/Vancouver)

## Exact action

Under the Control Room's bounded Visitor-route lock:

- edited only `visitors-centre.html`, its route contract test and Visitor
  dossier/evidence;
- consumed the checksum-bound shared Platform browser runtime and projection;
- bound the route to payload SHA-256
  `3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361`;
- removed all embedded destination states, summaries and limitations;
- preserved the five-part arrival grammar and existing route visual language;
- represented the current all-null owner intake as 17 held
  owner-receipt-pending routes;
- preserved 17 generic name/routes in no-JS and invalid-input failures;
- enforced `completionClaim=false` and receiving-product authority;
- retained Card/account non-inference rather than wiring identity;
- removed the copied postcard composer, first-15, explainer and founder stack;
  and
- did not edit KSVL tour, Card, analytics, global/shared style or Platform
  source files.

## Exact files, hashes, tests and receipts

| Evidence | SHA-256 |
| --- | --- |
| `visitors-centre.html` | `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743` |
| `scripts/test-visitors-centre-contract.mjs` | `756f82553c89b946d1763b4d8b5edafa7c3f4b53f6d7356ca557efcb5c030e14` |
| `test-live-route-readiness-v1.mjs` | `a0d2ef93603538ea6ebc23b99495b7257f3ba3cc616fb0adef659fa3b00182ad` |
| maker result snapshot | `0c35cd0dd4498b196eefbf3d497306bb61deebd3f43bd5620cf8b3197f21754e` |
| independent current result | `7e13ed10cee80a4f4c45bc0c6202d16d1febaf357e955e3b7bb6e701e7907112` |
| shared projection artifact | `adce724425984cb67a39ec5f8013e0a6e3dd341e3b40d09e8714b83940e37880` |
| shared payload | `3baba976cf9217b091a92e8fcc762eb6c7b0d5ffe903ebbc7e8f75837bb96361` |
| shared browser runtime | `68eab175cb61065e554ab8ad2fb20eac9b22fc8b38ad9b6d3aa88178e1ea425e` |
| shared crosswalk | `c5136958e1296c71338bdcb2eb9e271a70c6b80f3760514f9f7464d230ce7f26` |
| independent report | `95625a52eef0d082a10ba7fc780c64b9511515904fbdaa12f1e465328262c92f` |
| route admission receipt | `81e14d9424d3afc861c9d592853006cd619afbc5e44ee0d032caa858045c225b` |

Independent acceptance owner:
`visitors_centre_independent_route_acceptance_20260726`.

```text
node scripts/test-visitors-centre-contract.mjs
PASS — 17 routes, exact projection binding, no embedded owner prose

node operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs
PASS — destinations=17 current=3 fail_closed=12 idempotency=3 schema=draft2020

node operations/product-stewards/visitors-centre/test-live-route-readiness-v1.mjs
INDEPENDENT PASS — 779 checks, 0 failures
```

Independent scores: product 19/20, trust 20/20, brand 18/20,
UX/accessibility 18/20, technical/source integrity 20/20.

## Observed versus inference

Observed:

- exact hash tuple held before and after independent rerun;
- current valid envelope renders 17 held owner-pending routes;
- missing/corrupt/incomplete/checksum/runtime failures retain 17 generic routes;
- every rendered semantic record has `completionClaim=false`;
- 1440/390/320, four storage/visitor conditions, no-JS, directory failure,
  focus/Escape, reduced motion, text spacing, 44px map targets and overflow;
- desktop normal and mobile fail-closed visual states; and
- no manual destination readiness prose remains in the route.

Not proved:

- any destination owner receipt—the current 17 intake paths are all null;
- native Safari/VoiceOver/zoom or human comprehension;
- deployment, rollback, release binding or public-origin behavior;
- Ali owner-experience approval.

## Lock, files/services and collision truth

The granted lock was used only for the owned Visitor route and dossier/evidence.
No shared Platform, KSVL tour, Card, analytics, global style, registry, queue or
ledger file was edited. No provider, migration or credential was used.

The targeted owner-entry preflight briefly observed unrelated concurrent Town
Entry state at 12:00 PDT. No shared file was edited here. Its final 12:07:28 PDT
rerun passed:
`PRODUCT STEWARD SYSTEM PASS; owner_entry_product=visitors-centre:PASS`.

## Dependencies, next trigger and acceptance

Control Room + Functionality & Platform:

- admit authoritative owner receipts in exact checksum-bound batches;
- seal a successor projection and bind it to the route/release artifact;
- assign new independent route acceptance for every changed tuple; and
- schedule native Safari/VoiceOver, comprehension, release and public-origin
  gates.

**Exact next trigger:** an admitted successor projection containing one or more
authoritative destination-owner receipts, or assignment of the native/human
acceptance lane for the current all-held route.

## Proactive improvement

The first 779-check run isolated a 320px overflow to the injected shared
`.svgh-nav` ending at 333.94px while the Visitor composition fit. The route has
a local containment rule and now passes. Functionality & Platform should add
the same 320px test to the shared header itself, so every route does not need a
local repair. No shared header file changed here.

## Authority truth

- Public authority used: **NO**
- Deploy authority used: **NO**
- Spend/subscription authority used: **NO**
- External service/data authority used: **NO**
- Ali approval used or inferred: **NO**
- Shared integration authority used: **YES — bounded Visitor live-route lock only**
