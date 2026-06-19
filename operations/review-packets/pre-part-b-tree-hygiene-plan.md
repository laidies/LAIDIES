# Pre-Part B Tree Hygiene Plan

Date: 2026-06-19

Purpose: prepare Ali to decide how to clean or park the remaining dirty working tree before starting Part B. This pass is a review and classification only.

No staging, committing, pushing, reverting, deleting, or moving was performed.

## Guardrails

- A1 foundation cleanup has already been committed and pushed.
- A2.2 approved homepage masthead has already been committed and pushed as `f8fce39 Implement approved homepage masthead`.
- This plan does not start Part B.
- This plan does not touch backend/signup/Supabase/Buttondown integration work.
- This plan classifies the current `git status --short` entries. For untracked directories shown by Git, the classification applies to the directory and its nested contents. Repeated generated screenshot entries are grouped in the main tables and listed individually in Appendix A.

## Commands Run

- `git status --short`
- `git diff --name-only`
- `git diff --cached --name-only`

Results before creating this plan:

- Dirty `git status --short` entries: 206
- Tracked files with diffs: 51
- Staged files: 0

After this plan is created, the tree will have one additional untracked review document:

- `operations/review-packets/pre-part-b-tree-hygiene-plan.md`

## Category Summary

| Category | Meaning | Count by hygiene-plan entry |
| --- | --- | ---: |
| A. REVERT SAFE | Tracked changes that looked safe to revert to `origin/main` after the A2.4 reinspection. | 1 |
| B. PARK FOR PART B | Future Interactive World Objects, site architecture, weekly ritual, community-room, Book of Receipts, or Episode 1/2 alignment work. | 44 |
| C. PARK FOR PART C | Future backend, subscriber, persistence, signup, Supabase, Buttondown, Magic Link, card/backend work. | 0 confirmed |
| D. KEEP REVIEW DOC | Useful operations, QA, process, or review history that should not be committed until a documentation pass is approved. | 28 |
| E. DELETE/REMOVE CANDIDATE - NEEDS ALI APPROVAL | Untracked generated candidates, rejected mastheads, prototypes, screenshots, or temporary outputs that may be removable but need Ali approval. | 111 |
| F. UNKNOWN / DO NOT TOUCH | Ambiguous or approved-but-not-shipped brand assets that should be preserved until a dedicated decision. | 3 |
| G. PARK FOR FUTURE WEEKLY PRODUCTION / SOCIAL ENGINE | Social engine, weekly production engine, future episode workflow, article/social/email production scaffolding, and launch visual tooling. | 16 |

## A. REVERT SAFE

These tracked files appear to contain rejected, unapproved, or unrelated experiments that can be restored to `origin/main` without losing approved A1/A2.2 work or future weekly production/social engine scaffolding.

| File path | State | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `games/girl-talk.html` | tracked modified before A2.4 restore | Low-risk JS variable/function rename only; not Part B, not production engine, not social engine. | Reverted in A2.4 with `git restore -- games/girl-talk.html`. | Low |

## B. PARK FOR PART B

These files contain future site architecture, Interactive World Objects, Wednesday Bag, Book of Receipts, Clubhouse, community-room, or Episode 1/2 alignment work. They should not be committed now, but they may be useful for Part B planning.

