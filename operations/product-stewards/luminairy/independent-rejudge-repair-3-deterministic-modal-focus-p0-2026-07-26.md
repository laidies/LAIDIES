# Independent rejudge — LUMINAiRY Repair 3 deterministic modal focus P0

**Reviewer:** independent judge; author of the Repair 2 `FAIL — 84/100`,
not the Repair 3 maker  
**Reviewed:** 2026-07-26  
**Candidate:** current exact source plus
`repair-3-evidence-deterministic-modal-focus-p0-2026-07-26.md`  
**Verdict:** **PASS — 90/100. Repair 3 clears the remaining deterministic
modal-focus acceptance blocker without regressing the Repair 2 trust or static
hold contracts.**

This is bounded local acceptance of the Repair 3 candidate. It is not
production editorial admission, visual or rights approval, deployment
authority, public verification, or a finding that the full LUMINAiRY is ready
for launch. The production receipt manifest remains empty and all 46
production claim records remain held.

## Non-compensable scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 17/20 | Pass floor — the three-wing portrait experience is coherent and its hold states work, but substantive profiles remain intentionally unavailable pending real editorial admission. |
| Accuracy, safety and trust | 30 | 19/20 | Pass floor — independent signed admission, full identity/content/evidence binding, static fail-closed behavior and truthful shared discovery remain intact. |
| Positive LAiDIES contribution | 20 | 18/20 | Pass floor — the product now refuses to let attractive presentation impersonate evidence and explains the research/audio hold clearly. |
| UX/accessibility/reliability | 15 | 18/20 | Pass — initial focus, two-way wrap and exact-opener return are deterministic in repeated desktop and 320px rendered journeys. Manual assistive-technology and physical-device evidence remains held. |
| Technical/artifact integrity | 5 | 18/20 | Pass — one fresh exact artifact produced five consecutive fail-fast 54-check passes with byte-identical governed files and no missing dependencies. |
| **Weighted total** | **100** |  | **90/100 — PASS** |

Product quality, accuracy/trust and positive LAiDIES contribution each meet
their non-compensable 17/20 floor.

## Repair 3 disposition

| Required result | Independent finding |
|---|---|
| Remove the deferred focus race | **Pass.** The redundant animation-frame Close refocus is absent. No other modal code schedules a competing deferred focus. |
| Expose a real settled state | **Pass.** The modal begins at `closed`, moves through `opening`, becomes `ready` only when the native Close button is the actual active element, reports `failed` otherwise, and returns to `closed` on close. |
| Initial focus on Close | **Pass.** Separately asserted at 320px and desktop after the explicit ready state. |
| Backward wrap Close → Source | **Pass.** Shift+Tab lands on the exact final source link at 320px and desktop. |
| Forward wrap Source → Close | **Pass.** Tab returns to the exact native Close button at 320px and desktop. |
| Exact-opener return | **Pass.** Escape, backdrop and native Close return focus to the exact 320px opener; Escape and native Close do so on desktop. |
| Five consecutive fresh-artifact runs | **Pass.** Runs 1–5 each completed 54/54 with 55 external requests blocked. The loop was fail-fast; no failure was retried or discarded. |

## Repair 2 trust/static regression checks

- **46/46 production records remain `held`; 43 person records and three
  contextual records remain covered.**
- **Production receipts remain empty.**
- The pinned public P-256 key
  `luminairy-editorial-offline-r2-20260726` remains in the verifier; scoped
  inspection found no private signer, PKCS#8 material or signing operation.
- The fully rehashed unrelated-evidence fixture still fails closed.
- Recomputed person, wing, claim-kind, status and scope mutations retaining
  the old independent signature still fail closed.
- The signed test-only Hannah Fry control still admits exactly one bounded
  atomic claim and leaves the other 45 records held.
- Disabled JavaScript, missing gate, invalid/missing registry and receipt
  outage still publish no held biography, quotation or contextual prose,
  enable no profile opener, and keep the modal closed.
