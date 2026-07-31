# Idea Inbox operating specification

**Status:** SPECIFIED — REGISTERED; INITIALIZATION COMPLETE  
**Product ID:** `idea-inbox`  
**Bound task:** `019f9f81-5da6-73a3-a1aa-0272a93ec821`

## Stable job

Turn an unfinished thought into a faithful, findable, dependency-aware capture
without manufacturing urgency or making Ali choose the organizational home.

## Intake contract

Normal conversation is enough. Optional phrases from the working agreement
remain valid:

- `Idea:` means capture and continue.
- `Add this:` means assess whether it changes the active brief.
- `Switch now:` requires Control Room to checkpoint the active lane before any
  switch.
- `Build this:` means route to the accountable owner for specification and
  implementation gates.

For each idea, the inbox performs this sequence:

1. **Acknowledge.** Restate the idea plainly and name the part worth
   preserving.
2. **Preserve.** Record the original detail, examples, desired feeling,
   constraints, links or screenshot paths. Do not compress it to a task title
   first.
3. **Reconcile.** Search the decision ledger, canonical idea backlog, active
   and parallel work, registry/product tree, relevant dossiers and prevention
   rules.
4. **Classify.** Recommend exactly one primary portfolio outcome:
   `NOW`, `NEXT`, `PARK`, `MERGE` or `DECLINE`.
5. **Map ownership.** Name the accountable owner, parent owner, affected
   permanent owners and shared dependencies.
6. **Write durable state.** Append a routing receipt here and prepare the exact
   canonical backlog, decision or owner-handoff change required.
7. **Handoff.** Send or stage the handoff without interrupting unrelated work.
   Shared-source mutations wait for Control Room integration.
8. **Report.** Tell Ali where it went, whether active work changed, and what
   would cause it to move.

## Classification rules

| Outcome | Meaning | Required evidence |
|---|---|---|
| `NOW` | The idea corrects an invalid premise, belongs inside the current foreground contract, or is proposed as a safe bounded lane. | Exact active-work relationship and Control Room decision; the inbox cannot promote itself. |
| `NEXT` | It should follow for a dependency, risk or user-value reason. | Named predecessor and accountable owner. |
| `PARK` | It may be valuable later but should not consume current capacity. | Named return trigger, owner and review condition. |
| `MERGE` | It belongs in an existing product, specification, idea cluster or owner backlog. | Exact natural home and duplicate/conflict notes. |
| `DECLINE` | It is duplicate as a standalone item, conflicts with locked intent, creates the wrong behaviour or is not worth its cost. | Reason and the evidence or condition that would justify reconsideration. |

`MERGE` does not authorize editing the destination. A receipt remains
`HANDOFF PREPARED` until the destination owner or Control Room accepts it.

## Durable receipt schema

Each append-only receipt uses:

- receipt ID: `IIR-YYYYMMDD-NNN`;
- captured date and source;
- faithful idea statement;
- intended feeling and examples;
- links or screenshot paths;
- duplicate/conflict findings;
- primary classification and reason;
- return trigger or reconsideration condition;
- accountable owner, parent and affected owners;
- cross-product/shared dependencies;
- durable proposed destination;
- handoff status: `CAPTURED`, `HANDOFF PREPARED`, `ACCEPTED`, `MERGED`,
  `DECLINED` or `SUPERSEDED`;
- foreground consequence; and
- evidence checked.

Sensitive or private content is summarized in the receipt. The raw item stays
only in an approved private path; secrets and personal data are never copied
into the backlog.

## Owner resolution

1. Match an existing registry product or subproduct.
2. If the idea teaches, explains, assesses or practises a skill, route concept
   architecture through the Learning System before a surface owner creates
   content.
3. If it affects several products, name every affected owner and route shared
   sequencing through Control Room.
4. If it changes sitewide identity, visual language or public voice, route to
   Brand & Experience and preserve Ali's decision gate.
5. If it affects identity, rewards, persistence, data, infrastructure,
   analytics or a shared event, route the dependency to Platform & Reliability.
6. If it has a distinct recurring user job and no existing home, record a
   **new subproduct candidate** for Control Room; do not create a registry row
   unilaterally.
7. If no permanent owner exists, mark `OWNER GAP` and give Control Room the
   smallest proposed scope. The idea stays captured meanwhile.

## Collision and interruption control

- Default foreground consequence: `NO CHANGE — CAPTURE AND CONTINUE`.
- An idea that appears to invalidate active work receives
  `CONTROL ROOM REVIEW REQUIRED`; the inbox records the conflict but does not
  stop the lane itself.
- The inbox never writes another owner's active files while that owner holds an
  integration lock.
- A handoff may be prepared even when its owner is busy. Acceptance and
  scheduling happen at the owner's next safe trigger or through Control Room.
- `NOW` is a recommendation, not a queue mutation.

## Canonical-storage rule

The inbox dossier stores receipts and reconciliation evidence. It is not a
second general idea backlog.

- Promising unruled portfolio ideas remain canonically housed in
  `docs/growth/ali-idea-backlog.md`.
- Product-specific ideas belong in the exact product backlog after owner
  acceptance.
- Consequential rulings belong in `operations/engine/LEDGER.md` after Control
  Room integration.
- Foreground and backstage execution remain in `ACTIVE-WORK.md` and
  `PARALLEL-WORK.md`.

If the same idea is visible in more than one place, the receipt names one
authority and treats all other copies as pointers or historical evidence.

## Failure and recovery

- **Possible duplicate, uncertain:** preserve both and mark
  `RECONCILIATION REQUIRED`.
- **Conflicting locked decisions:** do not choose silently; cite the IDs and
  route a bounded owner decision.
- **Broken or unavailable link/screenshot:** capture the description and mark
  the missing source for Ali only if it materially changes routing.
- **Owner unavailable or unregistered:** keep the receipt `CAPTURED — OWNER
  GAP`; Control Room owns admission.
- **Handoff not accepted:** retain it with the next owner trigger; never report
  it as merged.
- **Return trigger fires:** reread the original full idea and current sources
  before promoting it.

## Acceptance evidence

Initialization passes when:

1. `CHARTER.md`, `OPERATING-SPEC.md`, `state.json` and `backlog.md` exist and
   agree;
2. the legacy shared backlog is reconciled without deletion;
3. duplicate, stale and ownerless risks are identified;
4. a receipt log and Control Room handoff exist;
5. no registry, run-queue, shared-backlog or ledger mutation occurs; and
6. the product-steward validator is rerun; it either passes or any unrelated
   concurrent shared-portfolio failure is recorded without this lane silently
   repairing shared authority.