| File path | State | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `index.html` | tracked modified | Contains unapproved homepage experiments, but also homepage portal, Book of Receipts, Join the Club, and world-object architecture ideas that belong in the Part B parking lot rather than being discarded now. | Park for Part B; do not revert in A2.4. | High |
| `clubhouse.html` | tracked modified | Mixed Clubhouse restructuring, footer cleanup, feature naming, and future hub copy. | Park for Part B Clubhouse architecture review. | Medium |
| `community.html` | tracked modified | Mixed community layout, room-card restyle, new footer, and community entry work. | Park for Part B/community-room review. | High |
| `community/ask-the-room.html` | tracked modified | Adds community-room shared behavior. | Park with community-room routing work. | Medium |
| `community/burn-book.html` | tracked modified | Adds local Back to Bag and community-room behavior. | Park with community-room routing work. | Medium |
| `community/chat-room-digest.html` | tracked modified | Adds community-room shared behavior. | Park with community-room routing work. | Medium |
| `community/comment-card.html` | tracked modified | Adds community-room shared behavior. | Park with community-room routing work. | Medium |
| `community/dear-laidies.html` | tracked modified | Adds community-room shared behavior. | Park with community-room routing work. | Medium |
| `community/mix-cd-exchange.html` | tracked modified | Adds community-room shared behavior. | Park with community-room routing work. | Medium |
| `community/send-it-energy.html` | tracked modified | Adds community-room shared behavior. | Park with community-room routing work. | Medium |
| `community/try-on-debrief.html` | tracked modified | Adds draft-preserving Back to Bag behavior and community-room script. | Park for community-room return behavior. | Medium |
| `community/wins.html` | tracked modified | Adds community-room shared behavior. | Park with community-room routing work. | Medium |
| `community/weekly-prompts/issue-01.md` | tracked modified | Episode 1 prompt/link/template cleanup. | Park for Episode 1/2 template alignment pass. | Medium |
| `community/weekly-prompts/issue-02.md` | tracked modified | Episode 2 prompt/link/template cleanup. | Park for Episode 1/2 template alignment pass. | Medium |
| `content/episode-index.json` | tracked modified | Episode 1/2 labels/release date/data migration work. | Park for controlled data migration validation. | Medium |
| `content/episodes/issue-01.json` | tracked modified | Episode 1 data migration. | Park for controlled data migration validation. | Low |
| `content/site/quizzes.json` | tracked modified | Quiz data/casing cleanup touches reader-facing content. | Park for quiz/data validation pass. | Medium |
| `content/site/site-data.js` | tracked modified | Site data, routes, card image, labels, and release data changes. | Park for Part B/data architecture review. | High |
| `email/buttondown/issue-01.md` | tracked modified | Older email link/signoff cleanup. | Park for Episode 1/2 migration, not Part B launch cleanup. | Medium |
| `email/buttondown/issue-02.md` | tracked modified | Older email link/signoff cleanup. | Park for Episode 1/2 migration, not Part B launch cleanup. | Medium |
| `episodes.html` | tracked modified | Mixed archive restructure and stale dirty `Read Latest Episode` link. | Park; do not commit until link/copy is reviewed. | High |
| `hot-goss.html` | tracked modified | Mixed Book of Receipts return behavior, hero actions, and layout changes. | Park for Book of Receipts/Hot Goss review. | Medium |
| `learn.html` | tracked modified | Mixed Learn/SLAiYER hierarchy and section image work. | Park for Part B site hierarchy review. | Medium |
| `learn/glossary.html` | tracked modified | Mixed glossary return-link, hero, purpose, and action changes. | Park for Learn/Glossary review. | Medium |
| `reference-closet.html` | tracked modified | Mixed Lore Closet title/return cleanup and broader page restructure. | Park for Book of Receipts/Lore Closet review. | Medium |
| `start-here.html` | tracked modified | Mixed onboarding/site-map/footer cleanup. | Park for homepage/start-here architecture review. | Medium |
| `styles.css` | tracked modified | Broad LAiDIES world architecture pass affecting cards, panels, object frames, and responsive behavior. | Park for Part B only after dedicated visual QA. | High |
| `assets/charms/receipt-drawer-charm.svg` | untracked | Future Book of Receipts/ritual reward charm. | Park for Part B charm/reward system review. | Medium |
| `assets/home-book-of-receipts-closet-v1.png` | untracked | Candidate section image for Book of Receipts. | Park for Part B visual system review. | Medium |
| `docs/product/trust-layer-receipts-coven.md` | untracked | Future Book of Receipts/Receipts Coven concept. | Park for Part B product direction. | Medium |
| `operations/prototypes/assets/` | untracked directory | Prototype support assets, likely future interactive-world exploration. | Park only if Ali wants to preserve prototype history; otherwise needs delete approval. | High |
| `operations/prototypes/laidies-world-site-v1/` | untracked directory | Old/prototype world-site direction. | Park only if useful for Part B reference; otherwise delete approval. | High |
| `operations/prototypes/laidies-world-site-v2/` | untracked directory | Explicitly protected prototype folder from earlier Episode 3 work. | Do not touch without Ali approval. | High |
| `operations/prototypes/women-in-ai-spell-book.html` | untracked | Future Spell Book / Book of Receipts concept prototype. | Park for Part B concept review. | Medium |
| `operations/review-packets/site-polish-review-dashboard.html` | untracked | Visual review dashboard for site polish. | Park for Part B review if still useful. | Medium |

