# BRONZE AiGE Launch Deep Dive

**Date:** 2026-07-25
**Status:** REPORT READY — source inspection complete; fresh rendered and real interaction proof unavailable
**Launch verdict:** **PARTIAL LOCAL STATE AND FRESH JOURNEY UNVERIFIED; owner visual review required.**

## Executive verdict

The BRONZE AiGE has an unusually coherent social job: turn vague “let's talk AI sometime” energy into a small, self-organised happy hour with a playful drink picker and a useful conversation menu. The current source meaningfully improves the old worksheet: it presents a bar-room hero, six labelled controls, one-open-at-a-time in-place panels, local state-on-arrival, an embedded fortune-teller, a spirit-free lane, an invite builder, weekly coaster stamp, episode explainers and live-stage controls.

It is not yet safe to promote as a fully verified bar experience. This run could not test the current candidate in a browser or public origin. Its state and rewards are local only; the runtime episode fetch, audio, clipboard, calendar, links and mobile focus flow remain unverified. The design brief's best version—a crisp, straight-on Cosmo-led operable bar—is not present, so current visual completion is **OWNER REVIEW REQUIRED**.

## Evidence and limitation

Inspected current `bronze-aige.html`, `content/bronze-aige-v2.css`, `content/site/bronze-aige-v2.js`, `content/site/bws-data.js`, `games/businesswomens-special.html`, the Cocktail Fortune redirect, building brief, registry, prior activity audit and 2026-07-24 Bronze QA capture inventory.

The browser connection was unavailable. No current rendered desktop/mobile, keyboard/screen-reader, clipboard, `.ics`, audio, local-storage-denial, episode-fetch or public-origin test was run. The 2026-06 activity audit and 2026-07-24 captures are prior evidence, not recertification. The previously observed `games/businesswomens-special.html` file is present in the working tree; its functioning route was not tested.

## Intent, content and brand

The bar’s verb is **call a happy hour**. The best content is specific: bring a thing tried with AI, choose a mood/lane, receive a playful drink order, and use a four-item conversation menu including an episode-linked Wednesday Special. Framed answers turn the recurring “what is it, actually?” question into accessible explainers rather than a vague social feed. Ryan C / CHAR No.5 credit for the Main Character Spritz is retained in source.

The building brief requires a room-as-interface model inspired by LIBRAiRY: visible operable objects, no step-by-step worksheet, no invisible hotspots, no generic card grid and no retired gold/plum chrome. Implemented source does provide a full-bleed bar, labelled objects, in-place panels and a mobile bar-list. It still uses a bridge interior rather than the missing Cosmo scene; the standalone BWS page retains legacy gold-bordered/chrome styling. These are quality and consistency gaps, not grounds to erase working mechanics.

## New and returning journeys

| Journey | Source evidence | Status | Gap / next proof |
| --- | --- | --- | --- |
| Enter and choose a bar object | Six native buttons, labelled controls, `aria-expanded`, one-open panels and hash aliases. | **PARTIAL** | Fresh desktop/mobile focus, target-size and comprehension run needed. |
| Call a happy hour | Date/time seeds next Friday 4pm; builds copy, supports Clipboard API fallback and creates a local `.ics`. | **SOURCE IMPLEMENTED, UNVERIFIED** | It does not send invitations or reserve a venue; test copy/download/timezone/failure behaviour. |
| Pick a drink in bar | Embedded animation selects from `cocktailMenus`, writes `laidies_bws_drink`. | **SOURCE IMPLEMENTED, UNVERIFIED** | Test all outcomes and storage failure; no consumption/availability claim. |
| Pick a drink at full table | BWS route contains four moods, cocktail/spirit-free lanes and local drink write. | **SOURCE PRESENT, ROUTE UNVERIFIED** | Test route, keyboard, animation, back path and reduced motion. |
| Returning state | Bar reads local drink and `laidies_bronze_coasters`; stamp limits to one ISO week. | **DEVICE-LOCAL HONOR SYSTEM** | No attendance, identity, cross-device or durable-reward proof. |
| Conversation / Wednesday Special | Browser fetches latest published episode then its issue JSON. | **SOURCE IMPLEMENTED, UNVERIFIED** | Test no data/failed fetch/stale data and source freshness. |
| Stage/audio | Time-derived live copy and `playLaidiesTheme` button exist. | **SOURCE IMPLEMENTED, UNVERIFIED** | Test time boundary, playback, pause and failure recovery. |
| Cocktail Fortune route | `/games/cocktail-fortune.html` immediately redirects to Mme CLAi-O. | **ROUTE RELATIONSHIP PRESENT** | Keep it distinct from BWS and check public redirect behavior. |

## Persistence, safety and privacy truth

The browser writes selected drink JSON to `laidies_bws_drink` and coaster weeks to `laidies_bronze_coasters`; BWS's all-four-corners badge is not persisted. These are appropriate for lightweight delight only when copy says so. A local drink can inform the bar state line, but it does not establish a Resident Card save or account profile.

The page has no backend or form submission in the inspected scope. The invite and calendar are generated locally; “your own bar” is the correct product boundary. The spirit-free lane is a strong inclusion choice. What remains unresolved is the approved policy for alcohol-related wording—age, availability, responsible use and health implications—which must be set by the owner rather than inferred from a playful menu. No personal conversation text is collected by this product; preserve that advantage by forbidding invite text, drink choice and raw session replay from product analytics evidence.

## Analytics and upkeep

Plausible and Clarity tags are present, but the stewardship registry says analytics pulls, scheduler and persistent runner are **NOT WIRED**. If authorised after privacy review, use controlled events only: `bronze_station_opened`, `happy_hour_invite_copied`, `happy_hour_ics_downloaded`, `bws_lane_selected`, `bws_drink_revealed`, `bronze_coaster_stamped`, `bronze_episode_prompt_loaded` and controlled failure class. Do not collect the invite text, drink name, selected mood, discussion content, account identifier or raw recordings.

Per episode, check published data and the framed-answer relationship. Monthly, audit route/media integrity, drink/menu source/credit accuracy, spirit-free parity and local-state language. Quarterly, run fresh mobile/accessibility/visual evidence and review alcohol/service framing with Ali.

## Launch disposition

### FIX BEFORE LAUNCH

1. Run the exact-candidate journey suite across mobile, keyboard/reduced motion, BWS route, local state, clipboard/ICS, episode fetch, audio and failure modes.
2. Ensure every persistence/reward phrase clearly says browser-local or session-only unless an authoritative shared lifecycle is demonstrated.
3. Establish owner-approved alcohol/service boundaries and retain equal spirit-free access.
4. Verify BWS, Resident Card, KSVL and Mme CLAi-O route/media behavior on the candidate/public origin.

### HIDE/LABEL FOR LAUNCH

- Do not call a copied invite a sent invitation, booked event or real-world attendance.
- Do not promote keeper/Cosmo presence or the bridge interior as the final approved room.
- Do not call coaster, drink or badge state durable, account-saved or reward-authoritative.

### POST-LAUNCH EXPERIMENT

Test one privacy-safe comprehension question and controlled aggregate interaction events before interpreting station clicks. Then test whether episode-linked prompts create a useful return cue without becoming a streak or data-collection mechanism.

### DECLINE: revenue before trust

Do not charge for drink selection, membership/regular status, social access, invitations or attention. The only responsible future consideration would be an optional non-alcoholic physical/print ritual artifact, after free value, safety policy, fulfilment/accessibility and Ali approval are established.
