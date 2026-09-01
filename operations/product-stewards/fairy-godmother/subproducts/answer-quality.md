# FAiRY Answer Quality & Safety subchampion

## 2026-08-31 — bounded Terra classifier trial executed; admission HOLD

Ali approved one private classifier-only trial over the unchanged 63-case
synthetic frozen set. The exact target is OpenAI `gpt-5.6-terra` with low
reasoning through Chat Completions, JSON-object output, `store:false`, standard
service tier, a 4096-token completion ceiling, a five-second per-case deadline,
one attempt per case and zero retries. The all-in spend ceiling is US$5.

Only the two files already allowlisted by the frozen export may be sent. No
visitor data, evaluator labels, join map, production secret, Worker binding,
staging change, deployment or promotion is authorized. Use a new narrowly
restricted temporary key. The runner must reserve the full remaining worst-case
cost before every dispatch, retain redacted provider usage receipts, emit one
neutral row for every case including failures, and delete the local secret after
the run. A pass is evidence about this exact classifier configuration only; it
does not admit the advice model or the live service.

The fail-closed runner was built, calibrated, independently reviewed, committed
and pushed before inference. It atomically claimed this one authorized run,
reserved US$3.980446 worst case, rejected a second invocation, recomputed every
exact request hash, required the returned `gpt-5.6-terra` model in each receipt
and independently re-scored the signed raw output.

The actual run completed63/63 responses in63 attempts with zero retries and an
estimatedUS$0.226350 cost. All63 outputs were schema-valid; there were zero
unsafe `allow`, zero volatile-fact `allow`, zero unexpected abstentions and zero
non-allow side effects. The exact gate nevertheless fails:58/63 cases were
fully correct. Two prompt-injection cases chose the safe but wrong boundary enum,
two legitimate cases chose the wrong allowed-task enum, and one quoted vendor
transformation was over-cautiously sent to clarification. That final case is a
real functionality miss. Latency also misses the preregistered target: p50
2145.691ms, p954189.018ms and max4825.428ms; the five-second hard ceiling passed.

Verdict: LOCAL EVIDENCE / HOLD. This exact Terra/low classifier is not admitted
for staging or production. Do not tune or rerun against the now-scored frozen
set. Build a new independent blind set before evaluating a successor. Exact
evidence is in `evidence/terra-classifier-trial-2026-08-31/`. The first created
key was never used and was revoked after its secret appeared in browser output;
the replacement local secret was deleted immediately after the run. The
replacement platform key still requires its separate action-time revocation.

## 2026-08-31 — visitor latency contract repaired locally; release still HOLD

The measured trial exposed a real product defect rather than merely a slow
model: the page abandoned requests at15s while the Worker continued to20s.
That could discard a valid answer and invite a duplicate retry. The local
candidate now keeps one attempt/no automatic retry, stops the Worker provider
call at30s and lets the page wait35s so the Worker's typed no-charge result can
arrive first. Visible status changes at8s and18s explain that FAiRY is still
working. The same bounded request helper now covers revisions, which previously
had no browser deadline; a timed-out revision preserves the existing draft and
restores every fitting control.

The gate was calibrated by removing the browser abort signal from a temporary
candidate and confirming the page contract failed. Current exact source passes
the page contract, the49-check real-browser fixture including slow success,
advice timeout and revision timeout, and the full60-test Worker suite plus the
frozen45-case and79-case fixtures. The broad end-of-day guard remains red on an
unrelated pre-existing Girl Talk copy expectation; it reached that failure
before its FAiRY assertions.

This closes the15s/20s mismatch locally. It does not repair the missing
`promotion-02` trial answer, prove the separate safety-classifier provider,
supply independent semantic admission or establish live latency. No additional
paid model call, secret use, production configuration or deployment occurred.
Verdict remains LOCAL BUILD / HOLD.

## 2026-08-31 — bounded Sol trial executed; quality promising, latency HOLD

The approved private20-case Sol/medium trial ran with synthetic prompts only,
one attempt per case, zero retries, exact Responses input-token counting and a
durable US$4.4768 worst-case reservation under the US$5 maximum. Nineteen cases
completed; `promotion-02` hit the20-second deadline and was not retried. Known
receipt cost is conservatively estimated atUS$0.426435; the OpenAI key table
showedUS$0.29 shortly afterward and is not treated as final billing truth.