## G. PARK FOR FUTURE WEEKLY PRODUCTION / SOCIAL ENGINE

These entries are specifically protected by Ali's A2.4 clarification. They may be useful for the LAiDIES social engine, weekly production engine, article drafting workflow, launch email standards, carousel/Reel generation, or future episode production scaffolding. Preserved does not mean committed now.

| File path | State | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `scripts/build-episode-assets.js` | tracked modified | Episode asset/page generation script; even though the current diff is only a logo path, it belongs to the weekly article production workflow. | Park for future weekly production workflow; do not revert in A2.4. | Medium |
| `social/visual-preview/index.html` | tracked modified | Social visual preview page with LAiDIES casing, logo asset updates, and brand-polish loading; useful for future social preview tooling. | Park for future social engine; do not revert in A2.4. | Medium |
| `social/visual-preview/styles.css` | tracked modified | Social visual preview palette/style updates; useful for future social preview tooling. | Park for future social engine; do not revert in A2.4. | Low |
| `social/README.md` | tracked modified | Socials-engine instructions. | Preserve for future socials-engine workstream. | Medium |
| `social/episodes/issue-01-instagram-kit.md` | tracked modified | Older episode social kit edit that may become part of social workflow cleanup. | Preserve for future social standards pass. | Low |
| `social/episodes/issue-02-instagram-kit.md` | tracked modified | Older episode social kit edit that may become part of social workflow cleanup. | Preserve for future social standards pass. | Low |
| `social/episodes/issue-03-instagram-launch-package.md` | untracked | Episode 3 launch social package and learning-based social workflow artifact. | Preserve for future social engine/review. | Medium |
| `social/visual-preview/issue-03-instagram-launch/` | untracked directory | Episode 3 generated Instagram/Reel/story assets. | Preserve for future social-asset review and automation. | Medium |
| `operations/socials-engine/` | untracked directory | Future socials engine scaffolding. | Preserve for future social engine implementation. | High |
| `operations/weekly-production-engine/` | untracked directory | Future weekly production/article workflow scaffolding. | Preserve for future production engine implementation. | High |
| `operations/briefs/` | untracked directory | Future briefs/process inputs for weekly production. | Preserve with production engine workstream. | Medium |
| `scripts/start-socials-engine.js` | untracked | Socials engine launcher. | Preserve with future social engine workstream. | Medium |
| `scripts/start-weekly-production-engine.js` | untracked | Weekly production engine launcher. | Preserve with future production engine workstream. | Medium |
| `operations/weekly-reviews/issue-03-launch-social-packet.md` | untracked | Episode 3 social launch packet, useful for social standards. | Preserve for future weekly production/social docs pass. | Low |
| `assets/episodes/issue-03/` | untracked directory | Episode 3 generated article/social/image assets that may inform future article image standards and launch workflows. | Preserve until social/production asset-retention decision. | Medium |
| `content/printables/previews/issue-03-elle-receipts-pass-contact-sheet.png` | untracked | Printable preview artifact that may inform future weekly printable workflow. | Preserve until production asset-retention decision. | Low |

## C. PARK FOR PART C

No confirmed backend/subscriber/persistence files are dirty in this status snapshot.

Important: do not start or touch Supabase, Magic Link, persistence, Buttondown integration, LAiDIES Card backend, sticker/charm/badge persistence, or signup backend work from this tree-hygiene pass.

## D. KEEP REVIEW DOC

These files are operations/process/review records. They may be useful history, but should only be committed in a dedicated documentation commit if Ali approves.

