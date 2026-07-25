# FAiRY Godmother Worker

**Recovery status:** active production version 18 recovered locally on
2026-07-25. Production was not changed.

## What is here

- `recovery/production-v18/index.deployed.js` — frozen byte-for-byte copy of
  the active Cloudflare Quick Edit bundle.
- `recovery/production-v18/manifest.json` — deployment, runtime, binding and
  checksum evidence.
- `src/index.js` — exact working mirror of the recovered bundle. It begins
  identical to the frozen artifact and is the starting point for the P0
  reconstruction.
- `wrangler.jsonc` — safe default configuration named
  `laidies-fairy-godmother-staging`, not the production Worker.
- `test/recovered-worker-contract.test.mjs` — characterization tests for the
  recovered behaviour.
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

The tests characterize the recovered implementation; they do not declare the
old behaviour correct. Several tests intentionally prove defects such as
friendly upstream failures returning HTTP 200 and subscriber usage being
counted before a successful answer.

## P0 target

The implementation contract is:

`../docs/product/fairy-godmother-p0-product-contract.md`

The versioned 45-case acceptance suite is:

`../operations/test-fixtures/fairy-godmother/p0-evaluation-set.json`

The next safe step is to refactor `src/index.js` behind typed routing and
response contracts, prove the local suite, provision isolated staging
bindings, and deploy only to `laidies-fairy-godmother-staging`.
