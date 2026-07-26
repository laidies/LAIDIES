# Product-scoped learning — early media failure race

**Observed:** Browser automation blocked the map asset, but the recovery message stayed hidden because the image failed before the `DOMContentLoaded` handler attached its `error` listener.

**Prevention rule:** For critical progressively enhanced media, attach the failure handler and also inspect `complete && naturalWidth === 0` during mount. Test both a failed request and the already-failed-before-mount state. A fallback that only handles future events is not a reliable fallback.

**Public Behind the Build angle:** A map can fail faster than the page can listen for it; robust recovery checks the state it inherited as well as events that happen later. Do not expose private paths or internal release state.