| File path | State | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `assets/brand/README.md` | tracked modified | Brand notes mention approved/rejected masthead assets. | Keep for later docs/brand-system review. | Low |
| `operations/README.md` | tracked modified | Operations/process notes. | Keep for future operations cleanup. | Low |
| `operations/agent-council/issue-03-agent-council-review.md` | tracked modified | Episode 3 council review history. | Keep for later operations documentation pass. | Medium |
| `operations/agents/agent-charters.md` | tracked modified | Agent/council operating-system notes. | Keep for future process-system review. | Medium |
| `operations/agents/agent-council-operating-system.md` | tracked modified | Agent/council operating-system notes. | Keep for future process-system review. | Medium |
| `operations/agents/ceo-feedback-quality-standard.md` | tracked modified | Quality-standard/process notes. | Keep for future process-system review. | Medium |
| `operations/agents/weekly-agent-council-template.md` | tracked modified | Weekly council template notes. | Keep for future process-system review. | Medium |
| `operations/review-packets/homepage-masthead-candidates.md` | tracked modified | Masthead review history and approved 22A references. | Keep for masthead history; commit only in docs pass. | Low |
| `operations/weekly-command-center.html` | tracked modified | Generated operations command center. | Keep only if operations-dashboard history is needed. | Medium |
| `operations/weekly-command-center-files/issue-03-agent-council-review.html` | tracked modified | Generated command-center mirror. | Keep with command-center docs if approved. | Medium |
| `operations/weekly-command-center-files/issue-03-article.html` | tracked modified | Generated command-center mirror. | Keep with command-center docs if approved. | Medium |
| `operations/weekly-command-center-files/issue-03-buttondown.html` | tracked modified | Generated command-center mirror. | Keep with command-center docs if approved. | Medium |
| `operations/weekly-command-center-files/issue-03-community-prompt.html` | tracked modified | Generated command-center mirror. | Keep with command-center docs if approved. | Medium |
| `operations/weekly-command-center-files/issue-03-instagram-kit.html` | tracked modified | Generated command-center mirror. | Keep with command-center docs if approved. | Medium |
| `operations/weekly-command-center-files/issue-03-linkedin.html` | tracked modified | Generated command-center mirror. | Keep with command-center docs if approved. | Medium |
| `operations/weekly-command-center-files/issue-03-production-review.html` | tracked modified | Generated command-center mirror. | Keep with command-center docs if approved. | Medium |
| `operations/weekly-reviews/issue-03-production-review.md` | tracked modified | Episode 3 production review history. | Keep for later operations docs commit. | Medium |
| `operations/weekly-reviews/issue-03-launch-social-packet.md` | untracked | Episode 3 launch/social review packet. | Keep for later operations docs decision. | Low |
| `operations/review-packets/homepage-masthead-context-notes.md` | untracked | Masthead context notes. | Keep until Ali decides masthead history policy. | Low |
| `operations/review-packets/homepage-masthead-council-gate.md` | untracked | Masthead council gate notes. | Keep until Ali decides masthead history policy. | Low |
| `operations/review-packets/site-foundation-a2-final-cleanup.md` | untracked | A2 cleanup review history. | Keep as review doc. | Low |
| `operations/review-packets/site-foundation-a2-review-packet.md` | untracked | A2 review packet history. | Keep as review doc. | Low |
| `operations/review-packets/pre-part-b-tree-hygiene-plan.md` | untracked | This hygiene plan. | Keep as review doc. | Low |

## E. DELETE/REMOVE CANDIDATE - NEEDS ALI APPROVAL

These are untracked generated candidates, rejected assets, prototype artifacts, review screenshots, or temporary outputs. They may be removable, but do not delete without Ali approval.

