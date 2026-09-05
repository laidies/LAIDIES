# LUMINAiRY card and profile single-owner handoff — 2026-09-05

**Status:** DECIDED / HANDOFF COMMITTED / IMPLEMENTATION NOT STARTED HERE

**Single owner:** Codex task **Complete patron profiles** (`01a0308b-140d-7263-aebd-00aa52264775`).

## Ali's direct card-front decision

The archive cards are covers, not compressed profile pages. Each front contains only:

1. the approved portrait or collective image;
2. the role line, such as **PATRON SAiNTS OF TRENDSETTING**; and
3. the person or collective name, such as **Cher Horowitz + Dionne Davenport**.

Do not show the full description, lesson, evidence, resources or other profile-body copy on the card front. The entire card is the clear link to that Luminary's complete profile page. The choose/save-to-**Your Luminaries** action belongs on the complete profile page so the archive front stays a strong visual invitation rather than a second profile.

## Exact visual reference already in the repository

- Image used in Ali's supplied reference: `assets/saints/y2k-stained-glass-v2/cher-dionne-trendsetters-y2k-stained-glass-v2.png`
- Existing profile record: `content/luminairy-profiles.json` → `Cher Horowitz + Dionne Davenport` / `PATRON SAiNTS of Trendsetting`
- The supplied screenshot adds a clean cream information panel beneath that image, with the pink uppercase role line followed by the large ink-navy name. It is direction for hierarchy and card-front content, not authority to bake text into the image.

## Work to preserve and integrate

The owner task must compare its branch/worktree with these exact local commits before editing shared LUMINAiRY paths:

- `75e0f600e8ebb8dd1d6aa2bb48d616fce7abf8ef` — reconciles the approved Matron Lumen hero with the complete 13/23/7 profile archive.
- `a053c233ddfdc30357a2539948ea31330d330b57` — explains the three-pick purpose and makes **Your Luminaries** account-backed for signed-in residents while preserving signed-out local use.

The integration must preserve:

- the approved plant-free Matron Lumen hero and current LUMINAiRY colour system;
- all 43 profiles and 108 admitted typed destinations;
- search, wing tabs, keyboard behavior, songs and responsive behavior;
- `laidies_luminaries_v1` account continuation and the My Closet destination; and
- private picks hidden from public Resident Card mode.

## Write boundary

This task (`Update Ms Jeeves character`, `01a05d83-7a19-70f0-8cd0-b449f7bbce55`) stops card/profile-page implementation after this handoff. It will not edit `content/site/luminairy-app.js`, `content/luminairy-v2.css`, `content/luminairy-profiles.json`, the Luminary profile destinations or card markup while the owner task is building them.

No push or deployment is authorized by this handoff.
