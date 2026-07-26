# Resident Card Repair 1 — independent rejudge

**Status:** INDEPENDENT REJUDGE PASS — BOUNDED DEVICE-LOCAL CARD;
**FIX BEFORE PROMOTION HOLDS REMAIN**

The maker did not participate in this verdict. No runtime, maker evidence,
provider, account, public Card, deployment or promotion was changed.

## Verdict

Repair 1 resolves the original stored-XSS/shared-consumer defect within its
bounded local scope. Resident status, MAiKEOVER and Closet now use the same
strict read-only v1 projection. Untrusted storage cannot become HTML, an avatar
URL, a reward/community mutation, a reserved handle or an account assertion.
The original Closet execution payload remains non-executable in source and the
fresh artifact.

This passes the local identity-security repair; it does **not** turn a
device-local Card into an account, public profile, reserved identity or
cross-device feature. It does not clear owner visual, native accessibility,
analytics or public-origin release gates.

## Independent scorecard

| Category | Score | 17/20 floor | Finding |
|---|---:|---|---|
| Product / customer value | 16/20 | FAIL | Honest newcomer, returning, recovery and legacy-review states work, but no comprehension study or account/public continuation exists. |
| Accuracy, safety and trust | 18/20 | PASS | Strict closed projection, non-mutating recovery and hostile value rejection pass across consumers. |
| LAiDIES brand / visual quality | 14/20 | FAIL | Copy is materially more truthful; vanity/status hierarchy still lacks Ali’s visual ruling. |
| UX / accessibility | 15/20 | FAIL | Keyboard focus and 320/390/1280 reflow pass; Safari, VoiceOver and real zoom remain unverified. |
| Technical / integrity | 18/20 | PASS | Shared source/artifact contract, safe DOM avatar and exact consumer tests pass; whole-artifact size remains a release risk. |
| **Total** | **81/100** | **HOLD** | Local repair passes; promotion/release remains held by failed non-compensable floors. |

## Reproduced evidence

| Check | Source | Fresh exact artifact |
|---|---|---|
| `test-resident-card-shared-contract.mjs` | PASS 34/34 | PASS 34/34 |
| `test-resident-card-contract.mjs` | PASS 31/31 | PASS 31/31 |
| `test-resident-card-browser.mjs` | PASS 127/127 | PASS 127/127 |
| Runtime authority bytes | — | PASS: `resident-card.html`, `maikeover.html`, `laidies-card.html`, shared contract and status runtime identical |

Artifact: `/tmp/laidies-resident-rejudge.r2Tram`, 1,087 files, 959.59 MiB,
0 missing, 0 individually oversized. The existing >750 MiB warning remains.

## Adversarial coverage and findings

- Invalid JSON, arrays, null/prototype-shaped objects, unknown keys, legacy
  per-field values, markup, controls, bidi text, overlong values and invalid
  backgrounds all fail closed without deletion or upgrade.
- The original `cardAvatarUrl` attribute payload, `javascript:`, `data:`,
  external/protocol-relative URLs, traversal, double-slashes, encoded/query/
  fragment URLs, SVG paths and hostile avatar slugs cannot render or execute.
  Canonical packaged assets render through a DOM-created image with no handler
  attribute.
- Closet consumes the exact shared valid projection; legacy identity cannot
  masquerade as current Card state. The original Closet execution defect stays
  non-executable, and neither reward nor community sentinel storage changes.
- The Sorority House does not escalate a local Card into community access.
  Browser routes made no Supabase/magic-link/profile request.
- Storage denial reports a non-mutating unavailable state. The status runtime
  contains no delete/write path; MAiKEOVER remains the sole explicit atomic
  local-envelope writer.
- 320, 390 and 1280 px browser journeys have no horizontal overflow and expose
  keyboard focus. Native Safari/VoiceOver/zoom is not inferred from this.

## Remaining holds

1. Ali visual/taste approval of MAiKEOVER’s vanity/station and status hierarchy.
2. Newcomer/returning comprehension study, especially local versus account/
   public/Card wording.
3. Native Safari, VoiceOver, 200%/400% zoom, reduced-motion and real-device
   verification.
4. Exact committed/public-origin release provenance and the 959.59 MiB artifact
   risk.
5. Privacy-approved analytics/customer evidence; persistent runner is not
   wired.
6. Account, public Card, handle reservation and cross-device identity remain
   unavailable pending separate identity/privacy/RLS/two-device work.

## Packaging guidance

Admit only the Repair 1 runtime allowlist: `resident-card.html`, shared
contract/status runtime, scoped MAiKEOVER and Closet hunks, and the exact
tests/dossier records named in the repair packet. Preserve static packaged
avatar assets only when referenced by the canonical contract. Do not add legacy
storage data, account SDK/configuration, provider keys, public profile routes,
reward/community authority, unreviewed avatar paths or operations evidence to
the public artifact.
