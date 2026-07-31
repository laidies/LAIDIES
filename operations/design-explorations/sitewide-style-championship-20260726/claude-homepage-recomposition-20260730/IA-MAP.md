# IA-MAP — LAiDIES Homepage recomposition (2026-07-30)

Isolated candidate. No production edit, deploy or publish. Baseline is the frozen
pre-reorganization page (`…/hero-arrival-session-v1/review-tuple/source/`) plus the
approved once-per-tab arrival sequence, recomposed into one coherent page.

Route/content truth preserved: every destination href below is the exact production
route used by the live incumbent `Website-homepage/index.html`.

Latest episode is resolved dynamically from `/content/episode-index.json`
(highest `status:"published"` number) — **not** hard-wired. Today that resolves to
Episode 04 · *The Founding Mothers* (`/issues/issue-04.html`). Static fallback in
markup = issue-04.

---

## Global header (sticky chrome) — persistent, distinct from masthead

| Control | Destination | Visitor expectation |
|---|---|---|
| LAiDIES logo | `#top` | Home / top |
| Latest episode | dynamic → `/issues/issue-04.html` | The newest released episode page |
| Start learning | `#how` | How the LAiDIES method works |
| Look it up | `/library.html` | The LIBRAiRY reference desk |
| Activities | `#activities` | The activities & destinations area |
| Explore SUNNYVAiLE | `#town-map` | The single town map/directory |
| KSVL 99.9 | `/radio.html` | The radio station |
| **Sign in** (account cluster) | `/post-office.html#signin` | Sign in to an existing account |
| **Join the town** (account cluster) | `/maikeover.html` | Make a Resident Card (new resident) |

Header = granular persistent routes + account. Masthead = the four big *areas*.
The account cluster is visually separated (divider + pink solid Join button) so it
reads as account actions, not navigation. Mobile: “Menu” toggles a panel exposing the
same items and closing on selection/Escape.

Account-aware label (honest): signed out → **Sign in**; signed in → **My Closet**
(`/laidies-card.html`) with resident name. Isolated candidate renders the signed-out
state by default and offers a clearly-labelled visitor-state preview switch (see Area 1).

---

## Masthead (full-width, evergreen) — `#top`

- Image: `main-street-dusk.webp` (KEEP, exact composition, bound to 1400×788 ratio).
- Arrival sequence overlays once per browser-tab session (see DESIGN-PLAN + preview.js).
- Copy: eyebrow (one colour) + Archivo H1 + succinct Rewind-Era explanation (new draft).
- **Four equal destination buttons** (never 3+1; desktop 4-up, ≤900px 2×2, ≤430px stack):
  1. What’s happening in town → `#whats-happening`
  2. Go directly to an activity → `#activities`
  3. Learn how LAiDIES works → `#how`
  4. Move to SUNNYVAiLE → `#sunnyvaile`
- Separate, visible account action row: **Sign in** (`/post-office.html#signin`) ·
  **Join the town** (`/maikeover.html`). Signed-in variant documented, not rendered live.

---

## Area 1 — What’s happening around town — `#whats-happening`

Current-information area. Answers “what’s happening today, and what’s new for me?”
Desktop: two columns — main (left) + Daily Buzz newspaper rail (right, under masthead).
Mobile: main first, then Daily Buzz as one deliberately-placed labelled section.

**Main column**
| Block | Content | Primary link |
|---|---|---|
| Visitor-state panel | Honest state. Default first-visit orientation. Labelled preview switch: First visit / Returning (signed-out) / Signed-in. Returning-signed-out explains sign-in restores history; signed-in shows a small capped “since your last visit” set (labelled realistic). | Sign in `/post-office.html#signin` |
| This week’s episode | Dynamic latest episode card: number, title, read + listen. | `/issues/issue-04.html`, `/watch.html?ep=04` |
| Wednesday Tour | Condensed 8-stop route + Express Route. Not duplicated elsewhere. | `/this-week.html` |

**Daily Buzz rail** (developing newspaper — shows info directly, each with one quiet link)
| Item | Shown directly | Quiet link |
|---|---|---|
| Breaking AI news | Headline + 2-line plain-language explain + provider lockup art | `/newsstand.html` |
| Daily News | Clear daily explainer | `/newsstand.html` |
| Mme CLAi-O’s reading | Today’s short reading | `/games/madame-claio.html` |
| Promptoscope | The **complete** funny AI horoscope (full text, no “pull a reading” link, never points at CLAi-O) | — (no link; it is complete) |
| Paige’s daily tip | One practical pocket note | `/newsstand.html` |
| Song of the day | Real song *Wednesdays in SUNNYVAiLE* + genuine Listen (audio) | `/radio.html` |
| Did You Know? | One town fact | `/this-week.html` |
| Town weather & gossip | Funny fictional weather + gossip line | — |
| Classifieds | Labelled “opening soon” placeholder (honest, not a live promise) | — |