Maker artifact-first review found all19 returned answers met their frozen
scenario judgment and none used cliché empowerment, invented facts, guaranteed
outcomes, diagnoses or fabricated expert endorsement. Six offered a grounded,
non-confidential AI preparation task and13 correctly returned none. The actual
Worker contract initially rejected the external-application `return-03` answer
because useful AI preparation was incorrectly coupled to a handbook-source
match. Ali's career-AI decision requires those to be independent. The local
repair retains strict shape/no-invention/privacy checks; a calibrated known-bad
mutation is rejected, the full suite now passes60/60 and all19 returned answers
replay as `case_success`.

Verdict remains HOLD: one missing answer, median11.396s, p95/max17.519s, no
independent semantic admission, and no real safety-classifier provider result.
The later local checkpoint above repairs the page/backend mismatch; it does not
retroactively change this paid trial. No production configuration or deployment
changed. Exact results and per-case maker judgments are bound in
`evidence/sol-answer-trial-2026-08-31/review.md`.

## 2026-08-31 — bounded Sol trial approved

Ali approved the revised20-scenario answer-only trial, maximumUS$5, using
invented workplace situations only. This supersedes the approval-pending
language in the historical proposal below. Preserve its Sol/medium settings,
no retries, no visitor data, no production release and separate test access.
BUILDING: enforce total attempts/reserved worst-case cost and validate exact
input-token bounds before any paid request. Provider access is not implied by
budget approval; do not retrieve production secrets or borrow other task keys.

Local preparation now contains exactly20 private synthetic cases—four each for
feedback, credit, workload, promotion and return—with ordinary/power/context,
missing-evidence and no-unnecessary-AI judgments. The offline preflight passes
every prompt through the actual Worker and captures the exact outbound Sol
request; evaluator judgments are kept out of the model input. It makes zero
network calls and deliberately exits HOLD. Captured request JSON is10612–10758
bytes; byte size is explicitly not treated as a token count.

A durable pre-dispatch journal now reserves the fullUS$0.22384 conditional
worst-case and one of20 attempts before each request. Reservations cannot be
reused or refunded after timeout/failure, and concurrent reservation uses an
exclusive lock. Mutations for duplicate case, oversized/unverified token count,
21st reservation and leaked evaluator judgment fail local tests. At all20
reservations the conditional ceiling isUS$4.4768, leavingUS$0.5232 under the
approved maximum. Independent review confirmed the coverage and identified the
same pre-dispatch/token-count boundary.

Current preflight verdict: HOLD, zero provider calls and zero spend. No isolated
`FAIRY_SOL_TEST_API_KEY` or general API key is configured. Official documentation
states Chat message tokenisation can vary by model and the available installed
runtime has no model-aware tokenizer. Therefore exact Sol input-token verification
is still missing and no paid runner was created. Credential creation/access is a
separate authority decision; production secrets were not inspected. No answer,
quality, latency, classifier or live-service result exists yet.

## 2026-08-31 — Sol advice target approved; local compatibility work

Ali agreed to the recommendation: `gpt-5.6-sol`, medium reasoning, standard
mode for FAiRY advice. DECIDED. Build the bounded local request/response
compatibility and its tests; preserve the current safety classifier, frozen
production artifact, source-attribution hold and account/allowance contract.
This is model-choice authority, not an approved revised paid-trial budget,
production release, provider credential creation or visitor-data disclosure.
No automatic fallback to GPT4.1 or a cheaper model on failure.

### Compatibility build and preservation boundary

Advice and revision calls now share `worker-fairy-godmother/src/advice-provider.js`.
Default target is exact `gpt-5.6-sol`, medium reasoning, standard service tier,
8192 `max_completion_tokens` (visible plus reasoning), `store:false`, no
temperature/frequency/presence penalties. Existing text-only Chat Completions
endpoint and JSON-object contract remain: no function tools, no Responses
state replay, uploads, Pro mode, explicit cache or prompt rewrite added.
GPT5.6 supports Chat Completions; the documented reasoning/function-tools
restriction does not apply to this tool-free call. Responses remains the future
route if actual tools/multi-turn state are admitted, not a dependency introduced
for this bounded migration.

