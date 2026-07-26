# Independent rejudge — LUMINAiRY Repair 2 trusted admission/static hold P0

**Reviewer:** independent judge; not the Repair 2 maker  
**Reviewed:** 2026-07-26  
**Candidate:** current exact source plus `repair-2-evidence-trusted-admission-static-hold-p0-2026-07-26.md`  
**Verdict:** **FAIL — 84/100. Repair 2 clears the earlier evidence-authority and static-hold P0s, but the exact-artifact accessibility/reliability evidence is not deterministic enough for acceptance.**  

This is a bounded local judgment only. It does not admit any production claim,
approve any portrait or audio right, authorize deployment, or make LUMINAiRY
ready for launch. The production receipts manifest is empty and all 46
production claim records remain held.

## Non-compensable scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 17/20 | Pass floor — the three-wing portrait journey is coherent and honest, but all substantive research remains held, so current visitor value is intentionally limited. |
| Accuracy, safety and trust | 30 | 18/20 | Pass floor — public candidates cannot self-authorize; independent signed authority, full envelope binding, static holds and truthful shared discovery are now present. |
| Positive LAiDIES contribution | 20 | 17/20 | Pass floor — the distinctive hall now withholds beautiful-but-unproved authority and tells visitors what remains under review. Full contribution still depends on claim-by-claim editorial admission. |
| UX/accessibility/reliability | 15 | 15/20 | Fail acceptance — no-JS, outage, mobile, reduced-motion, storage and most modal journeys pass, but focus wrapping failed intermittently in the fresh exact artifact. |
| Technical/artifact integrity | 5 | 12/20 | Fail acceptance — hashes and packaging are exact, but a claimed 52-check artifact suite alternated between PASS and focus failures without source-byte drift. |
| **Weighted total** | **100** |  | **84/100 — FAIL** |

The three heavily weighted LAiDIES floors now pass. The overall acceptance bar
does not: a keyboard-focus requirement and its exact-artifact proof cannot be
treated as complete when identical reruns disagree.

## Repair 2 disposition

| Required result | Independent finding |
|---|---|
| Empty production receipt manifest; all production claims held | **Pass.** `content/luminairy-editorial-receipts.json` contains `receipts: []`; the registry contains 46 held records covering 43 people plus three contextual claims. |
| Public P-256 trust only; private signer absent | **Pass.** The runtime pins public JWK `luminairy-editorial-offline-r2-20260726`. Scoped searches found no private key, PKCS#8 material or signing operation in the governed source, test, or exact artifact. |
| Self-rehashed unrelated evidence cannot admit | **Pass.** The hostile fixture recomputed candidate hashes and matching public receipt fields but retained the original independent signature. It failed closed with 46 held records and zero enabled profile openers. |
| One signed positive control admits only one exact atomic claim | **Pass, test-only.** The signed Hannah Fry fixture revealed only the past-tense Cambridge appointment sentence, enabled its exact native opener, rendered that same sentence and source in the modal, and left 45 unrelated records held. The official Cambridge announcement supports the bounded appointment statement; it does not support a broader biography. |
| Full identity/context/evidence envelope binding | **Pass.** Product, claim/person identity, wing, kind, status, scope, selector, exact text/hash, source/evidence, dates and correction owner are in the candidate binding and/or signed receipt match. Rehashed person, wing, claim-kind, status and scope mutations with the old signature all failed closed. |
| Missing/invalid/future/receipt-outage states fail closed | **Pass.** Missing registry, invalid registry, future/stale date cases and receipt-manifest outage expose no admitted profile and keep the modal closed. |
| No-JS/missing-gate/static HTML leaks no unsupported prose | **Pass.** Claim-bearing contexts carry native `hidden`; claim descendants are suppressed before gate load; all MAiVEN openers are natively disabled; the modal is natively hidden; `<noscript>` retains home and correction navigation. |
| Shared Welcome Tour is truthful | **Pass.** It describes three portrait wings and explicitly holds profile research and audio until exact claim, source and rights review clears. |
| Prior Foundress/storage/modal/mobile/reduced-motion fixes | **Partial.** Foundress holds, denial paths, 320px reflow, reduced motion, modal open/close/backdrop/Escape/focus return passed. Focus wrapping did not pass deterministically in the exact artifact. |

