# Local independent-review connection

## Current ordinary-news path — September 5

The writer receives one bound production packet; its complete self-reviewed draft
must pass preparation checks before an editor is called. The existing signed-in
Claude CLI runs isolated `claude-fable-5` at medium effort with native structured
output. One request contains the complete article first, then the reader rubric
and exact factual evidence. The saved good reference and every saved bad reference
have actual blind PASS/REJECT judgments under ordinary-news policy; matching every
historical secondary label is no longer required. Actual current article defects
and unknowns still block admission. This policy does not change other surfaces.

Current reusable qualification:
`calibration/qualified-news-metrics-policy-20260905/calibration-result.json`.
It retains actual qualified judgments under the approved ordinary-news count policy.
Mechanical request packaging does not change this qualification or its rubric.

```sh
node scripts/prepare-newsstand-draft.mjs <producer-contract> <private-writer-input> <story-type-frame> <primary-evidence>
node operations/product-stewards/newsstand/review-runtime/run-pilot.mjs article claude --candidate-dir <private-candidate> --calibration <qualified-calibration-directory> --output <fresh-private-review-directory>
```

The candidate directory supplies `story.json`, `review-text.json`,
`producer-publication-review.json`, `writer-input-current.json`,
`producer-observations.json` and `editorial-input.json`. Source passages must cover
all clauses, including named examples, comparisons and supplementary evidence.
Facts can cite any real supplied source, even when its research-intake label was
associated with another claim. Source IDs are references, not answer keys.

The runtime automatically compacts new editorial/factual requests: each supplied
source appears once, with claim source-ID references. Complete article, paragraphs,
reader job and every source passage stay intact. Existing saved full or compact
requests replay exactly; changed prose, sources or locators reject. The assembler
resolves the same representation, so an old passing review never needs to be
repeated merely to reduce request size. The standalone compactor remains a preview
tool, not a step the producer must remember.

`--reuse-reader-from <prior-output>` is for evidence-only repairs: it validates
unchanged complete article, passage references, communication authority and actual
request rubric, then retains the real passing reader judgment and calls only the
fact checker. A changed article cannot reuse that result. Preserve all raw attempts
and all evidence gaps. The September 5 pilot needed two source-packet repairs;
its passing reader review was reused, not silently rerun or invented.

`--resume` replays saved raw output. It cannot resend an attempt with missing raw
output. `reconcile-calibration --from <old-directory> --output <new-directory>`
only reconciles unchanged bound requests/judgments with the adopted policy. A new
model, effort, rubric or registry needs fresh qualification. Earlier held attempts
are historical evidence; they are not instructions to restart failed experiments.

Actual editorial judgments are assembled into the existing full review chain.
Neither valid JSON, a top-level provider label nor these private files publish.
The assembler must preserve actual findings and identify any missing admission
input instead of fabricating reviewer judgments or human observations.

Successful ordinary assembly now registers its validated ready candidate in the
existing `story-recovery-queue.json`, so the next cycle cannot overlook it. It
retains exact prose, source, independent receipt and raw-report bindings; exact
reruns preserve queue bytes. A differing/newer/closed record or a story already in
the canonical dataset/issue requires explicit reconciliation, never replacement.
Registration is routing, not issue admission, next-day freshness or publication.
Use `--assembly-only` only for an intentional historical/mechanical reassembly;
its result is `ASSEMBLED_NOT_QUEUED`. When rebasing an already queued unchanged
review, preserve the existing queue history and bind the new candidate in the
actual morning freshness record. Do not spend another editor call to refresh a
publication-base wrapper.

Focused regression commands are listed in `../DAILY-MANUAL-RUNBOOK.md`.

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

Ordinary-news review counts remain truthful improvement metrics under Ali’s
September 5 approval. Equal or higher historical counts do not block a repaired
article. Retain all rounds and repaired defects when assembling the review;
current unresolved defects, evidence gaps or non-passing required outcomes still
block publication. This exception does not extend to other content surfaces.