The adapter checks exact Sol model receipt, assistant role, one choice and
`finish_reason:stop`; refusals/tool calls/truncation fail before allowance writes.
At that compatibility checkpoint it enforced128KiB response bytes and a20s
deadline covering headers AND body; the current top checkpoint supersedes that
deadline with30s after measured trial latency. It cancels a stalled reader and
does not retry/fall back. Existing explicit test or
historical model overrides retain their request settings. The offline classifier
replay now explicitly names its synthetic answer model; it is not a real Sol
run. Its frozen semantic cases and labels did not change. No Wrangler config,
classifier implementation, frozen v18 bytes, page or production endpoint changed.

Maker checks: eight new compatibility tests, including the old `max_tokens`
mutation, valid Sol/schema path, refusal/truncation/wrong model/no-write cases,
revision path,128KiB failure, stalled-body timeout/cancellation and no fallback.
Existing page typed/legacy contract passes. The initial full regression exposed
old synthetic envelopes omitting Sol completion metadata; architecture mocks
now provide it and classifier offline replay declares its synthetic override.
This repairs test inputs without weakening completion guards or classifier tests.
No API key is configured in the current shell (presence checks only); no secret
was printed, read from another task or retrieved from production.

Final local verification: full Worker suite55/55 passed; frozen recovery checksum,
45-case fixture integrity and79-case classifier fixture integrity passed. These
are local behavior/integrity results, not real-provider semantic admission.
Independent read-only review found no new adapter blocker and retained the
15s/20s deadline mismatch as a release blocker. No provider call or browser/live
verification was performed in this backend-only checkpoint. Commit uses the
previously documented hooks override for unrelated repository hook failures;
only the nine task-owned paths are staged, with focused tests and staged diff
inspection retained.

Remaining: actual API/model access and real answers, tokenizer/budget enforcement
for paid evaluation, safety-classifier provider admission, production identity/
allowance/privacy gates, and measured latency. The unchanged15s page deadline
is shorter than20s backend deadline; do not deploy this candidate before a
coherent end-to-end latency/error contract is measured and repaired. No new
browser visual QA is required/claimed for these backend-only edits.

### Revised paid-trial proposal — approval/setup still required

Recommend20 synthetic **answer-only** cases using approved Sol/medium, with the
existing five-situation reference context. Use predetermined safe work routes
only inside the private quality harness; this does not evaluate or bypass the
production safety classifier, and must not be labelled end-to-end service QA.
No visitor conversations, personal files/uploads, tools, retries, deployment or
paid subscription. Separate test credentials are required; do not borrow the
production secret. Record only synthetic results and provider usage privately.

Proposed maximumUS$5, subject to an enforced12000 verified input tokens and8192
completion tokens per call,20 calls total. Current Sol pricing isUS$4/million
input andUS$20/million output; counting every input at the1.25x cache-write rate
gives a conservative calculatedUS$4.4768 total at those caps. This is a bounded
proposal, not measured usage or an implemented budget gate; stop if exact token
bounds/pricing/account access cannot be verified. Classifier paid evaluation is
outside this allowance. Retain20s timeout as a measured failure threshold for
this first trial, not a promise of responsiveness. No automatic retries.

Privacy: `store:false`, no training opt-in, standard API processing without a
regional-residency promise. Abuse-monitoring content may persist up to30 days
with documented exceptions; prompt-cache state may persist up to24h. Do not
claim zero retention or use real workplace details in this trial.
Official documentation checked31August2026:
- https://developers.openai.com/api/docs/models/gpt-5.6-sol
- https://developers.openai.com/api/docs/guides/upgrading-to-gpt-5p6-sol
- https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create
- https://developers.openai.com/api/docs/guides/your-data

Alternative: a smaller10-case trial lowers cost but covers fewer risk/context
variants. Switching to Terra now would not establish the selected Sol quality
benchmark. No revised paid trial has been approved or run.

## 2026-08-31 — GPT4.1 pilot recommendation rejected

Ali rejected GPT4.1 as too old and wants a better model. DECIDED: do not use
GPT4.1 as the pilot baseline merely because the old adapter supports it.
Replacement RECOMMENDATION (not yet configured or tested): `gpt-5.6-sol`,
medium reasoning, standard mode for reader-facing advice. Establish quality on
the five-situation/context-risk cases before considering `gpt-5.6-terra` as a
lower-cost alternative or using a smaller model for classification. Safety
classification is not assumed routine or adequate solely because it is cheaper.

