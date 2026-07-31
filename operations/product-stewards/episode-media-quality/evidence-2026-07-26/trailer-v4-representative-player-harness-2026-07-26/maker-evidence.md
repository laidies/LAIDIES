# Trailer v4 representative-player harness — maker evidence

**Task:** `TRAILER-V4-REPRESENTATIVE-PLAYER-HARNESS-MAKER-2026-07-26`  
**Maker status:** **VERIFIED LOCALLY FOR THE NAMED MAKER/BROWSER CHECKS / READY FOR INDEPENDENT REJUDGMENT**  
**Authority:** maker evidence only; the maker does not admit this player or Trailer v4

## Outcome and boundary

This directory contains a bounded, non-public static review harness. No public
route, `watch.html`, media, VTT, pre-existing maker file, product dossier,
deployment, or public state was edited.

The page begins fail-closed with no `video[src]`. In-browser preflight requests
the exact external MP4 and VTT paths, computes SHA-256 for both complete byte
buffers, requires both hashes and exactly 207 parsed caption cues, and only then
creates the video and caption-track object URLs and enables controls. Any
request, hash, decode, cue-count, sanitizer, simulated media, or simulated
caption failure returns the player to a locked recovery state.

## Exact frozen inputs

| Input | Exact path from `Website-homepage/` | SHA-256 | Bytes | Maker preflight |
| --- | --- | --- | ---: | --- |
| MP4 | `assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v4-clock-successor-review-1920.mp4` | `760dbbc7daff1fb299074e7e8d03575635b77ab9c56ec8dece4fc99d26d68934` | 135,632,408 | **PASS — exact** |
| External VTT | `assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt` | `5bc151d7d0aa611f42aed427b61dcc9c55c5320b368d31a9285a64ab31255b8d` | 22,027 | **PASS — exact** |

The VTT contains 207 timing cues and 207 `<v …>` voice tags. The deterministic
sanitizer control removes voice markup and leaves no raw `<v …>` text. The
custom live caption rail is below the picture; the native external track is
held in `hidden` mode so captions are not burned or overlaid across the image.

## Literal maker tests

Working directory:

`Website-homepage/operations/product-stewards/episode-media-quality/evidence-2026-07-26/trailer-v4-representative-player-harness-2026-07-26`

Commands:

```text
node --check test-harness.mjs
node --check player.js
node test-harness.mjs > test-results.json
sha256sum binding.json index.html player.css player.js test-harness.mjs test-results.json
python3 -m http.server 0 --bind 127.0.0.1 --directory Website-homepage
curl -sS -I http://127.0.0.1:59857/operations/product-stewards/episode-media-quality/evidence-2026-07-26/trailer-v4-representative-player-harness-2026-07-26/index.html
```

Results:

- `node --check`: **PASS** for both executable JavaScript files.
- `test-harness.mjs`: **11 PASS / 0 FAIL**.
- Frozen MP4 and VTT hashes: **PASS — exact**.
- VTT cue count/voice-markup sanitizer control: **PASS — 207 / 207 / 0 raw voice-tag leak after sanitization**.
- Lazy binding and fail-closed preflight source contract: **PASS**.
- Truthful caption state, custom rail, keyboard mappings and visible focus rule: **PASS**.
- Desktop/390/320 responsive rules and reduced-motion rule: **PASS**.
- No autoplay, no-JS locked fallback, retry, simulated media failure,
  simulated caption failure, and runtime video error recovery: **PASS**.
- Local HTTP response for `index.html`: **200 OK**, `text/html`, 4,344 bytes.

Machine-readable literal results are in `test-results.json`.

## Harness artifact hashes at maker test

| Artifact | SHA-256 |
| --- | --- |
| `binding.json` | `c11f8015aae1bc63f611f1175f5837647452ab2ef9901c6f6209d4a04c0009f4` |
| `index.html` | `a339ab29783860acc6380937d6bf831969e5ade11079f175a2e9fb8c9eb57bb5` |
| `player.css` | `1c82aca8394ae42851379fc4369c3e8532c3a81d4451ed6fb1037e0a53ab8e91` |
| `player.js` | `87e4e7755eb14f50614ecc3b70ac5f93b344d5c8eb0dd760ee850ed34eff1c58` |
| `test-harness.mjs` | `24a3a14f8acfb73e659dfbf01afa3f362474a24b439e416e3c20264c98e21cdd` |
| `test-results.json` | `b93d61c82975d3a0232da7d659878d9ab8e55c8952a697c4c80464ab9f26a9ac` |

