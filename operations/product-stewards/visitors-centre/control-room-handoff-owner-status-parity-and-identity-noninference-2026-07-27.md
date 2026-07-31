# Visitor’s Centre — owner-status parity and identity non-inference handoff

**Status:** `BUILT LOCALLY — INDEPENDENT/INTEGRATION ACCEPTANCE PENDING`  
**Evidence time:** 2026-07-27T00:11:08-07:00 (America/Vancouver)  
**Scope:** isolated Visitor-owned parity tooling and existing route boundary only; no deployment, publication, provider, account, identity-store, route-design or visual mutation.

## Literal output

1. [`destination-owner-status-input.v1.json`](destination-owner-status-input.v1.json)
   is a versioned 17-slot parity input. It binds the current all-null
   owner-receipt intake SHA-256
   `68e1af8b0bffec95d4158657867db79ccf03e669111c7f55f1ae2865177eccb5`
   to the canonical 17-destination identity list and the exact projection
   consumed by the Centre.
2. [`scripts/validate-visitors-centre-owner-status-parity.mjs`](../../../scripts/validate-visitors-centre-owner-status-parity.mjs)
   derives only the permitted missing-receipt result (held, no artifact, no
   completion claim) and compares every 17-record identity/status/limitation
   field against the consumer projection. It exits HOLD before writing an
   output for an incomplete set, duplicate, owner mismatch, unknown consumer,
   unsupported receipt path, policy drift or projection mismatch.
3. [`scripts/test-visitors-centre-owner-status-parity.mjs`](../../../scripts/test-visitors-centre-owner-status-parity.mjs)
   proves one valid all-null set plus four fail-closed cases: missing slot,
   owner mismatch, unsupported receipt and changed consumer status.
4. The already-present route boundary was verified, not newly claimed as this
   lane's route mutation: `visitors-centre.html` and its contract test contain
   no `laidies_card_username` or `localStorage` read. It therefore makes no
   local username prefill, Resident Card, account, ownership, sign-in, sync or
   cross-device inference. That is a safe absence-of-feature boundary, not a
   substitute for shared Card validation.

## Evidence

| Check | Literal result |
| --- | --- |
| owner-status parity validator | `PASS destinations=17 completion_claim=false` |
| parity adversarial suite | `PASS valid=1 invalid=4 destinations=17` |
| Visitor contract | `PASS`; current projection payload SHA-256 `2cb13956032e45a0bd2cd3132fe5630a8f0b7d4b5da1b88509c7d1a58bc19b61` |
| owner entry | `PASS` (`visitors-centre`) |
| JSON / syntax / scoped diff | `PASS` |

Exact added-file SHA-256 values:

- input: `0dcfe434394479164ee53cc19edf3d0321d5f30aa0937e3a184bb30856acace8`
- validator: `092eb51f47c3d8a3610bb7d2332c7ec0d6e9cb9646705ba5d12e9df73386d935`
- adversarial suite: `a393adfec924e6820918e3c491450d173da50c0c2de61c2fe07fe780c4e39292`

## Remaining work and exact next action

Platform/Control Room still owns the canonical owner-receipt parser and any
status promotion. Until it exists, a non-null `receiptPath` fails closed rather
than being interpreted by the Centre. On the next owner-intake or projection
successor, run:

```sh
node scripts/validate-visitors-centre-owner-status-parity.mjs
node scripts/test-visitors-centre-owner-status-parity.mjs
```

Then bind the exact projection/route tuple to an independent Visitor consumer
review. A later personalization request requires a validated shared Card
projection plus deletion/revoke/conflict tests; no bare-key prefill may return.

## Authority truth

No public route was deployed or changed by this handoff; no owner status was
promoted; no account, resident identity, analytics, provider, private data,
reward, visual system or release state was accessed or changed. The current
Visitor’s Centre visual replacement remains outside this backend lane.