| File path | State | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `assets/brand/laidies-homepage-masthead-bg-candidate-v10.png` | untracked | Rejected/wrong masthead candidate. | Delete only after Ali approves. | Low |
| `assets/brand/social/laidies-linkedin-company-logo-motto-300-v1.png` | untracked | Old/unused social logo candidate. | Delete or archive after Ali approval. | Low |
| `assets/brand/social/laidies-linkedin-company-logo-motto-400-v1.png` | untracked | Old/unused social logo candidate. | Delete or archive after Ali approval. | Low |
| `assets/brand/social/laidies-logo-square-social-pearl-motto-1080-v1.png` | untracked | Old/unused social preview candidate. | Delete or archive after Ali approval. | Low |
| `assets/brand/social/laidies-logo-square-social-pearl-motto-512-v1.png` | untracked | Old/unused social preview candidate. | Delete or archive after Ali approval. | Low |
| `assets/brand/social/laidies-logo-square-social-transparent-motto-1080-v1.png` | untracked | Old/unused social preview candidate. | Delete or archive after Ali approval. | Low |
| `assets/brand/social/laidies-logo-square-social-transparent-motto-512-v1.png` | untracked | Old/unused social preview candidate. | Delete or archive after Ali approval. | Low |
| `operations/review-packets/assets/bodoni-wordmark-font-contact-sheet.png` | untracked | Review contact sheet. | Delete/archive after Ali approval if no longer needed. | Low |
| `operations/review-packets/assets/episode-03-burn-book-editorial-square.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/episode-03-burn-book-editorial-v2-square.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/episode-03-burn-book-editorial-v2.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/episode-03-burn-book-editorial.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/episode-03-receipts-pass-objects.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/episode-03-try-on-objects.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/episode-03-wrong-room-objects-v2.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/episode-03-wrong-room-objects.png` | untracked | Generated Episode 3 image candidate. | Delete/archive after Ali approval if not needed for history. | Low |
| `operations/review-packets/assets/homepage-masthead-council-candidate-v1-desktop.png` | untracked | Rejected/obsolete masthead proof. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/homepage-masthead-council-candidate-v1-mobile-390.png` | untracked | Rejected/obsolete masthead proof. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/homepage-masthead-in-context-desktop.png` | untracked | Old masthead context proof. | Delete/archive after Ali approval if superseded by approved masthead QA. | Low |
| `operations/review-packets/assets/homepage-masthead-in-context-mobile-390.png` | untracked | Old masthead context proof. | Delete/archive after Ali approval if superseded by approved masthead QA. | Low |
| `operations/review-packets/assets/homepage-masthead-source-contact-sheet.png` | untracked | Source contact sheet. | Delete/archive after Ali approval if not needed. | Low |
| `operations/review-packets/assets/laidies-linkedin-banner-1584x396-v1.png` | untracked | Social/banner candidate. | Delete/archive after Ali approval if not part of a brand asset library. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v1.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v2.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v3.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v4.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v5.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v6.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v7.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v8.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-editorial-transparent-v9.png` | untracked | Logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-square-pearl-1080-v1.png` | untracked | Logo/social candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-square-transparent-1080-v1.png` | untracked | Logo/social candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-logo-square-transparent-400-v1.png` | untracked | Logo/social candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v1.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v2.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v3.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v4.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v5.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v6.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v7.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v8.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v9.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-approved-candidate-v10.png` | untracked | Superseded masthead candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/laidies-masthead-object-flatlay-v1.png` | untracked | Masthead/object candidate. | Delete/archive after Ali approval if no longer useful. | Low |
| `operations/review-packets/assets/laidies-masthead-object-world-v1.png` | untracked | Masthead/object candidate. | Delete/archive after Ali approval if no longer useful. | Low |
| `operations/review-packets/assets/laidies-masthead-object-world-v2.png` | untracked | Masthead/object candidate. | Delete/archive after Ali approval if no longer useful. | Low |
| `operations/review-packets/assets/laidies-masthead-object-world-v3.png` | untracked | Masthead/object candidate. | Delete/archive after Ali approval if no longer useful. | Low |
| `operations/review-packets/assets/laidies-masthead-object-world-v4.png` | untracked | Masthead/object candidate. | Delete/archive after Ali approval if no longer useful. | Low |
| `operations/review-packets/assets/laidies-wordmark-editorial-chip-heart-v1.png` | untracked | Wordmark candidate. | Delete/archive after Ali approval if no longer useful. | Low |
| `operations/review-packets/assets/wearelaidies-linkedin-company-cover-1128x191-v1.png` | untracked | Social/banner candidate. | Delete/archive after Ali approval if not part of brand assets. | Low |
| `operations/review-packets/assets/wearelaidies-linkedin-company-cover-4200x700-v1.png` | untracked | Social/banner candidate. | Delete/archive after Ali approval if not part of brand assets. | Low |
| `operations/review-packets/assets/wearelaidies-logo-square-pearl-1080-v1.png` | untracked | Social/logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/wearelaidies-logo-square-pearl-400-v1.png` | untracked | Social/logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/wearelaidies-logo-square-transparent-1080-v1.png` | untracked | Social/logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/wearelaidies-logo-square-transparent-400-v1.png` | untracked | Social/logo candidate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/assets/live-mobile-ux/` | untracked directory | Large screenshot/proof bundle from mobile UX work. | Delete/archive after Ali decides screenshot retention policy. | Medium |
| `operations/review-packets/assets/site-foundation-cleanup/` | untracked directory | Site-foundation screenshot proof bundle. | Delete/archive after Ali decides screenshot retention policy. | Medium |
| `operations/review-packets/episode-03-editorial-rebrand-prototype 2.html` | untracked | Prototype/review output. | Delete after Ali approval if superseded. | Low |
| `operations/review-packets/episode-03-editorial-rebrand-prototype.html` | untracked | Prototype/review output. | Delete after Ali approval if superseded. | Low |
| `operations/review-packets/episode-03-reader-preview.html` | untracked | Private reader preview, now likely superseded by live page. | Delete/archive after Ali approval. | Medium |
| `operations/review-packets/episode-03-review 2.html` | untracked | Review output duplicate. | Delete after Ali approval if superseded. | Low |
| `operations/review-packets/episode-03-review.html` | untracked | Review output. | Delete after Ali approval if superseded. | Low |
| `operations/review-packets/homepage-masthead-council-candidate-v1.html` | untracked | Rejected masthead candidate page. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/laidies-layered-masthead-review 2.html` | untracked | Masthead review output duplicate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/laidies-layered-masthead-review.html` | untracked | Masthead review output. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/laidies-logo-kerning-review-v5 2.png` | untracked | Logo review duplicate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/laidies-logo-kerning-review-v5.png` | untracked | Logo review output. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/laidies-logo-kerning-review-v6 2.png` | untracked | Logo review duplicate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/laidies-logo-kerning-review-v6.png` | untracked | Logo review output. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/logo-wordmark-color-review 2.html` | untracked | Logo review duplicate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/logo-wordmark-color-review.html` | untracked | Logo review output. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/masthead-candidate-approval 2.html` | untracked | Masthead review duplicate. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/masthead-candidate-approval.html` | untracked | Masthead review output. | Delete/archive after Ali approval. | Low |
| `operations/review-packets/masthead-options/` | untracked directory | Large masthead mockup/review candidate bundle; 22A is approved but many candidates are rejected/superseded. | Archive or delete rejected options only after Ali approval; preserve approved source if needed. | Medium |