## Exact-artifact reliability blocker

Fresh artifact:

```text
/tmp/laidies-luminairy-repair2-independent.mmEx55/public
builder: 1,086 files / 961.51 MiB
find: 1,087 files
du: 1.1G
missing dependencies: 0
assets over 25 MiB: 0
existing advisory: total artifact exceeds 750 MiB
```

All eight governed source/artifact pairs were byte-identical:

- `luminairy.html`
- `content/luminairy-v2.css`
- `content/site/luminairy-v2.js`
- `content/luminairy-claims.json`
- `content/luminairy-editorial-receipts.json`
- `content/site/luminairy-claim-gate.js`
- `content/site/sv-welcome-tour.js`
- `content/site/sunnyvaile-directory.js`

The first source browser run passed all 52 checks. Three additional source
runs also passed. The same suite against the byte-identical exact artifact
produced:

```text
artifact run 1: FAIL — desktop modal traps and wraps focus
artifact run 2: PASS — 52/52
artifact run 3: PASS — 52/52
artifact run 4: FAIL — modal wraps backward focus; modal wraps forward focus
```

This is not evidence of source/artifact content drift. It is evidence that the
keyboard-focus acceptance proof is timing-sensitive or that the behavior
itself is intermittent under the packaged route. Either diagnosis requires a
bounded repair and a repeated deterministic artifact proof. Passing runs
cannot compensate for failing identical runs.

## Fresh commands and evidence

```text
node scripts/validate-luminairy-claims.mjs
PASS — 46 held records; 43 people; offline-signed exact authority

PLAYWRIGHT_CORE_PATH=... node scripts/test-luminairy-browser.cjs
source: PASS — 52 checks / 55 external requests blocked

LUMINAIRY_ROOT=/tmp/laidies-luminairy-repair2-independent.mmEx55/public \
  node scripts/validate-luminairy-claims.mjs
PASS

LUMINAIRY_ROOT=/tmp/laidies-luminairy-repair2-independent.mmEx55/public \
  PLAYWRIGHT_CORE_PATH=... node scripts/test-luminairy-browser.cjs
2 PASS / 2 FAIL across four independent runs

node scripts/validate-public-metadata.mjs <artifact>
PASS

node scripts/check-inline-js.js
PASS — 352 scripts / 132 pages

node scripts/check-local-links.js
PASS — 1,974 references / 110 pages

node scripts/check-town.js
PASS

node scripts/check-product-stewards.mjs
PASS — 65 products; active 2/3

scoped git diff --check
PASS
```

The Hannah Fry source was independently spot-checked against the University
of Cambridge announcement:
`https://www.cam.ac.uk/research/news/hannah-fry-joins-cambridge-as-professor-of-the-public-understanding-of-mathematics`.
The page supports only the bounded appointment claim used by the synthetic
fixture, not the legacy title, book framing, fight, quotation or full profile.

## Smallest repair required

1. Make the modal focus-wrap path deterministic, or make the test wait for the
   precise focus-settled state it is intended to measure without weakening the
   assertion.
2. Run the source suite and at least five consecutive fresh exact-artifact
   repetitions with zero focus failures.
3. Preserve the now-correct independent-signature, full-envelope and static
   fail-closed implementation unchanged.

## Preserved holds

- all 46 production claim records and all production receipts;
- claim-by-claim research/editorial review and independent signed receipts;
- quotation, portrait, source and audio rights review;
- Ali's visual/taste approval and research-owner approval;
- manual VoiceOver/screen-reader, Safari, native zoom and physical-device
  evidence;
- KSVL playback, failure, accessible-control and rights evidence;
- Town Hall correction intake beyond honest preflight;
- privacy-safe analytics and representative newcomer comprehension;
- public-origin and release-provenance verification; and
- the 961.51 MiB artifact-size advisory.

No implementation, product state, backlog, central ledger, Git, deployment,
external service, correction route, credential, audio or public surface was
changed by this rejudge.

