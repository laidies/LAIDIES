# LAIDIES — Full Project Handoff Document
**Last updated: June 12, 2026**

---

## 1. PROJECT OVERVIEW

**What it is:** A weekly AI fluency newsletter + community website for professional women. Brand voice: 90s/Y2K girl-power energy, warm/funny/smart.

**URL:** wearelaidies.com

**Tech Stack:**
| Layer | Service |
|-------|---------|
| Hosting | GitHub Pages (repo: `github.com/laidies/LAIDIES`) |
| DNS | Cloudflare (DNS only, not hosting) — account: wednesday.laidies@gmail.com |
| Backend/Auth | Supabase (magic-link auth via Resend, member profiles, rewards) — project: `swqnkxzebxdbgyrzpdne.supabase.co` |
| Newsletter | Buttondown — account: wednesday.laidies@gmail.com |
| Analytics | Plausible — account: wednesday.laidies@gmail.com, domain: wearelaidies.com |
| Domain | wearelaidies.com |

---

## 2. BRAND RULES

### Colors
- **Hot pink:** `#ff2d9b` (primary accent)
- **Dark backgrounds:** `#0d0611`, `#1a0a12`, `#2d0f1f` (gradients)
- **Paper/cream:** `#fdf8fb` (light pages)
- **Teal:** `#247b83` (secondary accent)

### Fonts
- **Playfair Display** — headings
- **Inter** — body text
- **JetBrains Mono** — eyebrows, code, labels
- **Dancing Script** — accents, cursive moments

### Brand Name Rules
| Context | Format |
|---------|--------|
| Plain text (titles, meta, email, nav) | **LAIDIES** (all caps) |
| Styled HTML (where AI can be highlighted) | `l<span class="brand-ai">AI</span>dies` |
| Never use | `lAIdies` or `fAIry` in unstyled text (looks like typos) |
| CSS class | `.brand-ai { color: #ff2d9b; font-weight: 700; }` |

### Character Names
- **LAIDY** — Fairy Godmother character (Dolly Parton energy, rhinestones, pink sequin jacket, diamond tiara, bedazzled wand). Image: `assets/laidy-character-v1.png`
- **Mme CLAI-O** — Fortune teller (Jennifer Coolidge × Fran Drescher × Bette Midler, fake tan, cat-eye glasses, feather boa). Image: `assets/madame-claio-character-v1.png`
- **DJ JAIDY** — Josh Hudson's DJ persona. Makes the weekly tracks.

### Voice
- Your smartest friend explaining things over drinks
- Uses pop culture + real life analogies (90s/Y2K references)
- No jargon without explanation, no corporate buzzwords
- If something is uncertain, say so — never present speculation as fact
- "Would I screenshot this and send it to the group chat?" — if no, it doesn't ship

---

## 3. SITE MAP