## F. UNKNOWN / DO NOT TOUCH

These entries are ambiguous or approved-but-not-shipped brand assets. Preserve until Ali decides the brand/social asset policy.

| File path | State | Reason | Recommended action | Risk |
| --- | --- | --- | --- | --- |
| `assets/brand/laidies-homepage-masthead-approved-v1.png` | untracked | Approved full flattened masthead for sharing/social use, not used by live homepage. | Preserve; do not delete. Decide later whether to commit as brand/social asset. | High |
| `assets/brand/social/laidies-homepage-masthead-approved-1800x720-v1.png` | untracked | Approved social/share copy of masthead. | Preserve; do not delete. Decide later whether to commit as social asset. | High |
| `assets/brand/laidies-logo-wordmark-transparent-v1.png` | untracked | Transparent wordmark used by a dirty build script; unclear whether approved. | Do not touch until brand asset decision. | Medium |

## Recommended Next Action

Recommended safest path before Part B after A2.4 reinspection: **preserve production/social engine work, keep Part B work parked, and do not delete untracked artifacts yet.**

### Option 2: Revert only clearly rejected tracked changes

Only one of the original five proposed revert files remained safe after inspection.

Already run in A2.4:

```bash
git restore -- games/girl-talk.html
```

Why only this file:

- `games/girl-talk.html`: unrelated low-risk JS rename; not Part B, not weekly production, not social engine.

