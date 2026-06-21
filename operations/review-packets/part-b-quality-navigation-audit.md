# Part B Quality And Navigation Audit

Date: 2026-06-21

Reviewed commit: `b368c0c12dcd97d8b68b7646cbc8d0c6467dacc4` - `Rescue homepage quality and universe map`

## Workspace Safety Note

The primary working folder was not safely aligned with `origin/main` and still contained intentionally parked dirty/untracked work. This audit was performed in a clean temporary worktree based on latest `origin/main` so the parked work was not disturbed.

No feature implementation was performed. Live product files were inspected only. The only intended durable outputs from this pass are this review packet and the screenshot assets under:

`operations/review-packets/assets/part-b-quality-navigation-audit/`

## Overall Council Verdict

**REVISE INTERNALLY - DO NOT SEND THE FULL PART B SURFACE TO ALI AS A POLISHED EXPERIENCE YET.**

The homepage now does the right strategic job: it explains the future LAiDIES universe honestly and clearly labels parked/in-progress areas. The Episode/Season path is much stronger than it was. Mme CLAi-O remains the quality benchmark.

The rest of Part B is still uneven. The biggest problem is not missing assets or broken images. It is consistency: parked items are treated honestly on the homepage but are still reachable as normal activities from the Clubhouse, THE EXTRA CREDIT, and shared navigation. That makes Dream Phone, Girl Talk, and some member/pass flows feel more available than they should.

Council read:

- **Passes or nearly passes:** Homepage direction, Season page, Episode pages, Mme CLAi-O, Try-On, core Quiz.
- **Needs internal revision before broader sharing:** This Week/Wednesday Bag clarity, Study Pack/Study Sheet naming, FAiRY GODMOTHER positioning, THE EXTRA CREDIT, Clubhouse, Trading Cards, DJ Booth, LAiDIES Card/Clubhouse Pass language, shared navigation/status labels.
- **Parked:** Dream Phone as a product concept. It must not be treated as a live polished activity until the new concept and asset direction pass Council.
- **Not built / future:** SETUP SCHOOL, THE COVEN, THE POTIONS SHELF, ASK THE BOOK, full PATRON SAINTS system, API-backed LAiDY.

## Audit Method

- Inspected latest `origin/main` in a clean worktree.
- Captured desktop 1440 and mobile 390 screenshots for high-risk surfaces.
- Checked captured pages for missing local image assets, broken local links, horizontal overflow, console/page errors, and small tap target warnings.
- Ran light interaction checks on FAiRY GODMOTHER, Dream Phone, Girl Talk, and DJ Booth.
- Read source files and current visible copy for status label and overpromising risks.

Automated capture found:

- No missing local image files on captured pages.
- No broken local links on captured pages.
- No horizontal overflow on captured pages.
- Girl Talk has a JavaScript page error: `Identifier 'girlTalkCards' has already been declared`.
- DJ Booth did not settle under `networkidle` within 15 seconds, likely because of media loading/ongoing audio state. The visible UI did render.

## Surface-By-Surface Audit

