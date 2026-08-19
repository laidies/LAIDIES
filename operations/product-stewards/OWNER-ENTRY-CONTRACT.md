# Product owner entry and re-entry contract

**Status:** ACTIVE PORTFOLIO CONTROL
**Applies to:** every building champion and registered subchampion

An owner's task title or initialization prompt is routing, not memory. Durable
ownership begins at the registry entry and product dossier.

## Required preflight

Before an owner proposes, designs, scripts, builds or changes its product, run:

```sh
node scripts/check-product-stewards.mjs --owner-entry <product-id>
```

Then load only:

1. the minimum packet in `operations/context-authority.json`;
2. the exact dossier paths named by the product's registry row;
3. the current source/content/code the task will actually change;
4. one parent or shared-dependency source when the changed journey crosses that
   boundary; and
5. the applicable completion, admission, or release source when the task is
   approaching that gate.

Use `operations/runtime/CANONICAL-INSTRUCTION-DEPENDENCY-MAP.md` to retrieve
additional sources on demand. Do not preload the full registry, run queue,
portfolio contracts, historical ledger, painpoints log, or unrelated evidence.

Learning products also retrieve `LEARNING-CONTENT-STANDARD.md`. Visual/design
work retrieves the applicable style and visual-admission source. These are
task-specific dependencies, not additions to every owner's startup context.

## What must exist

### Building owner

- provenance-labelled `EXPERIENCE-BRIEF.md`;
- complete `FUNCTIONALITY-MAP.md`;
- `CHARTER.md`;
- `OPERATING-SPEC.md`;
- `VISUAL-ASSET-INVENTORY.md`;
- `state.json`;
- `backlog.md`; and
- registry row with routes, parent, launch status and next trigger.

If the experience brief is missing, the first allowed cycle is intent
recovery. Current pages, code, old mockups and plausible charter prose may be
recorded as evidence, but they cannot silently select the intended experience.
If the functionality map is missing, functionality recovery may proceed in
parallel with intent recovery when it is read-only and does not infer the
unruled experience. Design/build cannot call the complete page ready until
both agree. Both records must contain the required visitor-state evaluation
for first-time, returning-without-Card and Resident Card visitors, including
transitions and separate device-local/account-backed proof where relevant.
If the visual asset inventory is missing, the first visual/design cycle is
asset-discovery recovery: scan the complete owned source tree, render the
desktop/mobile and meaningful product states, bind current references and
classify every visible asset `KEEP`, `ADAPT`, `REPLACE` or `REMOVE`. The owner
must not ask Ali to find or feed it weak images one at a time.

### Subproduct/function owner

- a real dossier at the exact registry path;
- a real state record at the exact registry path, whether product-specific or
  explicitly shared with the parent;
- a named job, scope and non-goals;
- authoritative inputs and owned routes/components;
- parent and cross-product dependencies;
- new, returning and failure outcomes as applicable;
- triggers, freshness/correction rules and current truthful status; and
- admission/definition-of-done evidence.

If the dossier or state path is missing, the first allowed cycle is dossier
recovery. Do not treat the registry row itself as a product specification.

## Handling a new idea

The owner must classify the idea before implementation:

- **MERGE** — belongs in the existing product contract;
- **NEW SUBPRODUCT CANDIDATE** — has a distinct recurring user job and needs a
  registry/dossier proposal;
- **DEPENDENCY HANDOFF** — belongs to another owner or shared platform;
- **EXPERIMENT** — bounded evidence is needed before canon;
- **DEFER** — useful after a named trigger; or
- **DECLINE** — duplicate, off-mission or weaker than the current job.

Record the decision in the product dossier/backlog. If it changes shared canon,
public identity, platform contracts or another product, record the affected
owner and Portfolio Control Room handoff before building.

## Re-entry report

Before substantive work, the owner should be able to state:

1. the product's stable promise and intended successful result;
2. the exact owned tree and capability boundaries;
3. the current truthful public/local/held state;
4. the trigger for this cycle;
5. the locked decisions and unresolved owner decisions;
6. dependencies and collision boundaries;
7. every backend/service/store and cross-page touchpoint required by the
   intended capabilities, including what is missing;
8. how first-time, returning-without-Card and Resident Card experiences differ,
   how each state is recognized and what transitions must pass;
9. the exact artifact/files it may change; and
10. the acceptance evidence required.

If those answers cannot be recovered, the task is an intent/specification
cycle—not a design, content-production or implementation cycle.
