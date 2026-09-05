# Local independent-review connection

## Current pilot result — September 5

The bounded prototype is implemented; **editorial qualification remains HOLD**.
Claude's existing account was reconnected and real isolated `claude-fable-5`
completions were observed. No additional subscription or deployed review service
was created. `run-pilot.mjs` supports explicit `claude` and `gemma` routes.
Each attempt is preserved, and `--resume` replays saved raw output rather than
resending it. A saved request without raw output cannot be retried silently.
The fixed attempt directories are intentional: a changed method needs a new
version and must retain earlier evidence.

The method sends the complete artifact first, uses separate facts/reader jobs,
and asks for paragraph references instead of repeated copied passages. It
derives the aggregate from every returned required judgment; it never supplies
missing qualitative judgments. Absent failure families may refer to the whole
read artifact, as the existing prose gate permits. Present/uncertain failures,
claims and outcomes still require exact evidence. Facts must cite evidence for
that same claim. AI explain-back/transfer remain explicitly AI assessments.

Gemma's first blind response exhausted its budget on whitespace; its completed
successor missed all four registered job-offer faults. Claude first found three;
independent diagnosis showed the abbreviated rubric had dropped BTB-439's
destination-level motivation distinction. After restoring that generic rule,
Claude found all four. It then flagged unexplained biometric terminology in the
registered positive and emitted an invalid extra NOTE field. The saved formal
result is HOLD_CALIBRATION. Independent inspection corroborated the term defect;
the response's format failure does not erase the source-example issue.

Do not run more calibration or article calls until the Learning owner resolves
`../../learning-content-ecosystem/CALIBRATION-REPAIR-2026-09-05.md`. The next
version should also enforce the actual output schema through Claude's existing
native structured-output option. Do not strip unknown judgments or coach away
the jargon finding. The remaining negative, article reviews and full receipt
assembler were not run/built because their prerequisite failed. The unchanged
public admission checker remains authoritative; this prototype cannot publish.

Verified checks from the repository root:

```sh
node scripts/test-newsstand-review-protocol.mjs
node scripts/test-newsstand-review-replay.mjs
node scripts/test-prose-quality-admission.mjs
```

The first tests normalizer handling and exact candidate spans; its prompt check
is a narrow marker check, not a universal proof against answer leakage. The
second replays actual saved output with all provider calls disabled and tests
both incomplete-attempt and held-calibration rejection. The third is the
existing admission suite. None proves prose quality or unattended reliability.

Implementation commit: `294fdff7` in `ops/newsstand-recurring-20260905`.
The normalizer, replay and existing prose-admission suites passed within their
stated scope. The unrelated broad repository hook was not rerun; the existing
sparse-checkout hook bypass was used for these exact owned paths. Three raw CLI
responses retain their original saved trailing blank lines; the source diff
check excludes only the blank-at-EOF warning rather than changing bound raw
outputs. No public files or canonical iCloud bytes were written. The owned
local Workers development process was stopped and Claude login completed.

## Preserved Workers AI fallback

This preserves the already exercised Cloudflare Workers AI fallback. It is
an internal local development connection, not a deployed public service.
No credentials belong in these files. Use the existing configured account.

From the repository root:

```sh
npx --yes wrangler@4.129.0 dev --config operations/product-stewards/newsstand/review-runtime/wrangler.jsonc --ip 127.0.0.1 --port 8791
```

Wait for the actual ready message before submitting a bounded review. The
installed 4.105.0 runtime rejected this compatibility date; 4.129.0 was
exercised successfully on September 5. Do not silently replace a process
already using the port. End the owned development process after review.
This does not require logging in again when the existing account works.

The explicit local routes are `/` for
`@cf/meta/llama-3.3-70b-instruct-fp8-fast` and `/gemma` for
`@cf/google/gemma-4-26b-a4b-it`. Meta JSON responses may identify the provider
model as `@cf/meta/llama-3.3-70b-json`. Unknown routes fail before inference;
there is no silent model substitution. A Kimi trial was denied by the existing
account's Free plan; this saved connection does not expose that route or
authorize a plan change.
Record both identities and preserve raw requests/responses. No HTTP 200,
provider PASS label or file-existence check substitutes for the complete
current prose-review chain. Check the actual completion reason and final
message first. Reasoning text with a null final message and a length stop is
an incomplete execution, never an admission or a decision to reconstruct.

Keep each request within the provider's actual context limit. Give it the
complete exact article first, followed by the relevant bound evidence. Split
factual review, explanatory outcomes and calibration when the combined packet
would duplicate evidence or time out; never split away the article itself or
infer unreturned judgments. Each bounded prompt must supply the applicable
failure definitions and calibration examples, not just their names. Bindings
and repeated receipt formatting can be assembled mechanically from exact
inputs and returned judgments; substantive findings cannot be supplied by the
maker to fill a missing field. A factual HOLD stops admission. If a verdict
contradicts its specific findings, request one explicit reconciliation against
the unchanged article and current policy, retaining every original result.
Do not coach the reviewer toward PASS or silently overwrite a HOLD.

September 5 execution boundary: Meta's factual clarification returned a real
decision, but later semantic outputs included non-verbatim evidence and
contradictory unsupported findings. They are retained as failed review attempts,
not verified prose defects or admission. Gemma's initial full-packet call
exhausted its completion budget without a final message. See the candidate's
preserved provider outputs for later bounded attempts; do not infer a successful
review from this connection being reachable.

The request boundary was exercised with seven rejection cases (method, browser
Origin, unknown and paid-model routes, invalid JSON, declared and actual
oversized bodies), both exact allowed routes and a provider error. Those used a
synthetic provider and prove only local request handling. Real provider review
and content admission remain separate. This connection is neither a new
approval authority nor an autonomous publisher.
