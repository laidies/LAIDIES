# NewsStand aggregate measurement — private preparation

Status: PRIVATE; not installed, not collecting events, no dashboard result.

Reuse the site's existing Plausible installation. Do not add a second analytics service or alter the shared Cloudflare worker. Before connection, configure the exact `NewsStand action` goal and verify a controlled event in the aggregate report. No available Plausible API credential was found in the current process or the repository's standard local environment files. The native Mac is locked, so authenticated dashboard access has not been examined. A transmitted request,202 response or callback does not establish that the event was recorded; Plausible can drop bot events and requires a matching goal.

## Allowed record

The event has only `schema: ns-v1`, one controlled `action`, and one controlled `outcome`. Its page URL is fixed to `https://laidies.ai/newsstand`; referrer is omitted. No article/topic/edition identity, title, source URL, archive query, date, raw reading text, account/Card identifier, receipt, demographic, workplace or inferred personal need is included. The adapter never reads text-input values or writes browser storage. Global Privacy Control or Do Not Track suppresses its optional events. A disabled/blocked/erroring provider must never delay navigation or create a visitor-facing error.

| Action | Trigger and meaning | Outcome |
|---|---|---|
| paper_opened | A selected paper is actually rendered. A rack click alone is insufficient. | available, unavailable |
| story_opened | The allowed article body is actually rendered, including a direct link. This is an open, not proof of reading. | available |
| source_opened | Reader activates a displayed source link. Do not send its destination or article. | activated |
| learning_opened | Reader activates a displayed book/lesson link. Do not send its destination or article. | activated |
| search_completed | Explicit submitted search finished, rather than each keystroke or a restored history view. Do not send query or result IDs/counts. | results, no_results, unavailable |
| correction_viewed | A real correction/retraction notice was rendered for the selected article. Does not measure understanding. | corrected, retracted |

`paper_opened` and `story_opened` are emitted once per actual transition, not on every layout mutation or repeated source-data event. Source and learning activations remain separate occurrences. No new cross-session identifier or reading history is created. The already-governed return-state feature can supply qualitative return journeys; this first event contract does not pretend to measure whether a return was useful.

## Interpretation and report

Use weekly aggregate action/outcome counts to identify failed search or broken routes for investigation. Suppress cohorts below five in owner-facing reports; do not export event-level rows. Record source, reporting interval, connection health and capture time. Missing, stale, blocked or unconfigured data is UNKNOWN, not zero. Record real zero only from a successful configured report. Do not rank news, infer comprehension, commission a story, personalise content or award rewards automatically from these counts. Pair the counts with direct reader journeys before making a product decision.

Plausible's current documentation says custom events count toward the existing billable pageview allowance. Keep this to explicit outcomes; no scroll/hover/keystroke heartbeat. This task does not purchase an upgrade.

## Admission and proof still required

1. Independently review the exact adapter, triggers and privacy filter against this contract and the live privacy policy.
2. Configure the existing account's matching goal; do not publish a sender while the goal/reporting path is unavailable.
3. Calibrate dropped/unknown action, malicious property, raw URL/referrer, blocked provider, duplicate transition, history restoration and unavailable-reader behavior.
4. Verify an actual custom-origin reader action reaches a configured aggregate report; distinguish network acceptance from report visibility.
5. Bind the scoped release and retain the existing NewsStand behavior. Update the privacy description only if its current wording does not cover the actual retained information.

Sources inspected September11: https://laidies.ai/privacy ; https://plausible.io/docs/custom-event-goals ; https://plausible.io/docs/events-api . Shared references: operations/product-stewards/event-dictionary.json and operations/product-stewards/platform-reliability/build-packet-aggregate-measurement-v1-2026-07-26.md. The existing Library measurement contract supplies the interpretation boundary; its specific source IDs and Worker binding are not reused for NewsStand events.