Not reverted:

- `index.html`: parked for Part B because the diff includes homepage portal/world-object architecture ideas.
- `scripts/build-episode-assets.js`: parked for future weekly production workflow.
- `social/visual-preview/index.html`: parked for future social engine tooling.
- `social/visual-preview/styles.css`: parked for future social engine tooling.

### Option 4: Ask Ali to approve deletion of untracked rejected artifacts

After Option 2, ask Ali whether to delete or archive rejected/generated untracked artifacts. Do not use `git clean`.

Do not run yet:

```bash
rm assets/brand/laidies-homepage-masthead-bg-candidate-v10.png
rm -r operations/review-packets/masthead-options
rm operations/review-packets/homepage-masthead-council-candidate-v1.html
rm "operations/review-packets/masthead-candidate-approval 2.html"
rm operations/review-packets/masthead-candidate-approval.html
rm "operations/review-packets/laidies-layered-masthead-review 2.html"
rm operations/review-packets/laidies-layered-masthead-review.html
rm -r operations/review-packets/assets/live-mobile-ux
rm -r operations/review-packets/assets/site-foundation-cleanup
```

This is only a starter list. Ali should decide whether to preserve or delete review history before any removal.

## Files To Leave For Part B

- `clubhouse.html`
- `community.html`
- `community/ask-the-room.html`
- `community/burn-book.html`
- `community/chat-room-digest.html`
- `community/comment-card.html`
- `community/dear-laidies.html`
- `community/mix-cd-exchange.html`
- `community/send-it-energy.html`
- `community/try-on-debrief.html`
- `community/wins.html`
- `community/weekly-prompts/issue-01.md`
- `community/weekly-prompts/issue-02.md`
- `content/episode-index.json`
- `content/episodes/issue-01.json`
- `content/site/quizzes.json`
- `content/site/site-data.js`
- `email/buttondown/issue-01.md`
- `email/buttondown/issue-02.md`
- `episodes.html`
- `hot-goss.html`
- `learn.html`
- `learn/glossary.html`
- `reference-closet.html`
- `start-here.html`
- `styles.css`
- `assets/charms/receipt-drawer-charm.svg`
- `assets/home-book-of-receipts-closet-v1.png`
- `docs/product/trust-layer-receipts-coven.md`
- `operations/prototypes/**`

## Files To Leave For Part C

- No confirmed dirty backend/subscriber/persistence files were found.
- Do not touch future signup, Buttondown, Supabase, Magic Link, Clubhouse Pass persistence, card backend, sticker, charm, or badge persistence work during Part B setup.

## Unknown / Preserve

- `assets/brand/laidies-homepage-masthead-approved-v1.png`
- `assets/brand/social/laidies-homepage-masthead-approved-1800x720-v1.png`
- `assets/brand/laidies-logo-wordmark-transparent-v1.png`
- `operations/briefs/**`
- `operations/socials-engine/**`
- `operations/weekly-production-engine/**`
- `scripts/start-socials-engine.js`
- `scripts/start-weekly-production-engine.js`
- `social/**`

## Appendix A: Generated Screenshot Entries Covered By The Screenshot Bundle

These individual untracked `git status --short` entries are covered by the `operations/review-packets/assets/live-mobile-ux/` delete/archive approval row above. They should be removed only if Ali approves deleting or archiving the screenshot proof bundle.

