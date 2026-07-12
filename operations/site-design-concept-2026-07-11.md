# MAiN STREET, ON AIR — a design concept for laidies.ai
### Designed from the content, the users, and the goal — not from the current site.

---

## 1 · What this site actually is (and why that dictates the design)

Strip away every page and here is the real product, verified against the repo:

- **A weekly show.** Episodes with an act structure, audio + written, a new one every Wednesday. This is the spine.
- **A spaced-repetition learning system disguised as a town.** One concept per week is taught (episode), held (Study Pack), proven (Pop Quiz), and made unforgettable (the song). The buildings aren't decoration — they're the memory palace. That's the actual pedagogy, and it's genuinely novel.
- **Real utilities.** The FAiRY Godmother is a working AI advisor. The NewsStand is a real weekly briefing. The LIBRAiRY is a real reference. These deliver value in one visit with zero lore.
- **A progression identity.** The Residence Card and Closet turn attendance into belonging: stickers, charms, badges, a public @handle page.
- **A world with canon.** Saints, mavens, a mayor, a radio DJ, addresses, songs. Deep enough to reward exploration for months.

Two forces must coexist in the design: **a fictional place** (spatial, warm, explorable) and **a weekly broadcast** (temporal, urgent, fresh). Every design decision below serves one of those two, or usability. Anything that serves none gets cut. This is the discipline that was missing from every attempt so far — including today's.

## 2 · The four visits the design must win

**Visit 1 — "What is this?" (cold, ~40 seconds, probably at work).**
She needs: the premise in one glance, proof of quality in one scroll, and exactly one obvious first step. She fails out if the page looks like a template, overwhelms her with town jargon, or asks her to commit before delighting her.

**Visit 2 — "It's Wednesday." (the ritual, 5–25 minutes, weekly).**
She needs: what's new, where she left off, one tap into the episode, and visible credit for showing up. This visit is the business. The design must make Wednesday feel like something *happening*, not a content update.

**Visit 3 — "I need a thing." (utility, 2–10 minutes, any day).**
Prompt help, a definition, the week's AI news, a 10-minute break. She needs task-first entry that never makes her walk through the fiction to get to the function.

**Visit 4 — "This is mine." (resident, open-ended).**
Collections, card, closets of others, games. She needs her stuff one tap away and her progress felt everywhere.

Current homepage sin, all versions including mine: designing for Visit 1 five times in a row down the page. The concept below gives each visit its own layer instead.

## 3 · The concept: MAiN STREET, ON AIR

**The homepage is the town's establishing shot, and the establishing shot is the navigation.**

Not cards *about* a town. The town. Your MAiN Street panorama — the single best asset the brand owns — becomes the primary navigation instrument: a full-bleed, explorable street elevation where every storefront is a real, labelled, live destination. Above it, one broadcast layer: what's airing this week. Below it, one utility layer: the things she came to *do*. That's the whole homepage. Three layers, three visits, one screen each.

Why this is the right kind of unique: "every feature has an address" is your content model. A site whose *nav is literally the street* doesn't decorate the concept — it IS the concept, and it's a homepage no competitor could copy without first building a town. And it's honest: the storefront she clicks is the page she lands in.

### The homepage, beat by beat

**Beat 1 — ON AIR (the broadcast layer).** A slim, confident masthead: wordmark, four text links, Sign in, her Residence Card chip if she has one. Then the week: episode title set like a title card, one line of premise, one primary action ("Pick up the tape"), and the Wednesday cadence stated plainly. For the new visitor this doubles as the premise line — *"AI fluency, taught through the pop culture you never forgot"* sits here as the site's masthead-level claim, permanent, above whatever is airing. No TV bezel pastiche; the *typography* is the title card. Restraint here buys the street its impact.

**Beat 2 — THE STREET (the spatial layer).** Full-bleed panorama, tall, lovingly presented — the first true "whoa" of the page. It pans gently on scroll (parallax ≤ 8px, reduced-motion: static). Every storefront carries a small signage chip: name + what-you-do-there in four words ("BLEND & SNAP — study notes & coffee"). Chips glow when that building restocked this week: the Chick Flicks chip literally shows the new episode number on Wednesday — the street *tells time*. Hover lifts the chip; click walks in. Beneath it (visually part of it) a one-line invitation: "Every lesson has an address. Walk in anywhere." For accessibility and SEO, an identical semantic list of all destinations renders below the image and is what screen readers and crawlers see; the panorama is progressive enhancement over a real nav, not instead of one. On mobile the street becomes a smooth horizontal pan — a street you swipe down Main along, chips tappable, with the list fallback one flick below.

**Off-MAiN is deliberate, not missing.** The panorama shows MAiN Nos. 1–10 only; the High, the LUMINAiRY, Civic Square (Town Hall, Post Office, LIBRAiRY), Wisteria Lane, and Willow Lane are out of frame — as they should be in an establishing shot. They are reached three ways: (1) the Errands layer is address-blind — tasks route anywhere in town without the visitor needing geography; (2) **street corners** — diegetic signposts at each end of the panorama ("↰ Schoolhouse Rd · Lantern Hill · Wisteria Lane ↱") open the rest of town, building discovery into the composition honestly; (3) the semantic directory beneath the street lists every destination grouped by street. Growth path: as matching daytime elevations are rendered for the other districts (Codex image brief), each district strip becomes the wayfinding ribbon inside its own buildings. The homepage stays MAiN-only; the town grows behind it.

