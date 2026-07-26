# NewsStand Cycle 6 independent four-publication review

**Status:** INDEPENDENT REVIEW COMPLETE — FAIL / RELEASE HOLD  
**Judge scope:** The Breaking, The Daily, The Weekly and The Tribune  
**Maker evidence reviewed but not accepted as authority:** Cycle 6 audit,
subproduct dossiers, build packet, external-capability review, state and backlog  
**Authority not exercised:** no story publication, feed/API call, credential
access, maker/runtime edit, deploy, public verification or owner approval

## Independent verdict

The four publication jobs are now meaningfully distinct and the reader has a
strong fail-closed access contract. That is a real product improvement.
However, the current system is still a manually edited local dataset attached
to a reader, not an operating four-publication NewsStand.

All four publications remain **HOLD**. None clears all three non-compensable
17/20 floors for product/editorial quality, accuracy/trust and positive
LAiDIES brand contribution. The Tribune is the strongest bounded example, but
one good local argument and a synthetic correction drill do not prove a
recurring publication operation.

The maker's Cycle 6 scores are too generous because they award substantial
product and trust credit to specifications, quiet states and policy fixtures
that do not yet prove representative publications or producer-to-reader
authority.

## Reproduced evidence

| Check | Independent result |
|---|---|
| `node scripts/validate-newsstand-stories.mjs` | PASS — schema 1.0.0; four canonical publication records; one visible story; one held story; no legacy `wednesday` key |
| `node scripts/test-newsstand-reader-contract.mjs` | PASS — ten deterministic state fixtures |
| `node scripts/test-newsstand-autopublish-policy.mjs` | PASS against its ten expected fixture outcomes; this tests the current shadow evaluator, not editorial truth or publication |
| `node scripts/test-newsstand-reader-browser.mjs` | NON-DETERMINISTIC FAIL/PASS — first fresh run failed search Back scroll restoration; next source run failed paper Back; a later source run passed all 73 checks |
| Fresh artifact build | BUILT LOCALLY at `/tmp/laidies-newsstand-judge.FfXTAk`; 1,083 files, 959.57 MiB; existing size warning |
| Fresh-artifact runtime hashes | PASS — `newsstand.html`, stories, reader contract and CSS are byte-identical to source |
| Fresh-artifact browser runs | NON-DETERMINISTIC FAIL/PASS — one run failed paper Back scroll restoration and a later run passed all 73 checks |
| Artifact local links | PASS — 1,964 references across 110 pages |

The browser evidence establishes a real asynchronous history-restoration
defect. Identical source and artifact files alternate between passing and
failing. The failure also moves between paper and search restoration. Two
`requestAnimationFrame` callbacks plus a zero-delay timeout are not an
observable settled-state contract.

The older
`operations/launch/eod-2026-07-25/local-public-artifact/` is not evidence for
the current reader. Its NewsStand page and data hashes differ from source and
it does not contain `content/newsstand-reader-contract.js`.

## Adversarial product findings

### NS-C6-IR-01 — Shadow policy does not enforce the four publication jobs

**Severity:** P0 editorial/trust.

The evaluator allows only Daily and Weekly to clear shadow policy, but performs
no edition-specific structural test. The fixture
`routine-product-update.json` is a single routine product update labelled
`weekly` and receives `WOULD_AUTO_PUBLISH`. That contradicts The Weekly's
contract: durable synthesis across developments, not one update or a relabelled
Daily item.

Breaking has no accepted qualified-interrupt plus clear-day pair. Daily has no
accepted briefing plus quiet-day pair. Weekly has no accepted synthesis.
Tribune bypasses the shadow evaluator only through a manually approved local
record. The labels are distinct; the admission machinery is not.

### NS-C6-IR-02 — Candidate assertions are mistaken for verified evidence

**Severity:** P0 accuracy/trust.

`evaluate-newsstand-autopublish.mjs` trusts candidate-provided scores,
`verifiedFullText`, `interestedParty`, topics, risk signals and boolean checks.
It validates URL shape, not source retrieval, response identity, content hash,
access time, claim entailment or independent judgment. It also does not reject
unknown fields, duplicate candidate/source IDs, future or stale dates, or a
candidate whose edition conflicts with its actual editorial job.

