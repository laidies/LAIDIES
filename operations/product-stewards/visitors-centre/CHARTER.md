# Welcome Wagon Visitor's Centre Steward

**Status:** SPECIFIED — manual dossier created; no persistent runner, analytics pull, or autonomous change authority is wired.
**Relationship to AW-003:** MERGE — supplies evidence and launch-ranked recommendations to the reopening gate.
**Authority:** Read-only investigation and records in this directory only. No page, map, trailer, postcard, global-navigation, analytics, deployment, publication, git, canon, or reward changes without portfolio reconciliation and the relevant owner approval.

## Product promise

The Welcome Wagon is SUNNYVAiLE's front desk: a new visitor can understand that she is welcome, see what the town offers, choose a named destination without memorizing the map, and leave with one useful next step. It makes the town feel inhabited without making orientation a prerequisite to practical AI learning.

## Product boundary

**Owned:** `/visitors-centre` → `visitors-centre.html`; its room, named directory, wall-map selection, destination reveal, trailer/tour offer, starter route, and local postcard desk handoff.

**External dependencies, not owned:** homepage/campaign entry and global navigation (Town Entry); shared directory/map data and global scripts (Platform/Town Entry); episode/trailer media (Weekly Episode Experience); Post Office/postcard lifecycle (Identity, Rewards & Connection); all destination pages; analytics/privacy; account/reward state.

## Journeys

| State | Journey | Authoritative success | Current evidence limit |
|---|---|---|---|
| New visitor | Enter → understand Visitor's Centre → choose wall-map or named-directory building → reveal destination → leave through its valid CTA | Chosen named destination is correctly exposed and the visitor reaches an intentional next route. | Local directory/map selection, reveal and return state passed at 390 × 844; clean-state comprehension is not yet tested. |
| New visitor | Enter → trailer/tour offer → start, decline, or defer | Tour is voluntary, clear and never blocks a learning route. | Tour is shared/global; no full visitor-centre-to-tour accessibility/recovery verdict. |
| New/returning | Choose postcard → note/email/share handoff | The handoff is accurate about what happens next; it does not claim mailed/opened/joined/rewarded state it cannot prove. | Local postcard choice/note/email state passed; real lifecycle belongs to Post Office and is not proven. |
| Failure/degraded | Map/directory/trailer/script unavailable | Named directory and obvious route fallback remain usable; no false completion claim. | Systematic no-JS, failed-data, keyboard and real-device recovery evidence is open. |

## Non-negotiables

1. The room is the experience: map and directory are legible parts of a place, not a dashboard or card wall.
2. Building names are discoverable without numbered pins or map-memory tests; named directory is a required accessible fallback.
3. One primary next step is clear at every state; the full town remains optional.
4. Trailer/tour/postcard are invitations, never gates to learning, membership or belonging.
5. The Visitor's Centre may hand off to a product but cannot imply that its downstream account, newsletter, sharing, referral or reward lifecycle succeeded.
6. Mobile, keyboard, reduced-motion, focus and network/storage failure states are product requirements, not polish.

## Release gate

**VERIFIED LOCALLY** requires a named exact artifact and clean anonymous/returning tests at mobile and desktop for: comprehension (what this building is, why choose it, what to click, what happens next); map and named-directory choice/reveal/exit; trailer/tour offer and decline; postcard handoff; keyboard/focus/Escape/reduced motion; broken destination/data/network recovery; and truthful outbound labels.

**VERIFIED PUBLICLY** additionally requires the same bounded public-origin journey and verified production analytics configuration. Existing public mechanics evidence is valuable but does not satisfy the complete gate.