**Beat 3 — THE ERRANDS (the utility layer).** Task-first, fiction-second. Six plain-language jobs, each one line: *Get prompt help → Fix my prompt with the FAiRY Godmother. Catch up on AI news → This week at the NewsStand. Look something up → The LIBRAiRY. Take a 10-minute break → The games. Start from zero → Episode 1. Test myself → Pop Quiz.* The label is the job; the destination is the world. A stranger uses this without learning a single town word — and learns three of them by using it.

**Beat 4 — PROOF & BELONGING.** One band that does what testimonials do, diegetically: three real residents' public Closets (they exist — viewing is built), a live charm count, the Patron Saints introduced in one sentence with a door to the LUMINAiRY. New visitor reads: *people live here.*

**Beat 5 — MOVE IN.** One decision, two honest paths, exactly as canon: the Wednesday Postcard (Post Office, form right there) and the Residence Card (MAiKEOVER, labelled truthfully until it's open). Then end credits: "See you next Wednesday."

Five beats. Nothing explains the town twice, because the street explains itself.

### The Wednesday transformation (world-building as retention)

The set is alive. Driven by `episode-index.json` — no new backend: on Wednesdays the ON AIR layer flips to the new title card, the Chick Flicks chip changes its marquee number, and for a returning resident the layer greets her progress ("3 of 4 stops left this week"), sourced from the tour state that already exists. Seasonal set-dressing (a decorated street for launches, book-fair week at the High) is one image swap. The homepage becomes something she *checks*, like weather — because it visibly changes on a schedule. This is the single most valuable retention mechanic available, and it costs almost nothing.

## 4 · The visual system (rules, not vibes)

The taste failure of every attempt so far — mine included — was assembling colours and props ad hoc. So the system is defined by hard rules, with the final palette execution owned by an eye you trust (a designer, or locked swatch-by-swatch with you against renders — never invented in CSS again):

**Rule 1 — The art is the only colour authority.** All interface colour derives from the panorama and building interiors, extracted and value-tested as a set, applied 60/30/10: ~60% quiet field (paper-white; warm, never beige-block), ~30% one anchor drawn from the street's architecture, ~10% pops used only for signage, state, and reward. No colour enters the UI that can't be pointed to in the art.

**Rule 2 — Type is signage.** The town communicates through shop signs; so does the site. One editorial display face for title cards and episode names, one geometric sans for UI and body, and *section headers set as that section's sign* — the Errands header looks like a classifieds header, the Move-in header like the Post Office window. Pixel type appears only inside actual screens (players, counters). Type does the world-building so ornament doesn't have to — this is how Wes Anderson frames stay elegant while being maximal.

**Rule 3 — Photography is the depth; UI is flat and quiet.** The art is rich, painterly, dimensional. Therefore chrome is flat, precise, almost invisible — hairlines, generous whitespace, no drop-shadow theatre, no gradients on controls. Contrast between the lush world and the calm instrument layer is the aesthetic. (Every failed comp did the opposite: busy chrome fighting busy art.)

**Rule 4 — One signature motion.** Lights. Storefront chips glow on, marquee letters flip on Wednesday, the ON AIR dot pulses once on load. Nothing else moves without being asked. Reduced-motion honours everything.

**Rule 5 — Diegetic, or silent.** A component may be an object from the world (a sign, a ticket, a marquee, a tape) or it may be quiet standard UI. It may never be "themed" — no fake stickers on generic cards, ever again.

## 5 · Exceeding the benchmarks (the boring list that makes it great)

Five-second test: premise + this week's episode + one action, all above the fold, in text — passes even with images off. One primary CTA per view. Task-path to any core function ≤ 2 clicks, in plain language (Beat 3 guarantees it). Full semantic nav under the panorama: WCAG 2.1 AA contrast on every chip and scrim, keyboard-walkable street, alt text that world-builds. LCP guarded: panorama served responsive AVIF/WebP with a low-res paint-in; fonts preloaded; zero blocking scripts above the street. Mobile-first layout tested at 375px. Honest-labelling everywhere (canon rule and a UX best practice). Analytics on the five beats so "getting it" is measured: Postcard signups, Episode-1 starts, Wednesday return rate, errand usage, closet visits.

## 6 · Beyond the homepage (so the system scales)

Interiors follow one template grammar: every building page opens with its establishing interior (the assets exist), signage-set header, then its function immediately — never lore before utility. Wayfinding is constant: a slim street-strip ribbon at the top of every interior shows where you are on MAiN and lets you step next door — the town becomes the site's breadcrumb. The "you" layer (card chip, tour ticks, charm finds) renders identically everywhere. Episode pages keep their locked VHS brief — that direction was always right; it now has a town that matches it.

## 7 · What it takes

Phase 1 (structure + street): panorama nav with chips + semantic fallback, ON AIR layer fed by episode-index, Errands, Move-in — buildable now with existing assets. Phase 2 (the eye): palette extraction + type casting locked with you against rendered samples, or by a designer handed this document. Phase 3 (alive): Wednesday transformation, resident greeting, seasonal dressing. Off-MAiN buildings need daytime exteriors matched to the panorama's light for their chips/interiors — one Codex image brief.

*Compiled 2026-07-11. Source of truth for the redesign conversation. Everything here is grounded in the feature inventory, master brief, and canon index of the same date.*
