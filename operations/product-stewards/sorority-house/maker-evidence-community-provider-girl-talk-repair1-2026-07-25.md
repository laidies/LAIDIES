# Delta LAi Nu — Community Provider + Girl Talk Repair 1 maker evidence

**Date:** 2026-07-25  
**Trigger:** independent P0 rejection in `independent-review-community-provider-girl-talk-p0-2026-07-25.md`  
**Maker status:** VERIFIED LOCALLY — INDEPENDENT REJUDGE REQUIRED  
**Public status:** NOT DEPLOYED OR PUBLICLY VERIFIED  
**External actions:** none; no provider contact, sign-in, post, report, moderation, credential, Git, deploy or publication action

## Outcome

All five independently identified P0 defects are repaired in source and in a fresh exact artifact:

1. all eleven destinations write their exact hash before either the embedded or handoff branch renders, and Back/Forward restores all eleven;
2. Girl Talk accepts only an exact, bounded, coherent v1 local envelope using canonical card IDs and derived sticker names;
3. the keyboard draw/action/result/draw-again loop always moves focus to the newly presented card or next actionable control;
4. all 53 cards were linted, and every card previously directing email/post/share/FAiRY behaviour now has a useful private, synthetic or sanitized rehearsal route;
5. the house and all seven provider rooms expose distinct LAiDIES privacy plus official Hyvor Talk privacy, terms and moderation/reporting routes.

The Sorority House sitemap entry was added. The shared provider remains fail-closed and made zero Hyvor attempts throughout all synthetic/local verification.

## Exact changes

### Navigation truth

- `content/site/sorority-house-v2.js`
  - moved `history.pushState()` ahead of the `embed: false` return;
  - every room selection now gives the displayed destination, copyable URL and browser history one source of truth.

### Strict Girl Talk v1 state

- `games/girl-talk.html`
  - exact keys: `version`, `stickers`, `dares`, `penalties`;
  - exact version and array types;
  - only canonical 53 card IDs, 28 dare IDs and eight penalty IDs;
  - sticker/dare arrays bounded and unique; penalty history bounded at 100 with intentional duplicate penalties preserved;
  - every dare marker must have its corresponding sticker and every dare sticker must have its dare marker;
  - canonical catalogue ordering on read and write;
  - read-back byte verification plus second validation on write;
  - unknown, extra, forged, duplicate, incoherent or over-bound records are removed, never counted/rendered, and produce visible recovery copy;
  - sticker display names are derived from the catalogue, not trusted from storage.

### Keyboard continuity

- A draw moves focus to the new card prompt.
- Truth/dare actions announce the result through the atomic live region and focus the newly rendered **Draw again** control.
- The complete draw → first action → result → draw-again sequence was exercised with only keyboard commands.
- Focused card/result/control states remain visibly outlined.

### Card-level privacy and usefulness

- Rewrote the 25 truth follow-ups and 28 dares.
- Removed card-level FAiRY links and all directives to upload/process real email, post proof, post/share an artifact or drop private material into another tool.
- AI rehearsal uses fictional, invented or sanitized inputs.
- Each dare has a complete private route. Its room handoff says it is optional, permits only a sanitized pattern and tells the visitor to keep the full situation private.
- Source lint covers all 78 catalogue text/tip strings; rendered fixtures cover the independently identified former high-risk cards.

### Provider boundary

- `content/site/community-room.js` and `content/community-room-v2.css`
  - distinguish LAiDIES site privacy from Hyvor provider/account/comment data;
  - expose visible, keyboard-focusable official routes:
    - `https://talk.hyvor.com/privacy`
    - `https://talk.hyvor.com/terms`
    - `https://talk.hyvor.com/docs/moderation`
  - describe in-frame flag/report controls without promising review, response, deletion, retention or outcome.
- The one shared controller supplies this boundary to the house embed and all seven direct rooms.

### Discovery

- `sitemap.xml`
  - added `https://laidies.ai/sorority-house`.

## Official provider research

Accessed 2026-07-25:

- Hyvor Talk Privacy Policy: `https://talk.hyvor.com/privacy`
- Hyvor Talk Terms of Service: `https://talk.hyvor.com/terms`
- Hyvor Talk Moderation documentation: `https://talk.hyvor.com/docs/moderation`

The links are usability routes, not evidence of LAiDIES moderation operations or legal approval. No retention/deletion timing or guaranteed reporting outcome was inferred.

