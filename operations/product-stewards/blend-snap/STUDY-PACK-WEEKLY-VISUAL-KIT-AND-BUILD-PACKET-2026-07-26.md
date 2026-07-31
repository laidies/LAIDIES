# Study Pack weekly visual kit and executable build packet

**Status:** SPECIFIED / BUILD QUEUED BEHIND BRAND AND PATH LOCKS  
**Coordinator:** Blend & Snap  
**Input contract:** `EPX-STUDY-PACK-SOURCE-v1`  
**Applies to:** released Episodes 01–04 and every Episode 05+ atomic release  
**Authority truth:** no final art, shared visual integration, deployment,
publication, spend, reward, identity or card ownership authority

## Outcome

Build one coherent weekly Study Pack in which a visitor can:

`return from Episode → read compact review → choose practice or reference →
remember via an admitted Card product → check understanding next door →
return to the Episode or café`

The components keep distinct jobs:

| Product | Job | Must not become |
|---|---|---|
| Study Sheet | Review the episode’s durable model and choose the next move | recap, worksheet, Cheat Sheet or Quiz |
| Try-On | Practise one real task or field trip | another explanation or assessment |
| Cheat Sheet | Keep/print the durable procedure or reference | embedded Try-On or long recap |
| Cards | Reinforce memory and collection | proof of mastery or local-only fake ownership |
| Quiz | Assess beside the Pack under High’s authority | a Study Pack component or café reward claim |

## Brand-locked visual kit

These are textless geometry and production slots, not a style selection.

### Shared anatomy

Every component receives:

1. episode eyebrow and title;
2. one plain-language job line;
3. current component status;
4. one episode image slot or an intentionally image-free state;
5. primary activity/reference body;
6. source/freshness/rights note where applicable;
7. explicit `Back to Episode` and `Back to Study Pack` handbacks;
8. adjacent `Take Quiz` link, visibly outside the Pack;
9. mobile, print and accessibility proof IDs;
10. exact packet, component and candidate version.

No status, title, route, reward or completion claim may be baked into an image.

### Placement geometry

| Surface | Desktop geometry | Mobile geometry | Print geometry | Textless image slot |
|---|---|---|---|---|
| Café menu | One current-special board; five component rows plus separate Quiz row | Single column; ORDER before secondary notices; all statuses visible without horizontal scroll | Not applicable | Optional 4:5 or 1:1 episode crop; never owns status |
| Receipt/pickup | Dialog or in-place ticket, maximum readable line length 70ch; one row per component | Full-width sheet with safe close target and no clipped status | Optional receipt proof only, not a learning artifact | None required |
| Study Sheet | Two-column review body: model/distinction, then examples/next move | One column in identical reading order | Two letter pages maximum: page 1 review, page 2 transfer/next move; also A4 reflow proof | 16:9 or 4:5 contextual slot; informative alt required |
| Try-On | Activity stage plus instructions/evidence/debrief | One action per viewport; persistent return after save/failure | Print only if the activity has an owner-approved offline job | Optional 16:9 header; must be episode-appropriate |
| Cheat Sheet | Responsive preview plus print/download action | Reference blocks in print order | One letter page target; A4 reflow proof; 0.25in minimum safe content area beyond printer margin | Optional small diagram/photo; text remains HTML |
| Cards | Pack/binder controlled by Trading Cards | One card at a time with non-motion alternative | Printable cards only under separate rights/economy decision | Exact locked card ratio after Brand ruling |
| Quiz handoff | High-owned receiver screen with episode label | Same assessment, no café chrome imposed | No Study Pack print | High owns its own visual |
| Episode return | Two explicit text links, origin preserved in URL/state | Fixed only if it does not cover content; otherwise end-of-task pair | Printed canonical URL/QR only after exact public route exists | None |

### Accessibility floor

- semantic headings and native actions;
- visible focus, logical return focus and a `44×44` CSS-pixel minimum target;
- 320px and 390px no-overflow proof; 200% zoom;
- informative image alt or deliberate empty alt for decoration;
- no essential text in images and no emoji as the only label;
- status announced in a persistent atomic polite region;
- reduced-motion and non-animation Card alternative;
- print reading order, contrast, page count, safe margins and exact-source
  checksum;
