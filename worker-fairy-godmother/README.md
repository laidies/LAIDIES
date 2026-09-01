# FAiRY Godmother Worker

**Recovery status:** active production version 18 recovered locally on
2026-07-25. Production was not changed.

## What is here

- `recovery/production-v18/index.deployed.js` — frozen byte-for-byte copy of
  the active Cloudflare Quick Edit bundle.
- `recovery/production-v18/manifest.json` — deployment, runtime, binding and
  checksum evidence.
- `src/index.js` — active P0 reconstruction. It intentionally diverges from
  the frozen artifact while preserving that artifact as the production
  baseline.
- `wrangler.jsonc` — safe default configuration named
  `laidies-fairy-godmother-staging`, not the production Worker.
- `test/recovered-worker-contract.test.mjs` — deterministic reconstruction
  contract tests, including typed failures, classifier orchestration,
  no-charge side effects and strict answer validation.
- `scripts/verify-recovery.mjs` — proves the frozen artifact still matches its
  recorded checksum and production identifiers.

## Safety boundary

Do not rename the default Wrangler project to `laidies-fairy-godmother` and do
not deploy it over production during reconstruction.

The default configuration deliberately omits production bindings:

- `OPENAI_API_KEY`
- `RATE_LIMITER`
- `SUBSCRIBER_USAGE`

Their names and production identities are preserved in the recovery manifest.
The OpenAI secret value was not and cannot be recovered from Cloudflare.
Staging needs its own secret, rate limiter and KV namespace before any remote
test.

## Verified production identity

- Worker: `laidies-fairy-godmother`
- Active version: 18
- Version ID: `eff23927-7e4d-4677-b729-2b14ff678ac9`
- Active deployment:
  `49472a73-1e0d-4d9c-b4ef-4c661e0a81eb`
- Deployed: 2026-07-02
- Compatibility date: 2026-06-28
- Compatibility flag: `nodejs_compat`

## Local checks

From this directory:

```bash
npm test
wrangler deploy --dry-run
```

The recovery check proves the frozen artifact remains exact. The Worker tests
exercise the local reconstruction; they do not change or declare the deployed
v18 bundle correct.

## P0 target

The implementation contract is:

`../docs/product/fairy-godmother-p0-product-contract.md`

The versioned 45-case acceptance suite is:

`../operations/test-fixtures/fairy-godmother/p0-evaluation-set.json`

The current phase-2 candidate requires a separately configured meaning-aware
classifier before the ordinary answer model can run. Local tests inject this
classifier and call no real provider. A future isolated staging environment
may supply either:

- `REQUEST_CLASSIFIER`, a service/object with `classify(envelope)` or
  `fetch(...)`; or
- a dedicated `CLASSIFIER_API_KEY` plus an explicitly selected
  `CLASSIFIER_MODEL`.

Neither classifier path is provisioned in the default Wrangler configuration.
Without one, the Worker fails closed with typed `classification_uncertain` and
does not use allowance. Independent held-out classifier review, verified
retrieval, the authoritative FAiRY Plays ledger and the full rendered
staging/page gates remain required before promotion.

The 2026-07-26 local candidate also requires `OPENAI_API_KEY` before an answer
or revision call and accepts an optional non-secret `ANSWER_MODEL` setting
(defaulting locally to owner-approved `gpt-5.6-sol` as of2026-08-31).
`src/advice-provider.js` uses medium reasoning, an8192-token completion ceiling
including reasoning, `store:false`, standard service tier and no legacy sampling
parameters for Sol. Advice and revisions share this adapter; explicit historical
test/model overrides retain their old shape. No fallback/retry selects another
model. Sol receipts must identify Sol, assistant role and `finish_reason:stop`;
refusals, truncations and tool calls cannot become successful answers. The30s
deadline now includes reading/parsing the bounded128KiB provider response.
The separate classifier is unchanged and still unconfigured. No Responses API,
tools, conversation storage or multi-turn features were added. The existing
page waits35s so the Worker can return its typed no-charge timeout first and
shows staged status at8s/18s. Advice and revision use the same abortable browser
request; no automatic retry is added. This local adapter is not production-ready
or a quality-certified model run.
Request JSON is capped at 32,000 bytes before
parsing, answer fields are bounded before `case_success`, and browser origins
outside the LAiDIES/localhost allowlist fail before provider work. The local
page understands the typed contract, but rendered-browser and real-provider
evidence remain open.

## Offline provider evaluation

`harness/` contains the no-credential evaluation path for a later authorized
provider trial. It exports the 63 frozen semantic envelopes without expected
labels, keeps the join map local, scores provider output only after inference,
replays every classification through the Worker, reports confusion
matrices/slices/latency/tokens/cost, and produces an Ed25519-signed run
manifest.

Building and testing the harness does not select or call a provider. See
`harness/README.md`.
