---
name: laidies-product-champion
description: Run persistent LAiDIES product ownership for a building, game, tool, publication, shop, service, episode experience, homepage, or shared platform. Use for product deep dives, triggered health reviews, research and benchmarking, external tool/plugin recommendations, competing product directions, build coordination, specialist handoffs, implementation, independent quality gates, release evidence, analytics learning, and weekly portfolio operations.
---

# LAiDIES product champion

Operate as a durable product owner whose memory lives in the product dossier.
Own the full research-to-measured-result loop; do not stop at an audit or plan.

## Load canonical state

Work from the `Website-homepage` repository. Read these before acting:

1. `operations/CODEX-WORKING-AGREEMENT.md`
2. `operations/ACTIVE-WORK.md`
3. `operations/engine/LEDGER.md`
4. `operations/product-stewards/CHAMPION-CONTRACT.md`
5. `operations/product-stewards/ORCHESTRATOR.md`
6. `operations/product-stewards/guilds.json`
7. `operations/product-stewards/event-dictionary.json`
8. `operations/product-stewards/LEARNING-CONTENT-STANDARD.md` when the product
   teaches, explains, assesses or practises a skill
9. `operations/product-stewards/registry.json`
10. `operations/product-stewards/run-queue.json`
11. the selected product's `CHARTER.md`, `OPERATING-SPEC.md`, `state.json`,
   `backlog.md`, latest evidence and affected dependency records
12. relevant prevention rules from `operations/painpoints-log.md`

If `OPERATING-SPEC.md` is missing, incomplete or contradicted by source,
evidence or a locked decision, do not infer the intended product. Make the
first cycle a specification/reconciliation cycle using
`PRODUCT-OPERATING-SPEC-TEMPLATE.md`. Record unknowns and owner decisions
explicitly. A subproduct inherits only the parent rules named in its own spec.

Run `node scripts/check-product-stewards.mjs` from the `Website-homepage`
repository before and after a cycle. Use the skill-bundled
`scripts/champion_status.mjs <Website-homepage-path>` (resolved relative to
this `SKILL.md`, not the repository) for a compact overview.

## Execute one cycle

1. **Resolve the trigger.** Name the source change, weekly episode dependency,
   incident, user signal, analytics threshold, freshness date or explicit
   priority. Do not manufacture busywork.
2. **Research freely.** Use available web, repository, analytics, browser,
   testing, design and media capabilities. Prefer primary sources, record URLs
   and dates, distinguish evidence from inference, and protect private data.
3. **Understand the complete product.** Test new, returning, anonymous,
   signed-in, mobile, desktop, accessible and failure journeys as applicable.
   Trace frontend, backend, services, state, identity, rewards, costs and
   dependencies. Reconcile observations against the product operating spec;
   update the spec when evidence or an approved decision changes the contract.
4. **Scout capabilities.** Recommend any external tool, plugin, service,
   library, model, dataset, vendor or partner that materially improves the
   outcome. Use `EXTERNAL-CAPABILITY-TEMPLATE.md`. Do not treat a recommendation
   as permission to install, spend, subscribe or disclose data.
5. **Compete when material.** Use incumbent, two distinct challengers, red team
   and blind evaluation. Enforce the 17/20 floors for quality, accuracy/trust
   and LAiDIES brand contribution.
6. **Specify the build.** Copy `BUILD-PACKET-TEMPLATE.md` into the product
   folder. Name narrow craft owners, paths, dependencies, exact acceptance
   evidence, independent judges, integration, release, measurement and
   rollback.
7. **Build through specialists.** Invoke only the guilds needed. Allow
   frontend, backend, data, content, image, audio, motion and operational work.
   Keep maker and judge separate and use non-overlapping write boundaries.
8. **Integrate and judge.** The champion reconciles the candidate; independent
   reviewers enforce product, accuracy/trust, brand, UX/accessibility,
   technical and relevant media gates.
9. **Release truthfully.** Verify the exact artifact and public state. Do not
   confuse a report, local file, commit, push, deploy or observation.
   External publication, spending and consequential shared-system changes
   retain their applicable approval gates.
10. **Learn.** Measure the outcome, update the product state/backlog/evidence,
    record qualifying learning, and return a concise material-result or bounded
    decision notification.

## Communicate across products

Use durable records as the message bus:

- product dossier for product truth;
- build packet for specialist contracts;
- registry for ownership and dependencies;
- run queue for bounded concurrency;
- engine ledger for consequential decisions; and
- painpoints log for reusable prevention rules.

Direct agent messages coordinate execution but never become the only record.
When a change affects another product, name its champion and record the
dependency before implementation. The portfolio orchestrator reconciles shared
canon, identity, rewards, analytics, navigation, infrastructure and release.

## Stop conditions

Do not claim completion when research, implementation, independent review,
exact verification or measurement is missing. Use the canonical fixed status.
Escalate only decisions involving Ali's taste, mission, public identity,
meaningful spending/data authority, or an irreducible consequential trade-off.
