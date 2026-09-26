# Private NewsStand measurement adapter

`adapter.mjs` is deliberately not loaded by `newsstand.html`. It has no default
network sender and remains disabled unless a future integration provides both
`enabled: true` and an injected transport.

## Exact event mapping

| Contract action | Emit only after this existing reader outcome |
|---|---|
| `paper_opened` | `showReader` has rendered a selected paper and supplied `beginTransition("paper_opened")`. |
| `story_opened` | `renderHash` has rendered an allowed article body and supplied `beginTransition("story_opened")`. |
| `source_opened` | A displayed article source link is activated; do not pass its destination. |
| `learning_opened` | A displayed book or lesson link is activated; do not pass its destination. |
| `search_completed` | `renderSearch` completes from an explicit Enter or `#ns-search-button` action, after its result state is known; pass internal `trigger: "explicit_submission"`. `history_restoration` is explicitly suppressed and is never transmitted. Do not call from `restoreHashlessView`, `popstate`, or input events. |
| `correction_viewed` | A correction or retraction notice has actually rendered. |

The adapter retains only the current page-instance transition token, never
stores or transmits it, and claims it before awaiting transport. A stale token
is rejected; an in-flight/completed token dedupes; a failed transport returns
the current token to retry-ready. Source/learning clicks remain separately
countable. `transport_completed` means only that the injected transport
settled; it is not evidence of Plausible acceptance or report visibility.

## Connection still required

1. In the existing Plausible account, configure the exact custom-event goal name `NewsStand action` for `laidies.ai`.
2. Supply a browser-safe injected transport using Plausible’s configured site path. Send only the adapter payload: required `name`, `url`, and `domain`; optional `props`; no `referrer` field. Do not add a second analytics service or alter the shared Worker.
3. Integrate the explicit trigger points above without reading text inputs, browser storage, history identifiers, source URLs, or article identifiers. Normalize browser privacy signals to strict booleans before construction; string values such as `"0"` are rejected. Respect Global Privacy Control and Do Not Track by passing those signals at construction.
4. On the custom origin, trigger one controlled reader action and confirm the configured aggregate report. A network success/202 alone is insufficient because Plausible can drop events.

The contract’s referenced shared event dictionary and aggregate packet are not
present in this execution checkout, so this private package does not claim to
bind or replace them. Plausible’s current Events API requires `name`, `url`,
and `domain`; it allows optional `props` and `referrer`, and documents that a
202 can still represent a dropped event.