## Source verification

- Sorority contract: **PASS — 62 checks / seven rooms**
- Browser suite: **PASS — 138 checks**
- External provider attempts: **0**
- Inline JavaScript: **PASS — 352 scripts / 132 pages**
- Town contract: **PASS**
- Local links: **PASS — 1,975 references / 110 pages**
- Product steward system: **PASS**
- Scoped diff check: **PASS**

The browser suite covers:

- exact hash selection for all eleven destinations;
- Back and Forward restoration for all eleven;
- provider states and official links on the house plus seven rooms;
- local-card/non-identity truth;
- local preview, unsupported host, unavailable, signed-out and held states;
- five adversarial local-state classes plus canonical valid-state read/write;
- keyboard draw/action/result/draw-again;
- storage denial;
- all former high-risk card directives;
- Weekly Bag return, 320px, reflow, reduced motion and provider-state contrast;
- zero provider attempts.

## Fresh exact artifact

- Path: `/tmp/laidies-sorority-repair1.U25LUo/public`
- Build: **1,085 files / 961.5 MiB**
- Missing dependencies: **0**
- Artifact contract: **PASS — 62**
- Artifact browser suite: **PASS — 138**
- Artifact external provider attempts: **0**
- Public metadata: **PASS**
- Governed source/artifact parity: **PASS**
- Advisory: artifact remains over the builder's internal 750 MiB warning threshold; global artifact-size work was outside this repair.

## Governed hashes

| File | SHA-256 |
|---|---|
| `sorority-house.html` | `350be1c0f055a61fed0db9299e57a4408b6883ab6651e0838f25a4b3fcfdde79` |
| `content/site/sorority-house-v2.js` | `9ab4140c47afbaf622c5b4de312109f602be20bc40d42ac92a05e3e5cbd686ba` |
| `content/site/community-room.js` | `0d6b621fab1a090df2af9d81b8617087764565aa020b51689752cd3533492341` |
| `content/community-room-v2.css` | `34204693c89cf94029fb55fa94b295984ab92e06a1ff7a04894c4896d298e2d6` |
| `games/girl-talk.html` | `d47b34ee2f9d5d824b855e89cfc35410fb91c07db60d58d227eb0922ccca23f0` |
| `sitemap.xml` | `accbb51c209f26c027d9bfd4ecb64886bdef515114e056c041acd7d0bfd56fa0` |
| `scripts/check-sorority-house-contract.mjs` | `7690073eb2fe2ddeb01f481d99a494a806d3fe7b4047315ab91614c5c1d90c12` |
| `scripts/test-sorority-house-browser.mjs` | `5f89afaf74d9bd206d6b1131b7f49f9c127aabc7b9e2d4cb80e7485ce890f5b3` |

## Maker self-score

| Gate | Score |
|---|---:|
| Product quality and useful completion | 18/20 |
| Accuracy, privacy, safety and trust | 18/20 |
| Positive LAiDIES brand contribution | 18/20 |
| UX and accessibility | 18/20 |
| Technical and exact-artifact reliability | 19/20 |
| **Total** | **91/100** |

This maker score does not overrule the prior independent rejection. Only a new independent review of this exact candidate may remove `REJUDGE REQUIRED`.

## Remaining holds

1. Independent product/trust/brand/UX/technical rejudge.
2. Named human moderation, reporting/escalation, incident, appeal and retention/deletion operations.
3. Controlled real-provider sign-in/post/reply/hold/reject/report/failure evidence using approved synthetic content and explicit authority.
4. Responsible-owner reconciliation of LAiDIES privacy/deletion/reporting language with the provider relationship.
5. Safari, VoiceOver, native zoom and representative physical-device evidence.
6. Human newcomer comprehension/usefulness and owner visual/community approval.
7. Privacy-safe analytics and voice-of-customer evidence.
8. Exact deployment and public-origin verification.

## Learning scan

The repair reused BTB-069, BTB-105, BTB-109, BTB-110 and BTB-111 plus the independent review's branch-complete/privacy-at-decision-point rule. The focus run found one local product issue: focusing a result after replacing an earlier-in-DOM action can strand the next control behind the focus position. The bounded prevention is now captured here and in the browser test: use the live region for the result and deliberately focus the next actionable control. Per the assignment boundary, no central painpoints or coordination file was edited.

