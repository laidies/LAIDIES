# Local independent-review connection

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
