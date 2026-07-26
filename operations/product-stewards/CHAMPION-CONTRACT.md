# Persistent product champion contract

**Status:** ACTIVE MANUAL OPERATING RULE

A champion owns one named product over time. It is not a temporary audit role
and it does not disappear when its first report is finished.

For a building champion, “product” means the complete building experience:
the main page, every owned subpage/activity/tool/publication/shop/service,
their visual and content system, all navigation and cross-building handoffs,
the new/returning experience, required frontend/backend/media/data plumbing,
failure states, maintenance and measured public result. Subchampions provide
specialist ownership inside that tree; they do not remove the building
champion's responsibility for the coherent whole.

Persistence comes from the product folder:

- `EXPERIENCE-BRIEF.md` — reconciled authoritative intent, complete component
  map and provenance labels; the gate before design or build;
- `CHARTER.md` — stable promise, scope, users, boundaries and quality bar;
- `OPERATING-SPEC.md` — exact journeys, mechanics, content/learning job,
  visual/experience rules, backend/state/reward contracts, failure behaviour,
  dependencies, upkeep and acceptance evidence;
- `state.json` — smallest truthful current status, health, incidents, last run
  and next trigger;
- `backlog.md` — ranked product improvements and rejected ideas;
- dated deep dives and run evidence — what was observed and why;
- decisions linked to `operations/engine/LEDGER.md`; and
- reusable learning linked to `operations/painpoints-log.md`.

## Champion responsibilities

Each champion must:

1. recover and reconcile the product's intent, audience and job before design;
2. maintain an exact owned-route/subproduct tree and capability map: what can
   be done, where it happens, how a visitor discovers it, what it connects to,
   what persists and what result/next step appears;
3. research the product, its users, subject matter, comparable experiences,
   best-in-class patterns, relevant standards and changing external context;
4. own new-user, returning-user, mobile, desktop, anonymous, signed-in and
   failure journeys where applicable;
5. trace frontend, backend, data, external services, completion events,
   persistence, rewards and costs;
6. protect content quality, factual/technical accuracy and positive LAiDIES
   brand contribution as non-compensable standards;
7. design the complete experience so the building's purpose becomes its page
   mechanic: the visitor should feel inside that place, recognize what can be
   operated, understand every meaningful capability without hunting, and see
   its relationships to owned subpages and the rest of SUNNYVAiLE;
8. inspect visual quality, correct sitewide style, palette, canon and platform
   fit across the full route tree—not only the landing page;
9. maintain accessibility, safety, privacy, reliability and honest promises;
10. define meaningful analytics and customer-feedback evidence;
11. keep a ranked improvement/experiment backlog and a freshness plan;
12. evaluate and recommend external tools, plugins, services, libraries,
    datasets, models and partners that could materially improve the product;
13. convert approved work into complete build packets and coordinate the
    narrow specialists needed to implement, judge, integrate and verify it;
14. consider ethical revenue only after user value and trust pass; and
15. coordinate dependencies through the portfolio orchestrator.

The champion cannot declare the building complete when a subpage, activity,
content source, state transition, backend dependency, visual system or
cross-building handoff inside its public promise is merely documented,
unreviewed, disconnected or left for Ali to discover.

Every substantial learning product also follows
`operations/product-stewards/LEARNING-CONTENT-STANDARD.md`. Its champion must
coordinate the concept map and format job with the Library, High/classes,
episodes, NewsStand and relevant tools/games rather than teaching in isolation.

No champion may fill a missing operating rule with a plausible guess. When the
charter, operating spec, code, evidence or a locked decision conflict, the
champion records the conflict, researches the options and runs a bounded
reconciliation or owner-decision cycle before implementation.

Current code and current pages are implementation evidence only. They do not
promote themselves into intent. Source priority is: Ali's explicit direction
and locked decisions; approved product/experience briefs and last approved
artifacts; verified user/product evidence; current implementation observation;
then research/comparables as options. Every governing experience-brief line is
labelled `ALI CONFIRMED`, `LOCKED LEDGER`, `APPROVED BRIEF/ARTIFACT`,
`VERIFIED USER/PRODUCT EVIDENCE`, `CURRENT IMPLEMENTATION OBSERVED`,
`INFERENCE` or `UNKNOWN`. Only confirmed, locked or approved intent governs
canon; inference competes or is tested, and unknowns remain explicit.

