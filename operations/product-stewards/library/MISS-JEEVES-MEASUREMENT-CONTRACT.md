# Miss Jeeves privacy-safe measurement contract

**Status:** local contract implemented; live collection not connected
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

### `miss_jeeves_answer_outcome` — locally implemented

One record for every valid submitted question, including unavailable outcomes.
This is the submission denominator.

- `schema_version`
- `placement`: `homepage` or `library`
- `coverage_outcome`: `answered`, `related_coverage`, `not_covered` or `unavailable`
- `topic_id`: one ID from `content/site/miss-jeeves-topic-taxonomy.json`
- `recommended_source_ids`: zero to six current admitted catalogue IDs
- `result_count`
- `source_health`

### `miss_jeeves_result_opened` — specified, not implemented

One record when a visitor opens a recommended result. It may include only the
same schema, placement, outcome and topic fields plus one admitted `source_id`
and its controlled destination type. The exact event belongs to the approved
Homepage/Library control, so it must not be attached to the rejected page.

## Data that is prohibited

Never send or persist the raw question, answer text, page/reading text, account
or Resident Card identifier, email, name, IP address, user/session fingerprint,
precise location, full referrer, free-text topic, inferred demographic,
employment information or inferred personal need. Do not place the question in
URLs, analytics, logs, session replay, error reporting or model-training stores.

The same-origin answer service necessarily processes the question in memory to
produce the response. It must use `POST`, `no-store`, a bounded length and no
request-body logging. The optional grounded model receives only the question and
the current admitted catalogue; provider retention/training terms must be
verified before that binding is enabled publicly.

## Retention and access

- Event-level privacy-safe rows: maximum 90 days.
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

Until then, `MISS_JEEVES_SIGNALS` remains unbound and collection is off.
