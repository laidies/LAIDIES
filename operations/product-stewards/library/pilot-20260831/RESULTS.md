# Four-book pilot: actual runs and findings

**Checked 31 August 2026. Internal research, not textbook copy or publication approval.**

Nine real model responses are preserved. This completes the first bounded
hands-on test round, not the whole approved sample package or the four books.
Sample chapters, wider model/effort coverage, installed-context/skill tests and
an unfamiliar human reader remain outstanding. The public Library was not changed.

## What changed the recommendation

1. **A genuine Free route produced files.** The observed ChatGPT Free account
   created both requested documents for the ordinary and harder cases. After
   the harder response, it displayed a data-analysis limit. A plain-text
   revision and correction still worked without an upgrade. This is an
   observation about this account/session, not a promise of identical quotas.
2. **The documents can disagree even when the check summary sounds right.**
   The Free revision's proposal charged for 20 meals while its evidence used
   22. The proposal total was **CAD 516.45**, not **CAD 536.25**. Its concluding
   correction did not fix the displayed table. A specific follow-up did.
3. **Paid is not synonymous with source-faithful.** Claude's ordinary output
   budgeted one pack per attendee but described one per pair. Its harder
   Medium output turned “dietary needs not collected” into an unsupported
   statement that collection was not planned or budgeted.
4. **Higher effort needs an earned reason.** Sonnet 5 Medium and High both got
   the harder venue and budget right. High used 8,177 versus 6,400 reported
   Sonnet output tokens and took 76.7 versus 71.8 seconds. One pair does not
   establish reliability, best value, a subscription-credit ratio or causation.
5. **Reviewers also need checking.** A supporting AI review initially missed
   the pack contradiction and later attributed a Medium-only phrase to High.
   The foreground checked the actual files, rejected that cross-run finding
   and independently counted invitations. No AI review is human-reader evidence.

## Exact setup and limits

The fictional job: propose a 90-minute beginner AI workshop, including a
10-minute break, a budget, an invitation and a no-account paper option. Nothing
was booked, sent, purchased or published. All source details are invented.

- **ChatGPT:** signed-in web account visibly labelled Free; Chat, not Work.
  Every response's model tooltip identified **GPT-5.6 Luna**. Think was not
  selected; internal reasoning effort is unknown, not labelled Low or Light.
  No Project or Skill was configured. Account-wide memory/custom instructions
  were not audited, so this is not a clean-room model benchmark.
- **Claude:** existing Max subscription authentication, first-party Claude
  Code **2.1.225**, requested and reported **claude-sonnet-5**, Medium or High.
  Safe mode disabled skills, memories, hooks and MCP. Only the Write tool was
  supplied; no calculator, shell, browser or file-reading tool. Source text
  and previous outputs were supplied directly in the prompt. This is **not**
  Claude Chat, Cowork, or a simulated Free Claude account.
- Claude's revision and repair used fresh sessions with actual previous files
  pasted into context; ChatGPT continued its existing conversation. Do not
  interpret differences as model-only effects. Only the Claude harder
  Medium/High pair used byte-identical prompts and equivalent tool settings.
- Claude's usage record also lists a small Haiku helper call. Its exact role
  is not established here. No user-requested review team ran inside the trial.
  API-equivalent dollar figures in logs are **not a subscription invoice**.
- Existing account allowances were used. No plan was bought, API credential
  used, overage enabled, account created, or paid upgrade accepted. The trial
  consumed included account usage. No sensitive real-world material was sent.

## Run inventory

Every run folder contains the exact submitted prompt, proposal, evidence and
setup record. Claude folders also retain the actual process response and
timings. Free revision/repair folders preserve the full copied response as
well as mechanically extracted document sections; these were text responses,
**not model-created downloads**. No errors were silently edited out.

