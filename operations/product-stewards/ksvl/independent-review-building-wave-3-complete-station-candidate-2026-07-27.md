# Independent review — KSVL Wave 3 complete-station candidate

**Review time:** 2026-07-27 America/Vancouver  
**Verdict:** `ACCEPT — ISOLATED CANDIDATE ONLY`  
**Acceptance boundary:** the candidate may proceed to the separately locked
product/Brand, shared-player, native-accessibility and release/public gates. It
does not authorise a production-route replacement, shared-player integration,
provider connection, Closet write, account feature, reward, deployment or public
claim.

## Frozen tuple independently recomputed

| Input | SHA-256 | Result |
| --- | --- | --- |
| Candidate HTML | `890820b3bf531376812ec405595337d449421034a80a426e3d022a31883dbd40` | exact |
| Candidate CSS | `5760d34ddf1a417514d1fd6b23ada2ccc400c41d821ee838200d7ffbdbe8f208` | exact |
| Candidate controller | `87a87b1652990031ce8cd35f73177fc4448e526c5ea06ac2034fda91f4b268ea` | exact |
| Candidate deterministic test | `cfa9e00f398c25a0083343695e3066357d010f633d86df49dc1068ce551a334f` | exact |
| Governed 29-track registry | `68c128827d87971879cb6d67b48b2b5bb139a7e588e63c236e586957e6fa5a65` | exact |

I reran both bounded mechanical checks:

```text
KSVL WAVE 3 CANDIDATE PASS tracks=29 mixes=6 bands=10 stickers=18 local-return=paused request=draft-only provider=held responsive=320,390,1440
KSVL CATALOGUE CONTRACT PASS tracks=29 playable=29
```

## Independent browser exercise

I served the isolated candidate from a read-only local origin with byte-range
MP3 responses and exercised it in Chromium at 1440, 390 and 320 widths. The
candidate loads six mix cards, ten band cards and 18 sticker cards with no
horizontal overflow or broken loaded images at each viewport. The mobile station
is a genuine counter/booth experience, rather than a blank shell.

### Playback and registry parity — PASS

- Explicit hero action started the governed Town Anthem source, advanced time,
  was unmuted and had media readiness before the result was recorded.
- Every one of the 29 individual **All Songs** controls was activated against
  its registry-derived source; the candidate did not introduce an ungoverned
  track.
- The six programme shelves and ten band shelves render from the admitted
  catalogue. Episode 04 selection exposes its exact owning Issue 04 handback.
- Previous/next/stop, seek, volume, mute and keyboard activation of the native
  controls operate within the candidate. Playback remains explicit-action.

### Local state and recoverability — PASS

- Paused Episode 04 state restored with its registry identity and position and
  remained paused after reload; it did not autoplay.
- Three declaration stickers save locally, persist across reload and can be
  cleared. A fourth selection is truthfully limited; the five achievement
  stickers stay held.
- Invalid request submission focuses the first invalid field. A valid request
  saves as a device-only draft, survives reload, and deletes cleanly. It is not
  described as delivered or reviewed.
- Simulated media failure exposes retry and preserves the error state; a later
  pause cannot overwrite it. Malformed catalogue fails closed rather than
  admitting a partial shelf. Stale, corrupt and storage-denied fixtures fall
  back safely without autoplay or an invented saved result.

### Accessible/responsive boundaries — PASS for this candidate

- 1440/390/320 containment passed. At 390 and 320 the visible controls remain
  usable rather than clipped.
- Reduced-motion rendering suppresses decorative motion.
- Skip-link activation lands focus on `main#station`.
- With script disabled, JavaScript-only controls and request inputs are not
  left enabled; the station tickets and site handbacks remain usable.

## Authority and truth check — PASS

The candidate correctly holds, rather than simulates:

- authenticated request delivery, provider connection and external playlists;
- Closet propagation, cross-device collection, account history and rewards;
- shared player/DJ Booth integration;
- production route, deployment and public-origin verification.

The copy distinguishes listening from learning completion, membership and
reward. No account, provider, public-release or shared-system claim was found
in the isolated candidate.

## Remaining gates

1. Product/Brand judgment of the visual treatment and complete KSVL promise.
2. Shared-player and DJ Booth reconciliation under their own collision lock.
3. Transcript/caption/lyrics and the missing-source-route accessibility/content
   debt in the canonical registry.
4. Native Safari/VoiceOver/true-zoom and representative human audio-quality
   checks.
5. Request provider/moderation/privacy/retention lifecycle, any Closet contract,
   analytics privacy review, release artifact and public-origin verification.

## Learning scan

**NO MATERIAL OPPORTUNITY** within this narrow candidate review. The reusable
prevention rule remains: local playback, local sticker choice and a saved
request draft must each name their storage and authority boundary in the UI;
they must never be promoted as account, Closet, provider, learning or reward
state without separately proved producer and consumer contracts.

