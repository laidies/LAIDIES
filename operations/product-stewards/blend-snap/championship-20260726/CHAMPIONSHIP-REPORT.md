# Blend & Snap building-experience design championship

**Date:** 2026-07-26  
**Champion verdict:** ADVANCE PICKUP RAIL TO OWNER + INDEPENDENT REVIEW  
**Release status:** FIX BEFORE LAUNCH remains; this packet does not modify live source  
**Candidate:** `operations/design-explorations/blend-snap-building-championship-20260726/candidate.html`

## Outcome

The technical product is more mature than the current building experience.
Source passes 90 rendered checks for data, storage, error, keyboard, focus,
motion, mobile and cross-entry states, but the arrival still behaves like a
large image followed by a status/ledger page. At 390px the incumbent crops the
menu and JoJo while clipping the first headline; the primary ORDER action sits
below the captured viewport. The current hero and corkboard art also bake
changeable operational ideas into pixels.

The recommended transfer is not “make the café look like the LIBRAiRY.” It is:
make the visitor operate the building's native object. For Blend & Snap that is
a verified menu, order-ticket rail and pickup receipt. The provisional
challenger keeps JoJo, the usual, current/past packs and noticeboard but makes
menu → ORDER → printed receipt the dominant interaction on desktop and mobile.

## Evidence recovered

- Product authority: `CHARTER.md`, `OPERATING-SPEC.md`, current `state.json`,
  backlog and 2026-07-25 maker/independent evidence.
- Runtime authority: `blend-snap.html`,
  `content/blend-snap-weekly-packs.json`, `content/episode-index.json`.
- Ecosystem authority: Chick Flicks/Episode explains; Study Sheet reviews;
  Try-On practises; Cheat Sheet references; Cards reinforce memory/collection
  only when admitted; High's Quiz checks and owns any reward.
- Rendered incumbent:
  `screenshots/incumbent/desktop-1440.png` and `mobile-390.png` in the isolated
  design packet.
- Existing full-resolution assets inspected: café/JoJo match, provisional
  comic JoJo counter, provisional comic corkboard, approved-assets corkboard.
- Fresh source regression: `node scripts/test-blend-snap-browser.mjs`:
  **PASS — 90 rendered checks**.
- No live page, shared asset, manifest, registry, run queue, git record,
  deployment or public origin was changed.

## Intent and experience map

| Moment | New visitor | Returning visitor | Authority / failure |
|---|---|---|---|
| Enter | Understand “order one verified episode pack menu” within ten seconds | See the same current Special plus truthful same-device recognition | No account difference; no completion |
| Usual | Optional drink choice | Chosen drink may reappear | `laidies_bs_usual`, local only; denial must not block |
| Current menu | Published episode and component statuses agree before ORDER enables | Fresh or previously-opened copy is based only on this browser | Manifest + episode index must agree and be fresh |
| Order | In-place receipt lists each distinct job and status | May reopen current or past receipt | Opening is navigation only |
| Component | Only `available` routes operate | Same | Held/planned/unavailable are never links |
| Quiz handoff | Listed separately and routes next door | Same | High owns assessment/reward |
| Failure | JoJo turns the Special around, names no internal, offers Episodes fallback + retry in production integration | Same | No cached hard-coded pack |
| Linger | Noticeboard offers exact town routes after the order | Same | Board never claims schedule, rewards or availability |

## Dependency and plumbing map

1. `/content/episode-index.json` owns released-episode identity.
2. `/content/blend-snap-weekly-packs.json` owns component admission/status.
3. Both validate before current ORDER becomes available.
4. Component routes remain owned by Episode, Try-On, printables, Cards and High.
5. Local storage owns only usual and last-opened-pack menu.
6. No backend identity, reward, learning ledger or analytics currently exists.
7. Proposed aggregate analytics may record controlled view/order/component and
   failure classes; never drink label, prompt/reflection text, collection
   contents or identity.

## Incumbent gap analysis

### Product and UX

- Strong manifest and fail-closed work is visually subordinate to a 941px hero.
- Desktop puts comprehension and ORDER after a full-width artwork; mobile loses
  the complete room/menu and begins clipping copy.
- The counter is scenery while the actual product is a conventional ledger.
- Noticeboard is visually rich but repeats a second link-directory pattern.
- Past packs hide inside a disclosure rather than becoming a café-native object.

### Visual and truth

