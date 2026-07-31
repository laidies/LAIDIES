# EMQ E02 v19 successor v2 no-listener replacement evidence

**Status:** **HOLD**  
**Scope:** non-public, no-listener, no-network replacement runner  
**Frozen successor:** `emq-e02-v19-player-witness-v2.html`  
**Source verdict:** no defect was found by the deterministic source/logic test; this does not establish browser or media acceptance.

## Outcome

The exact v2 successor, MP4, and VTT remained unchanged. The exact successor
inline script was executed in a no-network Node VM with deterministic
media/text-track state, and all 194 cues from the exact VTT bytes were parsed.
That bounded technical run passed the caption-state, parser, control, failure,
reduced-motion-branch, and tail-calculation assertions listed below.

The evidence remains **HOLD** because the in-app Browser blocked both the
`file://` surface and a test-only `data:` harness. Therefore no real browser
media/VTT load, render, responsive layout, focus appearance, or interaction was
witnessed. No person heard the complete episode at `1×`, unmuted.

## Frozen tuple

| Artifact | SHA-256 | Result |
|---|---|---|
| `operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2.html` | `05430de37a9aef0b07e112e14ba75f3f1ac62a22a9d3bbbc03198b28b3f2e5d6` | exact match before and after |
| `assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4` | `e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3` | exact match before and after |
| `assets/captions/episode-02.vtt` | `7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f` | exact match before and after |

No site, player, public, media, caption, or source artifact was mutated.

## Literal executed browser actions and outputs

1. In the Codex in-app Browser:

   `await tab.goto(witnessFileUrl)`

   Output: `BLOCKED_BY_BROWSER_URL_POLICY`; resulting URL `about:blank`.

2. Test-only fallback prepared from the exact v2 HTML and exact VTT text with
   deterministic media/text-track stubs:

   `await tab.goto(normalHarnessUrl)`

   Output: `BLOCKED_BY_BROWSER_URL_POLICY`; resulting URL `about:blank`.

The second block prevented blank-page DOM injection from being witnessed in
the in-app Browser. The run stopped there: no alternate browser, loopback
listener, server, approval, escalation, or policy workaround was used.
Machine-readable detail is in `browser-attempts.json`.

## Literal executed shell commands and material outputs

Baseline full steward validation:

```text
node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
products=67
active=1 (COLLISION_AWARE_BY_SCOPE_AND_INTEGRATION_LOCK)
events=7
guild_roles=30
deep_dive_states={"REPORT_READY":35,"QUEUED":28,"RUNNING_WITH_PARENT":4}
owner_entry_ready=41/67
owner_entry_gaps={"missing_dossier":26,"missing_state":6}
```

Exact tuple check:

```text
sha256sum operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2.html assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4 assets/captions/episode-02.vtt
05430de37a9aef0b07e112e14ba75f3f1ac62a22a9d3bbbc03198b28b3f2e5d6  operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2.html
e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3  assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4
7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f  assets/captions/episode-02.vtt
```

No-network runner:

```text
node --check operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2-no-listener-test/test-player-witness-v2-no-network.mjs
node operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2-no-listener-test/test-player-witness-v2-no-network.mjs
```

Material output:

```text
status=PASS — deterministic no-network technical evidence; not a real media/VTT load and not a human listen
exact_inline_script_executed_in_vm=true
exact_vtt_bytes_parsed=true
cue_count=194
```

Targeted steward validation:

```text
node scripts/check-product-stewards.mjs --owner-entry episode-media-quality
PRODUCT STEWARD SYSTEM PASS
owner_entry_product=episode-media-quality:PASS
```

Post-run full steward validation:

```text
node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS
products=67
active=1 (COLLISION_AWARE_BY_SCOPE_AND_INTEGRATION_LOCK)
events=7
guild_roles=30
deep_dive_states={"REPORT_READY":35,"QUEUED":28,"RUNNING_WITH_PARENT":4}
owner_entry_ready=41/67
owner_entry_gaps={"missing_dossier":26,"missing_state":6}
```

## Gate matrix

