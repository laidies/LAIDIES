# Blend & Snap Launch Deep Dive

**Date:** 2026-07-25
**Status:** REPORT READY — source and existing-QA inspection complete; fresh rendered-flow evidence blocked
**Launch verdict:** **REVISE INTERNALLY; label unbuilt Study Sheet and local-only collection/progress honestly.**

## Executive verdict

The Blend & Snap has a coherent, differentiated job: it turns the weekly episode into a human ritual. The strongest mechanics are the live current-pack menu, JoJo’s local “usual” memory, an in-place order receipt, past-pack menu, visible noticeboard routes and a deliberately honest Try-On that gives a user a practical move without pretending to execute her AI task.

The building is not yet one trustworthy Study Pack product. The menu dynamically identifies a published episode, but it does not have a canonical component-status manifest. A Study Sheet is planned rather than built; Trading Cards have local collection mechanics but incomplete experience/sync evidence; and the café writes `laidies_bs_last_pack` when the visitor opens the issue link. That is a valid “picked up/opened” signal, not proof she studied, practised, collected cards or learned the lesson.

## Evidence and limitations

### Inspected

- Current `blend-snap.html`, `try-on.html`, `games/trading-cards.html`, card-pack data and weekly episode-index wiring.
- The Blend & Snap building brief, Try-On decisions and 2026-07-24 visual QA, trading-card economy/build plan, activity audit, Study Pack architecture, launch matrix, registry and shared event dictionary.

### Limitation

The browser connection remains unavailable, so this run has no fresh screenshots, rendered keyboard/mobile checks, visual inspection or public-origin flow. The 2026-07-24 Try-On QA is prior local evidence, not recertification. Source claims below are labelled accordingly.

## Intent and weekly relationship

The café owns the coffee/AI-memory metaphor: a useful “usual” comes from specific context built over time. Its visitor verb is **ORDER**. A published episode should create one current pack; Blend & Snap helps a reader enter it, while the component jobs stay distinct:

- Episode / Chick Flicks: explains the lesson.
- Study Sheet: compact review (planned, not a live complete route).
- Try-On: real-world practice.
- Cheat Sheet: durable reference/download.
- Trading Cards: collect and remember.
- Quiz / SUNNYVAiLE High: check understanding and own any reward.

The café must therefore coordinate, not claim, downstream completion.

## New and returning journeys

| Journey | Source evidence | Verdict | Gap / risk |
| --- | --- | --- | --- |
| First café visit | JoJo state line says the pack is on the house; drink buttons create a local usual; menu Special opens an in-place receipt. | **PARTIAL** | Fresh visual/mobile/comprehension evidence unavailable; a no-JS/fetch failure needs an explicit useful route. |
| Returning visitor | `laidies_bs_usual` selects “your usual”; current key compared with `laidies_bs_last_pack` produces fresh/caught-up copy. | **PARTIAL** | Same-device only; state can overstate actual completion because it is stamped on issue navigation. |
| Order current pack | Published episode data selects latest entry; receipt links to its issue page. | **PARTIAL** | No component-status contract; published episode does not prove every Study Pack element exists or is ready. |
| Past packs | The Regulars lists prior published episodes. | **PARTIAL** | No evidence all historical components and return paths match current labels. |
| Noticeboard | Eight labelled links route to related town products. | **PARTIAL** | Links need exact public and access-state checks; visual target sizes/board legibility unverified this run. |
| Try-On | Episode configurations, copy-to-clipboard recovery, local notes/rating, local completion marker and return path exist. Prior QA checked issues 1–4, 1440/390, save/reload and no horizontal overflow. | **VERIFIED LOCALLY FROM PRIOR QA** | Current exact-candidate and accessibility/browser rerun remains open. |
| Trading Cards | Pack selector, flip, duplicate count, filter, last pulls and local store exist. | **PARTIAL** | Audit flags generic web-game presentation, mobile collection scanning, terminology, pack/duplicate and sync proof. |
| Quiz handoff | Café routes to SUNNYVAiLE High. | **PARTIAL** | Receiving-product assessment/reward proof is outside this building and must not be implied here. |

