# NewsStand narrow-successor source-use acceptance binding

**Status:** `REPORT_READY — NEWSSTAND SOURCE/READ-LISTEN ACCEPT; CAMPAIGN HOLD`  
**Evidence time:** `2026-07-26T14:51:21-07:00`  
**Campaign:** `audience-week-01-2026-07-26`  
**Owner task:** `019f9f7f-9fad-7d73-84fa-ba6f37e6ade1`

## Bound acceptance

Audience & Growth binds the NewsStand receipt:

- path:
  `operations/product-stewards/newsstand/evidence/audience-week-01-day-01-narrow-successor-source-use-review-2026-07-26.md`;
- SHA-256:
  `8c4c0874bcc444ce7156c8a5b8d449bf71582704313493b77553d2bc05d0b8f1`;
- NewsStand evidence time:
  `2026-07-26T14:48:21-07:00`; and
- verdict:
  `ACCEPT` for Issue 02 source/canon and truthful read/listen scope only.

Exact accepted successor seals:

| Object | Manifest-object SHA-256 | Referenced-asset-set SHA-256 |
|---|---|---|
| `W01-D1-01` | `b06673d7f36f65172934e4c7a3b26213cbafd098bd6b1805962094a60112e15c` | `edd384a6db389f88f5bbc65e9c7e6007f8dde3aca85518df9bbd5252010e8339` |
| `W01-D1-03` | `db600da647b9543cfa96b37967e6a767f5acd3aad2ef8d2ed6a71753816ad0e8` | `86c32ffbca9da32bfe81257ba7885559eaf3b193e4b313ac356cd0968767a5c4` |

`W01-D1-02`, `W01-D1-04` and `W01-D1-05` remain admitted only at their
previously accepted exact seals:

- `W01-D1-02`:
  `3edf0df4da617d34249344063400e34dffdb2772e80d41d597f6c0459fafff9d`
  / `9849c167aeb0859cb722b1cf50327cbc5336095f14ecdba208d4bb4730bb6c55`;
- `W01-D1-04`:
  `e8648d1dcee611ea1d34e810b4c7efb96ca88cbc6316fae0059a704549436d8c`
  / `4933ef1eecc696f598ebfef646ee0301d6b20d60f537fc39d3b492aae9da8e26`;
- `W01-D1-05`:
  `895413284aba3a8ac536f5ebe1fc71f703c0511ce65d0ecbce0bd580da255804`
  / `ad10ffd9c0f995c13ff7639597864a51b11cac67911f5b210bce36b8284d7e60`.

## Exact effect

Clear only NewsStand Issue 02 source/canon and read/listen scope for the exact
seals above. The read destination remains the admitted Issue 02 route. Listen
remains a held cover-only audio edition. `W01-D1-05` remains read-only.

This binding does not admit campaign readiness, rights, Brand exact use,
human/native accessibility, measurement, channel rendering or publisher
authority, Ali public identity/voice, release, deployment or public-origin
proof. All remain `HOLD`.

Counts remain:

- planned: `35`;
- built locally: `35`;
- ready to publish: `0`; and
- published: `0`.

## Supporting proof

- master binding SHA-256:
  `2c2a6502a8c273f91eaca34beb6151e68c09d8c84e04ff8867de9ddaa0e00d72`;
- independent production recheck:
  `INDEPENDENT-NARROW-DAY-01-REPAIR-RECHECK-2026-07-26.md`, SHA-256
  `03ee8fa88602ca182d381da710e4e2900e42edda1497cd612dcf169a768f6771`;
- targeted accessibility/copy recheck:
  `INDEPENDENT-NARROW-DAY-01-ACCESSIBILITY-COPY-VERDICT-2026-07-26.md`,
  SHA-256
  `2367cd07c2552bfc6de9e61b7bb23f29575723ab632c82ac02171850eaf38989`;
- Week 01 verifier: `PASS — 35 built / 0 ready / 0 published`;
- NewsStand targeted owner-entry: `PASS`; and
- full steward check: `PASS`.

## Remaining work and next action

The exact next action is the queued Brand checksum review of `W01-D1-03`
object `db600da6…d0e8` / asset set `86c32ffb…a5c4`. After a Brand receipt
returns, bind it without changing bytes, then reconcile the still-held
rights, human/native accessibility, measurement, campaign, channel, Ali,
release and public gates. No unit can become ready before all applicable gates
accept.

No public, schedule, account, deployment, spend or Ali approval authority was
used or implied.
