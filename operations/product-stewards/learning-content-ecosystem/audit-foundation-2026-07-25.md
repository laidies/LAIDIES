# Learning-content ecosystem audit foundation — 2026-07-25

**Status:** REPORT READY for the foundation only. This report does not approve, publish, hide, alter or redeploy learning content.

## Scope and evidence

**Observed sources:**

- `library.html` shelf register and `content/library-books/*` source material;
- `operations/library-content-quality-audit-2026-07-24.md` and the LIBRAiRY dossier;
- `content/site/high-classes.json`, class script/spec materials and the SUNNYVAiLE High dossier;
- `content/episode-index.json`, `content/episodes/issue-01.json`–`issue-05.json`, episode canon, Chick Flicks and episode-media records;
- `content/newsstand-stories.js`, NewsStand publication policy, candidate schema and dossier.

**Inventory result:** 16 LIBRAiRY shelf entries, 37 High register rows, 5 weekly-episode records (4 published, 1 draft/unruled) and 2 current approved NewsStand stories are recorded in [`inventory.json`](inventory.json). The High collection carries all required audit fields as explicitly inherited defaults plus per-class factual metadata; empty objectives for unscheduled Claude/Gemini rows are recorded as a gap, not filled with invented teaching claims.

**Out of scope:** full-text claim checking, new research claims, learner studies, edits to content/code, public verification and publication. `episode-06.canon.md` is explicitly superseded/historic and is not counted as a current weekly item.

## Exact overlap, gap and risk register

| ID | Classification | Observed evidence | Why it matters | Next narrow packet |
|---|---|---|---|---|
| ECO-01 | FIX BEFORE LAUNCH | How to Check AI's Work is a clickable shelf item with only embedded placeholder paragraphs; existing library audit calls it `REJECT — PLACEHOLDER PRESENTED AS BOOK`. | Episode 3's verification learning has no truthful durable follow-through. | Verification Rulebook body-or-label packet, then independent instructional/trust review. |
| ECO-02 | FIX BEFORE LAUNCH | Accounts 101 is on `HOLD — FACTUAL INTEGRITY`; current account/policy claims are inherently provider-specific. | Privacy advice becomes unsafe when a slogan replaces a contract. | Current primary-source, provider/account matrix plus proportional privacy/legal review. |
| ECO-03 | FIX BEFORE LAUNCH | Vocab 101 and Concepts 101 are under architecture reset/prototype ruling; handbook chapter 1 teaches overlapping material. | A reader can get two depths and two framings without knowing which is authoritative. | One representative Agentic AI recognition → mechanism journey, independent learner test, then ownership decision. |
| ECO-04 | FIX BEFORE LAUNCH | Episode 2, Briefing 101, handbook chapters 1–2 and tool-specific content repeat prompting. | Different wording is not a distinct learning experience. | Prompting progression packet: episode demo, book procedure, one High practice task, FAiRY handoff. |
| ECO-05 | FIX BEFORE LAUNCH | Episode 3, Vocab, How to Check, Straight Answers, Dream Phone and NewsStand all touch truth/verification. | Learners need a method and practice, not six versions of “check sources.” | Verification progression and rubric, including grounding/retrieval/provenance distinctions. |
| ECO-06 | HIDE/LABEL FOR LAUNCH | Episode 5 is `DRAFT_UNRULED`; current shelf tool books are marked EP 5 or future. Who's Who is on thin/current-claims hold. | Model/app/provider claims can date quickly and current canon is contradictory. | Canon reconciliation, then dated source packets and clear availability truth. |
| ECO-07 | OWNER REVIEW REQUIRED | Four published episodes have learning descriptions and links, but the current media contract says their truthful public offer is illustrated, captioned listen-alongs; motion films remain HOLD. | “Watch” language or launch promotion must not imply approved motion films. | Retain current truthful listen-along wording until checksum-bound media gate and Ali visual approval. |
| ECO-08 | FIX BEFORE LAUNCH | High has one scripted Basics class, proposed/researched rows and many `not-scheduled` rows; classes may render but no representative teach → practice → explanation → return loop is quality-approved. | A catalogue is not a class program and raw completion is not learning. | One representative class vertical-slice packet with source/currency, exact demo, feedback, accessible recovery and learner test. |
| ECO-09 | FIX BEFORE LAUNCH | Setup/memory/context appears in Vocab, Setup 101, High Basics 3–6 and ChatGPT classes 2–4. | Users often conflate history, context, memory, instructions and projects; wrong mental model causes poor privacy/use decisions. | Stable five-layer terminology and provider-qualified implementation table. |
| ECO-10 | POST-LAUNCH EXPERIMENT | NewsStand has a strong publication contract: timely, qualified, correction-aware editions with no filler. | Making it look like an evergreen course would undermine its editorial job. | Test modest “deeper context” handoffs that preserve the article's source/date/correction primacy. |
| ECO-11 | FIX BEFORE LAUNCH | The health NewsStand story is a hard-hold topic in policy and currently shows an OpenAI source; it correctly disclaims clinical validation. | Safety comes from source qualification and clear scope, not merely a disclaimer. | Independent health/trust review and dated source/correction check. |
| ECO-12 | FIX BEFORE LAUNCH | No shared concept graph, source/currency packet, correction owner or learner transfer metric exists across products. | Products cannot systematically stay aligned or learn from confusion. | Implement a content registry extension after accepted inventory schema; no private learner data by default. |