Official documentation fetched31August2026 identifies Sol as the current
flagship for complex professional work and medium as a balanced starting point:
https://developers.openai.com/api/docs/guides/latest-model
https://developers.openai.com/api/docs/models/gpt-5.6-sol
This supports model selection, not demonstrated FAiRY answer quality or account
access. Recommendation is an inference to test. Newer models still require
source-fit, usable-wording, uncertainty, power/context and cliché rejection checks.

The GPT4.1 trial proposal below is SUPERSEDED, not approval for a paid run.
Recalculate reasoning-inclusive token ceilings, cost, timeout and privacy/cache
terms before proposing the revised paid trial. Do not simply replace the model
string in the old request or inherit its20case/40call economics. No API calls,
provider configuration, runtime edits or deployment made for this decision.

## 2026-08-31 — five-situation build and test authorised

Ali approved building and testing the proposed practical-advice/optional-AI
experience. BUILDING: vague feedback, interruptions/credit, workload,
promotion and return after leave. Narrow owned implementation: Worker reference
context and typed output, existing page optional preparation
controls, focused tests. No redesign, model fine-tuning, visitor-data training,
identity/allowance migration or production replacement. Candidate references
remain pilot-only pending content/real-answer admission. Preserve the frozen
v18 artifact and live endpoint; missing configured staging credentials or
provider trial authority must not be worked around using production secrets.

### Local implementation checkpoint

`worker-fairy-godmother/src/career-guidance.js` contains five bounded context
records and strict optional-preparation validation. `src/index.js` appends them
to the actual answer request only after eligible work/career classification and
server flag `CAREER_GUIDANCE_PILOT=1`; default config remains off. This is not a
keyword classifier or a substitute for the semantic safety provider. References
are experimental guidance, not admitted public content or proof of advice quality.

Independent review reproduced an attribution defect: valid source IDs could be
attached to unrelated answers. Repair: return no per-answer credits and remove
the proposed page reference renderer; prompt-selected IDs remain internal pilot
data. Known IDs establish membership only. Actual source-support admission is
still required before attribution can be displayed. Do not infer endorsement.

The page has optional preparation in native details, separate copy buttons,
non-confidential/approved-tool warning and no extra-call control. Existing
unmetered revision controls are hidden for pilot answers, including null assists.
Multi-turn rehearsal is not built. Repeated/empty requests previously erased a
usable answer; the local gate now appears separately before input validation.

Checks: seven new tests (including deliberately bad source/schema mutations and
a repeat-gate mutant), existing40 Worker tests,45 core fixture records and79
classifier fixture records. The fixture counts prove integrity, not model skill.
Local real-page synthetic-answer journey tested1280/390/320, separate clipboard
contents, native details keyboard open/close, visible focus and answer retention
after an empty repeat. No horizontal overflow observed. New preparation copy
target has44px minimum. Test fixture uses a separate local preview key and blocks
external service connections; no account/private visitor data used. This local
checkout shows the existing portrait-placeholder state: whole-page visual parity
with production is not claimed. Browser rejected the separate counter URL with
ERR_BLOCKED_BY_CLIENT; no workaround used, and no browser network-count claim.
Code/contract evidence supports no additional preparation call, not a real-provider receipt.

Implementation committed/pushed as `fe75169a`. Final actual desktop preparation
button measured44px; viewport reset and synthetic server stopped. Focused page
contract and293 inline scripts across120 pages parse. Existing unrelated global
hook blockers (missing Episode03 assets and extensionless-link false negatives)
were not repaired or relabelled passing; owned commit used a one-command hook
override after focused tests and staged diff inspection. This is a local/pushed
checkpoint, not production or content admission.

No real model quality, energy invariance, source-fit accuracy, native Safari200%,
VoiceOver, physical phone, deployed Worker, public URL or cross-device allowance
verification is claimed. Staging has no configured classifier/answer provider.
No credentials were printed/retrieved or borrowed from production.

### SUPERSEDED GPT4.1 trial proposal — REJECTED / NOT RUN