| Surface | URL / file | Current status | User-facing honesty | Visual quality | Navigation / return path | Mobile / desktop risk | Backlog bucket | Priority | Recommended next action |
|---|---|---:|---:|---:|---|---|---|---:|---|
| Homepage | `index.html` | Working | Honest and clear | Needs polish | First action is clear; map explains available vs future areas | Desktop still feels narrow/document-like in some map sections; mobile is stable | Part B | P1 | Keep the current map direction. Next: reconcile shared navigation so every page uses the same honest statuses as the homepage. |
| This Week / Wednesday Bag | `this-week.html` | Partially working | Somewhat unclear | Needs polish | Back path exists; opening the bag is clear, but the first loaded state can feel like the whole page ends after the hero/bag card | Mobile stable; object-world is strong after interaction but the initial state under-explains the ritual depth | Part B | P1 | Make the default/current-bag state show enough of the ritual path without requiring guesswork. Keep local-save honesty. |
| Season page | `episodes.html` | Working | Honest and clear | Needs polish | Clear Season path, Episode 1-3 visible, Coming Soon cards labeled | Mobile readable; desktop recovered but still less immersive than Episode mastheads | Part B | P2 | Keep. Later polish desktop composition and align "Study Sheet" language to actual built paths. |
| Episode pages | `issues/issue-01.html`, `issues/issue-02.html`, `issues/issue-03.html` | Working | Honest and clear | Passes LAiDIES quality bar | Fixed top nav and return paths are strong; ritual/Study Pack path is understandable | Very long on mobile but no overflow; needs ongoing section-image discipline | Part B | P2 | Stabilize the Episode template rules into shared docs/code before Episode 4 scaling. |
| Study Pack | Episode side rail + `this-week.html?group=practice` | Partially working | Somewhat unclear | Needs polish | Present as a grouped path inside the Bag, but not a distinct destination | Naming can blur Study Pack, Study Sheet, Cheat Sheet, Try-On, and Bag | Part B | P1 | Define a single hierarchy: Episode -> Bag -> Study Pack -> Try-On/Cheat Sheet/Cards. Make labels identical everywhere. |
| Study Sheet | Mentioned on Season/Homepage; no clear standalone built page | Not built | Overpromising | Not enough implemented to judge | Users may expect a Study Sheet and not find one | Confusing because Cheat Sheet/Printable exists and may be mistaken for it | Part B | P1 | Either create a review-only Study Sheet prototype or remove/soften public language until it exists. |
| Quiz | `learn/quiz.html` | Working | Somewhat unclear | Needs polish | Episode quiz selector is understandable; return says Weekly Study Pack | Clubhouse Pass CTA promises score saving; likely Part C/member work | Part B + Part C | P1 | Keep quiz live, but change score-saving/member language to "coming soon" unless verified end-to-end. |
| Mme CLAi-O | `games/madame-claio.html` | Working | Honest and clear | Passes LAiDIES quality bar | Strong return path; first action is obvious | Mobile clear; desktop also cohesive | Part B | P2 | Use as the quality reference. Later add only small QA/polish, not redesign. |
| FAiRY GODMOTHER / Ask LAiDY prompt coaching | `games/fairy-godmother.html` | Partially working | Honest and clear | Passes/near-passes LAiDIES quality bar | Return path is clear; input and energy selector are clear | Mobile strong; purpose overlaps with future LAiDY | Part B now, Part C later | P1 | Next product slice should restore the "magic/practical advice" layer while keeping rules-based prompt coaching honest. API-backed version belongs to Part C. |
| LAiDY | Current visible surface: `community/laidy-spotlight.html`; future Ask LAiDY missing | Not built for intended Ask LAiDY flow | Broken/misleading | Needs polish | Current page is a LAiDIES Card/member directory concept, not the requested LAiDY advice interaction | Mobile page is extremely long and visually uneven | Part B UX, Part C API later | P1 | Create a Part B review-only LAiDY restore plan/prototype: select energy, ask a real question, get practical advice, then prompt critique/rewrite. |
| Dream Phone | `games/dream-phone.html`; linked from Clubhouse/THE EXTRA CREDIT/shared nav | Parked | Fake-functional risk | Fails quality bar | Homepage says glow-up in the works, but Clubhouse and THE EXTRA CREDIT link to the old live mechanic | Mobile technically stable but product model is rejected | Parked | P0 | Remove/disable public links outside homepage, label as `Glow-up in the works`, and leave the old page hidden until a new concept passes Council. |
| Girl Talk | `games/girl-talk.html` | Broken | Fake-functional risk | Needs polish | Linked from Clubhouse/THE EXTRA CREDIT; return exists | Page throws `Identifier 'girlTalkCards' has already been declared`; visible deck is thin | Part B | P0 | Fix the duplicate script declaration or temporarily park links. Then redesign into a clearer LAiDIES object-world activity. |
| DJ Booth | `games/dj-booth.html` | Partially working | Somewhat unclear | Needs polish | Return path exists; tracklist visible | Media page did not settle under network-idle QA; Spotify buttons repeat generic labels | Part B | P1 | Keep accessible but QA audio/media behavior, tighten labels, and clarify whether tracks are playable locally or Spotify-only. |
| THE EXTRA CREDIT | `games/fun-pack.html` | Partially working | Overpromising | Needs polish | Clear purpose text, but cards link to parked/broken activities | Mobile stable; object cards are attractive but not honest enough | Part B | P0 | Convert Dream Phone/Girl Talk cards to parked status cards; keep only passing activities linked. Rename actions to match Bag names. |
| THE LAiDIES GRIMOIRE | Homepage structure; no standalone Grimoire page | Placeholder | Honest and clear on homepage | Needs polish | Homepage correctly acts as map | Desktop map reads document-like rather than immersive | Part B | P2 | Keep as architecture. Later consider a dedicated Grimoire index once sub-areas are stable. |
| SLAiYER HANDBOOK | `learn/glossary.html` | Working | Honest and clear | Needs polish | Accessible from homepage/menu | Needs visual cohesion with Episode term cards | Part B | P2 | Rename/skin glossary as SLAiYER HANDBOOK consistently and ensure all "So You Don't Pull a Cher" terms are included. |
| SETUP SCHOOL | Homepage placeholder only | Not built | Honest and clear | Not enough implemented to judge | No fake link; says start with Episode 1 | None if it remains placeholder | Part E | P3 | Keep placeholder. Do not build in Part B except status language. |
| THE POWER MAP | `learn.html#who-is-who` | Partially working | Somewhat unclear | Needs polish | Linked from homepage as open now | Section exists, but the future Power Map object-world is not yet fully realized | Part B | P2 | Audit/rename the current who-is-who section into a true Power Map later. |
| THE COVEN | Homepage placeholder only | Not built | Honest and clear | Not enough implemented to judge | No fake link | None | Part B later | P3 | Keep as future/status area. Later connect women-in-AI profiles and Patron Saints. |
| THE LORE CLOSET | `reference-closet.html` | Working | Honest and clear | Needs polish | Linked from homepage/footer/menu | Search/reference utility exists, visual bar not as high as Episodes | Part B | P2 | Polish into a stronger reference object-world and connect Patron Saints/Deb threads. |
| THE POTIONS SHELF | Homepage placeholder only | Not built | Honest and clear | Not enough implemented to judge | No fake link | None | Part B later | P3 | Keep placeholder. Later turn prompt recipes into an approved destination. |
| THE CHAMBER OF RECEIPTS | `receipts.html` | Working | Honest and clear | Needs polish | Linked from homepage/menu | Likely useful but not yet visually as strong as Episode receipt sections | Part B | P2 | Audit/polish as the source/research archive after navigation consistency. |
| ASK THE BOOK | Homepage placeholder only | Not built | Honest and clear | Not enough implemented to judge | No fake link | None | Part C later, UX in Part B | P3 | Keep as future lookup. Design in Part B, API/search in Part C if needed. |
| PATRON SAINTS | Not built as a system; references exist in content | Not built | Somewhat unclear | Not enough implemented to judge | No clear user-facing Patron Saints entry | None yet | Part B | P2 | Plan a Patron Saints page/system with Cher, David, Elle, Miranda, Buffy, Regina, Deb; connect to Lore Closet, DJ Booth, Dream Phone, Setup School. |
| Clubhouse | `clubhouse.html` | Partially working | Overpromising | Needs polish | Back path can be weird depending referrer; activity cards link to parked/broken pages | Mobile stable but card grid exposes too much unfinished work | Part B | P0 | Make Clubhouse inherit homepage status rules: available activities link; parked ones are disabled/status cards. Fix back-label logic. |
| Community entry points | `community.html`, `community/*` | Partially working | Somewhat unclear | Needs polish | Many rooms exist but vary in maturity | Likely long/mobile uneven; not fully audited in screenshots | Part B + Part C moderation later | P2 | Do a separate Community/Rooms audit before promoting. Keep participation lightweight and honest. |
| LAiDIES Card / Clubhouse Pass | `laidies-card.html`, `clubhouse-pass.html` | Partially working | Overpromising | Needs polish | Public CTAs imply saved progress/scores across devices | Supabase exists, but this is backend/member work and should not be overclaimed in Part B | Part C, with Part B copy cleanup | P0 | Replace broad save-progress claims with "member magic coming soon" unless fully verified. Do not expand in Part B. |
| Cursor consistency | Global CSS / hotspots / cards | Partially working | Somewhat unclear | Needs polish | Some clickable cards/hotspots are visible; some preview cards look clickable or vice versa | Mobile tap targets include several small controls | Part B | P2 | Audit hover/cursor/focus states globally: links, parked previews, disabled cards, hotspots, object links. |
| Interactive image/object-world quality | Site-wide | Partially working | Somewhat unclear | Needs polish | Strong in Mme CLAi-O, Episodes, parts of Bag; weaker in Clubhouse/Trading Cards/old activities | Inconsistent image styles: elevated editorial scenes beside older toy-like/game assets | Part B | P1 | Establish object-world rules: no unrelated borrowed activity images, no generic toy assets, no CSS-only stand-ins for hero objects, no parked features as active toys. |

