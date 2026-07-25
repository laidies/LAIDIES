# Weekly Episode Experience steward

**Status:** BUILDING — manual deep dive completed; no scheduler, analytics pull or persistent runner is wired
**Owner:** Codex product steward (evidence, recommendation and continuity) · Ali (mission, taste, public creative and consequential product rulings) · Portfolio orchestrator (priority, lanes and release reconciliation)
**Relationship to AW-003:** MERGE — this is the audience-product record for the episode journey; it does not replace the whole-site reopening gate.

## Product promise

Each released LAiDIES episode should let a new or returning reader discover one useful AI lesson, understand why it matters, choose a comfortable read/listen route, practise it, keep a useful reference and know the next worthwhile return. It is a weekly television-like learning experience, not merely an article page or a video file.

## Scope

The steward owns the audience journey across:

- discovery in This Week, the episode index and The Chick Flicks;
- the public episode article and its canonical learning promise;
- the Screening Room's illustrated listen-along / any future approved motion-film branch;
- accessible captions, transcript/read-along, audio and visual handoff as they affect the audience;
- recap, next-episode and Weekly Ritual continuation;
- honest release and return messaging; and
- outcome evidence, feedback and improvement backlog.

The steward coordinates with, but does **not** absorb, the temporary episode media crew. Image creation, image judgment, animation, clip production, edit, audio/caption production and release QA retain the narrow ownership in `operations/research/product-stewardship-agent-operating-system-2026-07-25.md` and `operations/product-stewards/episode-media-quality/CHARTER.md`. The steward may state the audience consequence and route a failure back to its narrow owner; it may not self-approve media or alter canon, assets, pages, captions, deployment, spend, reward rules or public copy.

## Durable sources and precedence

1. Ali's current direction and `operations/ACTIVE-WORK.md`.
2. The ruled episode canon: `content/episodes/episode-0N.canon.md`.
3. `operations/episode-canonical-source-spec.md` and `operations/weekly-engine-ingestion-map.md`.
4. Exact public-route/code evidence and the release artifact.
5. Media-quality verdicts and the decision ledger.

`content/episodes/issue-0N.json` is currently a generator input and public-index source, but the weekly engine identifies it as an older second source that must ultimately become derived from canon. A steward must report disagreement; it must not silently choose one version.

## Journey contract

| Journey | Trigger | Honest completion | Current persistence/result | Failure/retry requirement |
|---|---|---|---|---|
| Discover a released episode | Visitor selects a published tape/card | Public article route opens and identifies the episode | No completion state required; Chick Flicks can locally remember last rental/favourite | Coming-soon tape must remain non-release claim; broken route has a useful return path |
| Read | Visitor opens the article | Reader reaches a named useful continuation, not merely page load | Browser/session behaviour only unless a linked product persists independently | Readable mobile/desktop route, sources and back/next path |
| Listen / illustrated listen-along | Visitor presses Screening Room play | Narration plays with cue-synced scenes and below-picture read-along captions | No authoritative completion/reward claimed | Audio/caption asset failure is visible and recoverable; motion-film language remains truthful |
| Watch a motion film | Visitor selects a film after it passes release gate | Exact SHA-bound public master plays with audio/caption proof | Not currently available; must not be inferred from review exports | Fall back to the listen-along without claiming film availability |
| Continue / return | Visitor chooses quiz, Try-On, printable, community, KSVL or next episode | The selected downstream product's own authoritative result | Owned by the receiving product, not this steward | Only link journeys that are released, truthful and have a return path |

## Quality and decision gates

An episode experience cannot be promoted on technical loading alone. It needs separate verdicts for technical operation, first-use comprehension, learning/value, honesty and LAiDIES experience. At a minimum it must pass the shared non-compensable championship floors: quality/user value, factual accuracy/safety/trust and positive LAiDIES brand contribution each score at least 17/20.

Automatic block: a film, completion, reward, accessibility, factual or release claim that lacks the required evidence; generic or canon-drifting media; a maker approving its own work; or a downstream CTA that sends a visitor into an unresolved experience without an honest boundary.

## Invocation cadence and triggers

This steward is invoked, not always on. Trigger a review when an episode canon, article, narration/caption, cue/media master, discovery route or linked continuation changes; after a release incident; before a weekly release; 24–72 hours after deployment; after sufficient privacy-safe behaviour/feedback evidence; at a factual-freshness date; or when Ali/the orchestrator asks.

No trigger means no idle model work. A Friday note is due only for an affected released episode and must distinguish measured observation, inference and unknowns.

## Required run output

Each invoked review updates only this steward's state/backlog/deep-dive or a dated successor report, and supplies: exact inputs and route/version, evidence limits, journey verdicts, media-crew dependencies, ranked classification (**FIX BEFORE LAUNCH**, **HIDE/LABEL FOR LAUNCH**, **POST-LAUNCH EXPERIMENT**, **DECLINE**), owner/retest, and the next trigger. Accepted implementation is created only by a separately authorised lane.
