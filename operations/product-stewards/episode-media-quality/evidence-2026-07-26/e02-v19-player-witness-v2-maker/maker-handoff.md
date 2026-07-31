# E2 v19 player/caption witness v2 — maker handoff

**Task:** `E2-V19-PLAYER-CAPTION-SUCCESSOR-2026-07-26`  
**Status:** **VERIFIED LOCALLY — deterministic maker evidence only; independent rejudge required**

## Frozen inputs preserved byte-for-byte

| Artifact | SHA-256 |
|---|---|
| `assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4` | `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3` |
| `assets/captions/episode-02.vtt` | `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f` |

No video, audio, VTT, public media, manifest, route, site player or deployment
byte was changed by this maker task.

## New non-public witness evidence

| Artifact | SHA-256 |
|---|---|
| `emq-e02-v19-player-witness-v2.html` | `1102589a05ce69330482a618db5182995c03b8435284f0b1244987cc6b464dbe` |
| `witness-v2-core.mjs` | `a6dfb1aae36a77aa57703d232547b6423a7c5f1aec5d77876f17366fa5dc48c0` |
| `test-no-network-v2.mjs` | `0b3358588374dc3f2fce15f9e1884c8234bc08aff8f2de4787dc5f78c3013fbb` |
| `no-network-result.json` | `ddb40cd058e83041684beeab7cd2468536ae6313dcf8162d085cbc3b73a06f8d` |

The successor sets the native text track to `showing` before its first load
handling while the UI says **Captions on**. It uses `getCueAsHTML().textContent`
where available, with the shared safe fallback that strips VTT voice/tag markup
and retains spoken text. It also defines truthful loading/off/error labels,
keyboard play/pause and seek rules, explicit seek controls, mobile containment,
reduced-motion policy, caption/media recovery, and the final caption-complete
audio-tail state.

## Tests executed

```bash
node operations/product-stewards/episode-media-quality/evidence-2026-07-26/e02-v19-player-witness-v2-maker/test-no-network-v2.mjs
node operations/product-stewards/episode-media-quality/pilot/test-validator.mjs
```

Result: both pass. The dedicated no-network test reads the exact frozen VTT,
proves initial `showing`/request intent, no raw `<v …>` output, truthful state
labels, keyboard control transitions, failure and tail branches, mobile
containment contract and reduced-motion branch. It repeats the input hashes
before and after testing.

## Evidence boundary and next owner

The in-app Browser rejected the local `file://` witness under its URL policy.
Per task instruction, no localhost listener, network workaround or alternate
browser bypass was used. Therefore this is **not** an actual-browser/player
pass and makes no human audible-listen claim.

Episode Media Quality must next independently rejudge the successor using a
permitted actual-player surface and obtain a complete external human 1×,
unmuted audible listen of all 16:27.47. The maker has no acceptance, release,
deployment or public-integration authority.
