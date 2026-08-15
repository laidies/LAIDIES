# Source and claim map — AI work logs can carry secrets outside the visible chat

**Candidate:** `ai-work-logs-hidden-secrets-2026-08-12`
**Writing mode:** Headline Reality Check
**Edition:** The Daily — not Breaking
**Independent read completed:** 2026-08-12 America/Vancouver
**Correction owner:** NewsStand accuracy and corrections editor
**Recheck:** any author correction; provider statement; evidence that the disclosed attacks again work; or a material change to provider handling of reasoning/signature fields.

## Reader question

If I use an AI assistant, can private information hide in a file even after the visible conversation looks clean—and what do I actually need to do?

## Source set

1. **Exact public item being checked:** Alexander Panfilov et al., “Stealing Reasoning Traces from Proprietary LLM APIs,” a research preprint published by arXiv on 2026-08-10.
   URL: https://arxiv.org/abs/2608.09867
   The source chain contains no separately verified conventional news article
   behind this candidate. The public item is the paper itself; the forwarded
   briefing is private discovery material, not the headline being attributed.
   The paper was inspected in full for abstract, sections 2.5, 4.1, 5.1–5.5
   and appendices. It is a preprint; no peer-review claim is made.
2. **Anthropic current product documentation:** “Thinking,” inspected 2026-08-12.
   URL: https://platform.claude.com/docs/en/about-claude/models/extended-thinking-models
   Use: corroborates that API responses can contain an opaque signed representation of full reasoning that may be returned for continuity. It does not independently verify the paper’s exploit.
3. **Google current product documentation:** “Gemini thinking” and “Thought Signatures,” inspected 2026-08-12.
   URLs: https://ai.google.dev/gemini-api/docs/thinking and https://ai.google.dev/gemini-api/docs/generate-content/thought-signatures
   Use: corroborates that stateless/manual histories can carry signed thought state between requests. It does not independently verify the paper’s exploit.
4. **OpenAI current product documentation:** “Reasoning models,” sections “Keeping reasoning items in context” and “Preserve reasoning without stored responses,” inspected 2026-08-12.
   URL: https://developers.openai.com/api/docs/guides/reasoning
   Use: corroborates that applications may pass reasoning items between calls and that stateless responses include opaque encrypted reasoning content. It does not independently verify the paper’s exploit.
5. **User-forwarded Amazon Quick briefing:** discovery and format input only. It is private, is not a public evidence source and contains a rejected recommendation to ask a model to “show its work.” No Amazon-, tax-, email-, Slack- or internal-workplace detail may enter the article.

## What happened

The researchers found that opaque reasoning data returned by certain model APIs could be moved across sessions, users and models within the same provider family. During the tested period, a less-protected sibling model could be induced to reveal data represented inside a trace produced by a stronger model. The authors disclosed the attacks to the affected model providers, Microsoft and Hugging Face. They report that all model providers acknowledged receipt and that the same attacks no longer worked afterward.

## Complete public-sharing journey

The directly studied route was:

1. a developer or researcher used an AI coding, research or benchmark tool;
2. the tool produced a machine-readable record of the run containing visible
   instructions, answers and tool actions plus opaque provider fields;
3. the developer or research project deliberately uploaded the original record
   to GitHub or Hugging Face so others could inspect, reproduce or reuse the
   work;
4. the paper's researchers downloaded 6,708 such public records and attempted
   to recover the opaque material.

The paper did not study ordinary private consumer-chat accounts, selected
visible words pasted into another document, public chat links or support-file
requests. Public chat links are a different intentional publication route;
support-file handling is a related precaution, not a paper finding.

The paper's clearest observed origin example is a coding agent asked to clean a
software repository: its hidden reasoning repeated the API keys it was meant to
remove. Across genuine-user records, 64 of 704 recovered artifacts were absent
from visible chat. The authors could not determine each origin; they identify
model memory and visible-text scrubbing as possibilities, not resolved causes.

## Claim map

### LOG-C01 — the audience and mechanism

**Claim:** The risk described in the paper concerns technical AI session records that contain opaque reasoning/signature fields, particularly when developers, researchers or organizations publish or replay raw logs; it does not establish that an ordinary person’s private ChatGPT conversation became public merely by using chat.

**Evidence:** Primary paper abstract, introduction and section 4.1; provider documentation on reasoning/signature fields.
**Classification:** verified mechanism plus explicit scope boundary.
**Does not establish:** that every API log contains a secret; that consumer chat histories were scraped; or that all products/providers expose identical fields.

### LOG-C02 — the dataset and observed leakage

**Claim:** The study collected 6,708 publicly available agent trajectories and reconstructed 315,320 reasoning traces. The authors report 1,028 reconstructed blocks with at least one privacy leakage and 328 trajectories—4.9%—with at least one real sensitive item.

