# EMQ Trailer v4 representative-player witness — successor

**Task:** `EMQ-TRAILER-V4-REPRESENTATIVE-PLAYER-WITNESS-SUCCESSOR-2026-07-26`  
**Judge:** Episode Media Quality, independent of the maker  
**Player-functional verdict:** **PASS**  
**Reason code:** `PASS-PLAYER-FUNCTIONAL-SEALED-HARNESS-11-11`

This is a narrow isolated-player functional verdict. It preserves the earlier
player-witness HOLD unchanged, does not admit Trailer v4 overall, and does not
affect the separate heroine-outfit HOLD.

## Exact rehash and deterministic rerun

The frozen tuple matched exactly:

| Artifact | SHA-256 | Result |
| --- | --- | --- |
| MP4 | `760dbbc7daff1fb299074e7e8d03575635b77ab9c56ec8dece4fc99d26d68934` | **PASS** |
| VTT | `5bc151d7d0aa611f42aed427b61dcc9c55c5320b368d31a9285a64ab31255b8d` | **PASS** |
| binding | `c11f8015aae1bc63f611f1175f5837647452ab2ef9901c6f6209d4a04c0009f4` | **PASS** |
| index | `a339ab29783860acc6380937d6bf831969e5ade11079f175a2e9fb8c9eb57bb5` | **PASS** |
| CSS | `1c82aca8394ae42851379fc4369c3e8532c3a81d4451ed6fb1037e0a53ab8e91` | **PASS** |
| JS | `87e4e7755eb14f50614ecc3b70ac5f93b344d5c8eb0dd760ee850ed34eff1c58` | **PASS** |
| test | `24a3a14f8acfb73e659dfbf01afa3f362474a24b439e416e3c20264c98e21cdd` | **PASS** |
| results | `b93d61c82975d3a0232da7d659878d9ab8e55c8952a697c4c80464ab9f26a9ac` | **PASS** |
| maker evidence | `85055f14113f2ca84e8ba97ebae1d4da9318a8a5b61ea62c7228dfe198129458` | **PASS** |

Literal rerun: `node test-harness.mjs` returned **11 PASS / 0 FAIL**. The
suite reverified fail-closed binding, both frozen hashes, 207 VTT cues,
sanitization, caption-state wiring, keyboard/focus rules, responsive and
reduced-motion rules, no-JS locked fallback, and failure/retry paths.

## Sealed browser evidence reviewed

The exact supplied captures rehashed and were visually inspected:

| Capture | SHA-256 | Dimensions | Result |
| --- | --- | ---: | --- |
| desktop | `96bb981a777b36de13bfbb81fe8539d47ed64aca695113571ef4e0243402e487` | 1440×1565 | **PASS** |
| mobile | `210a3670b7a77c673e0ffa812c86f07b47cbf7668786d671751287eaa2f432a0` | 390×1264 | **PASS** |
| mobile | `8ebe823f501ec0eecf460d79342316891435191663b3defaa36b1d78d0d90cc4` | 320×1468 | **PASS** |

The captures visibly show the post-preflight PASS state, below-picture caption
rail, `Captions on`, a 16:07 duration, and no raw `<v …>` text. The sealed
foreground observations on the exact live harness additionally record:

- preflight PASS for the exact MP4/VTT, 207 sanitized cues, and 967.2 s media;
- Play advanced; Space paused; ArrowRight sought exactly +10.000 s;
- C toggled captions off/on truthfully with no raw voice-markup leakage;
- the repaired locked overlay was absent after PASS;
- 1440, 390, and 320 had no horizontal overflow; and
- all four controls measured 48 px high at each width.

Together with the independent rehash and deterministic rerun, this clears the
isolated harness's normal-speed technical playback, external-caption render,
caption-state, keyboard/focus, responsive, reduced-motion, no-JS, and
failure/retry functional contract.

## Separate remaining release witness

No identified human completed a full 1× unmuted audible watch of the
967.132880-second title in this rejudge. That remains a **separate release
witness**, not a failure of this isolated player-functional verdict. It must be
obtained before any broader release decision alongside the independent
full-title/outfit gates.

## Authority and next action

No public route, site, harness artifact, media, captions, deployment, or
public state was changed. No overall Trailer admission or release claim is
made.

**Exact next action:** retain this sealed harness and frozen tuple; obtain the
identified full 1× audible-watch receipt, then reconcile it with the separate
Trailer full-title/outfit decision. No rebuild is authorized by this PASS.

## Learning scan

No new qualifying learning: the existing rule still applies that sealed
browser evidence and deterministic tests establish only their stated bounded
functional gate.