## P0 Issues

1. **Parked features are still publicly linked from non-homepage surfaces.**
   - Dream Phone is correctly labeled `Glow-up in the works` on the homepage, but `clubhouse.html`, `games/fun-pack.html`, and shared menu logic still route users to the old Dream Phone.
   - Girl Talk is linked even though it throws a JavaScript page error.
   - Recommended action: create a shared status map and disable/soft-link parked features everywhere.

2. **Girl Talk throws a live JavaScript error.**
   - Evidence: `games/girl-talk.html` declares `girlTalkCards`, and `script.js` also declares `girlTalkCards`.
   - Recommended action: either isolate the page script or stop loading the global conflicting script on that page.

3. **Clubhouse Pass / LAiDIES Card language risks overpromising member persistence.**
   - Quiz says "Want to save your scores? Get a Clubhouse Pass."
   - Clubhouse Pass says scores/stickers/progress save across devices.
   - Recommended action: verify end-to-end in Part C or make Part B copy say member saving is coming soon.

4. **THE EXTRA CREDIT links to parked/broken activities.**
   - It should be the curated bonus shelf, but currently exposes Dream Phone and Girl Talk as active cards.
   - Recommended action: convert those cards into honest status cards and link only passing activities.

## P1 Issues

1. **Shared navigation does not match homepage honesty.**
   - `content/site/brand-polish.js` still lists Dream Phone, Girl Talk, THE EXTRA CREDIT, and Clubhouse Pass as direct links in shared menu.
   - Homepage has a page-local override, but other pages do not.
   - Recommended action: move homepage status-label logic into the shared navigation layer.