- human VoiceOver/Safari pass before admission.

## Atomic weekly receiver envelope

Blend & Snap consumes one whole checksum-bound producer packet. It never
assembles weekly truth from independent filenames.

Required input:

```json
{
  "contract": "EPX-STUDY-PACK-SOURCE-v1",
  "packetId": "episode-NN-study-pack-source-vN",
  "packetSha256": "<sha256>",
  "episode": {
    "number": "NN",
    "title": "<canonical>",
    "releaseDate": "YYYY-MM-DD",
    "canonPath": "<path>",
    "canonSha256": "<sha256>"
  },
  "coreLesson": "<approved>",
  "keyConcepts": [],
  "rememberThis": "<approved>",
  "applications": {},
  "tryOnBrief": "<approved>",
  "cheatSheetBrief": {},
  "cardCandidates": {
    "concept": [],
    "character": []
  },
  "quizLearningObjectives": [],
  "episodeImage": {
    "source": "<path-or-null>",
    "sha256": "<sha256-or-null>",
    "status": "<candidate-status>",
    "requestedCrops": [],
    "cropStatus": "<status>"
  },
  "returnLinks": {}
}
```

Blend & Snap returns, for the whole packet:

```json
{
  "packetId": "episode-NN-study-pack-source-vN",
  "packetSha256": "<received-sha256>",
  "receiverVersion": "blend-snap-study-pack-vN",
  "components": {
    "studySheet": "accept|hold|defer|not_applicable",
    "tryOn": "accept|hold|defer|not_applicable",
    "cheatSheet": "accept|hold|defer|not_applicable",
    "conceptCards": "accept|hold|defer|not_applicable",
    "characterCards": "accept|hold|defer|not_applicable",
    "quizHandoff": "accept|hold|defer|not_applicable",
    "episodeImage": "accept|hold|defer|not_applicable"
  },
  "reasons": {},
  "candidatePaths": {},
  "ownerReceipts": {},
  "independentVerdicts": {},
  "publicStatus": "unchanged"
}
```

Any producer checksum change invalidates the receiver record. A component
becomes `available` only after its own exact candidate, owner receipt,
independent verdict, manifest change and public proof all agree.

## Episodes 01–04 receiver disposition

For producer backfill SHA-256
`3ad7af03076594fb0535d0c2f0d69eb51846798c0b952f84ff4699054ff82c91`:

| Input component | E01 | E02 | E03 | E04 | Receiver reason |
|---|---|---|---|---|---|
| Canonical lesson/concepts/remember/applications | **accept as intake** | **accept as intake** | **accept as intake** | **accept as intake** | Content input is usable; final Study Sheet still needs learning/editorial acceptance. |
| Study Sheet production | **hold** | **hold** | **hold** | **hold** | No real artifact or route; visual work waits for Brand lock. |
| Try-On brief | **hold** | **accept as intake** | **accept as intake** | **accept as intake** | E01 current route performs E02’s job; all routes need receiver/return repair and exact owner acceptance. |
| Cheat Sheet brief | **accept as intake** | **accept as intake** | **accept as intake** | **accept as intake** | Existing reference routes are real; layout/job/accessibility repairs remain. |
| Concept-card candidates | **hold for Trading Cards** | **hold for Trading Cards** | **hold for Trading Cards** | **hold for Trading Cards** | Content candidates are not cards; visual, rights, pack and ownership gates remain. |
| Character-card candidates | **hold** | **hold** | **hold** | **hold** | Exact identity/likeness/IP rights are unresolved; no complete character deck. |
| Quiz objectives | **accept as intake** | **accept as intake** | **accept as intake** | **accept as intake** | High owns assessment; exact episode-bound route/result/handback remains to be accepted. |
| Episode image/crops | **hold** | **hold** | **hold** | **hold** | Sources are candidates only; requested crops are not made/admitted and Brand remains locked. |
| Return links | **hold for repair** | **hold for repair** | **hold for repair** | **hold for repair** | Producer links are truthful inputs, but current Try-On and Quiz consumers do not preserve the required handback. |

