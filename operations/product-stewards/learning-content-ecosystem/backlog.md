# Learning System & Concepts backlog

**Status:** SPECIFIED — initialization queue; no artifact commission or public
release is implied
**Owner task:** `019f9f7f-9e4c-72d2-8882-447bcbe01691`

## Smallest current gaps

| ID | Status | Gap | Why it is the smallest useful next move | Owner | Acceptance evidence |
|---|---|---|---|---|---|
| LCE-001 | COMPLETE | Registry binding and targeted owner-entry | Control Room installed the row and the permanent task/dossier now recover through normal preflight | Control Room | `node scripts/check-product-stewards.mjs --owner-entry learning-content-ecosystem` passes; reopen only on regression |
| LCE-002 | SPECIFIED | Normalize one representative concept cluster | Current rows mix observed homes, inferred progression and unresolved substance; one complete cluster proves the schema before scale | Learning System & Concepts Director + relevant accuracy/Library owners | Stable concept ID, ruled truth status, owner, prerequisites, adjacent distinctions, evidence/freshness, complement map and consumer list all agree |
| LCE-003 | BUILD REMAINS REQUIRED | Refresh the cross-format inventory | The 2026-07-25 inventory has 22 item records plus a 37-class aggregate but does not comprehensively resolve tools, games, quizzes or Study Packs | Director + surface owners | Every current substantial learning item resolves to an authoritative surface source/status and concept/complement relationship; unknowns remain explicit |
| LCE-004 | BUILT LOCALLY — REPRESENTATIVE GRAPH; BACKFILL OPEN | Implement one correction-propagation transaction | The Episode 01 cluster now has stable claim/source/consumer identities and a weekly gate; released-audio/public verification and historical consumer backfill remain open | Director + affected owners | `claim-register.json`, schemas, signal inbox and the 2026-07-30 Episode 01 freshness run validate; every open consumer remains truthfully held |
| LCE-005 | BUILD REMAINS REQUIRED | Establish learner comprehension/transfer baseline | Completion and page/play events do not show that a learner can explain, apply or resist a misconception | Director + analytics/VOC + surface owners | Version-bound unfamiliar-learner protocol, privacy-safe aggregate schema, baseline and explicit limits are independently reviewed |

## Next after the smallest gaps

