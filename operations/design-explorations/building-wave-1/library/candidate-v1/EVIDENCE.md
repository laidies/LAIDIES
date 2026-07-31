# LIBRAiRY candidate v1 — maker evidence

**Status:** `VERIFIED LOCALLY — candidate successor; independent reacceptance pending`

## Literal candidate

- Runnable entry: `index.html` (serve this folder locally).
- Candidate-only folder: `operations/design-explorations/building-wave-1/library/candidate-v1/`.
- Production `library.html`, shared styles, shared Puffy code, Closet authority, catalogue admission, deployment and public routes: untouched.

## Journey demonstrated

1. Room arrival and live explanation of the shelf/desk/Puffy job.
2. Three object-like shelves; availability lives in HTML, not the art.
3. A clearly labelled review-fixture available book can open a calm read state; all other titles are `hold`/`preview` and cannot open.
4. Miss Jeeves supplies a bounded orientation response or an explicit unavailable/retry alternative.
5. Puffy stores/reopens/removes only `Vocab 101 · section 2` from the browser's local storage and says it is local.
6. `noscript` preserves the truthful catalogue boundary; Escape and the Return control restore the opener.

## Validation run

- `node --check library-candidate.js` — PASS.
- `node test-candidate.mjs` — PASS (static truth/accessibility/state/responsive/asset contract).
- `git diff --check` for this candidate folder — PASS.
- Root-server asset fetches — PASS: candidate HTML, Library room, Miss Jeeves desk and bright-family Vocab cover each return `200` when served from the Website-homepage root.

## Responsive/tab successor

The first independent review returned HOLD because the shelf flex row contributed its full minimum content width to the one-column mobile grid and because the semantic tabs had click activation only. The successor:

- constrains grid children with `minmax(0,…)`, `min-width:0` and an internal shelf rail;
- keeps all page sections and mobile controls within their real width rather than hiding overflow; and
- implements roving `tabIndex`, ArrowLeft/ArrowRight wrap, Home/End, visible focus and synchronized selected/panel state.

Local Chrome 150 successor result: `documentScrollWidth === bodyScrollWidth === innerWidth` at 1440, 390 and 320; broken images zero. Functional browser PASS covers the complete keyboard tab sequence, held non-opening, Puffy save/resume/remove, Miss Jeeves answer/unavailable, storage-denied no-false-success and 320 no-JS truthful fallback. Exact JSON and full-page renders are under `evidence/`.

## Next acceptance

Independent product/learning, Brand/image, accessibility and Functionality/Platform rejudge against `SUCCESSOR-MANIFEST.json`. A PASS would only admit the candidate for a later clean integration comparison; it cannot publish a book, claim account sync, or alter a public route.
