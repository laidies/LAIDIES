# BRONZE AiGE Product Steward Charter

**Status:** BUILDING — manual launch deep dive complete; no persistent runner is wired
**Product owner:** BRONZE AiGE product steward
**Subproducts:** Businesswomen's Special and Cocktail Fortune route relationship
**Portfolio owner:** Codex portfolio orchestrator
**Founder decision owner:** Ali

## Product promise

The BRONZE AiGE is SUNNYVAiLE's grown-up social-practice bar: a visitor can call a happy hour, use the fortune teller to pick a cocktail or spirit-free option, bring a real AI conversation to the table, leave an honor-system weekly coaster, and discover a live-music/episode relationship.

It is not a real bar reservation system, alcohol-service provider, account-backed attendance ledger, or proof that a visitor met anyone, consumed a drink, learned a lesson, or earned a durable reward.

## Owned scope

- `bronze-aige.html`, its room/station interaction, invite, conversation menu, coaster, framed answers, stage/audio and Resident Card handoff.
- `games/businesswomens-special.html`, its lane/mood/reveal experience, content safety, local state and return routes.
- `games/cocktail-fortune.html` redirect relationship with Mme CLAi-O; coordinate rather than silently conflate the two products.
- Episode-index/issue data used by Wednesday Special, KSVL/audio dependencies, charm-hunt and shared identity dependencies.

## Definition of a healthy journey

1. A new visitor understands in ten seconds that this is a bar-shaped social ritual—not a booking, purchase or required drinking experience—and can choose a labelled bar object without hotspot hunting.
2. She can create, copy and download a locally generated invite, knowing that it asks her to arrange a gathering at her own bar and does not send invitations or reserve anything.
3. She can pick cocktail or spirit-free lane/mood, receive a clearly playful suggestion, and return to the bar with no medical, availability, consumption or age claim.
4. She can use episode-linked conversation prompts and framed explainers without a stale or failed weekly prompt being presented as current.
5. A returning visitor sees only truthful browser-local drink/coaster state; one weekly stamp is honor-system, not attendance, identity or cross-device reward proof.
6. Controls remain keyboard-operable, readable on mobile, reduced-motion respectful and resilient when local storage, episode fetch, audio or clipboard/calendar features fail.

## Quality and decision rules

- The locked direction is an operable bar room: visible, separate objects and in-place panels, not a worksheet, invisible hotspots or a generic card grid.
- The source has a room/station reframe and mobile list, but the brief's new straight-on Cosmo hero is still missing; current chamber art is a bridge and needs owner visual review.
- `laidies_bws_drink` and `laidies_bronze_coasters` are browser-local. The BWS all-corners badge is current-session UI. None may imply a Resident Card sync, verified visit or reward.
- Cocktail suggestions must retain an equally discoverable spirit-free path and avoid health, safety, availability, purchase or responsible-service claims that have not been operationally supported.
- Analytics must never include invite text, selected drink, free-text discussion, identity, or raw replay content; only controlled aggregate interaction metadata may be used.

## Current dependencies

| Dependency | Why it matters | Current truth |
| --- | --- | --- |
| `content/site/bws-data.js` | Drink/flap data for bar and standalone game | Loaded client-side; source includes cocktail and spirit-free lanes. |
| `content/episode-index.json` + issue JSON | Wednesday Special | Browser fetch selects latest `published` episode; failure/currentness not tested this run. |
| `localStorage` | Drink, coaster stack and state-on-arrival | Device-local; no account or cross-device proof. |
| KSVL player/audio assets | Stage experience | Source wiring exists; playback/error recovery not tested this run. |
| Businesswomen's Special route | Full-table version and invite/CTA target | File exists in the current working tree; current route/public interaction was not tested. |
| Plausible/Clarity | Aggregate learning | Tags exist; product event contract, pull, baseline and review loop are NOT WIRED. |

## Steward triggers and escalation

- Trigger on visual/room/control changes, BWS data or copy updates, episode publication, audio/route defect, local-state/reward claim, alcohol-safety concern or feedback.
- **FIX BEFORE LAUNCH:** a broken primary bar/BWS route; false booking, attendance, account-save or reward claim; inaccessible core interaction; unsafe/unsupported alcohol claim; or private invite/discussion data entering analytics.
- **HIDE/LABEL FOR LAUNCH:** live-show/current-episode, Cosmo/keeper, cross-device, durable badge, or full-table claims without exact current evidence.
- **Ali decision:** Cosmo visual/canon, alcohol/service framing, any age/responsible-use policy, visual approval and all revenue models.
