# Independent Town Entry acceptance — shared-header route version lock 1

**Product:** `town-entry-homepage`  
**Owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Evidence time:** `2026-07-26T13:37:26-07:00`  
**Verdict:** `ACCEPT — VERIFIED LOCALLY FOR EXACT HOMEPAGE + START HERE TUPLE`  
**Authority:** read-only route/shared/maker review; this directory is the only
write scope. No deploy, public cache, provider, route or shared-source change.

## Exact tuple

- shared source:
  `807bbe6b17abf09725b6fe82fb3c483102b658fda2cda571862f0e89b6661efa`
- Homepage:
  `51a4a25f2eeb66e881755fe8d9c5dc3960678cc3a4ee78ea105203a053a23dbb`
- Start Here, unchanged non-consumer:
  `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0`
- Visitor's Centre dependency:
  `cddc7404e9bfc20d42fafb32449b3b4471fb9c2fd8954ddbc6ab49942273fc3b`
- sealed integration receipt:
  `52a7518af5526c4970a15b642d2445af96aec0d029602d9766dfa42a95c41540`
- detached payload:
  `98bf5e6f76162d44aef6cc4836350bd50c4b93247134fa871095e1cc915feab5`
- maker test:
  `b4fac02b0196649dc20c74de020d52de473559c10724687a805c69dc68c0308a`
- maker evidence:
  `fca093cc44304c46f68db07a47e7907a3e74c4cdd7f51806315a3f780a3294c9`

The exact request on both consumers is:

`/content/site/sv-global-header.js?v=svgh-320-2026-07-26-v1-807bbe6b17ab`

## Independent findings

1. Homepage contains exactly one shared-header request with the new key.
2. Start Here contains zero shared-header requests and its bytes are unchanged.
3. Visitor's Centre contains exactly one shared-header request with the new
   key; route-local 320px containment remains present.
4. Replacing the new request with `v=20260715-1` reconstructs the prior
   accepted Homepage and Visitor route hashes exactly. Therefore the accepted
   prior-to-integrated delta is only the version string and does not change
   mount structure, labels, styles or route content.
5. Old-everywhere, mixed old/new, duplicate mount, missing mount and invented
   Start Here consumption all fail integrated validation.
6. The inverse rollback validates all three roles and recovers prior bytes.
7. Repeat validation is idempotent and reports `mutation=false`.

## Tests rerun

- maker route integration: PASS, routes 3, consumers 2, valid 2, invalid 10,
  rollback PASS, containment preserved;
- independent test:
  `test-independent-route-version-lock1.mjs`, SHA-256
  `05ca0afd9bac7223c8735245033a2cc0c8aa3b106cef25d6538d1de404e50eb8`,
  PASS, valid 2, adversarial 5, inverse rollback PASS, mount counts 1/0/1;
- raw 320 shared header: PASS, nav right `312`, document width `320`;
- consumer browser matrix: PASS, 9 JavaScript + 3 no-JavaScript, keyboard,
  Escape/focus, reduced motion, 1440/390/320 and 200% reflow proxy; and
- Visitor exact readiness: PASS, 779 checks against route SHA
  `cddc7404…fc3b`.

## Ceiling

This acceptance covers only the exact Homepage and unchanged Start Here tuple.
Visitor's Centre supplies its own owner acceptance. Native Safari, VoiceOver,
actual browser 200% zoom, deployment, public origin and cache delivery remain
unproved.

The canonical-name ruling is a separate pending route/data integration. This
receipt neither accepts nor conceals current visible `Welcome Wagon` strings;
changing those strings will change route hashes and requires a new sealed
tuple and owner reacceptance.

