# LAiDIES decision router

<!-- context-authority: operations/context-authority.json -->

This file routes a task to current authority. It is not a second decision
register. The routed source wins for its domain.

## Precedence

1. Ali's latest direct ruling for the current task.
2. `AGENTS.md` for process and safety.
3. This router for the current domain source.
4. The routed domain source for product, content, design, or release truth.
5. `operations/voice/laidies-canon-index.md` for names, retired terms, and
   status labels only.

If a decision exists only in an archived register, it is preserved evidence,
not current authority. Mark the affected point `HOLD` and reconcile it into the
proper domain source before building from it.

## Core routes

| Question | Current source |
|---|---|
| Names, retired terms, status words | `operations/voice/laidies-canon-index.md` |
| Voice and banned phrasing | `operations/voice/laidies-writing-lock.md` |
| Current foreground task | `operations/ACTIVE-WORK.md` |
| Release and public identity | `operations/release-control/RELEASE-STATE.md` |
| Product ownership and function | `operations/product-stewards/OWNER-ENTRY-CONTRACT.md` |
| Learning/content system | `operations/product-stewards/LEARNING-CONTENT-STANDARD.md` |
| Prose admission | `operations/product-stewards/learning-content-ecosystem/CONTENT-QUALITY-ADMISSION-GATE.md` |
| Episode canon | `operations/episode-canonical-source-spec.md` |
| Episode/trailer visuals | `operations/episode-visual-system-lock.md` |
| Episode asset admission and retired paths | `operations/assets/active-asset-registry.json` |
| Repository-wide rejected/retired bytes and rejected consumer SHAs | `operations/quarantine/repository-wide-denylist-20260820.json`; `scripts/check-repository-hygiene.mjs` |
| Episode video specialist packet | `operations/specialist-agents/episode-video-producer.json` |
| Sitewide visual direction | `operations/site-visual-system-lock-2026-07-23.md` |
| Current Homepage/LIBRAiRY/Visitor design production guard | `operations/design-programs/homepage-library-visitors-20260822.json` (input/admission manifest only; page decisions remain routed below) |
| Runtime/Control Room truth | `operations/product-stewards/control-room/dashboard-state.json` |
| Ideas not yet active | `docs/growth/ali-idea-backlog.md` |

## Area routes

| Area | Current source |
|---|---|
| LIBRAiRY | `operations/library-decisions.md` |
| Visitor’s Centre | `operations/product-stewards/visitors-centre/EXPERIENCE-BRIEF.md` |
| Homepage/town entry | `operations/product-stewards/town-entry-homepage/EXPERIENCE-BRIEF.md` |
| NewsStand | `operations/product-stewards/newsstand/EXPERIENCE-BRIEF.md` |
| KSVL continuity, playback ownership and canonical player distribution | `operations/product-stewards/ksvl/OPERATING-SPEC.md` (dated 2026-08-30 repair contract); `scripts/lib/ksvl-distribution.mjs` and calibrated continuity/cache tests enforce the shared-runtime rule |
| SUNNYVAiLE High | `operations/sunnyvaile-high-design-decisions-20260724.md` |
| Classroom | `operations/classroom-design-decisions-20260724.md` |
| Pop Quiz | `operations/pop-quiz-design-decisions-20260724.md` |
| Dream Phone | `operations/dream-phone-design-decisions.md` |
| Handbook | `operations/handbook-design-decisions.md` |
| Closet | `operations/closet-design-decisions.md` |
| Resident Card | `operations/resident-card-design-decisions.md` |
| Post Office | `operations/post-office-decisions.md` |
| Book Fair | `operations/bookfair-design-decisions-20260724.md` |
| Gift Shop | `operations/gift-shop-decisions.md` |
| Mall/shop | `operations/mall-shop-design-decisions.md` |
| Try-on | `operations/try-on-design-decisions.md` |
| Watch | `operations/watch-design-decisions.md` |
| Printables | `operations/printable-design-decisions.md` |
| Postcards | `operations/postcard-design-decisions.md` |
| Community index | `operations/community-index-design-decisions.md` |
| Community room | `operations/community-room-design-decisions.md` |
| Trading cards | `operations/trading-card-economy-locked.md` |
| Image naming | `operations/image-naming-standard.md` |
| Cloudflare URLs | `operations/cloudflare-pretty-url-rule.md` |
| Homepage | `operations/homepage-decisions-20260827.md` |

## Historical packet

The pre-reset monolithic register is preserved at
`operations/archive/context-reset-20260818/DECISIONS.pre-reset.md`. It may supply
history, file locations, and reconciliation leads. It may not override a routed
current source or silently become implementation authority.

## Adding a decision

Write a new decision into the narrowest current domain source in the same task.
Add or change a row here only when routing itself changes. Do not grow this file
into another decision ledger.
