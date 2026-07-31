# AIDB Intelligence Desk ↔ NewsStand interaction contract

**Status:** SPECIFIED  
**Authority:** Intake and research coordination only. Neither desk gains new
publication authority.

## Division of responsibility

| AIDB Intelligence Desk | NewsStand editorial radar |
|---|---|
| Finds AIDB/Mollick signals and follows their original-source trails | Builds an independent current-news read from primary and strong reporting |
| Verifies model-use advice and records product/version boundaries | Decides whether a reader's current choice materially changed |
| Identifies an operations test and durable practical-learning job | Scores consequence, novelty, relevance, evidence, durability and editorial value |
| Sends a bounded signal with reusable evidence IDs | Owns THE BREAKING / THE DAILY / THE WEEKLY / THE TRIBUNE / WATCH / PASS |
| Reads the resulting disposition to avoid future duplication | Owns radar state, candidate packet, framing and publication gates |

## Outbound trigger

AIDB creates a handoff only when a new scout item or newly resolved source:

- identifies a development not already represented in the radar;
- materially changes the evidence or reader-choice interpretation of an
  existing radar item;
- resolves or contradicts a source gap that affects qualification; or
- supplies model-interaction evidence that materially changes the practical
  consequence of a release.

Ordinary commentary, duplicated coverage, an unverified tip, or a format idea
does not create a NewsStand candidate.

## Handoff path and identity

Write:

`operations/agents/aidb-intelligence-desk/handoffs/newsstand/YYYY-MM-DD-[story-key].md`

Use the existing NewsStand story key or packet slug when one exists. One
developing story keeps one identity; update the existing handoff rather than
creating a new one for each scout mention.

## Required handoff

- source scout item, date, idea IDs/timestamps;
- existing radar row/packet or `NEW SIGNAL`;
- concise statement of what changed;
- reader-choice hypothesis;
- exact original practitioner items;
- current provider/primary sources with update and access dates;
- reusable claim/evidence identifiers;
- confirmed, disputed, unknown, and does-not-establish boundaries;
- freshness and publication-day recheck triggers;
- non-binding suggested dated job;
- distinct durable learning/Model Fitting Room job;
- duplication check;
- `AIDB AUTHORITY: INTAKE ONLY — NEWSSTAND DECIDES`.

## NewsStand intake sequence

1. Build the independent primary-source read first.
2. Check the AIDB handoff inbox and complete AIDB edition where relevant.
3. Reopen every load-bearing source before reuse.
4. Merge genuinely new evidence into the existing story identity.
5. Record one disposition:
   `CONSUMED`, `MERGED`, `WATCH`, `PASS`, `STALE`, or `SOURCE CONFLICT`.
6. Apply the normal NewsStand qualification, packet, review and publication
   gates.

No disposition writes public content or implies acceptance of the separate
learning treatment.

## Shared-story split

When both routes are warranted:

- NewsStand: **what changed, why it matters now, and what readers should decide
  today**.
- Model Fitting Room/learning: **which old habit now hurts, how to interact
  differently, and how to test the result**.

Use the same evidence IDs and cross-link accepted treatments. Do not paste one
article into two formats.

## Loop prevention

- AIDB never creates or edits NewsStand radar rows or candidate packets.
- NewsStand never advances AIDB source cursors.
- AIDB reads NewsStand dispositions on the next cycle and does not re-alert
  unless evidence or status materially changes.
- `WATCH`, `PASS`, quiet, and no-treatment results are successful outcomes.