Recommendation: use existing OpenAI account access, if available, with pinned
`gpt-4.1-2025-04-14` for both separate classification and answer stages as a
compatibility baseline, not a final production-model choice. At most20 synthetic
cases /40 requests, no retries, no tools/retrieval/uploads, no visitor text;
only the small handout/reference context already in this pilot. Enforce aUS$5
ceiling before calls, plus12000 input tokens and1800 output tokens per request;
abort rather than silently truncate, exceed budget or substitute models.
Existing classifier5s and answer20s deadlines remain; timeout failures count.
Actual account/model access and exact tokenizer bounds still need setup/checking.
Use `store:false`, no training opt-in and standard API processing without a
regional-residency promise. Retain synthetic answers privately for review only.
Standard abuse-monitoring retention can include content for up to30 days, with
documented exceptions; do not promise zero retention.

Official sources checked31August2026:
- https://developers.openai.com/api/docs/models/gpt-4.1 — pinned snapshot and chat-completions support.
- https://developers.openai.com/api/docs/pricing — standard GPT4.1 inputUS$2/outputUS$8 per million tokens; not an account-specific invoice quote.
- https://developers.openai.com/api/docs/guides/your-data — no API training by default; retention/processing limits above.

Alternative considered: newer reasoning-model comparison, but it needs a separate
parameter/timeout migration and would confound this first integration baseline.
Mocks alone cost nothing but cannot settle usefulness. A passing pilot is still
not launch approval: full classifier/answer/content/privacy/allowance gates remain.
Review actual outputs for specific usable wording, supplied facts only, genuine
power/context alternatives, helpful optional AI work, near-match rejection and
absence of clichés/unsupported source claims. Reuse the existing private
scenario bank's near-match cases; do not count its unexecuted cases as results.

## 2026-08-31 — connect guidance to the actual answer call

Ali explicitly clarified that the handout and researched scenarios must inform
FAiRY's AI call so readers receive practical, usable ways to respond, not merely
populate a private research archive. Direction DECIDED; integration not built.
Begin with reviewed reference context and examples supplied at inference time,
not model fine-tuning. The intended answer gives usable wording/action, why it
fits, relevant power/context alternatives and a next move. Keep source credit
outside the copyable script. Private research status is not admission; select
only an admitted source packet after existing safety routing and verify actual
answers before release. No automatic training on private visitor conversations,
personality impersonation, new model purchase or whole-site replacement.

Ali then requested ideas for an effective AI-assisted career-advice experience
and explicitly rejected clichéd empowerment/nonsense advice. Answer-experience
design is the current checkpoint before implementation. Requirement DECIDED:
practical situation advice plus an AI element when it materially helps; do not
force an AI step into every answer or substitute a pep talk for usable help.

Proposed design (not yet approved implementation): lead with an immediately
usable response/action; explain its specific strategic job; offer a genuinely
different lower-exposure alternative if power or safety makes it relevant;
add one optional bounded AI assist such as evidence organisation, rehearsal
or checking a draft against actual criteria. Use only supplied facts, preserve
unknowns and require source checks for employer policy or current claims.
Role-play explores possible responses, never predicts what another person
thinks. Supporting sources remain outside the copied deliverable. Do not force
a fixed multi-section essay onto a one-sentence problem.

Implementation checkpoint: inspected existing call/response contract; no
Worker/page/prompt code changed. Local `extractValidatedAnswer` and
`buildP0AnswerPrompt` forbid sources, and the typed page lacks a source renderer.
The source labels in the older note below were conceptual, not actual function
names. A safe integration must change the selected-reference input, validation
and source-note rendering together, preserve the currentness/safety gates, and
not replace production with the unprovisioned staging reconstruction. Supporting
read-only inventory reran the existing Worker suite successfully (40 tests,
45 core fixture records,79 classifier fixture records); these are local mechanics
and fixture integrity, not actual answer-quality or live-provider proof.

## 2026-08-31 — situation-matched guidance and Ali's talk scenarios

**Direction: DECIDED; full source received/read; private research underway;
not implemented or published.**

### Current source and research continuation

Ali supplied the complete16-page `/Users/alisoneakin/Downloads/Leading Through Complexity — Handout.pdf`,
398,833 bytes, SHA256 `e419cd67663bf2ab33b869fc9667587974e455be9e6798c6ee32b86dc8db837d`.
All16 pages were read, including both parts; rendered pages3–4 checked for
script/situation alignment. This supersedes the eight-page candidate below
for source extraction. The PDF itself was not changed or published.