| Actual run folder under `runs/` | Observed result | Important qualification |
|---|---|---|
| `chatgpt-free-ordinary` | Actual files; total 509.30 | Evidence invents a “required projector”; source only says included |
| `claude-sonnet5-ordinary-medium` | Actual files; total 509.30; 50.3 s | Pack-per-pair contradiction; unsupported refreshments detail |
| `chatgpt-free-harder` | Actual files; North Hall; total 529.10 | Data-analysis limit appeared afterward |
| `claude-sonnet5-harder-medium` | Actual files; North Hall; total 529.10; 71.8 s | Unsupported dietary-policy statement; room source mislabelled S4 in a check |
| `claude-sonnet5-harder-high` | Actual files; North Hall; total 529.10; 76.7 s | Approximate word-count claim; no broad quality superiority established |
| `chatgpt-free-revision` | Text; West Room; proposal total **516.45** | **Failed:** catering and four dependent figures stale; evidence correct |
| `chatgpt-free-repair` | Text; proposal/evidence total **536.25** | Targeted correction reconciled actual figures; not an A/B experiment |
| `claude-sonnet5-revision-medium` | Actual files; West Room; total 536.25; 69.3 s | Retained unsupported dietary policy; called capacity-source conflict moot |
| `claude-sonnet5-repair-medium` | Actual files; total 536.25; 138.4 s | Main repairs made, but residual source attribution/causal wording remains |

The last Claude repair still attributes uncollected dietary needs to the
caterer in unresolved-items prose, although the source does not assign who
collects them. Its revised evidence also overstates capacity reconciliation as
driving the venue choice: it changes North's eligibility, but eligible West
would still be cheaper even if North held 24. These raw files are **not clean
publication-ready examples**. No further retry was run for this bounded round.

## Checks performed against actual artifacts

`node operations/product-stewards/library/pilot-20260831/check-pilot.mjs`

The check was calibrated with an intentionally incorrect total in memory; it
rejected that input without changing any saved response. It checks the
proposal's actual budget cells, a continuous 0–90-minute agenda, a 10-minute
break and the full invitation block. It detects the five wrong Free revision
budget cells. The other eight proposals pass these **narrow** checks; that
does not mean they pass factual or editorial review.

Independent invitation counts: Free ordinary **81**, Claude ordinary **82**,
Free harder **71**, Claude harder Medium **88**, High **94**, Free revision and
repair **71**, Claude revision and repair **78**. Convention: all blockquote
text, including headers, whitespace-separated after Markdown markers are
removed. All are within 120. Several model self-counts were inaccurate under
this convention. Word-count conventions can differ; the limit outcome did not.

The foreground also read the source fixtures and actual complete outputs,
checked proposal/evidence agreement, and inspected the Claude repair diff.
The staged whitespace check flags Markdown hard-break spaces in the original
Free downloads and trailing blank lines in captured text. Those raw captures
are intentionally preserved; authored research and runner files are checked
separately. No automatic formatting was applied to evidence of model output.
Venue decisions and arithmetic reference answers:

| Case | Venue / attendees | Catering | Printing | Subtotal | Reserve | Total | Remaining |
|---|---|---:|---:|---:|---:|---:|---:|
| Ordinary | North / 18 | 162.00 | 36.00 | 463.00 | 46.30 | 509.30 | 90.70 |
| Conflicting quotes | North / 18 | 180.00 | 36.00 | 481.00 | 48.10 | 529.10 | 70.90 |
| Approved revision | West / 22 | 198.00 | 44.00 | 487.50 | 48.75 | 536.25 | 63.75 |

The harder case's minimum bill is 20 meals, not a fixed 20 meals at every
attendance. Revised West venue cost is (180 + 30) × 1.05 = 220.50. Delivery
stays 25. The reserve is applied once to the after-tax subtotal. Historical
18-person references explicitly labelled as previous are not stale current
attendance errors.

## Full examples and reusable material

- [Ordinary source packet](ordinary-input.md), [conflicting sources](harder-input.md),
  [approved revision](revision-input.md), and [complete initial instruction](run-prompt.md).