`WOULD_AUTO_PUBLISH` is therefore an unsafe name even in shadow mode. The
evaluator proves that a JSON object self-reported the expected booleans and
scores; it does not prove a story should publish.

### NS-C6-IR-03 — No transaction binds discovery to the reader

**Severity:** P0 operations/release.

The only real intake workflow is manual, consumes third-party RSS snippets,
optionally asks Anthropic to rewrite them and uploads a private seven-day
artifact. It has no public-data write authority, which is appropriately safe.
But there is no operating discovery schedule, claim-map compiler, independent
approval transaction, canonical writer, source recheck, correction intake,
append-only publication ledger, deployment transaction, rollback service or
public monitor.

The current `sourceApproval.record` values point into denied internal
`/operations/` paths that do not ship in the public artifact. This is not a
public evidence receipt and should not become one. The public record needs a
safe receipt ID/hash while the complete evidence stays in a private release
bundle.

### NS-C6-IR-04 — History restoration is not deterministic

**Severity:** P0 UX/accessibility/release.

Source and byte-identical artifact runs alternate between pass and failure at
`paper Back restores origin vicinity` and
`search Back restores origin vicinity`. Focus, route, body suppression and
cards usually restore, but scroll position is scheduler-dependent.

Acceptance requires three repeated paper and search Back/Forward cycles at
multiple viewport heights, waiting on an observable layout/restoration
condition. A historical 73-check pass cannot clear this gate.

### NS-C6-IR-05 — Current visual system does not represent four approved papers

**Severity:** P0 brand/owner.

The room/Paige illustration is attractive and recognizably LAiDIES, but the
file remains explicitly named a candidate. The large room scene visibly
contains legacy TODAY and WEDNESDAY EDITION papers. The interactive rack
provides physical props only for Weekly and Tribune; The Breaking and The
Daily exist primarily as generic controls. The Weekly prop itself still says
WEDNESDAY EDITION and requires a lengthy accessibility disclaimer to explain
the contradiction.

This is not merely cosmetic: the physical NewsStand metaphor should make the
four jobs easier to understand. Current imagery teaches the retired lineup.
No publication clears the brand floor until the exact current visual treatment
is independently judged and owner-approved.

### NS-C6-IR-06 — Reader trust is stronger than newsroom authority

**Severity:** P0/P1 trust.

The central access contract correctly suppresses held, stale, unavailable and
retracted bodies across listing, search and direct hashes. Corrections retain
the body and show a dated notice; retractions preserve the route but remove the
body. These are strong controls.

They still consume mutable JavaScript story objects containing trusted HTML.
Without a strict compiler, signed/hashed canonical dataset and tested
sanitization boundary, the reader is enforcing state on data whose production
authority is manual. The synthetic correction/retraction sequence proves UI
semantics, not a real correction transaction or rollback.

### NS-C6-IR-07 — Newcomer orientation exists; return value is unproved

**Severity:** P1 product/measurement.

Four selectors state concise jobs and quiet/hold/current language is unusually
honest. A newcomer can distinguish the labels. However:

- Breaking and Daily contain no representative issue;
- Weekly contains no accessible issue;
- the only visible Tribune story cannot demonstrate a recurring habit;
- there is no “new since your last visit” design or previous-issue baseline;
- there is no privacy-approved NewsStand event contract or current aggregate
  analytics evidence; and
- native Safari/VoiceOver, real 200% zoom and long correction/retraction copy
  remain unverified.

The experience therefore demonstrates honest empty and failure states better
than it demonstrates why someone returns.

## Independent scores

The mandatory floors are 17/20 for product/editorial quality,
accuracy/safety/trust and positive LAiDIES brand contribution. A score for a
good specification is not substituted for a working publication.

