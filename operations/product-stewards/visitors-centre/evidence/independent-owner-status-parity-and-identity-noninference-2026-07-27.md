# Independent verdict — Visitor’s Centre owner-status parity and identity non-inference

**Verdict:** ACCEPT — exact local backend boundary only  
**Reviewed:** 2026-07-27 (America/Vancouver)  
**Judge scope:** independent read-only review of the frozen Visitor route,
17-destination parity input/validator and their adversarial tests. No maker,
route, deployment, identity-store or public mutation was made.

## Bound handoff and inputs

The supplied maker handoff is
`operations/product-stewards/visitors-centre/control-room-handoff-owner-status-parity-and-identity-noninference-2026-07-27.md`,
SHA-256
`6133d7f4859a25db978d62ed2a060614e0e6def24e38857d98042e969568aa4`.

The independently re-read inputs matched the handoff:

| Input | SHA-256 |
| --- | --- |
| `visitors-centre.html` | `314cfdf6653ffdc71ada510d2b9a668876ade8c6132223966dfdb2f047854aae` |
| owner-status input | `0dcfe434394479164ee53cc19edf3d0321d5f30aa0937e3a184bb30856acace8` |
| parity validator | `092eb51f47c3d8a3610bb7d2332c7ec0d6e9cb9646705ba5d12e9df73386d935` |
| parity adversarial suite | `a393adfec924e6820918e3c491450d173da50c0c2de61c2fe07fe780c4e39292` |
| owner-receipt intake | `68e1af8b0bffec95d4158657867db79ccf03e669111c7f55f1ae2865177eccb5` |
| canonical destinations | `f52c0c4bf613e28eb7b1d05f1f1810111b92ef242a8b742cc6bfc300459ca8bf` |
| consumed readiness projection | `5a5bf791f273874535fcbf4fa88f1a3bddb1004512c04d8e2c733b5da61a3ab0` |
| consumed projection payload | `2cb13956032e45a0bd2cd3132fe5630a8f0b7d4b5da1b88509c7d1a58bc19b61` |

## Independent checks

| Check | Result |
| --- | --- |
| Exact canonical, owner-slot and consumer destination counts | PASS — 17 / 17 / 17 |
| All-null intake behavior | PASS — every destination is `held`, has no artifact and has `completionClaim=false` |
| Missing owner slot, mismatched owner, unsupported receipt and changed projection | PASS — all four reject before promotion |
| Unknown or extra consumer destination | PASS — validator rejects it by canonical/slot parity |
| Existing Visitor route identity behavior | PASS — no `laidies_card_username`, `localStorage`, session identity or Card-like state is read; no name, sign-in, ownership, sync or cross-device state is inferred |
| Static/no-JS named directory and canonical route parity | PASS — all 17 exact names/routes; navigation remains explicitly non-completing |
| Receiver/fail-closed contract | PASS — current checksum-bound projection, semantic receiver and `completionClaim === false` boundary are present |
| Scoped whitespace/diff check | PASS |

Commands independently executed:

```sh
node scripts/validate-visitors-centre-owner-status-parity.mjs
node scripts/test-visitors-centre-owner-status-parity.mjs
node scripts/test-visitors-centre-contract.mjs
node scripts/check-product-stewards.mjs --owner-entry visitors-centre
git diff --check -- visitors-centre.html content/site/readiness/v1/entry-readiness-projection.v1.json operations/product-stewards/visitors-centre/destination-owner-status-input.v1.json scripts/validate-visitors-centre-owner-status-parity.mjs scripts/test-visitors-centre-owner-status-parity.mjs
```

## Boundary and remaining work

This accepts only the truthful all-null owner-status fallback and the absence
of unsafe local identity inference. It does **not** supply an owner-receipt
producer, promote any destination, validate account/Card ownership, approve
the rejected Visitor experience model, integrate a visual candidate, deploy,
or verify the public origin.

The next successor that changes owner intake, canonical destinations,
projection or the Visitor route must be resealed and independently reviewed.
Any future personalization must use a validated shared Card projection with
delete, revoke and conflict evidence; a bare browser key remains prohibited.