- [Free first revision, including its mistake](runs/chatgpt-free-revision/response.md).
- [Exact Free correction prompt](runs/chatgpt-free-repair/submitted-prompt.txt)
  and [complete corrected response](runs/chatgpt-free-repair/response.md).
- [Claude source-fidelity correction prompt](claude-repair-prompt.md), with
  the actual expanded submission and results in `runs/claude-sonnet5-repair-medium/`.

For this small job, we did not install a custom Skill. The brief and named
source hierarchy were pasted context. That demonstrates a low-setup workflow;
it does not test automatic `AGENTS.md`, `CLAUDE.md` or `SKILL.md` loading.

## Expert methods: evidence, adaptation, test status

These sources were reopened on 31 August 2026, not treated as verified merely
because they appeared in an older research packet.

| First-hand source | Adaptation used here | What this round establishes |
|---|---|---|
| [Anthropic Applied AI team: context engineering, 29 Sep 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Small explicit source set; distinguish approved requirements from informal notes | Worked on initial venue/quote reconciliation; no context-size A/B test |
| [Claude Code team: current best practices](https://code.claude.com/docs/en/best-practices) | Specific failure evidence and runnable acceptance checks, instead of a vague review request | Free correction repaired a real table error; local checker detected it. Cross-product adaptation, not a vendor claim about ChatGPT |
| [Simon Willison, 4 Jan 2026](https://simonwillison.net/2026/Jan/4/coding-again/) | Achievable job, relevant context and concrete feedback | Useful framing for the trial; practitioner commentary, not proof of a universal recipe |

The expert-tip improvement is an observed repair, **not** a controlled trial
of generic versus specific feedback. A replicated fresh-session comparison is
still required before claiming the tip causes a higher success rate. The
official guidance also covers context files and Skills; we have not tested
those mechanisms in this round.

## Consequences for the four books

- **ChatGPT guide:** include the genuine Free files-to-limit-to-text example,
  the visible model label, the actual failed revision and exact correction.
  Do not equate a Free tool limit with all chat being unavailable.
- **Claude guide:** distinguish a Claude Code subscription run from Chat and
  Cowork. Use the Medium/High pair as a bounded observation, not a default High
  recommendation. Include source-policy invention and incomplete repair.
- **Tool selection:** this project did not establish a reason to buy a plan.
  Free output worked after a targeted correction; paid access supplied a
  different file-working environment, not guaranteed correctness. Music,
  narration, export rights and other jobs need their own real tests.
- **Who’s Who:** [chip-chain source card](CHIP-CHAIN-SOURCE-CARD.md) lays out the
  relationship-and-role structure. It is research for a sample section, not a
  finished chapter, complete industry roster or proof of which chips ran
  these particular sessions.

## Remaining work and release boundary

The approved sample package remains **BUILDING**. Next: bind the required
prose-production contract and draft the small vendor/selection and chip-chain
samples from these actual results. No need to rerun these unchanged fixtures
merely to make the history cleaner. Test additional models/settings only when
they answer a distinct reader decision; include harder tasks before Max claims.

Still untested: Claude Free Chat; paid ChatGPT; Claude Chat/Cowork; Codex as an
independent product trial; all-model Light–Max coverage; automatic context-file
loading; installed Skills; repeated-run reliability; third-party music and
narration outputs/rights; reader comprehension. Existing Claude browser access
was signed out; subscription-authenticated Code was available. No login or
new-account setup was attempted to fill that gap.

No consenting unfamiliar human reader was available in this task. No one was
contacted, and no simulation is being substituted. A reader study will require
a named participant and consent before contact or recording. Manuscripts,
rendered-book QA, independent admission and public release remain HOLD.

Freshness owner: Library producer. Recheck model labels, plan access, tool
limits and official guidance before sample drafting and again before release;
retest affected workflows when the model, controls or product surface changes.
There is no background monitoring or automatic update schedule configured.