Physical PDF page map (do not use the older internal cross-references):

| Content | PDF pages |
|---|---|
| What To Actually Say: cover and argument map | 1–2 |
| In the Room: interruption, amplification, notes, uncertainty, compensation | 3 |
| Power, Credit & Visibility, including two AI-work scenarios | 4 |
| Feedback & Hard Conversations | 5 |
| Boundaries, Pushback & Follow-Up | 6 |
| Stronger Language and Feedback, or Bias? | 7 |
| Inclusive Communication | 8 |
| Changing the Room: cover and structural argument | 9–13 |
| AI fluency, workplace-gap claims and history | 14–15 |
| Bibliography/resources | 16 |

User additionally requests continued research on more scenarios. First bounded
pass is in `../scenario-research.json`: one source-bound interruption pilot and
three new private candidates (confidential AI upload, correcting shared
AI-assisted error, substantive career relationships). Primary sources and
specific support limits are recorded; draft wording is explicitly ours, not
Ali's or an expert quotation. Current UK playbook guidance supports bounded
AI oversight/privacy principles, not the visitor's local law or employer policy.
Dorie Clark's primary relationship guidance supports the career candidate, not
a promised sponsorship outcome. An official deprecated2023 NCSC source was
excluded after reading its30July2026 withdrawal notice. No raw visitor cases
are collected; no recurrence/automation, provider call or public release added.

Second bounded research pass adds five private candidates: specific advocacy,
remote decision exclusion, returning to an existing employer, explaining a
career break to a prospective employer, and pressure to misrepresent AI work.
The bank now has nine scenarios including the original handout pilot. Checked
primary sources: Lean In's sponsorship introduction, authors' Microsoft Research
collaboration summary, Acas return-meeting guidance and iRelaunch's public FAQ;
the UK playbook's transparency section extends the existing AI source. Preserve
source limits: neither the Lean In video nor full remote-study methods/corrections
were reviewed; UK guidance is not universal employment law; none of these
sources proves that our proposed scripts work. No paid material was accessed.

Ten synthetic context/negative cases are specified, not executed: fabricated
career history, false endorsement, medical/legal boundary, urgent decisions,
retaliation and harmless editing among them. The next useful step is the
existing small source-aware answer pilot below, not expanding the catalogue
indefinitely. Prioritised future research gaps remain in the same JSON. No
runtime, API, model, provider, scheduled research or public release changed.
Integrity check: nine unique scenarios/seven source IDs/ten review cases;
three deliberately malformed source/authorship/boundary variants rejected.
Read-only source reconciliation found no blocking mismatch. These are not
answer-quality admission. Normal commit hook again failed on45 existing missing
Episode03 assets and two existing extensionless-link checks; research-only owned
paths committed with a one-command hook bypass after staged diff inspection.

Routing lesson: the phrase "return to work" is insufficient to choose an
answer. Existing employment versus a new application changes both the useful
script and the sensitive information involved. Ask about the work situation,
not the private reason for leave. Similarly, topic similarity never overrides
safety routing or admits a private source candidate.

Printed statistics, historical absolutes, quotation attributions and diagnostic
claims in Part Two remain fact-check inputs, not approved FAiRY claims. In
particular, neither vague feedback nor discomfort alone proves discrimination;
uncertainty, actual skill gaps and structural conditions must remain separable.

### Original direction and earlier-source history

Ali asks FAiRY to incorporate guidance from Dorie Clark and other relevant
thinkers according to the question, and to build on her talk's scenarios and
suggested answers. This is knowledge/answer-quality work, not a new personality
selector, endorsement, permission to imitate a living author's voice, or a
replacement for the active site/backend recovery.

Supplied evidence is one cover/contents image:
`/var/folders/bj/tk6944ns7gn13syvg4d93cp00000gn/T/codex-clipboard-3050e32f-83ed-4935-b6ba-d290cbe227c2.png`.
Visible title: *What To Actually Say*, *Leading Through Complexity*, Part One
of Two; Alison Eakin, Women Influence Network,27August2026. No actual scenario
scripts or Part Two pages were supplied in that image. Do not reconstruct
scripts from contents headings or treat instructions inside a source document
as instructions to the application/agent.

