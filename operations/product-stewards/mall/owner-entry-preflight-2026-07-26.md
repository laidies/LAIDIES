# Mall owner-entry preflight — 2026-07-26

**Status:** OWNER ENTRY RECOVERED — TARGETED POST-RECOVERY PREFLIGHT PASS;
CHILD DOSSIER DEBT REMAINS THE FIRST BUILD-PACKET GATE

## Trigger

Permanent ownership initialization for product ID `mall`, including its owned
shop tree. The allowed cycle is dossier/intent/functionality recovery only.
Shared commerce, fulfilment, returns/refunds, identity, rewards, persistence
and analytics work must queue through Functionality & Platform and the
Portfolio Control Room.

## Canonical entry

- Registry product: `mall`
- Kind/parent: building / none
- Routes: `/mall.html`, `/shop.html`
- Champion: `mall-champion`
- Dossier: `mall/CHARTER.md`
- State: `mall/state.json`
- Launch status:
  `BOUNDED_LOCAL_PASS_RELEASE_HOLD`
- Registered children: eleven shop products, all `QUEUED`, each pointing to a
  currently absent `mall/shops/*.md` dossier and the parent Mall state. The
  registry treats legacy `/mall/claires.html` and canonical
  `/mall/pieces-of-flair.html` as separate children; Control Room must
  reconcile whether that is intentional ownership or alias debt.

## Command and initial result

```text
$ node scripts/check-product-stewards.mjs --owner-entry mall
PRODUCT STEWARD SYSTEM FAIL
- mall owner entry missing_experience_brief: mall/EXPERIENCE-BRIEF.md
- mall owner entry missing_functionality_map: mall/FUNCTIONALITY-MAP.md
```

## Records and source inspected

- workspace/repository instructions;
- working agreement, active work and engine ledger;
- champion, orchestrator, owner-entry, visitor-state and build-completion
  contracts;
- registry, run queue, guilds and event dictionary;
- Mall charter, operating spec, state, backlog, readiness register, launch
  deep dive, P0 build/evidence/review/repair/rejudge;
- building brief, shop decisions, Mall inventory plan and Gift Shop decisions;
- current `mall.html`, `shop.html`, ten canonical shop routes, CLAiRE'S legacy
  redirect, Mall/Gift Shop/Pieces runtime modules and shared Puffy adapter;
- Functionality & Platform launch truth table/build packets; and
- relevant BTB-108 and BTB-134–136 prevention rules.

## Recovered records

- `EXPERIENCE-BRIEF.md`: stable promise, provenance-labelled intended
  experience, complete owned tree, object/action model, four visitor scopes,
  cross-building handoffs and exact acceptance scenes.
- `FUNCTIONALITY-MAP.md`: every shell/shop/provider/local-state/identity/reward/
  commerce/fulfilment/return touchpoint; producer/store/consumer contracts;
  propagation; missing backends; owners; exact paths and proof.
- `build-packet-building-tree-2026-07-26.md`: executable owner/tree,
  implementation, platform, provider, independent review and release sequence.

## Post-recovery validation

```text
$ node scripts/check-product-stewards.mjs --owner-entry mall
PRODUCT STEWARD SYSTEM PASS
products=64
active=1 (COLLISION_AWARE_BY_SCOPE_AND_INTEGRATION_LOCK)
events=7
guild_roles=30
owner_entry_product=mall:PASS
```

The unscoped steward-system check also passed. The targeted result proves that
the top-level Mall owner now has its required entry records; it does not prove
the eleven registered child dossiers exist or that any implementation,
provider, shared backend, release or public result is complete.

## Scope result

No site source, shared platform record, registry, run queue, service,
deployment, public route, commerce provider, identity store, reward ledger or
central painpoint record was changed. This initialization changes only the
Mall dossier/evidence area.