“Accept as intake” is not component admission and does not change
`content/blend-snap-weekly-packs.json`.

## Executable build sequence

| Stage | Owner | Writable scope after lock | Literal output | Exit test |
|---|---|---|---|---|
| 0. Brand ruling | Ali + Brand & Experience | Decision record only | KEEP/ADAPT/REJECT ruling for existing café, printable, Try-On, quiz-adjacency and Card inputs | Exact ruling references and allowed visual invariants |
| 1. Content/job reconciliation | Blend & Snap + Episode/Learning/Try-On/High | Dossiers and candidate content only | Four component content matrices; E01 Try-On corrected; Cheat Sheet practice overlap removed; sources/rights held explicitly | Product/learning and trust ≥17/20 |
| 2. Kit candidate | Study Pack maker | New isolated candidate path assigned by Control Room | Responsive café receipt, Study Sheet, Try-On, Cheat Sheet, Card handoff and Quiz-adjacency shells using the geometry above | Full `STUDY-PACK-CANDIDATE-ADMISSION-GATE.md` PASS; 1440/390/320 and letter/A4 captures; real component names; banned-language scan; cold-reader comprehension PASS; no shared/live edits |
| 3. Component production | Each affected owner | Exact owner paths under separate locks | Four Study Sheets; four normalized references; four Try-On states; card receiver packets; four exact Quiz handoffs | Owner acceptance per exact hash |
| 4. Integration candidate | Blend & Snap + Platform | Exact lock-bound routes/data only | Atomic menu/receipt/pickup and return loop driven from accepted receiver records | Manifest/index/component tests; all visitor and failure states |
| 5. Independent admission | Independent product/learning, trust, accessibility, technical and Brand judges | Read-only | Separate scored verdicts and exact defects | Every hard floor ≥17/20; no P0/P1; Ali Brand acceptance |
| 6. Release | Control Room/release owner | Exact approved artifact | Source/artifact/public parity, rollback and public-origin evidence | Only then `VERIFIED PUBLICLY` |

## Required proof matrix

For each episode, the maker packet must include:

- the completed
  `../learning-content-ecosystem/STUDY-PACK-CANDIDATE-ADMISSION-GATE.md`
  verdict; any failure is `REJECT — DO NOT SHOW ALI`;
- clean desktop at 1440px;
- mobile at 390px and 320px;
- Study Sheet HTML and exact letter/A4 render;
- Try-On start, saved/debrief, storage-denied and receiving return;
- Cheat Sheet responsive preview and exact print render;
- Card unavailable/held or exact Trading Cards owner receipt;
- Quiz receiver with exact episode identity and handback;
- café menu, ordered receipt and pickup;
- Episode → café → component → Episode/café return;
- keyboard/focus, 200%, reduced motion, VoiceOver/Safari;
- missing, stale, timeout, offline and producer-checksum disagreement;
- first-time, returning/no Card, device-local Card and verified-account states,
  with no product capability borrowed from identity.

## Current blockers and exact next triggers

1. **Ali decision:** choose the sitewide Brand direction, then rule
   KEEP/ADAPT/REJECT on the inventoried candidate inputs.
2. **Control Room:** assign isolated Study Pack candidate paths and affected
   owner locks for Stage 1/2. No live/shared route is needed for the first
   candidate.
3. **Learning/editorial:** accept or repair the four canonical content inputs,
   especially Episode 03 nuance and Episode 04 sources/rights.
4. **Try-On owner:** accept the E01 correction and the common origin-preserving
   return contract.
5. **High owner:** specify one episode-bound Quiz receiver/handback without
   moving assessment into the Study Pack.
6. **Trading Cards/Platform:** deliver separately accepted pack, issuance,
   collection, persistence and Closet evidence. No Card art is generated
   before the Brand ruling.

Episode 05 remains pre-Gate 1. No weekly Study Pack packet or visual production
starts until the atomic producer handoff exists.