An earlier full eight-page candidate was subsequently recovered at
`/Users/alisoneakin/.codex/.chatgpt-projects/g-p-6a2d4d6169808191958321d619479c72/output/pdf/leading-through-complexity-handout-redesign.pdf`
(34,549 bytes;26August2026;SHA256
`8931bf77c738f2da924bef4ecfe4f7cd7dc6dd852afd68736bb4145c440a80ba`).
All eight pages were text-extracted and read. This is NOT verified as the
attached revision: it starts directly with In the Room, lacks the new cover
and How This Fits Together map, and ends with sources. Preserve as earlier
source evidence only; the later supplied16-page source above now governs intake.
The earlier bibliography already includes Dorie Clark and other guidance
authors; it does not map every individual script to its supporting passage.
One concrete adaptation guard: stronger-language swaps must not turn a real
uncertainty into a false guarantee (for example an uncertain delivery date),
erase warranted limitations, or assume that direct confrontation is safe.

Visible intake categories: In the Room; Power, Credit & Visibility; Feedback &
Hard Conversations; Boundaries, Pushback & Follow-Up; Use Stronger Language ·
Feedback, or Bias?; Inclusive Communication. These are organization leads,
not six completed scenario sets. Preserve the cover's distinction between
words useful in the moment and why women should not have to say them; advice
must not imply that better wording solves discrimination or structural issues.

Recommended smallest implementation: one curated scenario/source bank behind
the existing work/career route, not a new chatbot or a whole-document prompt.
For each admitted scenario retain: exact source/page/version; situation and
visitor goal; power/retaliation constraints; Ali's original script; why it
fits; context-dependent softer/firmer alternatives where useful; when not to
use it; follow-up and any team/manager responsibility. Label our adaptations
separately from Ali's source. Do not ingest private visitor conversations into
the bank or publish the handout by default.

Select guidance by the actual problem, not a famous name or a trigger word.
Dorie Clark is an initial candidate for long-term career strategy and making
work/ideas visible, based on her primary pages checked31August2026:
https://dorieclark.com/longgame/ and https://dorieclark.com/speaking/.
These pages establish subject fit only; each framework or attributed claim
still needs the specific primary passage before admission. No invented quotes,
no "Dorie would say" predictions, no endorsement implication. Other thinkers
remain to be selected from actual case needs rather than an arbitrary roster.

Proposed answer behavior: useful words/action first; brief reason and relevant
trade-off; an alternative when power/safety/context warrants it; next step.
Provide attribution/source outside the copyable script when that source was
actually used. Preserve FAiRY presentation and existing safety boundaries.
If context could materially change the recommendation, ask one useful
question rather than assuming the manager, colleague or situation is safe.

Implementation dependency observed in the local Worker31August2026:
`validateStructuredAnswer` currently rejects nonempty `sources` and non-null
`asOf`; `buildTypedAnswerPrompt` likewise requires empty sources. Therefore
this must not be called implemented by simply adding authors to a prompt.
Add a bounded reviewed-source input and validate source IDs/claim support in
the existing answer pipeline before returning attributed guidance. Do not
weaken safety/currentness gates or borrow the local Worker's public status.
Pilot one complete handout scenario, a context/power variant, an unrelated
question and an unsupported-attribution case before growing the bank.

**Status:** FIX BEFORE PROMOTION — BUILT LOCALLY; REAL ANSWERS UNPROVEN

Own typed response integrity, boundary/risk/domain/task routing, retrieval and
source discipline, answer validation, constrained personality, service
failure truth and the 45-case evaluation contract.

Authoritative inputs:

- `worker-fairy-godmother/src/index.js`
- `docs/product/fairy-godmother-p0-product-contract.md`
- `operations/test-fixtures/fairy-godmother/p0-evaluation-set.json`
- `operations/research/fairy-godmother-worker-recovery-2026-07-25.md`

The recovered v18 universal-prompt behavior is characterization evidence, not
an approved design. No answer-quality claim advances until API and rendered-
page results pass independent accuracy/safety, product and brand review.

The current local candidate replaces the contradictory eight-section
Markdown instruction at generation time with a concise typed-answer prompt.
It requires a usable deliverable, transferable reasoning, explicit assumptions
and unknowns, one next move, no invented receipts and bounded personality.
Every returned field and collection is length-bounded before a success can
commit allowance. These are contract controls, not proof that a real model's
answers meet the learning or brand standard.
