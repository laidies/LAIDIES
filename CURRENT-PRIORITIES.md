# Current Priorities

Keep this file short. It should tell a fresh Codex thread what matters next.

## Website

- Continue simplifying homepage organization so it feels guided instead of chaotic.
- Keep quizzes and card packs available by issue so late readers can start at Episode 1.
- Polish Fun & Games, especially the pieces users love most: Madame CLAI-O, Dream Phone, card packs, quizzes, playlists, and House DJ.
- Avoid adding large new homepage sections unless they have a clear reader path.
- For visual concepts, product-style mockups, toy/object directions, scene art, and hero imagery, use image generation first. Do not fake image concepts with CSS shapes or gradient illustrations.
- After the major website changes are done, run a site-wide page audit for header/footer uniformity. Footers currently differ across the site and some headers still vary; check every page for consistent navigation, footer links, logo treatment, and mobile behavior.
- Build the LAIDIES Card reward system with separate reward types: charms are hidden discovery/easter eggs, including one unique issue charm in each This Week scene plus bonus charms such as Dream Phone 867-5309; merit badges are earned task achievements, such as 5 Mme CLAI-O readings or using all Dream Phone remix cards in one call. The future LAIDIES Card should show the charm bracelet, all saved charms, and earned merit badges after save/sign-in.
- This Week issue charms should come from different objects each week. Issue 01 is the cell phone charm; Issue 02 is the Tamagotchi charm. Future issues need their own hidden object choice, charm artwork, and source-of-truth mapping.
- Later audit existing "secret merit badge" language and storage, especially Dream Phone 867-5309, so bonus easter eggs become charms while true task achievements remain merit badges.
- Next This Week pass: evaluate adding weekly trading cards as a Save/Collect ritual layer. Existing surfaces include `games/fun-pack.html`, `games/trading-cards.html`, `assets/trading-card-pack.webp`, and the card-pack collection logic in `script.js`. Keep cards separate from charms and merit badges.
- Future This Week artwork pass: the opened-bag magazine spread needs to look like a real LAIDIES issue/article spread instead of a generic generated magazine cover.
- Wednesday Ritual model: Episode teaches, Bag guides, Quiz checks, Printable saves, Try-On applies, Charm rewards discovery, Community connects, Fun Pack rewards/extends, Clubhouse houses the larger toys/tools, and LAIDIES Card eventually saves charms, merit badges, trading cards, and progress.
- Keep Fun Pack as the bonus extension from the Bag, not the required printable path. Future Fun Pack work should gather the magical add-ons: trading cards, weekly jam/DJ Booth, Mme CLAI-O, Fairy Godmother, Clubhouse toys, and other issue extras without duplicating the Bag essentials.
- Future Try-On Debrief pass: redesign it into a real weekly debrief/rating surface with a butterfly-clip style rating and issue context, not a generic comments page.
- Try-On ratings and notes currently save locally; future Clubhouse Pass / LAIDIES Card work should sync them to the signed-in profile.
- Future DJ Booth visual pass: redesign the listening surface with real/generated object-world artwork such as CD jewel cases, liner notes, burned CD or mixtape cues, laptop/audio desk details, disco ball, and lava lamp lighting. Do not treat the CSS record graphic as final.
- Quiz Sticker Drop asset pass: current quiz rewards use the existing `assets/quiz-sticker-sheet.png` as a temporary real-art surface, not CSS initials. Generate/slice final transparent reward stickers at 640x640px (rendered around 72px desktop / 64px mobile) and save them as:
  - `assets/quiz-stickers/butterfly-clip-incident.png`
  - `assets/quiz-stickers/participation-lip-gloss.png`
  - `assets/quiz-stickers/montage-mode.png`
  - `assets/quiz-stickers/caboodle-scholar.png`
  - `assets/quiz-stickers/receipts-queen.png`
  - `assets/quiz-stickers/caboodle-valedictorian-and-receipts-queen.png`
