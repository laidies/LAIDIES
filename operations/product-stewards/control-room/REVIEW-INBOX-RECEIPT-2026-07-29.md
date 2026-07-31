# Ali Review Inbox — build and verification receipt

**Status:** VERIFIED LOCALLY  
**Evidence time:** 2026-07-29 13:13 America/Vancouver  
**Public mutation:** none

## Outcome

One internal review surface now exposes every exact current episode-media item
that genuinely requires Ali:

- Episode 01 v26 full-title human watch;
- Episode 02 v19 ident-v2 full-title human watch;
- Episode 03 v13 full-title human watch;
- Trailer v5 outfit ruling and subsequent full-title watch; and
- Episode 04 as already live with no pending review.

## Exact surface

`operations/product-stewards/control-room/review-inbox.html`

The Control Room dashboard links directly to it. The stale
`episode-media-quality/ali-review-packet.md` now points to this surface and binds
the same current masters.

## Verification

- All four exact MP4 paths exist.
- All four exact VTT paths exist.
- In the real local browser, every MP4 reached `readyState=4` with no media
  error.
- Observed durations: E01 `1172.233333s`; E02 `987.466667s`; E03 `1048s`;
  Trailer `967.199333s`.
- Every caption track reached loaded state `2`.
- A HOLD receipt with timestamped notes survived a full page reload; the test
  receipt was then cleared through the visible interface.
- The generated Control Room dashboard contains exactly one visible
  `Open Ali’s Review Inbox` link.
- Review page and dashboard browser logs contained no errors or warnings.
- Episode 04 is not presented as awaiting approval.

## Boundary

Saving a local review result does not deploy or publish a film. Control Room
must convert Ali's saved ruling into a durable checksum-bound receipt before a
release owner consumes it, then separately verify deployment and public origin.
