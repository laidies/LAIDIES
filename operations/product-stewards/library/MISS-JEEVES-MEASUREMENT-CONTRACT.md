# Miss Jeeves privacy-safe measurement contract

**Status:** deployed, publicly verified and delivering controlled aggregates
**Owner boundary:** Library owns the visitor interaction; Platform owns transport,
retention, access and source health; Audience interprets aggregates; content and
building owners decide what to change.

## Decision jobs

The measurement may inform:

1. which controlled topics visitors ask about;
2. where LAiDIES has an exact answer, related coverage or no coverage;
3. which admitted sources Miss Jeeves recommends;
4. which recommended destinations visitors choose; and
5. whether Homepage and Library placement or result ordering should change.

It does not prove unique people, demand, content quality or why a visitor chose
an action. It never automatically publishes, rewrites, ranks or retires content.

## Allowed events

### `miss_jeeves_answer_outcome` — deployed

One record for every valid submitted question, including unavailable outcomes.
This is the submission denominator.

- `schema_version`
- `placement`: `homepage` or `library`
- `coverage_outcome`: `answered`, `related_coverage`, `not_covered` or `unavailable`
- `topic_id`: one ID from `content/site/miss-jeeves-topic-taxonomy.json`
- `recommended_source_ids`: zero to six current admitted catalogue IDs
- `result_count`
- `source_health`

### `miss_jeeves_result_open` — deployed

One record when a visitor opens a recommended result. It may include only the
same schema, placement, outcome and topic fields plus one admitted `source_id`
and its controlled destination type. The deployed endpoint returns `recorded`
when the event is accepted and `measurement_off` without failing navigation if
the binding is unavailable.

## Data that is prohibited

Never send or persist the raw question, answer text, page/reading text, account
or Resident Card identifier, email, name, IP address, user/session fingerprint,
precise location, full referrer, free-text topic, inferred demographic,
employment information or inferred personal need. Do not place the question in
URLs, analytics, logs, session replay, error reporting or model-training stores.

The same-origin answer service necessarily processes the question in memory to
produce the response. It must use `POST`, `no-store`, a bounded length and no
request-body logging. The grounded model receives only the question and current
admitted catalogue. Cloudflare states that Workers AI customer content is not
used to train models or improve Cloudflare or third-party services without
explicit consent. The service rejects apparent private content before the model
call.

## Retention and access

- Event-level privacy-safe rows: Cloudflare's fixed three-month retention.
- Daily aggregate counts by schema, placement, outcome, topic and source: maximum
  25 months, allowing year-over-year comparison.
- Access: Platform operations for source health; Audience for aggregate analysis;
  accountable content/building owners receive aggregate reports only.
- No individual-level export, replay, cross-session profile or sale/sharing for
  advertising.
- A provider is default-denied unless these limits and deletion behavior can be
  configured and verified.

## Interpretation

Every report shows raw submission counts, outcome counts/rates, result counts,
placement, schema version, period and source health. `UNKNOWN` and `DEGRADED` are
not zero. Low volume is descriptive only. A layout change requires both a
repeated aggregate pattern and direct UX evidence; a content commission requires
an accountable owner judgment, not a query count alone.

## Release prerequisites

Before collection is enabled:

1. Platform verifies the exact event binding, no-body logs, retention/deletion,
   access roles, failure handling, source health and bot/abuse treatment.
2. The public Privacy page explains this aggregate question measurement and any
   grounded-model provider processing in plain language.
3. The exact Homepage and Library interaction states are approved.
4. A calibrated test proves a raw question and prohibited identifiers cannot
   reach the event sink.
5. Public-origin testing proves answers continue working when measurement fails.

If any prerequisite fails in a successor, remove `MISS_JEEVES_SIGNALS` and let
the public endpoints return `measurement_off`; answers and navigation continue.

## Current production evidence — 2026-08-24 UTC

- The Library and Privacy page, health route, answer route and result-open route
  are deployed at source `e2b6f1a172893ff28609d474b3fec846f2d99ca6`.
- Both the immutable deployment and `laidies.ai` report
  `aggregate_measurement: available`; result-open returns HTTP 202 with
  `recorded`.
- The Cloudflare account feature, dataset
  `laidies_miss_jeeves_signals_v1` and Pages binding are active. An Analytics
  Engine SQL query returned the controlled result-open record with topic,
  placement, source ID, health and count and no raw question or identity.
- Consent-based topic requests are a separate D1 workflow, not passive
  measurement. One labelled release fixture passed submit, cross-origin replay,
  receipt/status and editorial decline with exactly one stored request.
