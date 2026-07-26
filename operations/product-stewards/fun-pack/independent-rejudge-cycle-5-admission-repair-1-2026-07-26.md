# THE EXTRA CREDIT / Fun Pack — Independent Repair 1 Rejudge

**Date:** 2026-07-26  
**Scope:** Cycle 5 admission-authority Repair 1  
**Decision:** **PASS — bounded authority repair accepted; product remains HOLD**

## Executive decision

Repair 1 closes the prior P0 authority failure. Candidate shelf data can no
longer assert owner disposition, child route, episode relationship, return
approval or activity. A child can render only from a separate Ed25519-signed,
current, exact receipt verified against the public key pinned in the page.

The production authority contains zero receipts, so current truth remains four
episodes, four candidates and zero admitted activities. The shelf does not
overrule Mme CLAi-O, FAiRY Godmother, Dream Phone or Girl Talk and does not
claim completion, learning or reward from selection.

This is a bounded trust PASS, not product acceptance. A secure empty shelf is
honest but still does not deliver a useful Extra Credit experience. Product
usefulness remains below its floor until at least one independently admitted
episode-specific extra demonstrates real value and a clean return.

The rejudge also found a narrower P1 for the first future receipt: a correctly
signed receipt can name a double-slash asset path or a canonical-looking asset
that does not exist. Both pass runtime admission. Close that asset
canonicality/existence gap before issuing any production receipt.

## Score and floors

| Dimension | Score | Judgment |
|---|---:|---|
| Product usefulness and content quality | 13/20 | **Hold:** zero admitted user value |
| Accuracy, safety, privacy and trust | 18/20 | Repair 1 authority floor passes |
| Positive LAiDIES brand contribution | 18/20 | Truthful restraint and voice pass |
| UX, accessibility and reliability | 17/20 | Local keyboard/focus/mobile pass; native evidence held |
| Technical and data integrity | 15/20 | Signed authority works; asset canonicality/existence P1 |
| **Total** | **81/100** | **Bounded authority PASS; product HOLD** |

The earlier 66/100 FAIL is closed for its authority defect. The product-quality
floor is deliberately not waived or averaged away.

## Authority rejudge

Accepted:

- The registry is candidate description data only.
- Candidate rows contain no admission, owner disposition or child route.
- The page pins an Ed25519 key ID and SPKI public key.
- The separate authority response must repeat the exact pinned identity/key.
- Every receipt is verified over deterministic, recursively sorted canonical
  JSON excluding only `signature`.
- Receipt, child/owner, episode, relationship, return, activity and complete
  URL bindings are exact.
- Receipt IDs and child/episode relationships are unique.
- Dates use a strict real-calendar UTC parser and must be current and ordered.
- The exposed candidate snapshot is deeply frozen; attempted mutation does not
  create an activity.
- Invalid data fails closed with one alert, zero cards and no fallback child.

Authority-only public-key replacement is rejected. An unsigned/bad-signature
coherent Dream Phone receipt is rejected. The positive path succeeds only
when the test harness explicitly substitutes an ephemeral public key into the
served page, signs the exact receipt with its in-memory private key and uses a
matching authority response.

Replacing both the page trust root and authority key can authorize another
key; that is inherent in a static page trust root, not child-owner delegation.
It keeps deployment integrity and public-origin provenance as mandatory holds.

## Independent correctly signed semantic attacks

The independent rejudge substituted a test-only public key, signed every
mutated receipt correctly, and ran the validator in both source and fresh
artifact. This separates semantic rejection from mere signature failure.

Correctly signed mutations rejected:

- wrong key ID, issuer, owner disposition or child;
- wrong child route;
- wrong episode ID, number or relationship;
- wrong return status, source or exact route;
- inflated activity URL;
- literal or encoded traversal;
- backslash, control, query or fragment asset routes;
- extra receipt field;
- impossible, future, expired or reversed dates.

A correctly signed exact receipt was accepted once, proving the verifier was
not simply rejecting every receipt.

Also rejected by the supplied 59-check rendered suite:

- missing/malformed candidate or authority data;
- pinned-key replacement in the authority response;
- coherent shelf-owned self-approval;
- malformed/unsigned receipt;
- extra registry, child, episode, receipt and activity fields;
- duplicate receipt ID/relationship;
- arbitrary local child route;
- unapproved URL query/hash state;
- failed Retry replacement without focus loss.