- Native `<noscript>` home and correction navigation remains present.
- Shared Welcome Tour copy still says profile research and audio remain held
  until exact claim, source and rights review clears; unsupported current-role
  and per-portrait-song promises have not returned.
- Foundress holds, storage-denial truth, 320px reflow, reduced motion, modal
  contents and source-link confinement remain covered by the same complete
  suite.

## Independent source and artifact evidence

Representative source run:

```text
LUMINAiRY BROWSER PASS
checks=54
external_requests_blocked=55
```

Source validator and independent static contract:

```text
LUMINAiRY claim registry PASS
46 held records · 43 people · offline-signed exact authority

INDEPENDENT STATIC CONTRACT PASS
46 held · 0 receipts · focus-ready contract · trust/shared-copy retained
```

Fresh exact artifact:

```text
/tmp/laidies-luminairy-repair3-independent.cy8Lt9/public
builder: 1,086 files / 961.51 MiB
find: 1,087 files
du: 1.1G
missing dependencies: 0
assets over 25 MiB: 0
existing advisory: total artifact exceeds 750 MiB
```

Five consecutive exact-artifact runs:

```text
ARTIFACT RUN 1: PASS · 54/54
ARTIFACT RUN 2: PASS · 54/54
ARTIFACT RUN 3: PASS · 54/54
ARTIFACT RUN 4: PASS · 54/54
ARTIFACT RUN 5: PASS · 54/54
focus failures: 0
retries: 0
```

The artifact claim validator and public metadata validator passed. All eight
governed source/artifact pairs were byte-identical:

| Governed public file | SHA-256 |
|---|---|
| `luminairy.html` | `034ed9fd78bc908f1e825372c063c013fba6cff1b733b6f2689b42fbfbd0e864` |
| `content/luminairy-v2.css` | `b65c5b0835e065bdadc65c7b71a276abc85fd45095aa76681c46e173e5781350` |
| `content/site/luminairy-v2.js` | `4e5caff65ff413b61d46cc017a54820d4dcaac1dec80f8e8772185d9663d92cb` |
| `content/luminairy-claims.json` | `dcffc5815ebd310a2f554eeed170b939268fbc5b66e8021a11de8a838664e589` |
| `content/luminairy-editorial-receipts.json` | `e4560e3e943992cde6d215baf727fe18af8cbc9494e5396b4f80ea4b35b51e61` |
| `content/site/luminairy-claim-gate.js` | `4f8f80d91c22273062c8434a3c2248d205d08a5be11bcf1c0c4bc7b3209e06f5` |
| `content/site/sv-welcome-tour.js` | `63af2d875382edcb77f56f61c963459e0e44cf5ee0084dea69c926082458b71c` |
| `content/site/sunnyvaile-directory.js` | `d7c57a6492c242b3e457ce4a487628db6d487fdec1773adf62f88d3fa14e76f8` |

Additional local checks:

```text
inline JavaScript: PASS — 352 scripts / 132 pages
local links: PASS — 1,974 references / 110 pages
Town consistency: PASS
product steward system: PASS — 65 products
public metadata: PASS
scoped diff check: PASS
```

## Preserved holds

- all 46 production claims and the empty production receipt manifest;
- atomic research/editorial review and independent signed receipt for every
  biography, quotation, interpretation, historical-priority and current-role
  claim;
- quotation, portrait, source and audio rights review;
- Ali's visual/taste approval and research-owner approval;
- manual VoiceOver/screen-reader, Safari, native zoom and physical-device
  evidence;
- KSVL playback, failure, accessible-control and rights evidence;
- Town Hall correction intake beyond honest preflight;
- privacy-safe discovery/source-route analytics and representative newcomer
  comprehension;
- public-origin hash/back/correction/status verification and exact release
  provenance; and
- the 961.51 MiB artifact-size advisory.

No implementation, state, backlog, central operating record, painpoints
ledger, Git history, deployment, external service, correction route,
credential, audio or public surface was changed by this rejudge.