2. **Study Pack / Study Sheet / Cheat Sheet naming is not settled.**
   - Season page promises Study Sheet as a quick-refresh version, but there is no obvious standalone Study Sheet.
   - Recommended action: define the hierarchy and either create a review-only Study Sheet prototype or remove public Study Sheet language until built.

3. **FAiRY GODMOTHER is useful but product-positioning is blurred.**
   - It now does honest rules-based prompt coaching and reads user input.
   - It still needs the "practical advice in character energy" layer restored so it does not feel like the only Ask LAiDY implementation.
   - Recommended action: Part B rules-based output pass, no backend.

4. **LAiDY intended experience is not currently built.**
   - Current `community/laidy-spotlight.html` is a LAiDIES Card/member directory concept, not Ask LAiDY.
   - Recommended action: design a review-only LAiDY restore prototype before implementation.

5. **This Week / Wednesday Bag needs first-state clarity.**
   - It looks polished, but the user may not see the full ritual path until they open the bag or choose an issue.
   - Recommended action: make the default current week reveal enough of the Bag path and current Episode status.

6. **DJ Booth needs media QA and clearer playable/Spotify behavior.**
   - Visible UI is coherent, but automated navigation did not settle under `networkidle`.
   - Recommended action: audit audio loading, button states, and Spotify link labels.

## P2 Issues

1. Homepage desktop universe map still reads somewhat document-like; later object-world polish would help.
2. Trading Cards feels pale and underpowered compared with Mme CLAi-O and Episodes.
3. SLAiYER Handbook / glossary should visually match Episode term cards and include weekly terms.
4. THE LORE CLOSET and THE CHAMBER OF RECEIPTS need visual polish to feel like named Grimoire rooms.
5. Patron Saints needs a real information architecture and visual system.
6. Cursor/focus/tap state consistency needs a global audit after navigation status cleanup.

## P3 Issues

1. SETUP SCHOOL should remain a future Part E placeholder.
2. THE COVEN can remain future-facing until profile content and structure are ready.
3. THE POTIONS SHELF can remain a future prompt recipe destination.
4. ASK THE BOOK should stay future-facing until a real lookup/search design exists.

## Screenshots Index

All screenshots are under `operations/review-packets/assets/part-b-quality-navigation-audit/`.

