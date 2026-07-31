# EMQ Trailer v4 representative-player witness

**Task:** `EMQ-TRAILER-V4-REPRESENTATIVE-PLAYER-WITNESS-2026-07-26`  
**Witnessed:** 2026-07-26, America/Vancouver  
**Witness:** Episode Media Quality, independent of the maker  
**Player-gate verdict:** **HOLD**

This is a player-gate-only ruling. It neither changes nor restates the
full-title judge's separate heroine-outfit hold, and it authorizes no
integration, deployment, public media, or release claim.

## Frozen tuple verified

| Artifact | Path | SHA-256 | Result |
| --- | --- | --- | --- |
| Master | `assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v4-clock-successor-review-1920.mp4` | `760dbbc7daff1fb299074e7e8d03575635b77ab9c56ec8dece4fc99d26d68934` | **PASS** — exact match |
| External VTT | `assets/episodes/trailer/comic/delivery/canonical-named-map/episode-trailer-v3-as-recorded-full.vtt` | `5bc151d7d0aa611f42aed427b61dcc9c55c5320b368d31a9285a64ab31255b8d` | **PASS** — exact inherited caption artifact |

The V4 config binds this VTT to the candidate and declares it external,
unchanged, 207 cues, and not burned into picture. `afinfo` reports the frozen
master as AAC, mono, 44.1 kHz with estimated duration `967.132880 s`; the last
VTT cue ends at `965.140 s` (about `1.993 s` before the file duration).

## Literal tests executed

| Test | Literal execution / observation | Result | What it proves—and does not prove |
| --- | --- | --- | --- |
| Frozen bytes | `sha256sum` over the exact MP4 and VTT paths above | **PASS** | The witnessed inputs are the stated frozen tuple. |
| Normal-speed audible output sample | `afplay -t 8 assets/episodes/trailer/comic/delivery/canonical-named-map/laidies-trailer-comic-v4-clock-successor-review-1920.mp4` → `afplay_exit=0` | **TECHNICAL SAMPLE PASS** | The OS accepted and played an eight-second 1× audio-output sample. It is not a complete 967-second human audible watch, and no human listener is claimed. |
| VTT structure and text-sanitizer control | Node test parsed all 207 VTT timing lines; 207 voice tags detected; removing WebVTT tags left `0` `<v …>` leaks and no empty readable cue | **PASS — SOURCE-ONLY** | The exact VTT can be sanitized without raw voice-tag leakage. It does not establish a browser VTT request or rendered player rail. |
| Candidate-player binding discovery | Exact-MP4 and exact-VTT route search found no representative-player binding. `watch.html` has `EPISODE_FILMS = {}` and therefore does not mount a film; it advertises the trailer's public path as a held listen-along. | **HOLD** | There is no supplied/available player surface that binds this master and this VTT. |
| External VTT load and visible rendering below picture | No bound player surface exists to request the exact VTT or render its active cues. | **HOLD / UNWITNESSED** | Sanitizer source control is not actual external VTT loading/rendering. |
| Raw `<v …>` leakage | No bound player rail exists to inspect. The VTT itself contains voice markup in all 207 cues; the source-only sanitizer control strips it. | **HOLD / UNWITNESSED** | No claim is made that a player does or does not leak markup. |
| Caption on/off state truth | No caption control bound to this master/VTT was supplied. | **HOLD / UNWITNESSED** | No truthful initial, on, or off UI state was observed. |
| Keyboard play/pause/seek and focus | No bound player control surface was available. | **HOLD / UNWITNESSED** | Existing generic/listen-along code is not evidence for this frozen master. |
| Desktop and 320 px mobile/reflow | No bound player surface was available to size or inspect. | **HOLD / UNWITNESSED** | No desktop/mobile player result is claimed. |
| Reduced motion | `watch.html` contains a reduced-motion rule, but no V4-bound player was executable and no preference-emulated run occurred. | **HOLD / SOURCE-ONLY** | Existing source policy is not witnessed behavior. |
| No-JS and media/caption/network failure fallback | No V4-bound player or isolated harness was supplied. | **HOLD / UNWITNESSED** | The current public route is a held listen-along, not a V4 film fallback. |

## Why the player gate holds

The independent full-title judge already required a representative-player
binding before these checks could be accepted. This witness confirms that the
binding is still absent: the frozen V4 path is referenced only by its review
records, while the public Screening Room deliberately has no motion-film
mapping. The in-app browser service was also unavailable in this session. No
new temporary harness was created because this task's write boundary permits
only this evidence pair and forbids site, route, player, media, VTT, maker, or
public changes.

The technically successful `afplay` sample and source-level VTT sanitizer are
useful negative-control evidence only. They cannot establish normal-speed
human comprehension, browser audio state, external-VTT request/load/rendering,
caption toggle truth, focus behavior, responsive layout, reduced-motion
behavior, or no-JS/failure recovery.

## Remaining proof and exact next action

**Remaining proof:** a non-public, checksum-bound representative player that
loads this exact MP4 and VTT; an independent human completes the entire
`967.132880 s` master at 1× with audible output; and the witness records actual
desktop and 320 px mobile runs, caption initial/on/off states, below-picture
rendered caption text without raw `<v …>` leakage, keyboard/focus play-pause
and seek, reduced-motion, no-JS, and media/caption/network failure behavior.

**Exact next action:** Audio & Caption Owner + Release QA must provide that
non-public representative-player URL or file-based harness bound to the two
hashes above, without changing either frozen byte. Then rerun this independent
player witness and return literal observations, browser/device details,
screenshots or equivalent reproducible evidence, and the human listener's
role/timestamp to Episode Media Quality.

## Authority and learning scan

No master, VTT, maker file, site, route, public media, deployment, or dossier
was modified. No public or overall Trailer-admission claim is made.

No new qualifying learning was added to `operations/painpoints-log.md`: this
is a direct recurrence of the already-binding rule that file/stream or
source-only evidence does not replace a checksum-bound, independently
witnessed player journey. The task's explicit write boundary also permits only
this Markdown and its matching JSON record.