- Existing realistic assets are outside the locked episode-world rendering.
- The closer comic candidates are still unapproved and over-repeat teal/plum.
- Existing corkboards contain stale or false baked-in claims, including a
  guaranteed schedule/cards implication or unrelated “study buddy” promise.
- Embedded menu copy cannot remain authoritative as episode/status changes.

### Learning and ecosystem

- Component jobs are now correct in source, but the page needs a stronger visual
  distinction between pack pieces and the separate Quiz.
- The café should coordinate and route; it must not duplicate a Study Sheet,
  Episode or High assessment.

## Three directions and red team

### A — incumbent: counter + ledger + corkboard

Retains current structure. It is technically safest, but not a successful
building-experience design. Red-team failure: room as banner, action below fold,
mobile crop, generic ledger and static truth in art.

### B — challenger: JoJo's pickup rail

Menu board states the verified Special; ticket rail makes ORDER tangible; the
receipt prints in place; old receipts form The Regulars; noticeboard becomes
secondary. Red-team risk: visual overlays can become inaccessible hotspots.
Mitigation: all objects have native text buttons/links, minimum 44–48px targets,
DOM and visual order match, and dynamic truth stays in HTML.

### C — challenger: The regulars' table

Current pack becomes a placemat at a booth, coasters choose the usual and prior
receipts sit on table. Red-team failure: it weakens ORDER and makes the café
feel like compulsory study/productivity; placemat can become a dashboard.

## Provisional blinded score

The champion authored the directions and therefore cannot provide an
independent admission score. This is a disclosed maker-side red-team score
using anonymized A/B/C descriptions. Quality, accuracy/trust and LAiDIES brand
are hard floors of **17/20**, not averages that weaker dimensions can offset.

| Blinded direction | Product/UX quality | Accuracy/trust | LAiDIES brand | Learning/ecosystem | Technical feasibility | Result |
|---|---:|---:|---:|---:|---:|---|
| A | 14.0 | 17.5 | 13.5 | 17.0 | 19.0 | FAIL quality + brand |
| B | 18.0 | 18.5 | 18.0 | 18.0 | 17.5 | PROVISIONAL PASS; independent judgment required |
| C | 16.0 | 18.0 | 17.0 | 15.5 | 16.5 | FAIL quality + learning |

## New artwork produced

Three candidate-only generated images were made against the locked visual
system and inspected at full resolution:

- wide JoJo pickup-rail environment;
- blank five-ticket/current + four-receipt/past order station;
- blank eight-placement café noticeboard.

They remove operational text from pixels and move away from photorealistic
corporate café rendering. They are not approved. JoJo identity continuity and
the maker's art judgment require a different visual reviewer and Ali taste gate.
Prompts, inputs, original output paths, dimensions and hashes are in the
isolated provenance packet. No rejected generation was promoted.

## Narrow integration packet

If Direction B passes independent visual, product, accessibility and Ali review:

1. Preserve the existing validated controller and manifest/index contract; do
   not replace it with candidate demo logic.
2. Replace layout/art slots only: verified Special menu board, order rail,
   in-place receipt, past-receipt rail and secondary noticeboard.
3. Keep exact production copy/status rules from `OPERATING-SPEC.md`.
4. Use HTML for every episode/component/status/route; images remain blank.
5. Add explicit Retry to the candidate visual shell using existing production
   failure focus/live-region behaviour.
6. Maintain 48px preferred controls, 320px reflow, 200% zoom and VoiceOver
   checks; run the existing 90 rendered checks unchanged.
7. Require source/artifact/public-origin test parity and human newcomer
   comprehension before release.
8. Do not admit JoJo art or any noticeboard route until independent visual and
   route-owner checks pass.

## Holds

- Ali has not approved the new visual direction or JoJo art.
- No independent blind judge has scored the built candidate.
- Mobile/desktop screenshots are maker evidence, not accessibility approval.
- VoiceOver, Safari, 200% zoom, public origin and actual user comprehension are
  not proven.
- First real Study Sheet remains unbuilt; Trading Cards remain held.

## Learning scan

Qualifying prevention rule for the orchestrator's canonical painpoint ledger:
**a technically repaired building is not a finished building experience.**
Always capture the incumbent at desktop and 390px, require the building's
native object to perform the primary verb, and keep changing operational truth
out of generated pixels. Possible Behind the Build angle: “The café stopped
being a banner when the receipt rail became the interface.”