**Evidence:** Primary paper section 4.1, pages 8–9.
**Classification:** verified as author-reported study result.
**Boundary:** the scan was targeted and non-exhaustive; the paper used an LLM judge to label potential privacy violations.

### LOG-C03 — genuine-user secrets and visible-chat mismatch

**Claim:** In genuine, non-benchmark user sessions, the recovered set included 62 API keys, 33 passwords, 24 access tokens and 7 private keys. The paper separately counts 328 affected session files and 704 distinct sensitive artifacts inside genuine-user sessions; one session can contain multiple artifacts. Sixty-four of those 704 artifacts were absent from the visible chat history.

**Evidence:** Primary paper section 4.1, pages 8–9.
**Classification:** verified as author-reported aggregate.
**Boundary:** the authors could not determine for every artifact whether it came from model memory or remained after visible text was scrubbed; benchmark/synthetic records account for much of the paper’s aggregate personal information.

### LOG-C04 — mitigation status

**Claim:** The paper does not demonstrate a still-working public exploit on 2026-08-12. The authors say the evaluated attacks no longer worked after responsible disclosure.

**Evidence:** Primary paper sections 5.1–5.2, page 10.
**Classification:** verified as author report, not independently reproduced by LAiDIES.
**Boundary:** provider implementations are proprietary and can change without notice.

### LOG-C05 — useful action

**Claim:** People publishing technical AI-session material should not treat a visually redacted transcript as a safe raw log. The paper recommends stripping reasoning blocks and opaque fields before public release and avoiding raw API transcripts with signatures in shared repositories or workspaces.

**Evidence:** Primary paper section 5.4, page 10.
**Classification:** author recommendation adopted with a narrower LAiDIES action: share a purpose-built report containing only approved visible fields, not the raw session object; rotate exposed credentials when raw logs may have been public.

### LOG-C06 — “show your work” is not a security check

**Claim:** Asking a model to show its work is not a reliable way to inspect or sanitize hidden reasoning state.

**Evidence:** Provider documentation distinguishes readable summaries from encrypted or opaque full reasoning; Anthropic explicitly states no display setting returns raw chain of thought. The paper’s attack required a technical cross-model replay exploit, not an ordinary user request.
**Classification:** verified practical limit.
**Boundary:** a provider-supplied reasoning summary can still help explain an answer, but it is not proof of the full hidden state or a security scan.

## Evidence establishes

- Raw technical session records can contain meaningful data outside the visible answer.
- During the tested period, the researchers could exploit portability between some provider-family reasoning traces.
- Publicly shared logs contained real credentials and personal information in the studied sample.
- Exact attacks were disclosed and, according to the authors, stopped working afterward.

## Evidence does not establish

- A continuing zero-click breach of ordinary consumer chats.
- That every hidden field is dangerous or every published log leaks data.
- Complete fidelity of every reconstructed token; the authors lacked ground-truth plaintext.
- That asking an AI to reveal its reasoning exposes or verifies the opaque data.

## AIDB comparison

**Status:** `COMPARED_AS_DETECTION_LENS / EXACT PAPER ABSENT`. The scheduled
AIDB cycle at 2026-08-12T08:33:17-07:00 found no publisher-listed item covering
this exact paper. On 2026-08-15 LAiDIES also inspected the public AIDB archive
and representative analytical editions, including “The AI Chart Everyone Is
Getting Wrong” (2026-06-12, https://aidailybrief.ai/e/2026-06-12), “The Right
Way to Deal With AI Data Centers” (2026-06-23,
https://aidailybrief.ai/e/2026-06-23) and “What a $30B Hedge Fund Implosion
Really Means for AI” (2026-07-31,
https://aidailybrief.ai/e/2026-07-31). Their useful detection pattern is:
identify the frightening or
viral interpretation; recover what the number, event or study actually
measures; preserve population, cause, comparison and date limits; separate the
real consequence from the apparent one. LAiDIES uses that pattern to select a
Headline Reality Check here because an ordinary reader can reasonably infer an
every-private-chat breach from the coverage. AIDB remains a scout, not
authority, and its technical density is not the article voice. The signal
itself arrived through Ali’s forwarded briefing; LAiDIES independently
recovered and read the primary paper, narrowed the audience, preserved the
mitigation status and rejected the briefing’s “show your work” advice.

## Editorial decision

Publish one Daily Headline Reality Check. Do not call it Breaking. Correct the
every-private-chat fear in the headline and standfirst. Do not use “AI’s
encrypted reasoning blocks were hacked” as the reader entry. Begin with the
ordinary action—developers and researchers deliberately posting a complete
behind-the-scenes file so others could inspect the work—then explain the
invisible second layer. Keep prompt injection, model distillation and
hazardous-output findings outside this Daily; they may support a separately
commissioned Big Picture only if they earn a distinct reader question.