| ID | Status | Trigger | Work | Owner / handoff |
|---|---|---|---|---|
| LCE-011 | SPECIFIED | Ali requested complete Study Pack visual/content improvement for Episodes 01–04 and future | Learning-quality matrix and future-episode intake contract delivered; Blend & Snap/component-owner acceptance and build packets pending | Director → Blend & Snap / Study Pack, Try-On, Printables, Trading Cards and High Quiz owners |
| LCE-012 | BUILDING | OpenAI/Hugging Face incident exposed an unclosed news-to-learning capture gap | Sandbox successor added to Concepts 101; agent-security concept cluster, Weekly refresh, AI-security/open-closed Tribune brief and permissions-class extension routed in `NEWSSTAND-INTAKE-openai-hugging-face-agent-security-2026-07-28.md` | Director → LIBRAiRY, NewsStand and Classes owners |
| LCE-013 | DECIDED — EXTEND; PILOT NOT COMMISSIONED | Ali asked what LAiDIES should learn from AIDB × Superintelligent's Summer Adventure | Reuse its choice, artifact, reflection and visible-continuity mechanics as one optional Town Route across existing products; do not create a camp, passport, course catalogue, certificate ladder or new reward system | `INTAKE-aidb-summer-adventure-learning-patterns-2026-07-29.md`; Director → Episode 01/Study Pack, Town Entry, Visitor’s Centre, High, Closet and loyalty owners only if Ali commissions the bounded pilot |
| LCE-014 | BUILDING — WEEKLY CONTROL OPERATIONAL; BACKFILL OPEN | Ali requested one website-wide index and weekly freshness check integrated with episode production, AIDB and NewsStand | Operate the shared claim register, accept/decline scout signals, prioritize candidate backfill and close exact consumer updates during the weekly episode package | `FRESHNESS-SYSTEM.md`; Director + Weekly Episode Engine + AIDB/NewsStand and surface owners |
| LCE-015 | BUILT LOCALLY — ENFORCEMENT ACTIVE; OWNER BUILDS OPEN | News-to-learning recommendations could stop as prose and review labels did not independently prove every content/discovery gate | Maintain the machine-checked content work-order queue; dispatch ready orders; require artifact-bound evidence for accuracy, anti-slop, currency, voice, analogy, usefulness, format, indexing, relationships, canon, song and daily-derivative gates | `content-work-orders.json`; `content-work-orders.schema.json`; `node scripts/check-content-work-orders.mjs` |
| LCE-016 | BUILT LOCALLY — RESOLUTION QUEUE ACTIVE; SEVEN OWNER CLOSURES OPEN | A relationship, contradiction or held destination could be labelled BLOCKED without a durable route to resolution | Run the executable resolution queue; every blocker must have a named owner, priority, next action, review date and closure checks, and overdue open work fails the steward validator | `content/learning-blocker-resolution-queue.json`; `content/learning-relationship-graph.json`; `node scripts/check-learning-relationships.mjs --write-report`; current first execution is LCR-003 |
| LCE-017 | SPECIFIED — DESIGN BEFORE MORE CATALOGUE BUILD | Learners arrive with different AI knowledge, domain expertise and desired depth, while current discovery relies on scattered beginner/advanced labels | Define an experience-flexible pathway system that lets a person choose the support needed for each job without permanently grading or labelling her. Every substantial class/content record must state assumed knowledge, practical outcome, depth options and a useful next step; the Closet may remember voluntary preferences only after the account/privacy contract passes. | Director → Classes, LIBRAiRY, Miss Jeeves, Homepage, Closet and analytics owners |
| LCE-006 | DEFERRED | LCE-002 representative schema accepted | Normalize remaining concept clusters and prerequisite/next-experience graph | Director; concept substance and surface treatments reviewed by their named owners |
| LCE-007 | DEFERRED | Current inventory refreshed | Run overlap/duplication/currency review and rule link/correct/update/extend/create/decline for each conflict | Director sends durable handoffs; surface owners decide production |
| LCE-008 | DEFERRED | Next ruled episode substance/opportunity scan | Reconcile `library_impacts[]`, `class_impacts[]` and the full complement card | Weekly Episode Engine → Director → Library/Classes owners |
| LCE-009 | DEFERRED | NewsStand or primary evidence changes a durable concept | Open correction/freshness review without letting dated news silently become evergreen canon | NewsStand/accuracy → Director → all consumers |
| LCE-010 | DEFERRED | Representative measurement passes | Compare concept understanding and transfer by surface/job, then revise progression rather than rewarding completion | Director + analytics/VOC + surface owners |

## Standing intake queue

Every new Ali concept enters this permanent owner task first. The Director
records it as `CAPTURED`, reconciles existing canon and inventory, then returns
one ruled route:

- **link** — the right treatment already exists;
- **correct** — existing truth or explanation is wrong;
- **update** — the job is right but evidence/product detail is stale;
- **extend** — the owner is right but a missing learner step remains;
- **create** — a distinct surface job remains after reconciliation; or
- **decline** — duplication, wrong cognitive job, weak evidence or poor value.

`Create` names a recipient and acceptance question. Classes owns classes;
LIBRAiRY owns books; Weekly Episodes owns episodes; NewsStand owns
publications; and the applicable product owner owns tools, games, quizzes and
Study Packs.

## Explicit holds

- Do not use Episode 5 as settled model/app/provider canon while its lesson
  remains unruled.
- Do not route learners into a held, placeholder, not-published or unverified
  item as though it were available.
- Do not treat the ECO-01 local candidate, rendered evidence or test matrix as
  book admission/publication.
- Do not scale inferred concept-map relationships before one representative
  cluster proves the complete authority/evidence/consumer model.
- Do not commission a derivative merely because an episode impact array named
  the surface.
