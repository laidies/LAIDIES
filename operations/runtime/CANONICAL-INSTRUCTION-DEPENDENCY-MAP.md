# Task-specific instruction retrieval map

**Status:** ACTIVE ROUTING CONTROL

This file prevents a product task from loading the whole portfolio as context.
It supplements `operations/DECISIONS.md`; it does not create another authority
order.

## Authority and inheritance rule

Start with the minimum packet defined in `operations/context-authority.json`.
Then retrieve only the sources needed for the task's exact domain and changed
surface. A summary, handoff, registry row, prototype, implementation, test, or
stored verdict cannot override the routed product source.

## Product-specific inheritance

For a product-owner task, retrieve:

1. the product's registry row only to locate its current dossier;
2. its `EXPERIENCE-BRIEF.md` and `FUNCTIONALITY-MAP.md`;
3. its state record only when current status affects the task;
4. one parent or shared dependency contract only when the changed journey
   actually crosses that boundary; and
5. the applicable completion, admission, or release source only when the task
   is approaching that gate.

Learning work additionally retrieves the current learning standard. Visual,
media, account, reward, or release work retrieves its matching specialist source
only when that surface is in scope.

Do not preload every dossier, portfolio queue, evidence packet, painpoint,
historical ledger entry, or sitewide standard. Search them when a concrete
dependency, conflict, or known-failure question arises.

## Conflict rule

When two current routed sources disagree, stop only the affected portion, name
both paths, and reconcile the decision into the narrowest owner source. Archived
material can identify what changed but cannot resolve the conflict.

The pre-reset dependency map is preserved at
`operations/archive/context-reset-20260818/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.pre-reset.md`
as historical evidence.