---

## Area 2 — Activities & destinations — `#activities`

Working title kept internally; on-page title is a **statement** (all section titles are
statements, not questions). One coherent navigation experience — a single card system
with shared grammar (equal size, one surface family, one accent set, small thumbnail),
not nine unrelated multicoloured boxes. Important destinations one click away.

| Destination | Route | Honesty note |
|---|---|---|
| Read the news | `/newsstand.html` | live |
| Take a class | `/sunnyvaile-high.html` | Pop Quiz + growing class library; **not** promoted as a full video-course catalogue |
| Look something up | `/library.html` | live |
| Watch the latest episode | dynamic → `/issues/issue-04.html` | resolves to latest published |
| Listen to KSVL | `/radio.html` | live |
| Do an activity | `#activity-picker` (FAiRY Godmother, Mme CLAi-O, BWS, Dream Phone, Girl Talk) | Girl Talk notes “Resident Card required” |
| Connect with the community | `/sorority-house.html` | Delta LAi Nu rooms; live chat is **not** claimed live here |
| Explore the town | `#town-map` | the single town map |
| Open My Closet | `/laidies-card.html` | device-local unless signed in; no cross-device claim |

**Find-your-level strip** (honest skill-level discovery): Orientation basics
(`/visitors-centre.html`) · Practical tools (`#activity-picker`) · Classes & Pop Quiz
(`/sunnyvaile-high.html`) · Deeper analysis (`/newsstand.html`, `/library.html`).
No invented advanced course is claimed.

**Town map** (`#town-map`): the ONE `sunnyvaile-town-map-final-v5.webp` with interactive
hotspots + a `<details>` full directory. Buildings are not re-listed as cards elsewhere.

---

## Area 3 — How LAiDIES works & why it matters — `#how`

One cohesive sequence (method + mission), not a slogan panel and not a dry explainer.

1. The method, four beats reinforcing one lesson: Follow the plot → Unlock the idea
   (Rewind-Era analogy) → Make it click (Try-On, quiz, cards) → Make it stick (KSVL song).
2. Why LAiDIES exists: women shaped computing/AI’s past; women are shaping AI’s future
   now; why it matters that women learn/use/form opinions on AI; the invitation to join.
3. **LUMINAiRY lives here once** — “Meet the women behind AI” → `/luminairy.html`.
   Not repeated in Area 2.
- Ada Lovelace (`ada-lovelace-y2k-stained-glass.png`, 2:3) at **balanced** scale within a
  composed stage — never a narrow tower beside oversized text.
- Karen Spärck Jones quote retained (attributed).
- Links: trailer `/visitors-centre.html`, LUMINAiRY `/luminairy.html`,
  latest episode dynamic, KSVL `/radio.html`.

## Area 4 — Move to SUNNYVAiLE — `#sunnyvaile`

One coherent sequence, image + text as one intentional stage (Delta LAi Nu house image).

- What joining means → make a Resident Card (`/maikeover.html`, ~2 min).
- What the Card unlocks: Delta LAi Nu rooms, Girl Talk, a Closet.
- What the Closet holds: progress + collections — Charms, Puffies, Stickers, Trading cards,
  Mail (Mail labelled as arriving; not claimed live).
- Sign in / Join: `/post-office.html#signin` · `/maikeover.html`.
- Wednesday Postcard, correct behaviour: making a Resident Card has **Send me the
  Wednesday Postcard selected by default**, untick to opt out; a visitor who does not want
  a Card may request the Postcard separately at `/post-office.html#rent`.

## Footer
Logo + tagline “Girl power meets machine power.” + one-line world statement.

---

## Duplication map (each message → one home)
- LUMINAiRY / “meet the women” → Area 3 only.
- Town buildings → the single town map in Area 2 only (district cards not repeated).
- Wednesday Tour route → Area 1 only (Area 2 links to it, does not re-list stops).
- Resident Card / Closet / Postcard → Area 4 only (header/masthead link to it).
- Latest episode → resolved once, referenced by dynamic hook wherever shown.
