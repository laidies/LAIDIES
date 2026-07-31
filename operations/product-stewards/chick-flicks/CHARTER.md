# Chick Flicks Building Steward

**Status:** SPECIFIED — manual dossier created; no persistent runner, analytics pull, or autonomous change authority is wired.
**Relationship to AW-003:** MERGE — storefront/catalogue evidence and launch recommendations feed the reopening gate.
**Authority:** Records only in this directory. No building, episode, player, media, analytics, deployment, publication, git, canon, reward, or shared-navigation changes without reconciliation and applicable owner approval.

## Product promise

The Chick Flicks is SUNNYVAiLE's episode rental store: it makes the season feel collectible and easy to enter. A visitor can see what is newly released, distinguish what is available from forthcoming, select an episode by interest or sequence, and leave for the correct full episode with an obvious next learning route.

## Boundary

**Owns:** `/chick-flicks` → `chick-flicks.html`; its rental-store room, New Releases wall, aisle catalogue/filtering, release/current-week display, tape selection, favourite-tape storefront state, “coming soon” honesty, episode discovery, and building-level handoffs.

**Coordinates but does not absorb:**

- Weekly Episode Engine (`019f9f7c-f03a-7ec1-a776-d60b57210322`):
  opportunity intake, teaching/editorial intent, canon/script, production,
  checksum-bound episode release candidate and the episode package's public
  proof.
- Episode Media Quality: source-frame, motion, edit, audio, captions and public media verdicts.
- Identity/Rewards: Resident Card, favourites and any ritual/reward truth.
- Platform/Town Entry: shared navigation, tour, episode-index publication and analytics.

**Owned child experience:** Screening Room `/watch`, episode archive/listen/
watch presentation, title/format availability truth, player/caption behavior
and the discovery → issue/player → return visitor journey. A media file is not
admitted because it exists.

## Core journeys

| State | Journey | Authoritative success | Current evidence limit |
|---|---|---|---|
| New visitor | Enter → understand New Releases → rent current/released tape → open correct episode | A published tape routes to its authoritative `issueUrl`; visitor understands available versus forthcoming and what follows. | Store logic reads `content/episode-index.json`; full clean-state comprehension and exact-artifact journey remain open. |
| New visitor | Choose aisle → inspect tape → choose released/coming soon | Filter reports correct available/coming-soon count; forthcoming tape explains its state rather than dead-ending. | Local code implements it; full filter/content/a11y test is unrecorded. |
| Returning visitor | See current release → select favourite tape → resume an episode route | Current published episode is correct; favourite is presented as device-local unless Identity proves account sync. | `laidies_favorite_episode` localStorage exists; no cross-device/account proof. |
| First-time visitor | Trailer offer → start Episode 01 | Trailer is optional and entry sequence is clear. | Trailer player/media quality is owned externally; building must not overstate it. |
| Failure/degraded | Episode index/image/media/destination failure | The catalogue has an accurate fallback and never labels an unreleased/unavailable tape as rentable. | No recorded index/network/no-JS/error/recovery suite. |

## Non-negotiables

1. Released, current, forthcoming and unavailable are visibly distinct and reflect the same authoritative episode index used elsewhere.
2. A “rent” click is an honest handoff to the episode—not proof that an article, listening session, watch session, quiz, or reward completed.
3. The building is a warm rental-store catalogue, not an opaque carousel, generic course list, or false inventory wall.
4. Aisle filters, tape selection and favourite state remain keyboard-operable and comprehensible on mobile.
5. Favourite/ritual language must name device/account scope truthfully; raw visit or selection is not learning completion.
6. The trailer, Study Pack, quiz and Post Office are optional routes with accurate downstream claims.

## Release gate

**VERIFIED LOCALLY** requires an exact artifact, clean and returning states, and mobile/desktop proof of current-release source consistency; every aisle; released/coming-soon selection; issue handoff; favourite local/account boundary; trailer and post-episode route labels; keyboard/focus/reduced-motion; index/media/network failure; and page semantics/visual hierarchy.

**VERIFIED PUBLICLY** requires the same bounded real-origin journey plus a production analytics configuration check. Existing public mobile route-load evidence does not prove the complete storefront outcome.