### Root Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, current episode, clubhouse cards, origin story, subscribe |
| `episodes.html` | Season catalog (24 episodes, 2 aired) |
| `learn.html` | Learning hub — 5 cards (Glossary, Quiz, Who's Who, Reference Closet, Receipts) |
| `clubhouse.html` | Game hub — clamshell interactive + 8 nav cards to game subpages |
| `community.html` | Member cards grid + 9 chat rooms |
| `this-week.html` | Weekly digest — episode, fun pack, Hot Goss, track, cocktail party line, receipts |
| `receipts.html` | Evidence-based FAQ (12 questions, sourced, confidence badges) |
| `about.html` | Origin story |
| `clubhouse-pass.html` | Auth/signup (single magic-link flow) |
| `laidies-card.html` | Card builder (photo/avatar + background + details) |
| `reference-closet.html` | Pop culture references that power the brand |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of use |

### games/ Folder
| File | Game |
|------|------|
| `dream-phone.html` | Dream Phone (career advice via T9 keypad) |
| `madame-claio.html` | Mme CLAI-O (100 fortune cards) |
| `businesswomens-special.html` | Cocktail fortune (mood → drink) |
| `fairy-godmother.html` | LAIDY advice (energy mode → question → flowing response) |
| `girl-talk.html` | Conversation prompts |
| `cocktail-fortune.html` | Alternative cocktail page |
| `dj-booth.html` | Custom music player + Spotify links |
| `trading-cards.html` | AI concept cards (15 cards, 3D flip) |
| `fun-pack.html` | Weekly activity bundle hub |

### issues/ Folder
- `issue-01.html` — Episode 1: On Wednesdays We Use AI
- `issue-02.html` — Episode 2: Tell Me What You Want
- `issue-03.html` — Episode 3 (placeholder)

### community/ Folder
9 chat room pages: `ask-the-room.html`, `burn-book.html`, `chat-room-digest.html`, `comment-card.html`, `dear-laidies.html`, `laidy-spotlight.html`, `mix-cd-exchange.html`, `send-it-energy.html`, `try-on-debrief.html`, `wins.html`

### learn/ Folder
- `quiz.html` — Standalone quiz page (dark premium)
- `glossary.html` — All 17 terms in card grid with search

### content/ Folder
| File | Purpose |
|------|---------|
| `site/supabase-config.js` | Supabase client config |
| `site/site-data.js` | Quiz data, episode metadata |
| `site/mini-player.js` | Persistent cross-page music player |
| `site/mini-player.css` | Mini player styles |
| `hot-goss-feed.json` | Hot Goss stories (weekly + daily) |
| `hot-goss-render.js` | Card renderer (may be unused — inlined in this-week.html) |
| `hot-goss-styles.css` | Hot Goss card styles |
| `episode-page.js` | Fun Pack builder for episode pages |
| `episode-index.json` | Episode metadata for Fun Pack links |
| `music/` | DJ JAIDY tracks (4 mp3s) |

### assets/ Folder
- `people/` — Founder photos (ali, eugina, sara, josh)
- Character images, game visuals, brand assets, episode hero images
- `laidies-logo-wordmark.png`, `laidies-logo-square.png`, `laidies-logo.png`

---

## 4. DESIGN PATTERNS

### Architecture Rule
**Every hub page = visual cards → subpages for depth.** No walls of inline content.
- ✅ Clubhouse hub → 8 game subpages
- ✅ Learn hub → quiz + glossary subpages
- ✅ This Week → quick-glance cards + content sections below
- ✅ Community → card grid + room links

### Styling Rules
- **Game/interactive pages:** Dark premium background (linear-gradient #1a0a12 → #2d0f1f)
- **Reference/reading pages:** Light cream (#fdf8fb)
- **Cards:** Dark gradient, 2.5px pink border glow, hover: lift + pink shadow
- **Buttons:** Hot pink (#ff2d9b), white text, rounded (border-radius: 24px+)

### Universal UX Rules
- Sticky "← Back to [parent]" at TOP of every subpage (position: fixed/sticky)
- NO "Back" buttons at the bottom of pages
- Auto-scroll to result after any user action (smooth scroll to output)
- Single audio track at a time (mini-player enforces)
- "Sign In" link in nav on EVERY page → clubhouse-pass.html
- Plausible analytics snippet on all pages
- Google Fonts preconnect on all pages
- Mini-player CSS + JS references on all pages

### Responsive
- 3-col → 2-col → 1-col grids
- Hamburger menu at ≤860px (inline onclick, self-contained)
- Cards: min 155px wide, flex-wrap

---

## 5. TECHNICAL SYSTEMS

### Authentication (Supabase)
- **Flow:** Single button — one email field + "Get my magic link." Creates account if new, signs in if existing.
- **Magic link:** Delivered via Resend → lands on `?member-pass=1` → redirects to card builder
- **Tables:** `member_profiles` (industry, ai_comfort, generation, goals, card status), `member_reward_events`, `member_issue_progress`
- **RLS:** Row-level security — members can only read/edit their own data
- **Three-state UX:** Guest (localStorage) → "Save my card" prompt → Signed-in (Supabase sync)

### Member Cards
- **Architecture:** Layered — CSS background pattern (the frame) + photo on top (never cropped)
- **8 CSS-only backgrounds:** laser, holo, lightning, doodle, sunset, arcade, confetti, chrome
- **Photo options:** Upload (click/paste/drag) | Pick Avatar (10 SVG presets) | Build Your Own (skin+hair+color+accessory)
- **Optional:** "✨ Remove background" button (client-side chroma-key) for "Sears portrait" composite effect
- **localStorage key:** `laidies-my-card` (JSON: name, lane, vibe, photo base64, bgStyle, etc.)
- **Gating:** Card required to post in chat rooms. "No card = no posting. No randos."
- **Publish button:** "Yes — I've never looked more fabulous. Put me in. ✨"
- **Edit:** "Not quite ready for my glow-up — let me tweak."

### Music System (mini-player.js)
- Fixed bottom bar (56px, dark gradient, pink border-top, z-index 9999)
- **Cross-page persistence:** Saves to localStorage every 2s (src, time, title, playing state). Resumes on any page load.
- **Single-track enforcement:** Document-level `play` event (capture phase) pauses all other audio
- **Spotify pause:** Click listener catches spotify.com links → pauses audio, saves position, shows paused state on return
- **Repeat:** 3 states with visual feedback — Off (dim) → All (pink + "ALL" label) → One (pink + "1" badge)
- **Playlist:** 4 tracks (On Wednesdays We Do AI, Tell Me What You Want, Impossible to Underestimate You, Tomorrow's Problem)
- **Homepage:** "Get in, loser. We're learning AI." quote = anthem trigger (▶ icon on hover, click plays full track, pink pulse animation while playing)

### Hot Goss
- **Data:** `content/hot-goss-feed.json`
- **Format per story:** headline, body, whyYouCare, cocktailParty, source, siteLinks, preview
- **Renderer:** Inline in this-week.html (fetches JSON, builds collapsible cards with expand/collapse)
- **Source links:** "Read the full story →" at bottom of expanded cards (only if source URL exists)
- **Voice:** LAIDIES style — analogies, humor, "your friend texting you the news." NOT summary with attitude.
- **AI Professor gate:** Every claim must be technically accurate. If unsure, don't post.
- **Automated:** `laidies-hot-goss` scheduled agent (daily news rewrite + Monday source monitoring)

### The Receipts (receipts.html)
- 12 FAQ questions across 5 categories (Jobs, Environment, Privacy, Economy, Learning)
- Each answer: short LAIDIES-voice summary + data bullets + linked sources + "Last verified: June 2026" + confidence badge
- **Confidence badges:** 📊 Solid data | 🔬 Early research | 🤷‍♀️ It's complicated
- **Multiple sources per claim** — never single-source. If sources disagree, note it explicitly.
- **Search/filter** at top of page
- **Sources monitored weekly:** Stanford AI Economic Indicators, IEA, WEF, OpenAI/Anthropic policies, Google/Microsoft sustainability reports, BLS, Vectara hallucination benchmark

### Secret Badges
| Code | Badge | Trigger |
|------|-------|---------|
| 867 | 867 Club | Dial 867-5309 on Dream Phone |
| CLAI-O | Hotline Regular | Call Mme CLAI-O 5+ times |
| REMIX | Remix Scholar | Pull all Dream Phone remix cards |
| RCPT | Receipts Drawer | Reference Closet interaction |
| 5MIN | Try-On Regular | 5+ Try-On shuffles |
| CHAT | Group Chat Regular | 5+ Girl Talk draws |
| 7PM | Coven Reservation | Open all cocktail lanes |
| KEY | Room Key | Post in a chat room |
| ALL | Every Room, No Notes | Post in ALL rooms |

**Quiz Stickers:** 2X (Caboodle Valedictorian + Receipts Queen), RQ (Receipts Queen), CS (Caboodle Scholar), MM (Montage Has Begun)

---

## 6. GIT & DEPLOYMENT

```bash
# Repo
git remote: github.com/laidies/LAIDIES
branch: main (GitHub Pages auto-deploys in ~60 seconds)
git author: wednesday.laidies@gmail.com / laidies

# .gitignore excludes:
tmp/, operations/, docs/, social/, scripts/, content/episodes/, email/, archive/, *.md, node_modules/

# Deploy commands:
cd ~/path/to/LAIDIES
git add -A
git commit -m "descriptive message"
git push

# After push:
# Hard refresh (Cmd+Shift+R) or append ?v=x to URL — CDN caches aggressively
```

---

## 7. ACCOUNTS

| Service | Account | Notes |
|---------|---------|-------|
| GitHub | laidies org | Repo: github.com/laidies/LAIDIES |
| Cloudflare | wednesday.laidies@gmail.com | DNS only (no Pages project) |
| Supabase | project: swqnkxzebxdbgyrzpdne | Magic-link auth via Resend |
| Buttondown | wednesday.laidies@gmail.com | Newsletter delivery |
| Plausible | wednesday.laidies@gmail.com | Analytics (verified + working) |
| Domain | wearelaidies.com | Managed via Cloudflare DNS |

---

## 8. CONTENT PIPELINE

### Weekly Rhythm
- **Wednesday:** New episode publishes (newsletter via Buttondown + website)
- **Daily:** Hot Goss stories refreshed from AI Intelligence Brief
- **Weekly:** DJ JAIDY track for current episode
- **As needed:** The Receipts updated when sources change

### DJ JAIDY Song Brief Template
When requesting a track from Josh, use this EXACT format:

```
1. Song Title
   (What should the song be called?)

2. What's the core lesson?
   (One sentence only)

3. What transformation should happen in the song?
   (Start → End)

4. Must-Include References
   (Bullets — characters, tools, concepts)

5. Tone
   Pick one: Empowering / Funny / Satirical / Emotional / Confident / Chaotic

6. What line or phrase MUST appear in the chorus?
   (Usually the song title)
```

**Examples:**
- Title: "On Wednesdays We Do AI" | Lesson: You don't need to understand everything before you start | Transform: Intimidated → Curious | Tone: Empowering
- Title: "Tell Me What You Want" | Lesson: AI gets more useful when you're specific | Transform: Vague prompts → Better outcomes | Tone: Confident
- Title: "It's Impossible to Underestimate You" | Lesson: For the woman who works with a mansplainer | Tone: Satirical

### Hot Goss Story Format
```json
{
  "headline": "Punchy, tells what happened + hints at relevance",
  "body": "2-3 sentences, plain English, analogies from real life",
  "whyYouCare": "How it affects reader's work/tools/Monday morning",
  "cocktailParty": "One sentence they'd say to a colleague",
  "source": "https://original-article-url.com",
  "siteLinks": [{"label": "Related term", "url": "learn.html#glossary", "type": "glossary"}],
  "preview": "First sentence for collapsed view"
}
```

---

## 9. TEAM

| Person | Role | Notes |
|--------|------|-------|
| **Ali Eakin** | Founder, writer, builder | Built the entire site with AI. Amazon Tax leader. |
| **Sara Baxter** | Socials, early reviewer | Group chat energy. Handles Instagram. Not a co-founder — spark + support. |
| **Eugina Lim** | Original Echo idea | Spark only. No ongoing time commitment implied. One of Amazon Tax's AI experts. |
| **Josh Hudson** | DJ JAIDY | Girl dad, WIT champion, makes weekly episode tracks. "Honorary Hackathon Team Member." |

---

## 10. QUALITY STANDARDS

- **Agent Council:** Brand, design, UX, content, community review before major changes
- **AI Professor gate:** Mandatory for ALL AI content. Blocks launch if factually incorrect. Must quote specific text reviewed.
- **Bar:** "Would the world's best website design firm present this to a CEO?" If no, it doesn't ship.
- **No AI slop:** Defeats the entire site purpose (proving one woman + AI can build something remarkable)
- **No internal language:** No "Guest mode", "Automation-ready", "Coming soon", design rationale visible to readers
- **Every section earns its place** through contextual labeling, not explanation

---

## 11. CURRENT STATE (June 12, 2026)

### What's Live & Working
- Homepage with anthem trigger, episode card, clubhouse section, origin story, subscribe
- 2 episodes published (+ newsletter sent for EP2)
- Clubhouse hub + 8 game subpages (all with dark premium styling)
- Mme CLAI-O with 100 A-level fortune cards
- LAIDY (Fairy Godmother) with energy modes + flowing advice
- Dream Phone, Girl Talk, Trading Cards, Cocktail Fortune, DJ Booth, Fun Pack
- Learn hub + standalone quiz + glossary subpages
- Community page with layered member cards + overlay + 9 chat rooms
- Card builder with photo upload/paste/drag + 10 avatars + Build Your Own + bg removal
- This Week digest (6 quick-glance cards + Hot Goss + Cocktail Party Line)
- The Receipts (12 evidence-based FAQ questions)
- Persistent mini music player (cross-page)
- Plausible analytics on all pages
- Sign In on all pages
- Mobile hamburger menu
- Reference Closet (56 cards)
- 4 DJ JAIDY tracks
- Founding member cards (Ali, Eugina, Sara, Josh)

### Newsletter Status
- Issue 1: sent
- Issue 2: composed, ready to send via Buttondown
- Buttondown account: wednesday.laidies@gmail.com

---

## 12. KNOWN ISSUES & NEXT STEPS

| Issue | Priority | Notes |
|-------|----------|-------|
| Image optimization (PNGs → WebP) | Medium | 64+ PNGs over 2MB each. No WebP versions exist. |
| Chat rooms: no posting mechanism | High | Cards gate access but rooms are display-only. Need a posting system. |
| Episode 3+ quiz data | Medium | Only Foundation + EP1 quizzes exist in site-data.js |
| Cocktail Party Concept auto-update | Low | Should change with each new episode (currently manual) |
| GitHub Actions Hot Goss pipeline | Medium | Needs: ANTHROPIC_API_KEY secret + Actions write permissions enabled |
| Cross-page music edge cases | Low | Player may not persist perfectly across all navigation patterns |
| Spotify playlists | Low | Ali needs to create manually on Spotify (no API) |
| Mobile hamburger verification | Low | May need testing on actual devices |

---

## 13. PROCESS RULES (NON-NEGOTIABLE)

1. **Hub → subpage pattern** for all sections. No inline walls of content.
2. **Never delete design features** without explicit approval.
3. **One comprehensive push**, not incremental patches.
4. **Verify in browser BEFORE recommending deploy** — checking code exists ≠ checking it renders correctly.
5. **If a change can't be proven better with side-by-side, it doesn't ship.**
6. **Never use regex to remove HTML content** — too greedy, eats surrounding tags.
7. **After every file write, verify** key structural elements still exist.
8. **Back up before destructive edits** — copy file to tmp/ first.
9. **No push recommendations** without self-review against brand council standards.
10. **"We cannot have anything looking like AI slop"** — defeats the entire site purpose.
11. **AI Professor gate** is mandatory for all factual AI content before publishing.
12. **All changes must pass through the quality bar** — every detail matters because the site IS the proof of the thesis.

---

*End of handoff document. This file is the single source of truth for continuing the LAIDIES project.*
