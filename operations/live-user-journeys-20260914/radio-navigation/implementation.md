# KSVL same-tab navigation handoff

- Baseline: immutable Pages asset `https://2c4746f7.laidies-sunnyvaile.pages.dev/content/site/ksvl-player.js`, captured in `baseline.js`.
- Cause: the destination could observe the predecessor heartbeat before the predecessor's `pagehide` released the Web Lock. The old startup path skipped the one-use navigation continuation and later restored it paused after the owner record disappeared.
- Change: normal navigation and popup transfer both return a single expiry-timestamp-or-zero continuation value. Startup stores the validated expiry before following an owner, so an already-paused owner can cancel it. If a playing predecessor disappears, `followOwner` uses the retained continuation once. A live owner continues to control the player.
- Cancellation: a remote pause, stop, a toggle that pauses a confirmed playing remote owner, or a newly observed paused remote owner clears retained autoplay before release.
- Lock behavior: playback still goes through `acquireOwnership()` and `navigator.locks`; no code writes, deletes, or overrides another owner record.
- Failed acquisition: the restored queue remains visible as a paused Resume state and keeps the exact pre-existing "Another town window owns the music" status.
- Visitor copy, CSS, registry IDs, and track admission are unchanged.
