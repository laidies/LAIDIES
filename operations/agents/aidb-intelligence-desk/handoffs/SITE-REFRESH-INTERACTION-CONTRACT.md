# AIDB Intelligence Desk → site refresh interaction contract

**Status:** ACTIVE  
**Authority:** Private freshness research and owner handoff only. The desk does
not gain authority to rewrite, publish or deploy public content.

## Two separate questions

1. **Refresh:** Has current evidence made an existing LAiDIES treatment stale,
   incomplete, misleading, broken or poorly scoped?
2. **Coverage:** Is there a consequential reader question LAiDIES genuinely
   does not answer?

Do not use a new-topic answer to avoid maintaining an existing page.

## Daily sequence

1. Read `site-refresh-register.md`.
2. Read `content/site/site-index.json` and the relevant canonical inventory,
   dossier or source file.
3. Extract material entities, versions, claims and reader questions from the
   new scout item or due freshness trigger.
4. Search canonical current content. Exclude archives, rejected work and
   superseded pages from the duplication decision.
5. Reopen the current official/original sources behind the affected claim.
6. Choose one disposition:
   `UPDATE EXISTING`, `ADD TOPIC`, `LINK`, `MERGE`, `REPLACE`, `REMOVE`,
   `WATCH`, `HOLD`, or `NO CHANGE`.
7. Update the private register. Create an owner handoff only when a concrete
   change, decision or source conflict exists.

On Sundays, widen the scan to all indexed live/preview content and current
inventories. Prioritize product/model/version names, capability/access/price/
plan/region claims, data policy, numerical claims, verified dates, explicit
recheck triggers and broken load-bearing links.

When a scout item changes practical model guidance, also inspect the canonical
episode and its text/practice derivatives. Classify the result as:

- `FOUNDATION CURRENT` — the durable mental model still holds;
- `CURRENT NOTE` — a dated qualification can keep a finished episode honest;
- `DERIVATIVE UPDATE` — the article, activity, reference, quiz, captions or
  other living surface needs revised wording;
- `RE-RECORD / REFILM` — the episode's central mental model is now false or
  harmful and cannot be repaired honestly with a note; or
- `NO CHANGE`.

Do not turn every model release into a rewrite of beginner teaching. Preserve
the evergreen story, keep current product manners in a dated living layer and
show the progression from the basic skill to contemporary practice. Search the
canonical propagation checklist before naming affected derivatives.

## Refresh handoff

Write:

`operations/agents/aidb-intelligence-desk/handoffs/site-refresh/YYYY-MM-DD-[content-id].md`

Include the canonical content ID/path, exact affected claim, old and new
evidence, what changed and did not, reader harm if unchanged, minimum proposed
edit, sources and dates, freshness trigger, duplication impact, owner, and:

`AIDB STATUS: HANDOFF ONLY — OWNER ACCEPTANCE REQUIRED`

Every accepted refresh also needs a proposed public freshness record following
`site-refresh/2026-07-27-public-freshness-pattern.md`. The date must distinguish
`CHECKED` from `UPDATED`; never bump an update date merely because an automated
run opened the file or because styling changed.

When the affected statement has or needs a stable claim identity, the handoff
also proposes one `Claim freshness signal` using `OUTPUT-SCHEMA.md`. Learning
System & Concepts accepts or rejects it into
`operations/product-stewards/learning-content-ecosystem/freshness-signal-inbox.json`
and owns `claim-register.json`. AIDB never writes that register directly.

## New-topic gate

`ADD TOPIC` requires a concrete reader question, current primary/official
evidence, meaningful consequence or durable learning value, no adequate
existing treatment, a distinct format job, and an identified receiving owner.
If any element is absent, use `WATCH`, `HOLD`, `LINK`, `MERGE`, or `NO CHANGE`.

## Ownership and loop prevention

- The desk updates only its register, records and handoffs.
- The receiving owner accepts, rejects, edits and verifies its own content.
- AIDB reads the owner disposition on later cycles and does not repeat the
  alert unless evidence, status or the requested decision changes.
- `NO CHANGE` and “existing treatment is still current” are successful results.
