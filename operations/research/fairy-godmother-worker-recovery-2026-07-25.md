# FAiRY Godmother Worker recovery

**Date:** 2026-07-25  
**Status:** RECOVERED AND VERIFIED LOCALLY — production unchanged  
**Worker:** `laidies-fairy-godmother`

## Outcome

The active deployed Cloudflare Worker bundle has been recovered into the
repository and characterized with local tests.

Recovered project:

`worker-fairy-godmother/`

Frozen production artifact:

`worker-fairy-godmother/recovery/production-v18/index.deployed.js`

Recovery manifest:

`worker-fairy-godmother/recovery/production-v18/manifest.json`

The bundle is 55,137 bytes and has SHA-256:

`127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e`

The frozen artifact and initial working mirror had identical hashes after
recovery.

## Production identity

- Account ID: `8597916c7f6ae726febf653c337a47d6`
- Active version: 18
- Version ID: `eff23927-7e4d-4677-b729-2b14ff678ac9`
- Active deployment ID: `49472a73-1e0d-4d9c-b4ef-4c661e0a81eb`
- Deployed: 2026-07-02
- Deployment source: Wrangler
- Compatibility date: 2026-06-28
- Compatibility flag: `nodejs_compat`
- Script handler: `fetch`

Bindings:

- `OPENAI_API_KEY` — secret name recovered; value not accessed or exposed;
- `RATE_LIMITER` — three requests per 60 seconds;
- `SUBSCRIBER_USAGE` — production KV namespace
  `763852d3e96d4d1a8692755f5da6e39a`.

## Recovery method

1. Used authenticated Wrangler read operations to identify the active version,
   deployment, runtime and binding metadata.
2. Opened the authenticated Cloudflare Quick Edit view without editing or
   deploying.
3. Copied the active `index.js` bundle from the read-only editor state.
4. Saved a frozen artifact and recorded its byte count and SHA-256.
5. Created an exact working mirror under `src/index.js`.
6. Added a safe default Wrangler configuration named
   `laidies-fairy-godmother-staging`.
7. Deliberately omitted production bindings from the default staging
   configuration.
8. Added recovery-integrity and characterization tests.
9. Ran a Wrangler dry-run only; no upload or deployment occurred.

Production mutation performed: **none**.

## Recovered architecture

The deployed Worker is a single bundled JavaScript module.

### Model call

- OpenAI Chat Completions API
- model: `gpt-4o`
- `max_tokens`: 1,500 for a normal response; 800 for a revision
- temperature: 0.55
- frequency penalty: 0.3
- presence penalty: 0.1

### Normal request

1. allow-list the origin;
2. apply an IP rate limiter;
3. parse JSON;
4. accept `prompt`, `energy`, `revision` and `subscriberEmail`;
5. increment subscriber usage when a subscriber email is supplied;
6. concatenate one large stable system prompt with an energy directive;
7. make one model call;
8. return the model’s Markdown as a single `response` string.

### Revision request

A revision sends the previous draft and one of four directives to the same
model. The response carries `kind: "revision"`.

### Subscriber allowance

The recovered Worker enforces **10 requests per UTC day**, not the five
promised in the frontend or three stated in older directory/handbook copy.

The subscriber email is supplied by the browser. The Worker normalizes it and
uses it as the KV key but does not verify that the caller owns that email or
has an authenticated subscriber session.

## Confirmed defects

### 1. No domain, task or safety router

The Worker does not classify AI, work/career, everyday-life or out-of-scope
requests before generation. Medical, crisis, legal and regulated-financial
boundaries exist only as proposed P0 rules, not recovered behaviour.

### 2. No grounded retrieval

The Worker has no search, retrieval or source-verification path. The system
prompt tells the model not to invent receipts, but the same ungrounded model
is still asked to generate the finished answer.

This explains how the live tool could label a task “Receipts required” and
then fabricate studies.

### 3. Any model prose is success-shaped

The API normally returns:

```json
{
  "response": "arbitrary model-authored Markdown"
}
```

There is no schema for route, task, assumptions, sources, case state or Play
outcome.

### 4. Upstream failures return HTTP 200

Normal and revision failures return friendly fallback prose with an ordinary
success status. The page can therefore treat an outage as a successful wish.

### 5. Subscriber usage is counted before success

The KV increment is scheduled before the model call. A failed upstream request
still consumes subscriber allowance.

### 6. Subscriber identity is self-asserted

Any caller can provide a `subscriberEmail` string. The Worker does not receive
or verify a signed subscriber/resident identity.

### 7. The actual cap conflicts with public copy

- recovered Worker: 10 per UTC day;
- current frontend gate copy: five per day;
- older directory/handbook copy: three per visit;
- current reward concept: weekly FAiRY Plays.

### 8. Email addresses enter operational logs

The Worker logs a normalized subscriber email and usage count. P0 should use
an opaque verified identity and avoid raw email in ordinary logs.

### 9. No input maximum or bounded upstream timeout

The Worker checks only a three-character minimum. It does not enforce the P0
8,000-character limit or abort a slow OpenAI request.

### 10. The prompt contains strong voice work but over-prescribes references

The recovered personality material is substantial and useful. It correctly
separates copyable deliverables from commentary. However, auto energy is
instructed to fully channel a selected character and repeatedly use canonical
patterns. That can make responses template-like or cause a reference to
dominate the advice.

The P0 personality contract should preserve the sharp situational voice while
reducing compulsory imitation.

## Local verification

`npm test` passes:

- recovery checksum and artifact size;
- frozen production identifiers;
- seven characterization tests;
- 42 evaluation-fixture integrity checks at recovery time. Product-owner
  learning-standard cases later expanded the current versioned suite to 45;
  the fixture validator remains the source of the current count.

Characterization tests prove:

- non-POST requests return 405;
- IP rate limits return 429;
- short input returns success-shaped HTTP 200 prose;
- an OpenAI failure returns success-shaped HTTP 200 prose;
- subscriber usage increments before an upstream failure;
- the recovered daily cap is 10;
- revision responses use `kind: "revision"`.

`wrangler deploy --dry-run` also passes:

- upload bundle: 54.21 KiB;
- gzip: 19.01 KiB;
- no production binding or deployment action.

## Safe configuration boundary

The default recovered project name is:

`laidies-fairy-godmother-staging`

It intentionally does not include the production KV, rate limiter or secret.
Before remote staging:

1. create an isolated staging KV namespace;
2. create an isolated staging rate limiter;
3. set a staging OpenAI secret interactively;
4. add preview/staging CORS origins;
5. keep the production endpoint and bindings unchanged;
6. run the API and page evaluation suite against staging.

## Next implementation point

Start from the exact working mirror:

`worker-fairy-godmother/src/index.js`

First refactor:

1. introduce typed response helpers and honest HTTP statuses;
2. move allowance counting after validated success;
3. remove client-asserted subscriber identity;
4. add input limits and abort timeout;
5. add boundary/domain/task routing;
6. add retrieval-required routing before any current-fact answer;
7. preserve the strong voice material as a constrained personality layer;
8. add the case/Play contract after verified identity and ledger design.

The frozen recovery artifact must remain unchanged as the production baseline.
