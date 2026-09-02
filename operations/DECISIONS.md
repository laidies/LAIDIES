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

FAiRY pilot source-use rule (2026-08-31): model-selected IDs from a known bank
prove membership only, not support for a generated answer. Keep per-answer
attribution held until source-support/answer admission; internal pilot context
must not become visitor-facing expert credit. See the current FAiRY
`product-stewards/fairy-godmother/subproducts/answer-quality.md` checkpoint.
Source selection and optional AI preparation are independent: a grounded career
preparation task may use `sources:[]` when it needs only the visitor's supplied
non-confidential inputs, remains explicit about what to verify and invents no
facts, criteria, outcomes, endorsement or employer policy. Never attach an
unrelated reference merely to make the AI task valid.
FAiRY Career Workspace rule (2026-09-01): when an ongoing career situation
would benefit from a reusable system, FAiRY may offer a portable setup prompt
for the reader's own AI tool. That tool interviews her one focused question at
a time, suggests only the smallest redacted excerpt that resolves a named
uncertainty and builds a working note that separates facts, unknowns, decision
ownership, words to use, lower-exposure options and checks. FAiRY does not
accept, upload, save or claim privacy for those documents in this release. The
workspace is optional, never homework, never a substitute for solving today's
problem and never generic confidence or "own your power" advice. Current
privacy, retention, training and employer-approval claims remain the reader's
tool/account decision and must not be invented.
The Worker—not the answer model—owns the workspace next move and rejects any
answer that directs document or file transfer; it may ask only for the smallest
permitted redacted excerpt or short summary after naming the uncertainty.
When the answer model selects the governed `career-relationship-bridges`
situation, the Worker also owns the missing AI-learning link: if the model
returns `aiAssist:null`, the service supplies the already-governed bounded
`conversation_rehearsal` quick task. This does not create a universal AI task
for every career answer; unrelated or genuinely unhelpful cases may still use
null.
The service must independently require an explicit continuing need in the
reader's own instruction—a workspace/tracker/project folder, recurring work,
several future steps or a record to maintain. A one-off decision remains a
bounded quick task even when its classifier route is `decision_or_plan`.
Optional preparation must disclose whether it runs another call; repeat-preview
limits must preserve an already usable answer instead of replacing it.
FAiRY synchronous advice and revision use one bounded provider attempt with no
automatic retry. The Worker deadline is30s and the page deadline is35s so the
typed no-charge backend failure can arrive before the browser aborts. The page
must show honest staged progress and a revision failure must retain the existing
draft and restore its controls. This local latency contract does not itself
authorize deployment or admit model/classifier quality.
FAiRY classifier successor rule (2026-08-31): preserve the exact trial prompt as
historical v1 evidence; a successor prompt is a new candidate and must use a new
independent blind set. The configured Terra call uses reasoning-effort and
reasoning-inclusive completion parameters, verifies the exact returned model and
complete assistant response, stores nothing and never retries. Deterministic
post-processing may only refine an already-blocked direct prompt-exfiltration
result from `dangerous_or_abusive` to `untrusted_instruction`; it may never turn
a model denial, uncertainty or verification route into `allow`. Missing detail
inside an otherwise actionable quoted transformation belongs in answer unknowns,
not classifier clarification.

Shared brand formatter repair rule (2026-08-30): native SELECT/OPTION/OPTGROUP,
TEXTAREA and INPUT contents remain plain text, including `.wordmark` shortcuts.
All three formatter copies must pass `scripts/test-native-brand-controls.mjs`;
the broken predecessors were rejected before this guard was accepted. Changed
formatter resources require versioned consumer references in an exact-current
artifact overlay. This does not authorize an unrelated layout or prose change.

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
