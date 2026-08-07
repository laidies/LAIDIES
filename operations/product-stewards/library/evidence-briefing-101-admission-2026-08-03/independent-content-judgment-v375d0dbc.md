# Briefing 101 — independent content judgment

**Judged:** 2026-08-03 America/Vancouver
**Verdict:** **HOLD — TWO CUTLINE REPAIRS REMAIN**
**Bounded positive finding:** The exact body is a useful compact reference, its provider claims are appropriately qualified, and it no longer duplicates Episode 2's teaching job.

This is an independent content judgment only. It does not edit or admit the book, alter the Library, change state, deploy or publish.

## Exact judged tuple

| Artifact | SHA-256 |
|---|---|
| `content/library-books/rendered/briefing-101.html` | `375d0dbcdae98b06143a30ae31e91b3eb142cc032063ff193623c9ce97c7b050` |
| `content/library-books/briefing-101.source.json` | `b8eb01f4373195ce00f858fc5abaf6ebb32a1a8b63dd702951e7d3c9124dfdf0` |
| `content/library-books/briefing-101.claims.json` | `acb706987fcad3c5f75a260471441893136acca63980919957c7783502757bc6` |
| `scripts/check-briefing-101-claims.mjs` | `d86757a6aa38206c1cf5c7e34af0d3ed0b3c9f2af266c089abc4497a2788ecde` |
| `operations/product-stewards/library/evidence-briefing-101-admission-2026-08-03/independent-maker-cutline.md` | `744d4e56c24c4a2bbdbb1c101fc71bbfd208a846aabfa163e631e2f17266d616` |

## Findings that pass

### Current provider claims

I independently reopened both official sources on 2026-08-03.

- Anthropic's current Prompting best practices still recommends clear, explicit instructions; relevant context; desired output format and constraints; and uses the brilliant-but-new-employee comparison for missing norms and workflow context. Its positive-instruction advice appears specifically under output-format control. The book correctly avoids turning any of this into a universal law or truth guarantee.
- OpenAI's current Prompt engineering guide still separates instructions, examples and context, recommends relevant context, says optimal prompt content/order may vary by model and describes precise instructions for current GPT models. The book appropriately presents its exact five-part organization as LAiDIES synthesis rather than OpenAI's universal standard.
- The rendered wording is materially safer than the rejected predecessor: no every-tool promise, no claim that a prompt cannot be a query or command, no claim that the brief is the only variable, and no universal claim that positive instructions outperform negative ones.

Official sources:

- `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices`
- `https://developers.openai.com/api/docs/guides/prompt-engineering`

### Book/reference fit and procedure usefulness

- The body answers one durable lookup job: turn a real request into a usable brief containing job/outcome, audience, format, tone and constraints, then check the result before use.
- It is a compact, scannable procedure rather than a class in prose. It contains no quiz, lesson sequence, invented feedback loop or forced transfer architecture.
- One harmless, held-constant deck comparison makes the procedure visible without claiming causal or universal evaluation evidence. Its evaluation questions are usable and the non-guarantee is adjacent.
- The `ask up to three questions and wait` fallback is useful when the reader cannot fill a required part, while preserving her responsibility for goal and evidence.

### Episode 2 complement

- Episode 2 retains the narrative demonstration. The book uses a different controlled deck task, reduces David/Moira to one bounded analogy paragraph, and directly routes to Episode 2 once.
- The book owns the reusable five-part procedure and explicitly says the episode owns the human story. This is complementary retrieval value, not duplicated class/narrative work.

### Evidence, freshness and correction

- Six claim records bind rendered locators, public wording, direct sources where applicable, scope, recheck triggers and privacy-safe correction routing.
- Both source records identify official URLs, access date, provider scope and before-release recheck. The canonical source supplies the responsible Library editorial/AI research owners and material-change/learner-confusion triggers.
- The rendered book clearly identifies the five-part model as LAiDIES synthesis, names its HOLD/currentness boundary, links both sources and tells readers not to email private work material.

## Blocking gaps

### 1. The rendered new-hire analogy does not carry its canonical/cutline limit

The canonical `B101-A001` limit says the analogy establishes nothing about competence, truth, confidentiality, memory, permissions or access. The maker cutline required those limits to be attached where the analogy appears. The rendered paragraph instead says only that the model is not a colleague, lacks shared responsibility/human judgment and may fail even when a human would understand.

That wording is directionally safe but incomplete against the exact governing cutline. It leaves the familiar “employee” metaphor available to imply workplace trust, confidentiality, retained context or system access. The checker requires only the phrase introducing the limit and therefore does not detect this loss.

**Smallest repair:** append one direct sentence to the rendered new-hire paragraph: `The analogy tells you nothing about competence, truth, confidentiality, memory, permissions or access.` Keep the existing paragraph and all other analogy wording.

### 2. The required pre-open/integration repair is absent from the review tuple and stale in the current Library

The cutline required a shelf summary that names the actual procedure and scope. Current `library.html` still says `How to ask so it comes back useful — brief it like a sharp new hire.` That is analogy-led and does not tell an unfamiliar visitor the five components or the checking boundary before opening.

The current Miss Jeeves continuation and the retained Vocab cross-reference also still target `The Anatomy of a Brief`, a heading deliberately removed by the new body. The book can still fall back to opening in full if admitted, but the promised exact destination no longer exists.

**Smallest repair:** use the cutline's already-proposed shelf description or an equally concise equivalent: `Turn a vague request into a usable brief: job, audience, format, tone and constraints — plus what to check before you send.` Rebind the two stale deep links to an existing stable heading, preferably `Brief in five parts`. Include the changed `library.html` hash and dependent reader-test evidence in the next packet.

## Independent checks

- `node scripts/check-briefing-101-claims.mjs` — **PASS**, 6 claims, 2 sources, 5 steps, 1 comparison, 3 analogies, `status=HOLD`.
- `node scripts/test-library-product.cjs` — **PASS**, 68 checks, 44 external requests blocked.
- `node scripts/test-library-modular-reading-system.mjs` — **PASS** at 1440, 390 and 320 pixels.
- `node scripts/check-product-stewards.mjs --owner-entry library` — **PASS**.
- Targeted `git diff --check` — **PASS**.

The first three tests do not compensate for the two gaps above: the claim checker under-specifies the new-hire boundary, while the shared Library tests do not require Briefing's successor shelf/deep-link strings.

## Rejudgment cutline

Request a narrow successor judgment after only these items change:

1. rendered book and its hash-bound canonical/claims records include the full new-hire limit;
2. the checker fails if that exact boundary disappears;
3. Library pre-open copy names the five-part procedure plus checking boundary;
4. stale `The Anatomy of a Brief` references point to a real successor heading; and
5. exact hashes plus the claim, product and modular-reader test results are supplied.

Until then, Briefing 101 remains **HOLD**. No admission, deployment, publication or public-origin claim is authorized.
