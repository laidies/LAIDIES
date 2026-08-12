# LAiDIES canonical source registry

**Status:** ACTIVE INTERNAL ROUTER — NOT CLAIM, CONTENT OR PUBLICATION AUTHORITY
**Machine record:** `SOURCE-REGISTRY.json`
**Owner:** Learning System & Concepts, with NewsStand owning editorial use

## What this solves

LAiDIES source knowledge was split across the AIDB practitioner roster,
NewsStand prose, institutional maps, book claim files and research notes. This
registry is the one complete current inventory of source families and their
allowed jobs. Smaller rosters remain executable projections; they may not add
a monitored source that is absent here.

“Complete” means every source LAiDIES currently intends to monitor, source-mine
or use as a maintained comparator is represented. It does not mean the internet
has been exhaustively listed. A new source enters here before a downstream
monitor silently treats it as approved.

## Authority ladder

1. `PRIMARY_AUTHORITY`: law, regulator, official product documentation,
   affected-party record, filing or official dataset. Authoritative only for
   its bounded subject.
2. `PRIMARY_RESEARCH`: original paper, report, dataset or technical study.
   Methods, sample, model, task and date remain binding.
3. `INSTITUTIONAL_SYNTHESIS`: credible hub or report that maps evidence but may
   require recovery of the underlying primary source.
4. `INDEPENDENT_REPORTING`: reporting and corroboration; recover load-bearing
   originals. A reputable masthead does not make its framing, causal reading or
   impact claim authoritative.
5. `PRACTITIONER_LEAD` and `SECONDARY_SCOUT`: questions, techniques, examples
   and source trails; never authority by reputation.
6. `TEACHING_METHOD` and `COURSE_COMPARATOR`: explanation and learning-design
   inputs; never factual authority merely because the teaching is good.
7. `INDUSTRY_RESEARCH`: useful dated market/work signals whose sponsor, sample,
   methodology and incentives must remain visible.

## Destination rules

- The four NewsStand publications and Straight Answers may share evidence, but
  each needs a distinct reader job. A source never chooses the edition.
- Paige's Practical AI Tip, the Career/Work-Life Tip and Promptoscope are
  first-class destinations. A Career/Work-Life source may be entirely non-AI:
  LAiDIES starts with the useful workplace situation, then adds a separately
  verified AI or workflow principle that genuinely illuminates it, the limit
  of that comparison and one concrete next move. A pasted-on AI reference is
  ineligible.
- A source may feed several possible destinations, but one item is not
  multiplied across them to fill space.
- Official provider material can establish provider facts; it cannot by itself
  establish independent superiority, safety, social benefit or learning
  effectiveness.
- Before NewsStand publication, reporting is decoded against the underlying
  evidence. The record must state what actually happened, what the evidence
  does and does not establish, mechanism, uncertainty, real impact and headline
  risk. Research coverage additionally records method, population, comparison,
  measures, result, limitations, causal/generalization bounds and conflicts.
- LAiDIES completes its independent evidence read before comparing with AIDB.
  The comparison records agreement, omissions, disagreement and distinctive
  analysis used—or a dated honest `NOT_COVERED`/`UNAVAILABLE` result. AIDB is an
  analytical cross-check, never the underlying evidence or answer key.
- Social and practitioner posts require exact URL, date and text plus their
  original evidence. Incomplete platform visibility is unknown, never quiet.
- Course and communication sources inform method or continuation only. They do
  not replace the LAiDIES curriculum, voice or product owner.

## Operating flow

`source family → exact item → exact original/primary evidence → claim map →
distinct reader job → producer contract → independent review → release/public
verification`

Run:

```sh
node scripts/check-source-registry.mjs
node scripts/test-source-registry.mjs
```

The check validates identity, URLs, authority/status/cadence vocabulary,
required fields, destination coverage, practitioner-roster reconciliation,
the Career/Work-Life transformation and the NewsStand evidence/AIDB contract.
It does not prove that every URL is reachable today or that any item is
correct; those remain exact-item checks.

## Known current gaps

- Reuters, Ars Technica and MIT Technology Review topic routes were not
  machine-openable during the 2026-08-11 consolidation. They remain registered
  for exact-item use, but their topic-route access must be verified before
  automation relies on them.
- Several official/vendor, labour-market and course sources have `checkedAt:
  null`. They are intentional on-trigger candidates, not secretly verified
  monitors.
- The registry does not yet include every national regulator, court, academic
  journal, model company, laboratory or individual practitioner. Those enter
  when a real LAiDIES question requires them and their distinct contribution is
  established.
- Career/Work-Life Tips are now a required destination here, but the current
  `daily-learning-derivatives` schema still lacks the `career_life` record type.
  The source list closes routing, not that implementation gap.
