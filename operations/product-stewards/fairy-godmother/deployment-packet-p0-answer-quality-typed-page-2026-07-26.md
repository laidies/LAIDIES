# FAiRY Godmother — isolated-staging and deployment packet

**Candidate:** local typed answer-quality/page repair
**Promotion status:** HOLD
**Production authority:** none

## Artifacts

- Worker source: `worker-fairy-godmother/src/index.js`
- Worker tests: `worker-fairy-godmother/test/*.test.mjs`
- Safe default config: `worker-fairy-godmother/wrangler.jsonc`
- Page: `games/fairy-godmother.html`
- Page contract: `scripts/test-fairy-godmother-page-contract.mjs`
- Product contract: `docs/product/fairy-godmother-p0-product-contract.md`
- Core suite: `operations/test-fixtures/fairy-godmother/p0-evaluation-set.json`
- Evidence: `evidence-p0-answer-quality-typed-page-2026-07-26.md`

## Required owner decisions before provider or staging spend

1. Classifier provider, exact model/version and maximum evaluation cost.
2. Answer provider, exact model/version and per-case token ceiling.
3. Privacy, retention, regional processing and prompt-content terms.
4. Verified identity authority and signed/session-bound request path.
5. Atomic Plays design and product allowance; the recovered 10/day KV counter
   is not accepted.
6. Retrieval providers and claim-validation policy by currentness category.

## Recommended plumbing

- Put verified identity behind a Cloudflare service binding so the public
  browser cannot assert identity.
- Put atomic reserve/commit/refund and idempotency in one Durable Object per
  resident or account; persist append-only case receipts in D1 if product
  reporting needs relational queries.
- Keep the classifier behind a service binding where practical. The answer
  Worker should not call another LAiDIES Worker by public URL.
- Keep provider secrets only as Worker secrets. Put `ANSWER_MODEL` and the
  approved classifier model/version in isolated staging configuration.
- Add structured, prompt-free observability: request ID, response type,
  route, latency bucket, provider status, Play transition and case version.

## Isolated staging order

1. Create new staging-only identity, Plays, classifier and retrieval resources.
2. Configure an explicit staging environment; do not rename the default
   project or reuse production bindings.
3. Run the unchanged signed 63-case semantic classifier trial.
4. If independently accepted, run all 45 cases at Worker API level.
5. Serve the page with `window.LAIDIES_FAIRY_WORKER_URL` pointing only to the
   accepted staging Worker.
6. Run rendered desktop/mobile, keyboard, screen-reader, copy, revision,
   failure, timeout, two-tab and retry/idempotency journeys.
7. Independently score non-compensable quality, accuracy/trust and LAiDIES
   brand gates.
8. Record exact staging version, binding identities, evidence hashes, cost and
   rollback candidate.

## Production order after all gates pass

1. Snapshot active production version 18 and verify its recorded hash.
2. Deploy the accepted Worker version first while the page legacy adapter
   remains compatible.
3. Verify typed production responses with no-charge fixtures and one explicitly
   authorized successful synthetic case.
4. Deploy the accepted page artifact.
5. Verify the exact public page→Worker journey, Plays receipt, failure release,
   accessibility and analytics.
6. Retain v18 and the previous page artifact as rollback targets.
7. Remove the legacy page adapter only in a later independently verified
   cleanup release.

## Stop conditions

Stop and roll back if any response:

- uses a Play before validated success;
- trusts browser email or identity;
- returns success-shaped provider failures;
- invents sources or current facts;
- bypasses classifier, retrieval or boundary routing;
- renders provider HTML;
- loses a revision/draft or duplicates a case on retry; or
- fails the product, accuracy/trust or LAiDIES brand floor.