- `operations/review-packets/assets/live-mobile-ux/375-bag.png`
- `operations/review-packets/assets/live-mobile-ux/375-community.png`
- `operations/review-packets/assets/live-mobile-ux/375-extra-credit.png`
- `operations/review-packets/assets/live-mobile-ux/375-fairy.png`
- `operations/review-packets/assets/live-mobile-ux/375-glossary.png`
- `operations/review-packets/assets/live-mobile-ux/375-home.png`
- `operations/review-packets/assets/live-mobile-ux/375-hot-goss.png`
- `operations/review-packets/assets/live-mobile-ux/375-issue03.png`
- `operations/review-packets/assets/live-mobile-ux/375-quiz-final.png`
- `operations/review-packets/assets/live-mobile-ux/375-quiz.png`
- `operations/review-packets/assets/live-mobile-ux/375-tryon.png`
- `operations/review-packets/assets/live-mobile-ux/390-bag.png`
- `operations/review-packets/assets/live-mobile-ux/390-community.png`
- `operations/review-packets/assets/live-mobile-ux/390-extra-credit.png`
- `operations/review-packets/assets/live-mobile-ux/390-fairy-prompt-check-readable.png`
- `operations/review-packets/assets/live-mobile-ux/390-fairy-result-readable.png`
- `operations/review-packets/assets/live-mobile-ux/390-fairy-surprise-readable.png`
- `operations/review-packets/assets/live-mobile-ux/390-fairy.png`
- `operations/review-packets/assets/live-mobile-ux/390-glossary.png`
- `operations/review-packets/assets/live-mobile-ux/390-home.png`
- `operations/review-packets/assets/live-mobile-ux/390-hot-goss.png`
- `operations/review-packets/assets/live-mobile-ux/390-issue03-return-header.png`
- `operations/review-packets/assets/live-mobile-ux/390-issue03.png`
- `operations/review-packets/assets/live-mobile-ux/390-quiz-final.png`
- `operations/review-packets/assets/live-mobile-ux/390-quiz-retest.png`
- `operations/review-packets/assets/live-mobile-ux/390-quiz-return-header.png`
- `operations/review-packets/assets/live-mobile-ux/390-quiz.png`
- `operations/review-packets/assets/live-mobile-ux/390-tryon.png`
- `operations/review-packets/assets/live-mobile-ux/430-bag.png`
- `operations/review-packets/assets/live-mobile-ux/430-community.png`
- `operations/review-packets/assets/live-mobile-ux/430-extra-credit.png`
- `operations/review-packets/assets/live-mobile-ux/430-fairy.png`
- `operations/review-packets/assets/live-mobile-ux/430-glossary.png`
- `operations/review-packets/assets/live-mobile-ux/430-home.png`
- `operations/review-packets/assets/live-mobile-ux/430-hot-goss.png`
- `operations/review-packets/assets/live-mobile-ux/430-issue03.png`
- `operations/review-packets/assets/live-mobile-ux/430-quiz-final.png`
- `operations/review-packets/assets/live-mobile-ux/430-quiz.png`
- `operations/review-packets/assets/live-mobile-ux/430-tryon.png`
- `operations/review-packets/assets/live-mobile-ux/claio-clubhouse-intro.png`
- `operations/review-packets/assets/live-mobile-ux/claio-community-card-precise.png`
- `operations/review-packets/assets/live-mobile-ux/claio-fun-pack-card.png`
- `operations/review-packets/assets/live-mobile-ux/claio-home-card-precise.png`
- `operations/review-packets/assets/live-mobile-ux/claio-home-card.png`
- `operations/review-packets/assets/live-mobile-ux/claio-madame-heading.png`
- `operations/review-packets/assets/live-mobile-ux/claio-spotlight-card-heading-precise.png`
- `operations/review-packets/assets/live-mobile-ux/claio-spotlight-stock-ribbon-precise.png`
- `operations/review-packets/assets/live-mobile-ux/claio-this-week-action.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-fairy-prompt-check-full.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-fairy-prompt-check-readable.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-fairy-prompt-check-visible.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-fairy-wave-readable.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-issue03-return.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-madame-claio-reading-before-extra-fix.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-menu-open.png`
- `operations/review-packets/assets/live-mobile-ux/final-390-quiz-return.png`

## Bottom Line

Do not start Part B with the tree in its current state unless we are intentionally comfortable working around a large mixed dirty tree.

Best practical next move:

1. Ask Ali to approve the five-file tracked revert list.
2. Ask Ali whether to delete or archive rejected untracked masthead/prototype/review artifacts.
3. Preserve Part B files and future systems until they have their own focused workstream.

No staging, commit, push, revert, delete, or cleanup was performed.
