# Homepage corrected-8 design QA

## Bound visual truth

- Owner reference: `operations/design-explorations/reference/homepage/20260823-owner-shortlist/example-01-primary-editorial.png`, SHA-256 `46789f447c25356038d996b4dd9dcf9f5559d8556cc6ae41ea8ec5e820a0c02d`.
- Candidate: `operations/design-explorations/current/homepage/owner-reference-synthesis-20260823/index.html`, SHA-256 `e5ce960599f8aa147ffdba47ec39e8dba523066db5a231f14d3528a805949d6d`.
- State: anonymous visitor. The latest admitted NewsStand issue is correctly shown as an archive, not current. Returning-state behavior remains device-local.

## Exact browser evidence

Primary viewports:

- `evidence/desktop-1440.png` — 1440 × 900, SHA-256 `8f8dbb8a3e43661347f566650ca40d28b12b1cf5521e6ff4155755d56ad90799`.
- `evidence/intermediate-900.png` — 900 × 900, SHA-256 `a6f94e5a3664f4e9975b604ccfea257c61bd875795548f4af0777af0706470c3`.
- `evidence/owner-877x915.png` — 877 × 915, SHA-256 `4b77f2f0579c1986b049bee37b8c02bd40131d2fd38e55182b79590ba8e9035c`.
- `evidence/mobile-390.png` — 390 × 844, SHA-256 `135a5dbbb3fcc98a5d78cc88885491b87ad98e86b78fa3871b8a6989f8607db3`.
- `evidence/first-session-ident-1440.png` — 1440 × 900, SHA-256 `86cf42fda91cb66293091e74ff93c759cc5cc9d26d6a727400707d22a4cc411a`.

Focused desktop surfaces:

- `evidence/desktop-daily-1440.png` — SHA-256 `709fc85bade4bd254db748dc34bfa8136f559a9e0963f3abebe35fda1517ca7e`.
- `evidence/desktop-intents-1440.png` — SHA-256 `e0d18cf19023d2d766e4982817ece5a0a4a531798cad745c0c3b8bb193d6cde1`.
- `evidence/desktop-weekly-loop-1440.png` — SHA-256 `94f0b6bdf33aac08df897ad84c97d5f7ad1ee0102fd7161358c72fd62af0206b`.
- `evidence/desktop-activities-1440.png` — SHA-256 `0bc94834e88139f41379ea0780c92e0a1cbc4cf3d860b3aa90bc060c3f04def1`.
- `evidence/desktop-directory-1440.png` — SHA-256 `b6dd2a2a502eb6fc4891b55eabbb54c763d71629d4da71f4991ac4c02f111758`.
- `evidence/desktop-continuations-1440.png` — SHA-256 `ec8b2fd00e5e2558b25964736c216a5437cd053c259faa74f324ffa8492d5a44`.
- `evidence/desktop-ksvl-1440.png` — SHA-256 `a4202dffa4a6f22473b9db987ec6f3cefca67437275d3f3ef80c7275f98621c7`.

Focused mobile surfaces:

- `evidence/mobile-intents-390.png` — SHA-256 `eeca3c03076a2b4a5c528e026d6479f16d853885d6224573c9b47633c7a7ea00`.
- `evidence/mobile-weekly-loop-390.png` — SHA-256 `60910681598160e502dc19f18950545ee9a5dd22744f2188a70ef8e0948da84f`.
- `evidence/mobile-activities-390.png` — SHA-256 `e9779ddf4327aa7199af80241cc370302eef136cfe4f7750207c4c8a00677d98`.
- `evidence/mobile-directory-390.png` — SHA-256 `f96ec2f322d35171b8d5c6d00db56c4f84cba3e03baf2467fa7a9da3794b36a4`.
- `evidence/mobile-continuations-390.png` — SHA-256 `b1b76e5b05b8c42550534a10ed31a26b1b4d02a4e16e1e1e6bb6c1c976e66ef4`.

## Owner corrections resolved

- The shared gradient header, custom LAiDIES wordmark, masthead copy, masthead actions and visible KSVL control are retained.
- Learn routes to LIBRAiRY and LUMINAiRY; SUNNYVAiLE High is explicitly future-qualified.
- Tools and Games shows four distinct sources at entry and all six current activities below: FAiRY Godmother, Mme CLAi-O, Businesswomen’s Special, Dream Phone, Girl Talk and DJ Booth.
- The weekly section explains the trailer, current-or-device-resume episode, eight-stop loop, device-local progress and Free Time scope.
- Delta LAi Nu, Post Office and KSVL use the exact paths bound in the routed Homepage brief.
- The map directory contains all 17 canonical destinations in six street groups. MAiN and Civic are packed as horizontal address rows; the remaining four streets are equal peers without empty card canvas.
- The Daily exposes actual admitted headlines and service items. Because the repository has no current Daily on 2026-08-23, it visibly says `No current Daily is filed` and labels the latest issue `Archive · Aug 6, 2026`.

## Browser checks

At 1440 × 900, 900 × 900 and 390 × 844:

- horizontal overflow: `0`;
- broken images: `0`;
- visible controls below 44 px: `0` before the player opens;
- visitor-visible `Play` family: absent;
- directory entries: `17` in canonical `01`–`17` order;
- directory groups: MAiN Street, Civic Square, Schoolhouse Road, Willow Lane, Wisteria Lane, Lantern Hill;
- activity cards: `6`;
- weekly stops: `8`.

Interaction checks:

- The dial-up arrival renders with both `Pause arrival` and `Skip arrival`.
- `Listen live — KSVL 99.9` opens the canonical shared KSVL player and begins `Welcome to SUNNYVAiLE`.
- The candidate raises shared player icon controls to a 44 px minimum width; no player control remains below the 44 px target.
- Browser console errors and warnings: `0`. KSVL emits only its existing technical start log.

## Review history and ratchet

1. The predecessor was rejected for wrong/retired art, invented copy, missing explanation, ungrouped destinations, an unexplained route and a dark/pastel split.
2. Corrected-7 was independently rejected before owner review because it called Aug 6/3/Jul 27 records “newest” and the directory left dead cyan canvas around short street groups.
3. Corrected-8 now fails closed on NewsStand freshness and packs the directory into MAiN, Civic and four cross-street bands. Exact desktop and mobile pixels were recaptured after both repairs.

## Findings

Maker inspection found no remaining P0, P1 or P2 defect. The role-distinct successor review inspected the exact desktop, intermediate, owner, mobile, arrival, Daily, intent, weekly, activity, directory and continuation pixels and returned `ADMIT` with zero visible blockers or locked-decision violations.

## Not proved by this direction

- This is not owner approval, production integration, deployment or public verification.
- The NewsStand archive state is truthful but also exposes an editorial freshness gap outside this Homepage design scope.
- Account-backed `what changed since your last visit` and cross-device episode progress remain held; the page does not claim they work.

final result: passed for owner review; not owner-approved or deployed
