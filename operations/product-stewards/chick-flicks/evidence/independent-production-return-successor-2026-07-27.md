# Chick Flicks production return successor — independent verdict

**Verdict:** `ACCEPT — BOUNDED LOCAL PRODUCTION RETURN EXPERIENCE`  
**Reviewed:** 2026-07-27  
**Scope:** the production `chick-flicks.html` return-state repair only. The rejected Wave 2 visual candidate is explicitly outside this review and receives no integration or design acceptance.

## Frozen inputs

| Input | SHA-256 | Result |
| --- | --- | --- |
| `chick-flicks.html` | `8a52dfb906733fbdfef75ea4ffcc268846fcbcfeb3e03ffe51a4d1d8f1f5c8c2` | matches supplied frozen byte |
| `content/chick-flicks.css` | `6c6bdd1f0d8e56a88f6cc05fca3fe061feb80ec26857fa251c78e7b93d8a6689` | matches supplied frozen byte |
| contract test | `d423dc1b7ff429cfb6982fd82de9f201ac759a2909112f4e316b6184b7e6dd20` | matches supplied frozen byte |
| browser test | `d1ba51f8de729b44a0661cc34a4f3f201e2724354d370777a30c98faf242a768` | matches supplied frozen byte |

## Independent reproduction

```text
CHICK FLICKS CONTRACT PASS (12 checks)
CHICK FLICKS BROWSER PASS (25 journeys)
```

The real local browser suite passed first visit, released/forthcoming/unavailable truth, all aisles, keyboard selection, destination validation/retry, broken cover fallback, stale and malformed index fail-closed behaviour, reduced motion, and 320/390/1280 plus 200%-proxy containment.

### Exact return-state results

- A valid `laidies_cf_last_rental=02` record renders the device-local return panel, names Episode 02, and **Continue with this tape** selects/focuses exactly that tape.
- **Clear and start over** removes only `laidies_cf_last_rental`, hides the return panel, retains the separate favourite record, and focuses the latest-tape action.
- A forthcoming (`05`) or corrupt (`{wrong`) stored value is cleared and never rendered as a return prompt.
- When removal is denied, the return stays visible, focus remains on Clear, and the page reports the device-only failure rather than pretending it succeeded.
- Favourite storage denial likewise reports only device-local failure and creates no Resident Card or account claim.

## Boundary and visual-scope checks

The production source contains no reference to `operations/design-explorations/building-wave-2`, no complete-store candidate/return-successor marker, and no account-history, completion, reward-balance, or butterfly-clip copy. Its current room assets are production page assets, not a reference to the rejected Wave 2 candidate.

The page states only device-local favourite/last-rental behaviour. A released tape’s action is an exact issue handoff; selecting, taking home, or returning to a tape does not claim completion, ownership, a reward, an account, or cross-device history.

## Remaining limits and exact next action

This ACCEPT validates the local production return interaction only. It does not approve the rejected Wave 2 visual direction, media admission, episode-release schema, Screening Room/player return, account-backed history, Closet propagation, Safari/VoiceOver/native-device evidence, analytics, deployment, or public-origin verification.

**Exact next action:** retain the production return repair as bounded local evidence. Advance only a separately accepted store ↔ player ↔ issue return contract and an independently admitted episode/media package before making broader Chick Flicks or release claims.

## Learning scan

The repaired behaviour confirms the relevant prevention rule: a successful local write is not a return experience until the current authority validates, exposes, clears, and restores focus for that record. No new qualifying learning entry is needed for this judge-only scope.
