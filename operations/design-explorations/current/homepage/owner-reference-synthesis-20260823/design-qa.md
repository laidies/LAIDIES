# Homepage corrected-10 design QA

## Bound visual truth

- Owner reference: `operations/design-explorations/reference/homepage/20260823-owner-shortlist/example-01-primary-editorial.png`, SHA-256 `46789f447c25356038d996b4dd9dcf9f5559d8556cc6ae41ea8ec5e820a0c02d`.
- Candidate: `operations/design-explorations/current/homepage/owner-reference-synthesis-20260823/index.html`, SHA-256 `da6bac4857191967f73dd8ff31a2218663fd6173eb757b183c2da4697b253fd5`.
- State: owner-review direction only. It is not production integration, deployment or public verification.

## Exact browser evidence

Primary viewports:

- `evidence/desktop-1440.png` — 1440 × 900, SHA-256 `dbe3e8c3bc03145aa97b537fee53b3d582f2a47e078c1d96d2dc1ec35a2b83b1`.
- `evidence/intermediate-900.png` — 900 × 900, SHA-256 `4de75335806308a7670ec12512054191a835433eaeda79e9fd84a28f12af4862`.
- `evidence/owner-877x915.png` — 877 × 915, SHA-256 `e3b25126c1f77fd634bee1ae254564d993f6324e31e0f57a363caf89de2461f8`.
- `evidence/mobile-390.png` — 390 × 844, SHA-256 `7c35dfa5c0ba5fcc46db2f282aefe0f511ee77f0dc91ea8fc6f01003c58d5b36`.
- `evidence/first-session-ident-1440.png` — 1440 × 900, SHA-256 `93ff1aad6e37b1c56d1ed0ae1d1c874821350b5520cac37b45736ebd901f02d6`.

Focused desktop surfaces:

- `evidence/desktop-intents-1440.png` — SHA-256 `dce11488c16b551800f9d16fc31b0dc7f9ac3b50e99956cb4017b7995159f794`.
- `evidence/desktop-weekly-loop-1440.png` — SHA-256 `625cad4244bca13a81adee30eda1c080fba70d329810f77bb211c661bbde9b25`.
- `evidence/desktop-activities-1440.png` — SHA-256 `0f7d76154621a1830da8d9b1a8bb9ab5d19f91858834bf8519ab915be6782291`.
- `evidence/desktop-directory-1440.png` — SHA-256 `babff86ad0a3781e118c4b6591efc90613fa36c22065eb94f2c8996f8e9233e7`.
- `evidence/desktop-continuations-1440.png` — SHA-256 `4d18374eb4b5600b4763d365b5a429f09e775da3d81d94464ba2de03c65863f1`.

Focused mobile surfaces:

- `evidence/mobile-intents-390.png` — SHA-256 `11874e039d138c0d858a4c6a6bfd6daea72ccdd356c0885eae5919470d122d8e`.
- `evidence/mobile-weekly-loop-390.png` — SHA-256 `b766f6d3b66a1078b7794b674de32f76dac69c03441194d242b32b9a2f99bd52`.
- `evidence/mobile-activities-390.png` — SHA-256 `e25f355a5dda07c5ec482c52fba8aef71d1121a922457b54cf1b8c90aa9f5ee2`.
- `evidence/mobile-directory-390.png` — SHA-256 `635e7fa71aa4f5edc79d9f51c8854c8fc45496d018d07afebbc6b2b020110b6c`.
- `evidence/mobile-continuations-390.png` — SHA-256 `152cce7ed662f1aa4f18c92fae054e6aec6863b21b382c973933197120bc3136`.

## Owner corrections resolved

- The exact shared gradient header and LAiDIES wordmark remain visible; the direct links map to real page sections or destinations.
- The masthead retains the locked dusk image, compact replay control, visible Sign in and KSVL listening action, accent-coloured Rewind Era, SUNNYVAiLE, Be kind, rewind and Girl Power meets Machine Power, plus the blinking connected cursor.
- The recovered arrival stays inside the masthead: dial-up, connected state, first static line, complete canonical ident, second static line, then the masthead expands from that line.
- Learn routes to the LIBRAiRY and LUMINAiRY; SUNNYVAiLE High remains future-qualified. The five intent groups and all six current Tools and Games are visible.
- The rejected glossy FAiRY portrait is absent. Both Homepage uses now show the current Willow Lane house image.
- The Wednesday section explains the trailer, current-or-device-resume episode, eight-stop loop, device-local progress and the complete Free Time scope.
- The map contains all 17 canonical destinations in order. Activating a building card lights the matching map marker and opens its address, job, contents and `Visit building` action.
- The Visitor's Centre is described only as town orientation and navigation. AI concept learning remains with the LIBRAiRY, LUMINAiRY and future High.
- `What's happening in SUNNYVAiLE` remains deferred until the NewsStand build can supply its truthful current data.

## Browser checks

At 1440 × 900, 900 × 900 and 390 × 844:

- horizontal overflow: `0`;
- broken images and HTTP failures: `0`;
- console and page errors: `0`;
- directory entries: `17` in canonical `01`–`17` order;
- activity cards: `6`;
- weekly stops: `8`;
- mobile header retains the direct LIBRAiRY link.

Interaction checks:

- Arrival phase trace: dial-up at load; connected at approximately 1.45 seconds; first static at 2.30 seconds; ident opening at 2.66 seconds; canonical video duration `4.666667` seconds; second static when the ident ends; masthead opening after 360 milliseconds; arrival removed after the 1.05-second expansion and 520-millisecond fade.
- Pause held the initial phase unchanged for 2.2 seconds, changed its label to `Resume arrival`, and resumed successfully.
- Reduced-motion preference bypassed the arrival and exposed the masthead immediately.
- Visitor's Centre map test: matching marker active, dialog open, correct destination name/address and `/visitors-centre.html` visit link.
- Post Office contract: PASS. Resident Card contract: 58/58 PASS. Shared Resident Card contract: 34/34 PASS. Visitor's Centre contract: PASS.

## Independent review

The role-distinct pixel-first reviewer compared the exact owner reference and the corrected desktop, intermediate, owner, mobile, arrival, intent, weekly-loop, activity, directory and continuation pixels. The reviewer returned `ADMIT`, with `0` visible regressions, `0` locked-decision violations and `0` review issues. The verdict is bound in `evidence/independent-corrected-8-verdict.json`.

## Not proved by this direction

- This is not Ali's approval, production integration, deployment or public verification.
- Account-backed `what changed since your last visit`, account-backed episode progress and cross-device state remain held.
- The Homepage current-news module remains held until the NewsStand build supplies a truthful producer and freshness contract.

final result: passed for Ali review; not owner-approved or deployed
