# Shared-header route-version integration v1 — maker evidence

Status: `BUILT LOCALLY / OWNER REACCEPTANCE PENDING`  
Receipt ID: `SVGH-320-2026-07-26-v1-ROUTE-INTEGRATION-v1`  
Scope: exact shared-header version-reference replacement only

## Changed routes

- `index.html`: one string changed from `v=20260715-1` to
  `v=svgh-320-2026-07-26-v1-807bbe6b17ab`
  - prior accepted SHA-256:
    `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772`
  - integrated SHA-256:
    `51a4a25f2eeb66e881755fe8d9c5dc3960678cc3a4ee78ea105203a053a23dbb`
- `visitors-centre.html`: the same one-string replacement
  - prior accepted SHA-256:
    `de8e536dcfd4c80c419e4bfd6e61c7e2189fd4c07429869b5d505ba659707743`
  - integrated SHA-256:
    `cddc7404e9bfc20d42fafb32449b3b4471fb9c2fd8954ddbc6ab49942273fc3b`
- `start-here.html` remains an unchanged non-consumer:
  `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0`
- shared source remains:
  `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`

Visitor's route-local `max-width:340px` containment remains present and
unchanged. No other route field, label, style, content or script reference was
authorized by this lock.

## Sealed integration files

| File | SHA-256 |
| --- | --- |
| `shared-header/v1/route-integration/route-version-integration-v1.mjs` | `92c367af2c9a5dafeef01d28c9856421125cdaa8035e73d53df7713e29047caa` |
| `shared-header/v1/route-integration/svgh-320-route-version-integration-v1.json` | `52a7518af5526c4970a15b642d2445af96aec0d029602d9766dfa42a95c41540` |
| `shared-header/v1/route-integration/test-route-version-integration-v1.mjs` | `b4fac02b0196649dc20c74de020d52de473559c10724687a805c69dc68c0308a` |

Detached payload SHA-256:
`98bf5e6f76162d44aef6cc4836350bd50c4b93247134fa871095e1cc915feab5`.

## Maker proof

```text
ROUTE VERSION INTEGRATION V1 PASS
version=svgh-320-2026-07-26-v1-807bbe6b17ab
routes=3 consumers=2 valid=2 invalid=10
rollback=PASS containment=PRESERVED owner_acceptance=PENDING mutation=false
```

The suite rejects seal/source/route tamper, stale keys, mixed old/new
references, duplicate shared requests, invented Start Here consumption,
rollback mismatch, unknown fields and authority escalation. Replacing the new
request with the prior request reconstructs both prior accepted route hashes
exactly.

Additional exact checks:

- raw shared 320 gate: PASS, nav-right `312`, document `320`;
- three-route consumer matrix: PASS, 9 JS / 3 no-JS / keyboard / reduced
  motion / 320-390-1440;
- Visitor static contract: PASS, 17 canonical destinations;
- Visitor exact live-route readiness: PASS, 779 checks, route hash
  `cddc7404…fc3b`.

The older general `scripts/test-visitors-centre-browser.mjs` currently reports
12 expectation failures against the newer all-null/fail-closed destination
semantics. The exact readiness v1 suite passes 779/779 and inverse hashing
proves this lock changed only the version string. The legacy suite discrepancy
is recorded rather than hidden; Visitor owns whether it is stale or exposes a
separate route defect.

## Ceiling and next action

No deploy, public cache/provider setting, shared source, Start Here or Visitor
containment mutation occurred. Town Entry and Visitor must independently
accept or hold this exact tuple. Native Safari, VoiceOver, true zoom and public
origin/cache delivery remain unproved.