## What should be kept, revised, merged, moved or retired

| Decision | Item(s) | Evidence versus inference |
|---|---|---|
| **KEEP, subject to item review** | Format separation: LIBRAiRY reference, High practice, episodes narrative instruction, NewsStand timely editorial. | OBSERVED in the learning standard and product charters. |
| **REVISE** | Accounts 101, Setup 101, Who's Who, Straight Answers. | OBSERVED existing library quality gates. |
| **MERGE / RE-architect** | Vocab 101, Concepts 101 and overlapping handbook material. | OBSERVED library audit; exact final ownership is an Ali/editorial ruling. |
| **MOVE / bind as a progression** | Prompting and verification material across episodes/books/High/games. | INFERENCE supported by source overlap; no content move is authorized here. |
| **RETIRE or truthfully label** | How to Check AI's Work placeholder if full canonical Verification Rulebook cannot be wired. | OBSERVED library audit ruling. |
| **HOLD** | Episode 5-derived tool guides/classes and any full-motion episode claims. | OBSERVED unrulled canon and media release gate. |

## Recommended review order

1. Repair the verification reference contract (ECO-01) and bind it to Episode 3/Dream Phone.
2. Resolve Accounts 101 safety/currency (ECO-02), then its High permissions handoff.
3. Rule the Vocab-to-Concepts boundary (ECO-03) before scaling either content family.
4. Prove one High teaching vertical slice (ECO-08) and one published episode handoff.
5. Resolve Episode 5/tool ecosystem only after its canon is ruled (ECO-06).
6. Add cross-product correction/freshness ownership and privacy-safe learner evidence (ECO-12).

## External capability research, intentionally deferred

No external product is recommended yet. The first need is not a new LMS, retrieval platform or analytics vendor; it is one accepted content contract and item-level source evidence. Once the foundation's review packets identify a concrete bottleneck, compare reversible options for source monitoring, citation/evidence management, learning research and privacy-safe analytics under the champion contract.

## Acceptance checks run

- JSON parses and the inventory contains all expected collections.
- High item IDs are compared to the canonical High register; the expected count is 37.
- Existing steward validator is run after this dossier exists; any separate registry/run-queue mismatch is reported as an integration issue, not hidden by this foundation.

## Next action

Create a narrow build/review packet for ECO-01 only. It must either bind a complete, source-qualified Verification Rulebook to the LIBRAiRY or make the shelf state honestly unavailable; it must not create another competing verification explanation.