| Surface | Desktop 1440 | Mobile 390 |
|---|---|---|
| Homepage | `homepage-desktop-1440.png` | `homepage-mobile-390.png` |
| This Week / Wednesday Bag | `this-week-wednesday-bag-desktop-1440.png` | `this-week-wednesday-bag-mobile-390.png` |
| Season page | `season-page-desktop-1440.png` | `season-page-mobile-390.png` |
| Episode 3 representative Episode page | `episode-03-desktop-1440.png` | `episode-03-mobile-390.png` |
| Mme CLAi-O | `mme-claio-desktop-1440.png` | `mme-claio-mobile-390.png` |
| FAiRY GODMOTHER | `fairy-godmother-desktop-1440.png` | `fairy-godmother-mobile-390.png` |
| LAiDY / LAiDIES Card surface | `laidy-desktop-1440.png` | `laidy-mobile-390.png` |
| THE EXTRA CREDIT | `extra-credit-desktop-1440.png` | `extra-credit-mobile-390.png` |
| Clubhouse | `clubhouse-desktop-1440.png` | `clubhouse-mobile-390.png` |
| Dream Phone | `dream-phone-desktop-1440.png` | `dream-phone-mobile-390.png` |
| Girl Talk | `girl-talk-desktop-1440.png` | `girl-talk-mobile-390.png` |
| DJ Booth | `dj-booth-desktop-1440.png` | `dj-booth-mobile-390.png` |
| Quiz | `quiz-desktop-1440.png` | `quiz-mobile-390.png` |
| Trading Cards | `trading-cards-desktop-1440.png` | `trading-cards-mobile-390.png` |

## Recommended Next 5 Part B Implementation Slices

1. **Part B Status/Navigation Truth Pass**
   - Files likely touched: `content/site/brand-polish.js`, `index.html`, `clubhouse.html`, `games/fun-pack.html`, possibly `styles.css`.
   - Work: create one shared status map for Available Now, Current Week, Glow-up in the works, Getting polished, Member magic coming soon. Disable/preview parked items everywhere.
   - Why first: it removes the most misleading live paths without redesigning every activity.

2. **Part B Clubhouse + THE EXTRA CREDIT Honesty Pass**
   - Files likely touched: `clubhouse.html`, `games/fun-pack.html`, maybe shared CSS.
   - Work: keep available activities linked; convert Dream Phone/Girl Talk into status cards; clarify DJ Booth/Trading Cards status; fix back-label weirdness.
   - Why second: these are the main hubs exposing unfinished activities.

3. **Part B FAiRY GODMOTHER / Ask LAiDY Output Model Pass**
   - Files likely touched: `games/fairy-godmother.html`, maybe `games/fun-pack.html` and `clubhouse.html` copy.
   - Work: keep rules-based honesty, restore practical advice in selected energy, then show prompt critique/rewrite. No backend.
   - Why third: it is close to passing and can become the model for LAiDY.

4. **Part B Study Pack / Study Sheet Naming And Prototype Pass**
   - Files likely touched: `episodes.html`, `this-week.html`, Episode pages, review packet prototype.
   - Work: decide whether Study Sheet is a standalone artifact or rename to Cheat Sheet/Printable. If kept, create review-only Study Sheet prototype before public linking.
   - Why fourth: this reduces confusion between Episode, Bag, Study Pack, Quiz, Cheat Sheet, and Try-On.

5. **Part B Activity Quality Polish Pass**
   - Files likely touched: `games/trading-cards.html`, `games/dj-booth.html`, `games/girl-talk.html` if unparked, relevant assets/CSS.
   - Work: fix Girl Talk script error or park it; polish Trading Cards; QA DJ media behavior; align object-world image rules.
   - Why fifth: once navigation is honest, the individual activities can be brought up to the LAiDIES quality bar without overexposing unfinished work.

## Move Out Of Part B

| Item | Move to | Reason |
|---|---|---|
| Clubhouse Pass real account persistence | Part C | Requires verified auth, storage, cross-device save behavior, privacy language, and backend QA. |
| LAiDIES Card cross-device member identity | Part C | Current local/browser save is not the same as member persistence. |
| API-backed LAiDY advice | Part C | Needs secure API route; no API keys in frontend. Part B should design/rules-test the UX only. |
| Social production engine and launch packets | Part D | Not part of frontend Part B quality/navigation stabilization. |
| SETUP SCHOOL full build | Part E | Current need is placeholder honesty only. |
| Dream Phone full rebuild | Parked until concept/asset approval | The product rethink concluded no concept passes yet. Homepage label should remain glow-up/in the works. |

## Exact Files Created For This Audit

- `operations/review-packets/part-b-quality-navigation-audit.md`
- `operations/review-packets/assets/part-b-quality-navigation-audit/*.png`

## No Implementation Confirmation

No live site files were changed in this audit. No backend/signup/Supabase/Buttondown/Hyvor/Plausible/social engine/prototype work was modified.