## Visual, brand and accessibility assessment

The implemented source already has a coherent JoJo/café palette—midnight/aubergine, pink, purple, cyan, mint, coral and lime—and associates the room with a real counter, Special and noticeboard rather than abstract study cards. The build brief’s stronger locked target is still the LIBRAiRY-style object interface: separate, obviously clickable menu-board and corkboard renders composited into the room, no hotspot hunting, menu state in the largest arrival type, and an in-place order slip.

The source uses labels, native buttons, headings, aria labels for noticeboard targets and `aria-live` for the receipt. Try-On source provides labelled controls and live statuses. Those are source-level positives, not an accessibility pass. Fresh checks are required for focus order and focus containment, image/noticeboard contrast, keyboard access to the Special and drink selectors, reduced-motion behaviour, mobile tap targets, dynamic receipt announcements, card flipping semantics, and local-storage failure messaging.

## State, rewards and content plumbing

- **Café:** episode index fetch selects the latest `published` episode. If the fetch fails, the menu says it is being restocked. The local usual and last-pack key are deliberately browser-local.
- **Try-On:** local JSON captures notes, rating and issue completion. It truthfully copies a prompt/task into the user’s own approved AI tool rather than creating output or pretending to verify it.
- **Cards:** collection, metadata and last pulls are local browser stores. The source itself notes that this does not emit an authoritative shared reward event or become a Clubhouse Pass store.
- **Reward truth:** cross-device savings remain shared identity/platform work. No Blend & Snap page may call device state a membership, account reward, earned learning result or durable collection.
- **Content freshness:** the current-pack display depends on episode index correctness; each component must also be checked against its episode canon and actual availability before the café sells it as this week’s pack.

## Analytics contract

The existing analytics scripts are not a product-learning loop. Add only privacy-safe aggregate events; never send task notes, copied prompts, personal reflection text, usual-drink labels, raw session recordings or account information.

- `blend_snap_viewed`, `blend_snap_usual_selected`, `study_pack_order_opened`, `study_pack_issue_opened`;
- `study_pack_component_opened` with controlled component ID/status;
- `try_on_started`, `try_on_prompt_copied`, `try_on_saved`, `try_on_save_failed` (no note body);
- `trading_pack_opened`, `trading_card_flipped`, `trading_duplicate_seen`, `trading_collection_viewed`;
- `quiz_handoff_opened`; and
- controlled failure classes for episode-index, local save and card-data failure.

Establish a baseline and guardrail before interpreting a result. More orders, card flips or prompt copies are not evidence of learning; pair them with qualitative feedback and the receiving product’s verified outcome.

## Launch gaps and disposition

### FIX BEFORE LAUNCH

1. One canonical weekly-pack availability contract must prevent the café from presenting missing/held components as part of a complete pack.
2. Change or reinforce any wording that lets “all caught up” mean learning completion rather than device-local pack pickup/opening.
3. Make local-only cards, Try-On notes and any future Closet handoff unambiguous; do not imply Clubhouse Pass sync.

### HIDE/LABEL FOR LAUNCH

- Study Sheet as planned until one complete, episode-specific, owner-reviewed unit exists.
- Any card pack/collection or reward state not verified on the exact candidate, especially account/cross-device wording.
- Visual/noticeboard interaction claims until a current rendered mobile/desktop pass exists.

### POST-LAUNCH EXPERIMENT

After truth and instrumentation exist, compare three return cues—JoJo’s café state line, episode-page pack reminder and a restrained Bag cue—to learn which genuinely brings a reader back without turning the town into a streak machine.

### Ethical revenue opportunity

There is a plausible future for optional, well-made study objects (for example a printable physical pack or deliberately premium digital binder), but only after the free weekly journey is coherent and trusted. It must not gate core teaching, reward scarcity, quiz access or local saved work; it needs fulfilment/cost evidence, accessible free equivalents and Ali’s explicit decision.
