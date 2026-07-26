# THE EXTRA CREDIT — Cycle 5 admission Repair 1 maker evidence

**Status:** VERIFIED LOCALLY — INDEPENDENT REJUDGE REQUIRED  
**Trigger:** `independent-review-cycle-5-admission-p0-2026-07-26.md`,
66/100 FAIL.

## Bounded repair

The shelf registry is now candidate data only. It contains four episode
contexts and four child descriptions, but no owner verdict, disposition,
admission, child route, episode relationship, return approval or activity.

Future admission requires a separate
`games/data/fun-pack-admissions.json` receipt verified with Ed25519 against the
public key pinned in `games/fun-pack.html`. The exact signed payload binds:

- receipt/key/issuer identity;
- owner disposition `ADMITTED`;
- exact child ID, pinned owner and canonical child route;
- exact episode ID, number and verified relationship;
- exact Fun Pack return contract;
- bounded activity copy, canonical asset and complete canonical activity URL;
- real, current and ordered issue/recheck dates.

No private key or signer is present in the public candidate. The public
authority carries the pinned verification key and **zero production
receipts**, so the current result is four episodes, four candidates and zero
admitted activities.

Every object uses an exact schema. Raw paths reject arbitrary local routes,
traversal, percent encoding, backslashes, controls, fragments and unapproved
query fields before use. Duplicate receipt IDs or child/episode relationships
fail closed. A Retry failure replaces the alert and returns focus to the new
stable Retry control.

## Hostile evidence

Source and exact artifact each pass **59 rendered checks**. The suite includes:

- missing/malformed candidate or admission authority;
- top-level, child, episode, receipt and activity extra fields;
- replacement public key;
- coherent shelf-owned self-approval;
- post-validation mutation of the exposed, frozen candidate snapshot;
- unsigned coherent admission receipt;
- arbitrary local child route;
- literal/encoded/backslash/control-character traversal;
- image query and activity query inflation;
- wrong episode relationship, owner disposition and return fragment;
- future and expired receipts;
- duplicate receipt ID/relationship;
- clean current/archive/Bag selection, unapproved query/hash removal;
- 320px reflow; and
- failed-load Retry focus retention.

Every hostile admission renders one alert, zero activity cards and no fallback
child.

The positive verifier path uses a test-only Ed25519 keypair generated in
memory. The harness substitutes only that public key into the served page,
signs one exact fixture, proves its single canonical card renders, and then
discards the browser context and signer. No private key is written to the
repository or public artifact.

## Deterministic evidence

Source:

```text
FUN PACK CONTRACT PASS · episodes=4 · candidates=4 · signed_admissions=0 · independent-authority
FUN PACK PRODUCT PASS checks=59 external_requests_blocked=130
```

Fresh exact artifact:

```text
/tmp/laidies-fun-pack-r1-final.fDDhwX
builder: 1,082 files / 959.58 MiB
public metadata: PASS
artifact-root contract: PASS without operations/product-stewards child states
artifact browser: FUN PACK PRODUCT PASS checks=59 external_requests_blocked=130
```

Source/artifact SHA-256 parity:

| File | SHA-256 |
|---|---|
| `games/fun-pack.html` | `1beb7af78234d4715b62cc8f8db5ff213beeb7937a94442fde3c5a9c68c15fb6` |
| `games/data/fun-pack-registry.json` | `93018dc05c77d5e0f428b81859acf0ccea9fdf8aa40b57c801d90347740db2d8` |
| `games/data/fun-pack-admissions.json` | `08c578688083f96d1eef47b32a5f4386c25d4ead6df1bfb4187e6babd2015073` |

The existing artifact-size warning above 750 MiB remains a release-owner hold.

## Holds and rejudge

Repair 1 needs an independent source/artifact rejudge. No child is admitted.
Product usefulness still fails until at least one independently admitted
episode-specific extra demonstrates real value and a clean return with
representative users. Owner visual/comprehension, Safari/VoiceOver/native zoom,
analytics/VOC, every child product gate, artifact-size, deployment and public
origin remain held.

## Learning scan

**Failure:** an aggregator copied the approvals it was supposed to verify.

**Prevention rule:** presentation data may name candidates but cannot grant
authority. Promotion requires a separately issued, cryptographically
verifiable, exact and current receipt; the public runtime contains verification
material only.

**Behind the Build angle:** “The shelf can print a name tag. It cannot sign the
permission slip.”

The canonical painpoints ledger was not edited because this bounded lane
forbids central-file changes. The parent integrator should reconcile this rule.
