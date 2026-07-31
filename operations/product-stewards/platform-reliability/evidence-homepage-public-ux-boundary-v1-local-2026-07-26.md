# Local evidence — Homepage public-UX boundary v1

**Observed:** 2026-07-26T15:54:45-0700 (PDT)  
**Status:** VERIFIED LOCALLY — RELEASE NOT PERFORMED  
**Authority:** `D-2026-07-26-069`

## Literal result

The current Homepage markup no longer mounts readiness/current status,
receipt or white-card UI. Platform removed the dormant readiness receiver from
`content/site/homepage.js`, so reattaching the shared runtime cannot silently
restore operational prose or overwrite Homepage actions.

Backstage release artifacts remain present and independently valid. They are
not Homepage content sources.

## Bound tuple

| File | SHA-256 |
|---|---|
| `index.html` | `8231d1290b15a0a867ee063e947f39b3cc22a8c54a4efa741eff60e0c75a1eb3` |
| `content/site/homepage.js` | `bcf7e67e22e79928167637cacc0a9ba9cf95c5778807a82537a2d8336a5683fa` |
| `content/site/readiness/v1/readiness-runtime-v1.js` | `cc2e960bbe31bef60aa1f071c9d275080119a28dc1b8869e8091b36e5fb4b956` |
| `content/site/readiness/v1/entry-readiness-projection.v1.json` | `5a5bf791f273874535fcbf4fa88f1a3bddb1004512c04d8e2c733b5da61a3ab0` |
| `public-ux-boundary/v1/homepage-public-ux-boundary-v1.json` payload | `a9a2022797a35dd6c08a8601ceec3c84ff1f587d8c0d1860034d6da1b4494e38` |

## Tests

```text
HOMEPAGE PUBLIC UX BOUNDARY PASS files=4 negative=10 public_consumer=NONE
READINESS PROJECTION V1 PASS destinations=17 current=3 fail_closed=12 idempotency=3 schema=draft2020
SHARED ENTRY READINESS V1 PASS destinations=17 missing_owner_receipts=17 current_promotions=0 runtime=browser-compatible artifact=curated
```

The negative set injects the readiness runtime, a status mount, rejected
route/readiness headings, failure text, owner-admission text, a 64-character
hash, the stale June 24 claim, the receiver API, the current-content adapter
and a direct projection fetch. All ten reject.

## Evidence ceiling and next action

No deploy, public-origin check, provider/cache mutation or public claim was
performed. Visitor’s Centre retains its separately owned semantic receiver;
this correction does not change that route.

Any future current-episode integration requires an exact admitted episode
package plus a separate Town Entry/Brand/Platform lock. Platform may supply
structured facts, never visitor-facing language or composition.

## Learning scan

Existing `BTB-178` already records the baseline-provenance and missing
public-copy/vocabulary/no-white-box gate, including the prevention rule that
backend diagnostics may expose semantic state to an interface layer but never
supply visitor-facing strings. No duplicate painpoint entry was added.