| Gate | Evidence | Ruling |
|---|---|---|
| First-render `Captions on` / track `showing` | Exact v2 script ran against a deterministic text-track stub; `track.mode` became `showing` before load. | **PASS — deterministic logic only** |
| Loading/on/off/error truth | Exact handlers produced `Captions loading…`, `Captions on`, `Captions are off.`, and the explicit caption failure message. | **PASS — deterministic logic only** |
| Exact VTT request/load contract | Exact source constant and assignment were `/assets/captions/episode-02.vtt`; exact VTT hash and all 194 cues were consumed. No browser request occurred. | **PASS source contract / UNPROVED real request** |
| No rendered `<v ...>` markup | First exact cue raw text contained `<v The Announcer>`; exact `getCueAsHTML().textContent` branch rendered readable dialogue with no voice tag. All parsed cue readable forms were tag-free. | **PASS — deterministic logic only** |
| Readable speaker text | Announcer and Heroine voice labels were parsed; first rendered dialogue began `Previously, on LAiDIES…`. | **PASS — deterministic logic only** |
| Keyboard play/pause and seek | Exact keydown handlers changed stub pause state and moved `100 → 105 → 100`; End moved to `987.466667`. | **PASS — deterministic logic only** |
| Visible focus/control semantics | Source has labelled control region, labelled range, `aria-pressed`, `aria-live`, 44px minimum targets, and a 3px `:focus-visible` outline. | **PASS source contract / UNWITNESSED visual and AT behavior** |
| Mobile containment | Source uses bounded main width, 100% video, wrapped controls, and a shrinkable range. | **PASS source contract / UNWITNESSED 320px geometry** |
| Reduced motion | Source media query disables animation, transition, and smooth scrolling; stubbed `matchMedia` exercised the `reducedMotion=true` status branch. | **PASS source + stub branch / UNWITNESSED computed browser style** |
| Caption failure recovery | Exact error handler kept playback available and reported the caption failure. | **PASS — deterministic logic only** |
| Media failure recovery | Exact error handler revealed Retry; Retry restored the exact MP4 source, called `load()`, and returned state to loading. | **PASS — deterministic logic only** |
| Final tail | Exact VTT last cue ends `986.670`; exact-source threshold is `986.67`; frozen-media duration stub `987.466667`; calculated gap `0.796667 s`; rail reported caption-complete/audio-continues at `987.000`. | **PASS calculation / UNWITNESSED real tail** |
| Complete human audible listen | Not performed. | **AUTOMATIC HOLD** |

Detailed assertions and structured output are in
`test-player-witness-v2-no-network.mjs` and
`node-no-network-result.json`.

## What remains unproved

- A real first-render browser text track is `showing` while the button says
  `Captions on`.
- The real browser makes and loads exactly one intended VTT request without a
  user toggle.
- Native WebVTT parsing and the visible rail stay tag-free throughout playback.
- Real media play/pause/seek behavior, decode, sound, and timing.
- 320px mobile containment and target geometry in the rendered browser.
- Visible keyboard focus and assistive-technology interpretation.
- A real reduced-motion computed-style branch.
- Real caption failure and media failure/retry behavior.
- The final `0.796667 s` tail in the frozen MP4.
- A complete external human audible listen of `16:27.47` at `1×`, unmuted,
  including picture/caption/narration continuity.
- Independent Episode Media Quality acceptance.

## Exact next rejudge

Return the unchanged three hashes above to an independent Episode Media
Quality judge in an allowed browser environment that can load the exact v2
surface and frozen assets. The rejudge must:

1. record the initial button label, `aria-pressed`, text-track mode, exact VTT
   request URL, load event, and first readable cue before any caption toggle;
2. exercise real keyboard play/pause, left/right/Home/End seek, caption
   on/off, caption failure, media failure/retry, 320px containment, visible
   focus, reduced motion, and the final tail;
3. confirm that no visible rail text contains WebVTT markup;
4. have an external human hear all `16:27.47` at `1×`, unmuted, and record
   identity/role, timestamp, and literal observations; and
5. bind all evidence to the unchanged v2/MP4/VTT hashes before EMQ rules
   PASS or HOLD.

## Authority truth

- This replacement runner supplies bounded technical evidence only.
- The v2 successor was not repaired or altered.
- Episode Media Quality, independent of the maker, owns acceptance.
- Control Room and the Weekly Episodes Director retain integration and release
  sequencing.
- Ali retains final visual/creative approval for promoted media.
- No integration, site/player mutation, deployment, publication, public-media
  change, or acceptance is authorized or implied.

## Learning scan

Qualifying reusable constraint: a no-listener replacement can prove pure
caption/control logic while still being unable to prove browser media truth;
URL-policy blocks must be reported as an evidence boundary, not routed around.
The prevention rule is to separate source/VM assertions from browser-network,
render, accessibility, and human-listen gates in the verdict.

The brief allowed writes only in this new evidence folder, so the canonical
`operations/painpoints-log.md` was not edited. The active integration owner
should reconcile this rule into the ledger if it is not already covered.
