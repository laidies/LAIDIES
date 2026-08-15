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

1. **Exact reporting being checked:** The Neuron, “OpenAI, Claude, and Gemini's
   Reasoning Got Cracked.”
   URL: https://www.theneurondaily.com/p/openai-claude-and-gemini-s-reasoning-got-cracked
   The public page and sitemap confirm its 2026-08-12 publication date. Its
   section `Researchers Cracked Open AI's Hidden Reasoning` says Claude,
   ChatGPT and Gemini perform private step-by-step reasoning, that encrypted
   blocks could be replayed into weaker sibling models with a jailbreak prompt
   and that 367 pieces of personal information and 182 credentials were
   recovered across 315,320 public blocks. Ali's forwarded August 12 AI
   Intelligence Brief confirms this was the reporting she encountered. That
   private briefing is discovery evidence only and must not be exposed as a
   public source.
2. **Underlying primary source:** Alexander Panfilov et al., “Stealing Reasoning
   Traces from Proprietary LLM APIs,” a research preprint published by arXiv on
   2026-08-10.
   URL: https://arxiv.org/abs/2608.09867
   The paper was inspected in full for abstract, sections 2.5, 4.1, 5.1–5.5
   and appendices. It is a preprint; no peer-review claim is made.
3. **Anthropic current product documentation:** “Thinking,” inspected 2026-08-12.
   URL: https://platform.claude.com/docs/en/about-claude/models/extended-thinking-models
   Use: corroborates that API responses can contain an opaque signed representation of full reasoning that may be returned for continuity. It does not independently verify the paper’s exploit.
4. **Google current product documentation:** “Gemini thinking” and “Thought Signatures,” inspected 2026-08-12.
   URLs: https://ai.google.dev/gemini-api/docs/thinking and https://ai.google.dev/gemini-api/docs/generate-content/thought-signatures
   Use: corroborates that stateless/manual histories can carry signed thought state between requests. It does not independently verify the paper’s exploit.
5. **OpenAI current product documentation:** “Reasoning models,” sections “Keeping reasoning items in context” and “Preserve reasoning without stored responses,” inspected 2026-08-12.
   URL: https://developers.openai.com/api/docs/guides/reasoning
   Use: corroborates that applications may pass reasoning items between calls and that stateless responses include opaque encrypted reasoning content. It does not independently verify the paper’s exploit.
6. **User-forwarded Amazon Quick briefing:** discovery and exact encountered-
   reporting evidence only. It is private, is not a public evidence source and
   contains a rejected recommendation to ask a model to “show its work.” No
   Amazon-, tax-, email-, Slack- or internal-workplace detail may enter the
   article.
7. **OpenAI current consumer documentation:** “Data Controls FAQ” and “ChatGPT
   Shared Links FAQ,” inspected 2026-08-15.
   URLs: https://help.openai.com/en/articles/7730893-chatgpt-data-controls and
   https://help.openai.com/en/articles/7925741-chatgpt-shared-links-
   Use: distinguishes content submitted to a private ChatGPT account from a
   shared-chat link. OpenAI says Data Controls govern whether conversations may
   help improve models, and anyone with a consumer shared link can view and
   forward the included conversation. These documents do not verify the paper's
   attack or imply that a private chat is a public webpage.

## What happened

The researchers found that opaque reasoning data returned by certain model APIs could be moved across sessions, users and models within the same provider family. During the tested period, a less-protected sibling model could be induced to reveal data represented inside a trace produced by a stronger model. The authors disclosed the attacks to the affected model providers, Microsoft and Hugging Face. They report that all model providers acknowledged receipt and that the same attacks no longer worked afterward.

`Attack` means the deliberate test sequence: move an opaque bundle made by a
stronger model into a weaker sibling model from the same provider, add
instructions designed to bypass safeguards and ask the weaker model to recover
the hidden contents. `Stopped working` means that exact tested decoding sequence
no longer returned the hidden material in the authors' post-disclosure tests;
it is not a claim that all AI privacy risks are fixed.

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

The paper did not study ordinary private consumer-chat accounts, ordinary file
uploads, selected visible words pasted into another document, public chat links
or support-file requests. Uploading content gives the service that content but
does not itself create a public webpage. Public chat links are a separate
intentional sharing route; OpenAI's current consumer FAQ says anyone with such
a link can view and forward the included conversation. Provider storage,
training and retention are separate product-policy questions, not findings of
this paper.

A Markdown file (`.md`) is a readable plain-text document, not an opaque
reasoning bundle by default. Sharing one sends its visible text. Publishing a
whole project folder may additionally send settings, session records or other
files the person did not inspect. This is an ordinary-file boundary and useful
precaution; the paper did not study Markdown documents as a category.

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

Publish one Daily Headline Reality Check. Do not call it Breaking. Quote The
Neuron's encountered headline, explain the alarming impression it creates and
then identify the preprint underneath it. Correct the every-private-chat fear
in the headline and standfirst. Explain the exact model-to-model decoding test
before calling it an attack. Begin consequences from ordinary private ChatGPT
use, answer the Markdown question as a bounded adjacent-file explanation and
translate credentials into access or harm. Keep prompt injection, model
distillation and hazardous-output findings outside this Daily; they may support
a separately commissioned Big Picture only if they earn a distinct reader
question.