### Duplicate-field boundary

Duplicate receipt IDs and relationships fail closed. Unknown object keys fail
closed. Raw duplicate JSON property names are normalized by `response.json()`
before schema/signature validation and therefore cannot be detected as a raw
representation. The signature still binds the resulting semantic object, but
future receipt production should reject duplicate JSON keys before signing and
in release validation.

## P1 asset finding

Correctly signed receipts with these image paths were accepted in source and
artifact:

```text
/assets//dream-phone-cordless-crop.png
/assets/does-not-exist.png
```

The first violates the claimed exact canonical path contract because empty
segments are not rejected. The second shows that admission proves a signed
string, not a packaged/decodable asset.

Before the first production receipt:

1. reject empty path segments and repeated slashes;
2. require the signed asset to exist in the exact release artifact;
3. decode/load it in the source and artifact positive journey;
4. fail the whole admission closed on missing or failed media;
5. add raw duplicate-key rejection to the signing/release validator.

This P1 does not allow the unsigned shelf to overrule a child owner, so it does
not reopen the repaired authority P0.

## Current truth and user claims

Verified source and artifact:

```text
published episodes=4
candidate children=4
production signed receipts=0
admitted activities=0
```

Selection or shelf visitation claims no:

- completion;
- learning or mastery;
- reward;
- child approval;
- account or persistence outcome.

Current/archive selection, canonical Episode and Bag returns, unapproved
query/hash removal, 320 px reflow and Retry focus retention pass.

## Source and fresh-artifact evidence

Source:

```text
FUN PACK CONTRACT PASS · episodes=4 · candidates=4 · signed_admissions=0 · independent-authority
FUN PACK PRODUCT PASS checks=59 external_requests_blocked=130
INLINE JS PASS · 352 scripts / 132 pages
LOCAL LINKS PASS · 1,966 references / 110 pages
CHECK-TOWN PASS
```

Fresh artifact:

```text
Path: /tmp/laidies-fun-pack-r1-rejudge.YX1XGZ
Builder: 1,082 public files / 959.58 MiB
Public metadata: PASS
Artifact-root contract: PASS without private steward dossiers
Artifact browser: PASS · 59 checks / 130 external requests blocked
Source/artifact byte parity: PASS
```

Artifact hashes:

| File | SHA-256 |
|---|---|
| `games/fun-pack.html` | `1beb7af78234d4715b62cc8f8db5ff213beeb7937a94442fde3c5a9c68c15fb6` |
| `games/data/fun-pack-registry.json` | `93018dc05c77d5e0f428b81859acf0ccea9fdf8aa40b57c801d90347740db2d8` |
| `games/data/fun-pack-admissions.json` | `08c578688083f96d1eef47b32a5f4386c25d4ead6df1bfb4187e6babd2015073` |

No `operations/product-stewards` dossier is packaged. No private key, signer,
key-generation or signing code is present in the public artifact. The only
filename containing “secret” is an unrelated visual asset.

## Exact remaining holds

1. At least one independently admitted, genuinely useful episode-specific
   extra with representative-user value and clean return evidence.
2. Asset path canonicality, artifact existence and decoded-load P1.
3. Duplicate raw JSON key rejection in signing/release validation.
4. A documented, access-controlled receipt issuance/rotation/revocation
   operation; no private signer in the public package.
5. Owner visual/comprehension approval.
6. Safari, VoiceOver, TalkBack and native zoom.
7. Analytics/VOC contract and baseline.
8. Every child product’s own remaining gates.
9. The 959.58 MiB artifact-size warning.
10. Deployment integrity, public origin and release provenance.

No child or product promotion is approved by this report.

## Learning scan

**Reusable success:** separating candidate presentation from independently
signed admission closes the aggregator self-approval failure.

**Prevention rule:** a valid signature proves who approved the exact payload;
it does not prove that a referenced artifact exists or loads. Admission gates
must verify authority, canonical identity and packaged dependency integrity.

The parent release owner should reconcile this lesson into the canonical
pain-points ledger. This independent rejudge intentionally changed no shared
operating record.