## Actual browser maker evidence

The scoped loopback server ran on `127.0.0.1:59857`. The maker's initial
in-app Browser connection exposed no browser instance, so the foreground owner
performed the permitted in-app-browser run against the same live local URL and
wrote the captures into this directory. This is actual browser behavior
evidence, but it is still not independent admission.

Literal foreground browser observations:

- Hard reload at desktop 1440, mobile 390 and mobile 320 each reached checksum
  preflight **PASS** for the exact MP4 and VTT and reported 207 sanitized cues.
- The player reported duration `967.2 s`.
- Click **Play** advanced `currentTime` with an audible-capable media state.
  Space changed Pause to Play and fresh DOM state confirmed `paused=true`.
- ArrowRight while paused advanced `currentTime` by exactly `+10.000 s`.
- `C` toggled captions off and on; the visible status matched each state and
  the caption rail contained no raw `<v …>` markup.
- Desktop 1440, mobile 390 and mobile 320 each had
  `scrollWidth == clientWidth` (no horizontal overflow).
- After the screenshot-discovered stale-overlay repair, hard reload confirmed
  `.locked-state` `visible=false` at all three widths after PASS.
- All four visible controls were exactly `48 px` high at all three widths.

The initial screenshots exposed one real harness bug: author CSS overrode the
browser's default `[hidden]` rule, leaving the fail-closed overlay visible after
a successful preflight; mobile controls were also `44.8 px` high. The bounded
repair added `.locked-state[hidden] { display: none; }` and raised control
minimum height to `3rem`. Deterministic tests were expanded, rerun at
**11 PASS / 0 FAIL**, and all screenshots were replaced after a hard reload.

Browser captures:

| Screenshot | Dimensions | SHA-256 |
| --- | ---: | --- |
| `screenshots/browser-desktop-1440.png` | 1440 × 1562 | `96bb981a777b36de13bfbb81fe8539d47ed64aca695113571ef4e0243402e487` |
| `screenshots/browser-mobile-390.png` | 390 × 1258 | `210a3670b7a77c673e0ffa812c86f07b47cbf7668786d671751287eaa2f432a0` |
| `screenshots/browser-mobile-320.png` | 320 × 1458 | `8ebe823f501ec0eecf460d79342316891435191663b3defaa36b1d78d0d90cc4` |

Open browser evidence remains deliberately bounded:

- reduced-motion preference emulation was not actually exercised;
- JavaScript-disabled rendering was not actually exercised;
- simulated media/caption failure and retry were not actually exercised in the
  browser;
- focus CSS exists and keyboard actions passed, but a screenshot of the focus
  ring was not captured;
- no human normal-speed full watch or audible-comprehension result is claimed.

The static checks prove the authored contract and frozen-byte binding. They do
not replace the remaining independent witness or human full-watch gate.

## Exact independent-rejudge trigger

Serve `Website-homepage/` from a loopback-only static server and open:

`/operations/product-stewards/episode-media-quality/evidence-2026-07-26/trailer-v4-representative-player-harness-2026-07-26/index.html`

**Exact trigger now met for dispatch:** the repaired checksum-bound harness
passes its 11 deterministic checks, its current artifact hashes are recorded,
and actual 1440/390/320 browser captures exist. Independent Release QA may
begin rejudgment after first re-running the two frozen input hashes, the six
harness artifact hashes above and the three screenshot hashes. The independent
judge—not this maker—must then:

1. observe preflight `PASS` and the external MP4/VTT requests;
2. independently compare or replace the desktop, 390 px and 320 px screenshots;
3. exercise initial/on/off caption truth and confirm the rail never shows raw
   `<v …>` markup;
4. exercise keyboard play/pause, ±10-second seek, and focus visibility;
5. exercise the still-open reduced-motion, no-JS, media failure, caption failure
   and retry paths;
6. perform and identify the human normal-speed 1× audible full watch if that
   separate gate is being judged; and
7. return an independent **PASS** or **HOLD** without changing the frozen tuple
   or treating this maker report as admission.

The separate heroine-outfit authority HOLD remains outside this player-only
harness and is not changed or adjudicated here.

## Learning scan

No new qualifying learning is recorded. The browser limitation is the same
already-documented prevention rule: source-level or deterministic harness
evidence cannot be reported as an actual checksum-bound browser journey.