| Publication | Product/editorial | Accuracy/trust | LAiDIES brand | UX/accessibility | Technical/operations | Total | Verdict |
|---|---:|---:|---:|---:|---:|---:|---|
| The Breaking | **14/20 FAIL** | **15/20 FAIL** | **15/20 FAIL** | 14/20 | 9/20 | **67/100** | HOLD |
| The Daily | **15/20 FAIL** | **15/20 FAIL** | **15/20 FAIL** | 14/20 | 9/20 | **68/100** | HOLD |
| The Weekly | **13/20 FAIL** | **14/20 FAIL** | **12/20 FAIL** | 13/20 | 9/20 | **61/100** | HOLD |
| The Tribune | **16/20 FAIL** | **17/20 PASS** | **16/20 FAIL** | 14/20 | 12/20 | **75/100** | BOUNDED CONTENT STRENGTH; PRODUCT HOLD |

### Publication-specific rulings

- **The Breaking:** the rare-interrupt contract is responsible and unusually
  clear, but there is no representative accepted interrupt, SLA, radar or
  clear-day/qualified-pair proof.
- **The Daily:** the no-filler briefing contract is strong, but no Daily issue,
  previous-issue baseline, editor operation or job-specific evaluator exists.
- **The Weekly:** the health candidate is correctly held, but it is one item
  rather than demonstrated synthesis and the visual identity explicitly says
  Wednesday.
- **The Tribune:** “A label is not a truth detector” is a strong,
  source-labelled argument with a usable analogy and clear limits. It earns the
  accuracy floor. The publication still lacks an operating pipeline, current
  correction transaction, approved visual system and recurring proof.

## Required repair order

1. **Make the browser journey deterministic.** Replace timing guesses with an
   observable restoration condition; pass three repeated paper/search
   Back/Forward cycles at multiple heights in source and byte-identical
   artifact.
2. **Replace self-attestation with a strict candidate compiler.** Enforce
   schema closure, immutable source receipts/hashes, timestamps, duplicate
   rejection, freshness, claim-source bindings, independent verdicts and
   explicit human holds.
3. **Encode each publication's job.** Build one qualify and one reject/quiet
   fixture per publication. Reject a one-item routine update labelled Weekly,
   a Daily bundle labelled synthesis, an unearned Breaking alarm and a Tribune
   that hides opinion as fact.
4. **Prove one private producer-to-reader transaction per publication.** Bind
   discovery → candidate → claim map → independent decision → proposed
   canonical record → exact artifact → correction/retraction → rollback,
   without writing public data.
5. **Resolve the visual system.** Produce and independently judge the exact
   four-paper treatment; remove or replace TODAY/WEDNESDAY identity. Ali retains
   final visual approval.
6. **Complete native and failure QA.** Safari/VoiceOver, 320/390 px, real 200%
   zoom, long correction/retraction notices, source-link announcements and
   unexpected data/HTML fixtures.
7. **Add privacy-safe measurement only after acceptance.** Measure
   comprehension, source use, correction understanding and useful return; do
   not capture raw archive searches.

## Packaging guidance

### Public runtime allowlist

- `newsstand.html`
- `content/newsstand-reader-contract.js`
- `content/newsstand-stories.js`, only after exact editorial/release admission
- `content/newsstand.css`
- the exact independently approved Paige/room and four-publication prop assets
- `content/music/sunnyvaile-newsstand.mp3`
- statically referenced shared navigation, brand, accessibility and audio
  modules
- only exact locally referenced public assets and routes

Do not broadly package candidate directories, legacy TODAY/WEDNESDAY art,
internal dossiers, raw feed inputs, LLM drafts, review fixtures, approval
working files or credentials.

### Private release-evidence bundle

Keep the schema, policy, candidate/source hashes, claim maps, independent
verdicts, correction/retraction ledger, compiler output, test logs, artifact
manifest/hash and rollback receipt together outside the public artifact.
Expose only a public-safe receipt ID/hash if readers need verification; never
ship an internal `/operations/` path as a supposed public approval record.

The artifact gate must prove byte identity for the four runtime authority files
and rerun the deterministic, policy, hostile-data and repeated browser suites.
The 959.57 MiB whole-site artifact warning is a release-wide operational risk
and cannot be ignored merely because the NewsStand slice is small.

## Final gate

**FAIL — FIX BEFORE LAUNCH.** Preserve every publication, visual, native
accessibility, deployment and public-verification hold. Do not fill quiet
papers to improve appearance. The next admissible result is a private,
job-specific, hash-bound producer-to-reader transaction plus deterministic
source/artifact history evidence—not another self-score.
