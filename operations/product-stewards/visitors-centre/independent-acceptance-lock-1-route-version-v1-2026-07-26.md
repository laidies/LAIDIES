# Independent acceptance — Visitor lock-1 route-version tuple v1

**Verdict:** **ACCEPT — exact Visitor consumer scope.**

**Binding:** shared source `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`; Visitor `cddc7404e9bfc20d42fafb32449b3b4471fb9c2fd8954ddbc6ab49942273fc3b`; Homepage `51a4a25f2eeb66e881755fe8d9c5dc3960678cc3a4ee78ea105203a053a23dbb`; Start Here `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0`.

The sealed receipt, its payload and supporting artifacts all match: receipt
`52a7518af5526c4970a15b642d2445af96aec0d029602d9766dfa42a95c41540`,
payload `98bf5e6f76162d44aef6cc4836350bd50c4b93247134fa871095e1cc915feab5`,
route-version test `b4fac02b0196649dc20c74de020d52de473559c10724687a805c69dc68c0308a`,
maker evidence `fca093cc44304c46f68db07a47e7907a3e74c4cdd7f51806315a3f780a3294c9`,
and integration module `92c367af2c9a5dafeef01d28c9856421125cdaa8035e73d53df7713e29047caa`.

## Independent checks

- Route-version integration: PASS. Both consumers request exactly
  `/content/site/sv-global-header.js?v=svgh-320-2026-07-26-v1-807bbe6b17ab`.
  It rejects stale, mixed and duplicate keys, invented Start Here consumption,
  seal/source/route tamper, containment authority escalation and inverse-hash
  rollback tamper. Valid 2; invalid 10; rollback PASS; containment preserved.
- Raw shared-header 320 gate: PASS, nav right 312px and document 320px.
- Consumer matrix: PASS across 1440/390/320 (200% proxy), keyboard/Menu/
  focus/Escape, reduced motion and no-JS. Visitor 390/1440 parity passes.
- Visitor static contract: PASS, 17 canonical destinations.
- Exact Visitor readiness v1: PASS 779/779 at 2026-07-26 13:37:45 PDT,
  with route receipt `cddc7404…fc3b`; all-null owner intake, 17 routes,
  `completionClaim=false`, no-JS/failure/focus/Escape/reflow remain covered.

## Legacy-suite classification

`PLAYWRIGHT_CORE_PATH=.ds-sync/node_modules/playwright-core node scripts/test-visitors-centre-browser.mjs`
fails exactly 12 assertions. They are **stale expectations**, not a separate
current defect in this lock:

- Nine assertions expect prior per-building `limited`/`held` state or
  limitation prose across KSVL, FAiRY, High, MAiKEOVER, Town Hall, Dream Phone
  and Post Office. KSVL and Post Office each contribute both a state and a
  limitation expectation; the other five contribute one limitation
  expectation. The current all-null owner intake deliberately renders the
  checksum-bound receiver state instead; all 17 are held pending receipts.
- One assertion expects a prior held CTA phrase; current receiver copy uses the
  generic owner-authority action, while the exact suite proves
  `completionClaim=false` and navigation-only boundary.
- Two missing-contract assertions use the obsolete `destinationContracts`
  injection. Current route logic at `visitors-centre.html:1312-1324` validates
  receiver route/completion fields and applies generic fail-closed semantics;
  the exact readiness suite exercises missing/corrupt/incomplete/checksum/
  runtime projection failures directly.

The classification is evidence-based: I ran the legacy suite, inspected its
expectations and the current route fallback, and then reran the exact 779-check
suite. The stale suite should be superseded or updated under a separate test
lock; it is not acceptance evidence for the old page state.

## Boundaries

This accepts only the exact shared-header version reference on the frozen
Visitor consumer. The route-local 320px containment remains present and must
not be removed without a separate route lock and new independent acceptance.
This does **not** revive, validate or reconsider Ali's rejected Visitor page
model, nor authorize deployment, public proof, native accessibility claims,
owner receipts or destination readiness.

**Next trigger:** a separately locked successor route may consider local
containment removal only after its exact route acceptance; native/human/public
and destination-owner evidence remain separate gates.
