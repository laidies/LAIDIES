# Claude Code Opus 5 Homepage Miss Jeeves successor review

Model ID: claude-opus-5  
Agent ID: claude-code-opus-5-homepage-jeeves-successor-20260805  
Candidate SHA-256: `7504d370e274ddc74fabec91db5e9f25f9c34fc0cb0a8bab6bd2e7b583657fbb` (`index.html`; asset unchanged at `69edb1f3cacff5ee6d2bfa59bab5bd7f57c27c40267d4adbc5d1ec45818a3943`)  
Recommendation: **ADMIT**

## Findings

**Exact tuple.** All eight SHA-256 values recomputed on disk and match the stated tuple byte-for-byte, including both evidence documents and the continuity reference `_miss-jeeves-approved-reference.png` (`1250e3a1…`) cited by the predecessor ruling.

**The prior HOLD is repaired, and I confirmed it independently rather than by reading the diff.** Rendered at 390px against a local static origin, all three blank paths — submit-button click on an empty field, submit-button click on `"   \t  "`, and Enter on an empty field — leave the URL at `/index.html#reference` and return focus to `#lookup`. No navigation to bare `/library.html` in any case. Repository search across `homepage.js`, `puffy-bookmarks.js` and `index.html` finds exactly one `submit` listener (`content/site/homepage.js:101`); the duplicate inline listener is gone, and `index.html` contains no reference to `#lookup` outside the markup at line 661.

**One production consumer.** `index.html:660` is the only production reference to `jeeves-scene.webp`. Every other hit is archived capture evidence under `operations/design-explorations/`. Rendered DOM confirms `imgCount: 1` at 1440, 390 and 320. `library.html` uses the asset zero times as `<img>` and zero times as a computed `background-image` — the “no route expansion” boundary from the predecessor ruling holds.

**Image and crop.** Native 933×1400, no alpha, 307,412 bytes. Computed `object-fit: cover` / `object-position: 50% 0%` (top-centred) at all three widths. Rendered 518×750 (1440), 350×520 (390), 280×420 (320) — the crop is a few percent off the bottom only; face, glasses-chain, brooch and the `MISS JEEVES` nameplate stay fully in frame down to 320. Viewing the byte against the approved continuity reference, identity is the same character: same age and features, salt-and-pepper wave, glasses on a chain, plum cable cardigan over cream blouse, open-book gold brooch, ring and watch, hands folded, card catalogue and CRT. The Homepage byte is the warm daylit painterly rendering of that identity, not a different librarian.

**Form.** Visible `<label for="lookup">What are you trying to understand?</label>` renders with non-zero box at all three widths; `#homepage-jeeves-form` present; `maxlength="240"` enforced (a 300-character fill truncates to 240). No horizontal overflow at 320 and no page errors at any viewport.

**Fragment transport.** A deliberately hostile question containing quotes, `#`, `&`, `=`, `%` and `+` round-trips into `#jv-q` exactly. The landed URL is `/library.html#miss-jeeves` with the raw question stripped, and Back returns cleanly to `/index.html#reference`. The three Popular links use the same fragment contract. The page also lands scrolled to the section, so the answer is not below the fold.

**Receiver states.** All four exercised live: loading, direct answer, zero-result, and error with the index fetch aborted plus a retry control. No page errors in any state.

**Tests.** `node scripts/test-library-product.cjs` → `LIBRAiRY PRODUCT PASS`, `checks=103`, `external_requests_blocked=67`, matching the maker receipt. The blank and whitespace cases genuinely assert both unchanged URL and focus. This was treated as integrity only; the findings above come from independent instrumentation.

**Registry.** No active-work row widens this asset's scope. The Library-building rows describe a separate masthead visual, and the zero-usage measurement in `library.html` confirms it is a different asset. The row remains narrow.

## Blocking defects

None.

## Non-blocking watch items

- `operations/ACTIVE-WORK.md:44` cites a stale Library SHA while a later line cites the current byte. This is registry hygiene, not this artifact.
- If `homepage.js` fails to load, the form degrades to a same-page reload rather than the handoff. Nothing before the listener can throw on the current DOM and no page errors were observed, but a conventional HTML fallback is worth considering later.
- At 1440 the image column is taller than the copy column, leaving an empty gradient band at lower right. Whole-Homepage layout aesthetics are outside this bounded image-job question.

## Scope limits

Read-only. This judges only whether the already-admitted Miss Jeeves byte retains its one accepted Homepage reference-desk handoff job on the exact successor Homepage. It is not a whole-Homepage visual admission, a Library route-art or Library-building admission, a general character-library or sitewide rendering-language ruling, deployment, publication or public-origin verification. The dispatcher remained paused and untouched.
