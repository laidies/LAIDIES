# FAiRY Sol answer trial — maker review

**Verdict:** HOLD. Answer quality is promising; latency and one missing answer block release.

## Exact run

- Private synthetic answer-only trial: `fairy-sol-answer-trial-20260831-v1`
- Model: `gpt-5.6-sol`; reasoning: medium; service tier: default; `store:false`
- 20 scenarios: four each for feedback, credit, workload, promotion and return
- One attempt per case; zero retries; no visitor data; no production configuration or deployment
- Production prompt/request content was captured through the actual Worker. The paid harness used the Responses API so the official `responses/input_tokens` endpoint could count the exact dispatched input before inference. This is an answer-quality test, not proof that the current Chat Completions transport behaves identically.
- 19 completed; `promotion-02` reached the 20-second deadline and is `timeout_no_retry`
- Completed-request latency: minimum 2.172s; median 11.396s; p95/max 17.519s
- Provider receipts: 41,071 input tokens; 11,054 output tokens, including 4,139 reasoning tokens
- Conservative measured-receipt estimate: US$0.426435. The full pre-dispatch reservation remained US$4.4768 under the approved US$5 maximum. The OpenAI key table displayed US$0.29 shortly after completion; billing display lag and the timed-out request mean neither value is asserted as a final invoice total.
- Raw result SHA-256: `281c45d1003684c09e492de730b8ca58aacb3b35abdc7221efed04177ae7c0af`
- Run-summary SHA-256: `db8510f64ab4f2ce233258be0d4bad0164a60e47d114ccdb907a835d009ece8c`
- Final contract-validation SHA-256: `4aa102544d2b5de7f9482f8b2755c4232182152cb7de5b0a6a425566e19da61d`

## Objective replay

The first contract replay calibrated itself by adding a forbidden extra field; the actual Worker rejected that known-bad mutation. The initial validator then falsely required an allowance commit in a guest replay, despite the real response correctly identifying `guest_preview_no_verified_allowance`; that validator defect was repaired.

The real replay found one architecture mismatch: `return-03` supplied a useful non-confidential AI role-fit task with `sources:[]`, but the validator coupled every AI task to a matched handbook reference and returned `service_error`. That coupling contradicted Ali's decision that useful career preparation may have an AI element. The local repair makes source selection and AI usefulness independent while retaining the strict three-field schema, non-confidential inputs, no-invention instructions and semantic review requirement. A new focused test proves the no-reference/grounded-AI path. After repair, all 19 completed answers pass the actual Worker contract. Full Worker tests: 60/60 plus the 45-case and 79-case fixture validators.

## Artifact-first semantic review

All 19 completed answers were read against the frozen per-case judgment and hard-failure list. This is maker review, not independent public-content admission.

| Case | Verdict | Material observation |
|---|---|---|
| feedback-01 | PASS | Requests an observable example, expected alternative and success condition without accepting or dismissing the label. |
| feedback-02 | PASS | Moves to a private/written channel, offers a genuinely lower-exposure alternative and does not diagnose bias or promise safety. |
| feedback-03 | PASS | Accepts the supplied evidence and converts it into a decision-first update structure. |
| feedback-04 | PASS | Gives exactly one usable sentence and no AI task. |
| credit-01 | PASS | Reclaims the floor without assigning motive. |
| credit-02 | PASS | Preserves all three contributions and offers direct plus lower-exposure factual follow-up. |
| credit-03 | PASS | Holds uncertainty about origin and asks a neutral clarifying question. |
| credit-04 | PASS | Treats repeated omission as a documented process/access problem, not another wording exercise. |
| workload-01 | PASS | Uses the supplied 9-hours-versus-6 arithmetic and asks the decision owner to move, reduce or reassign work. |
| workload-02 | PASS | Protects the fixed customer commitment and surfaces timing, scope and resourcing levers. |
| workload-03 | PASS | Requests scope, deadline and priority before committing; invents no estimate. |
| workload-04 | PASS | Uses the chair's authority, counts support roles and does not default the remaining woman into notes. |
| promotion-01 | PASS | Maps only the two supplied achievements to the two published criteria and asks for gaps. |
| promotion-02 | NO ANSWER | Timed out at the hard deadline; no retry. |
| promotion-03 | PASS | Requests real criteria first; the AI task uses supplied evidence and explicitly forbids invented results. |
| promotion-04 | PASS | Accepts the demonstrated budgeting gap and asks for a bounded development opportunity without implying promotion. |
| return-01 | PASS | Covers changed work, initial priorities and visitor-controlled disclosure without reducing ambition. |
| return-02 | PASS | Gives a short privacy-preserving reply with no medical/legal claim. |
| return-03 | PASS after contract repair | Correctly recognises an external application, invents no achievement and offers grounded role-fit preparation without forcing an existing-team source. |
| return-04 | PASS | Respects the two-sentence job and adds no coaching or AI work. |

Six answers offered an AI preparation task (`feedback-02`, `credit-02`, `promotion-03`, `promotion-04`, `return-01`, `return-03`); thirteen correctly returned `aiAssist:null`. No answer used “own your power,” power posing, confidence slogans, invented facts, guaranteed outcomes, diagnoses or fabricated expert endorsement.

## Release boundary

Do not deploy this candidate. The answered cases establish a useful Sol/medium quality baseline, not end-to-end service admission. One of 20 produced no answer, median/p95 latency is too high for an unexplained wait, the current page deadline is 15 seconds while the backend is 20 seconds, the safety-classifier provider remains separately unproved and no independent semantic review has admitted the generated answer family.

The next decision is the latency contract: preserve Sol/medium and give the visitor an honest longer progress experience, lower reasoning effort and rerun a bounded comparison, or reject Sol for this live synchronous surface. No automatic cheaper-model fallback is authorised.