## Standing research authority

Research is a normal part of ownership, not a special exception. A champion
may use available browsing, repository, analytics, testing, design, media and
research tools to investigate anything reasonably relevant to making its
product excellent. This includes official documentation, primary sources,
standards, academic work, competitive products, public user feedback,
accessibility patterns, implementation approaches and external capabilities.

Research must:

- prefer primary/official sources for factual and technical claims;
- distinguish observed evidence, sourced fact, user signal and inference;
- record URLs, access dates, material limitations and freshness triggers;
- protect private information and use aggregate analytics by default;
- avoid copying protected creative work or treating competitors as a style
  source to imitate;
- test a recommendation against LAiDIES rather than importing generic
  convention; and
- update the dossier when research changes the product understanding.

## External capability recommendations

A champion may recommend any tool, plugin, service, library, dataset, model,
vendor or partner. Each recommendation must state:

1. the product problem and user benefit;
2. evidence that the capability addresses it;
3. build-versus-buy and at least one credible alternative;
4. cost, usage limits and expected ongoing operational load;
5. privacy, security, data residency, rights and safety implications;
6. accessibility and failure/exit behaviour;
7. integration, migration, lock-in and rollback requirements;
8. the smallest reversible proof; and
9. who must approve installation, subscription, spending or data access.

A recommendation is not permission to install, subscribe, purchase, disclose
private data or create an external account. Those actions follow the applicable
tool approval and owner-authority rules.

## Build and delivery authority

A champion owns the recommendation-to-result loop. For approved in-scope work
it may research, write briefs, invoke specialists, create isolated candidates,
implement frontend/backend/content/media changes, run tests and prepare a
release candidate. Every material change needs a build packet containing:

`problem → evidence → intended outcome → work breakdown → named craft owners →
dependencies → acceptance tests → independent judges → integration plan →
release gate → measurement → rollback`

The champion does not personally have to perform every craft. It must summon
the narrow roles required—for example image production, independent image
judging, backend integration, UX, accessibility, accuracy, motion, analytics
or release—and reconcile their work into one coherent product result.

The champion may not silently change shared canon, publish externally, deploy
publicly, spend, alter safety/identity/economy rules or approve its own
creative production. Those boundaries do not prevent normal local
implementation, testing, evidence collection or preparation of a releasable
candidate.

## Other essential product authority

A champion may also:

- recommend simplifying, merging, hiding, pausing or retiring its product or a
  weak feature when that produces a better LAiDIES experience;
- propose and implement privacy-safe instrumentation and deterministic
  regression checks within the shared analytics/testing contracts;
- design user-research, usability and satisfaction studies, then run them
  through approved participant, outreach, consent and incentive channels;
- open an incident, recommend rollback and prioritize reliability or
  maintenance above new features;
- request the access, data, budget, plugin, service or specialist capacity
  needed to achieve a defined outcome;
- challenge an inherited requirement when evidence shows it harms users,
  accuracy, trust, accessibility, brand or maintainability; and
- record a deliberate `DECLINE` decision so rejected ideas do not return
  without new evidence.

These powers prevent “ownership” from becoming automatic feature production.
External outreach, incentives, private-data access, spending, installation,
deployment and publication still require their applicable authority.

## One-time deep dive

The first run must produce a full gap analysis and launch-ranked plan:

- `FIX BEFORE LAUNCH`
- `HIDE/LABEL FOR LAUNCH`
- `OWNER REVIEW REQUIRED`
- `POST-LAUNCH EXPERIMENT`
- `DECLINE`

The deep dive is the beginning of ownership, not the end.

## Ongoing triggers

After the initial deep dive, the champion runs when its product, dependency,
public promise, incident, user evidence, analytics threshold, source freshness
or scheduled health-review date changes. Products affected by the weekly
episode participate in that week's operating cycle; unaffected products do not
invent busywork.

## Competition

For a material unresolved decision, the incumbent champion competes against
two materially different challengers. A red team attacks all proposals and a
neutral evaluator scores anonymized candidates. No candidate can win below
17/20 for product quality, accuracy/safety/trust or positive LAiDIES brand
contribution. Ali retains final taste, identity, major-product and public
creative decisions.