- Keep quiz stickers, hidden charms, and true merit badges separate. Stickers are quiz rewards; charms are hidden object discoveries; merit badges are earned task achievements.
- Hot Goss stronger editorial treatment has been partially restored as a destination wrapper. Current feed data only includes headline/body/source, so the richer "why care / how big a deal / LAIDIES translation / smart busy woman takeaway" layer needs source-of-truth fields before it can publish real explanations without fabrication.
- Community was stabilized for the Wednesday Ritual, but still needs a full object-world redesign later if it becomes a primary destination beyond rooms/prompts.
- PDF printable flow should keep users inline first, with Download PDF as the reliable primary action and browser PDF preview secondary because local/Safari PDF rendering can be unreliable. Later pass should do robust cross-browser PDF/download QA.
- Ritual-linked page shell consistency still needs a site-wide pass after this sprint: headers, footers, Back to the Bag placement, page backgrounds, and button styles differ across destinations.
- Future polish pass: apply the fun cursor consistently site-wide after the major UX and object-world changes settle.

## Newsletter

- Keep each episode as the source of truth for quiz, glossary, cards, social posts, playlist, and House DJ track.
- Make sure every explanation is practical and human, with analogies that are accurate.

## Social

- Build Instagram content from episode content, not from scratch.
- Prioritize easy-to-post carousels, stories, reels scripts, and captions.
- Optimize every weekly batch for visibility and readership: discovery Reel, saveable carousel, website feature click, Story interaction, and community prompt.
- Drive people back to the website every week with specific links to the full issue and interactive features, not vague "check out the site" CTAs.
- Use `social/SOCIAL-GROWTH-OPERATING-RULES.md` before making social assets. Do not let Canva-generated copy or thin generated kits replace the newsletter, issue page, website modules, or brand voice.
- For LinkedIn, lead with Alison's personal profile for reach and conversation. Use a separate lAIdies Page as the official brand home, not the main organic growth engine.

## Community

- Make member participation easy: ask a question, share a win, submit feedback, share a mix, build a member card.
- Any public/community feature needs a future backend or form workflow before launch.

## Growth

- Treat lAIdies as a weekly ritual first: one issue, one Try-On, one quiz, one card pack, one community action, one shareable social moment.
- Use `docs/growth/laidies-growth-operating-system.md` before adding major features, paid ideas, cohorts, workshops, or partnerships.
- Use `docs/growth/ali-idea-backlog.md` when deciding which of Ali's ideas should become live features, content, merch, social, or community prompts.
- Track lightweight weekly signals in `operations/growth/weekly-growth-scorecard-template.md`; do not overbuild paid products until people repeatedly ask for templates, workshops, team resources, cohorts, or office hours.
- Keep Ali in the creative/editor/community-host role. Automate repetitive production, QA, asset generation, and missing-piece checks.

## Agent Council And Reputation

- Keep `operations/weekly-command-center.html` useful as the live operating dashboard: it should show weekly publishing actions plus Project Radar items for recent changes, launch blockers, Clubhouse QA, Member Pass, canon intake, next-week setup, and handover/context health.
- Every requested lAIdies change in any Codex chat must pass through the appropriate Agent Council lens before implementation. This includes website, design, content, community, growth, monetization, social, and app/product changes.
- Use `operations/agents/agent-council-operating-system.md` before making changes, and pick the relevant council roles for the request before editing files.
- Agents are recommend-only. They can score, flag, and propose, but they cannot publish, rewrite live pages, remove features, or change public positioning automatically.
- Run every implementation-ready recommendation through `operations/agents/reputation-safety-gate.md`.
- Protect Ali's public leadership narrative as an AI translator for smart professionals while keeping lAIdies from feeling like Amazon, Deloitte, tax, or consulting marketing.
- Do not include named live career opportunities or private career discussions in public lAIdies copy.
- Treat Mme CLAI-O as a taste benchmark; improve around it without flattening the current voice.

## App Strategy

- Build lAIdies as an app-like website first, not a native app yet.
- Use `docs/product/laidies-app-strategy.md` before starting app-specific work.
- Prioritize mobile-first navigation, save-to-home-screen branding, current issue access, quiz/card pack access, community paths, and fast loading.
- Only consider a native app after repeated demand for notifications, saved progress, member identity, paid resources, or structured team/ERG use.

## Assets

- Use generated images where visuals matter.
- Keep 90s/Y2K references evocative but not copied from copyrighted source material.
- Store final website assets in `assets/`, never only in Codex generated-image folders.
- For design work, do not be agreeable by default. Be exacting, solve the whole design system before showing options, and present only assets that meet a professional brand-quality bar.
