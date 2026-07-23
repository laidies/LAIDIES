# LEARN REVENUE — how LAiDIES makes (or is meant to make) money

*OS-pass research, 2026-07-22. Every claim below is grounded in a file or a memory digest.
"NOT VERIFIED" marks anything I could not confirm in source.*

---

## THE ONE-LINE ANSWER

**Today the site earns $0.** Every revenue surface that exists is a scaffold with the
payment step deliberately left unwired — the Gift Shop's "Buy" buttons all point at `#`,
there is no Stripe/Gumroad/Printful/PayPal integration anywhere in the codebase, and the
paid membership tier is designed but its money half was never built. This is by design and
by Ali's own boundary, not an oversight (see the boundary rule below).

The single grounded strategic ruling — from `monetization-priority` memory (2026-07-16) —
is: **merch is the cherry, not the cake.** The cake is recurring membership + digital
products, and none of it should be pushed before there's an audience. The highest-leverage
next step named there is *analytics*, not a store.

---

## THE HARD BOUNDARY (read before proposing any "just wire it up")

From `monetization-priority` memory: *"I can build storefront/product pages + wire a
checkout, but I must NOT create payment accounts or enter financial credentials — Stripe/
Printful/etc. account setup + keys are Ali's to do."* This matches the system safety rule.
**I scaffold; Ali connects.** Any revenue task ends at a hosted checkout URL that Ali pastes
in — I never touch the money plumbing.

---

## WHAT ACTUALLY EXISTS vs WHAT'S JUST FLOATED

### 1. The Gift Shop — BUILT (page), DORMANT (checkout)
`shop.html` — a complete print-on-demand storefront. 13 products, priced, with art, gift
messaging, and Plausible + Clarity analytics wired.

- **Products & prices** (`shop.html:113-159`): Deb NOPE poster set $28, Deb 1999 poster $20,
  Patron-Saint Window print $24, Full Pantheon set $42, Episode pixel-art print $22, Puffy
  Sticker Sheet $8, four tees @ $34, NOPE Pad $12, SUNNYVAiLE Tote $24, KSVL Mix (digital) $6.
- **Checkout status: NOT LIVE.** Every `buyUrl` is `"#"` (lines 117-158). The render logic
  (`shop.html:169-172`) shows a "Coming soon" / "Send as a gift" button instead of a real
  buy link until a URL is pasted in. Clicks fire a Plausible `Gift Shop click` event — so
  demand is being *measured* even before anything sells.
- **Go-live path is documented in the file itself** (`shop.html:98-112`): create products in
  Printful (physical) / Gumroad (the digital mix), paste each hosted checkout URL into
  `buyUrl`. "No payment code lives on this site, so there's nothing to secure here." This is
  the lowest-effort first-dollar path — **model = print-on-demand dropship, $0 upfront, no
  inventory** (confirmed in `monetization-priority`: only cost is optional ~$25 samples).
- Book Fair (`bookfair.html`) already funnels to the shop: redeemed drops carry an
  "✦ Order a real one" link to `/shop.html`.

### 2. Paid membership tier ("Residence Card" / VIP Resident) — HALF BUILT
This is the designed "cake." Grounded in `membership-architecture-plan` +
`member-card-migration` memory.

- **BUILT:** Supabase project `laidies-member-pass`, magic-link ("Post Office") sign-in
  working end-to-end (email delivered from `postoffice@laidies.ai`), member schema, RLS,
  localStorage→server sync, public cards at `?u=handle`. The identity layer is real code.
- **NOT BUILT / NOT RUNNING:** there is **no paid tier, no upgrade flow, no billing.** The
  membership plumbing is auth + free profile only. There is no `is_paid` billing anywhere.
- ⚠ **Service state caveat** (`member-mechanics-audit-2026-07-22`): as of 2026-07-22 Supabase
  was verified **INACTIVE / paused** (management API `status: INACTIVE`, Supabase host
  returning NXDOMAIN). *Re-check before quoting — the lesson is the method, not the status.*
- The membership plan is what gates almost everything social (below).

### 3. KSVL "Burn the CD" digital download — DESIGNED, NOT BUILT
`ksvl-mix-cd-monetization` memory locks the mechanic: free tier streams on KSVL radio, paid
tier gets a **"Burn this CD →"** button that downloads a .zip of the mix. Y2K-perfect metaphor.
- **Reality:** grep found **no "Burn this CD" button anywhere** — not in `ksvl-player.js`,
  not in `index.html`. The player renders a rack of CD-Rs but has no download/paid logic.
- The only trace of it selling is the $6 "KSVL Mix — Saints on 99.9" digital item in
  `shop.html:156` (Gumroad-style instant download), also with `buyUrl: "#"`.
- **Gated on:** the paid membership tier (which doesn't exist) OR a standalone Gumroad file.

### 4. KSVL real-product sponsor ads — FUTURE IDEA ONLY
`ksvl-real-product-ads-future` memory: the fictional in-town radio commercials could later
carry paid sponsor reads in the same voice, podcast-CPM priced *"once audience is
measurable."* No implementation, no sponsor. Explicitly audience-gated.

### 5. Trading-card / collectible economy — NOT a revenue stream (and trading is fictional)
`trading-card-economy-locked` + `operations/collectible-economy-review.md`. Packs, rarity,
gifting, leaderboard. **Important for the revenue picture: this economy uses earned currency
(butterfly clips), not money — it is engagement, not revenue.** And per the collectible
review, **trading itself does not exist**: 7 pages promise "trade them" in the present tense
with zero backing code; only the paid-membership identity layer (Part C) unblocks it. The
only cash cross-over is that some collectibles can be *ordered as real merch* at the shop.

### 6. Reference-Closet affiliate commerce — FLOATED, NOT BUILT
`docs/growth/reference-closet-commerce-plan.md` + `ali-idea-backlog.md`. "Shop the Closet" —
affiliate links on the movie/object references (Clueless, Mean Girls, etc.). Data fields
sketched, guardrails written (disclose affiliate links; do NOT frame as Amazon-branded — Ali
is an Amazon tax leader and this must stay a LAiDIES resource, not an employer feature). No
links live; guardrail says never publish a link without checking availability that week.

### 7. Workshops / cohorts / templates — the "real business" thesis, deliberately not started
`docs/growth/laidies-growth-operating-system.md` (Phase 3–4) argues the strongest long-term
business is **NOT ads or merch** — it's *"training, workshops, templates, and community for
women at work"* (paid template pack → live workshop → 6-week cohort → corporate/ERG package →
membership). Hard guardrail (line 71): **"Do not build a paid tier until"** a repeated demand
signal appears (people asking for templates / office hours / a team version / to teach it
internally). This is a wait-for-signal stance, not a build order.

### 8. FAiRY Godmother free-wish cap — a paywall SHELL, no payment
`games/fairy-godmother.html:1065,1255`: uses `laidies_subscriber` (localStorage flag) and a
free-wish cap. Copy: *"Ali pays for the FAiRY Godmother's wand out of pocket… Subscribers get
5 wishes a day… Higher caps unlock with LAiDIES membership (in the works!)."* This is the one
place a paid tier is *surfaced to users*, but the flag is honor-system localStorage with no
billing behind it.

### Newsletter plumbing (context, not revenue)
The Wednesday Drop newsletter runs on **Buttondown** (`buttondown.com/laidies`, embedded in
`post-office.html` / `index.html` / etc.) — free tier, not monetized. This is the audience
engine the whole growth OS depends on.

---

## WHAT EARNS FIRST, FOR LEAST ALI EFFORT

Ranking by (dollars-soon ÷ Ali-effort), reconciled with the `monetization-priority` ruling
that merch is the cherry and analytics is the real next step:

1. **Turn on the Gift Shop (POD).** Lowest possible lift: the page, art, prices, and analytics
   already ship. Ali's *only* task = create the products in Printful + Gumroad and paste ~13
   hosted checkout URLs into `shop.html`'s `buyUrl` fields. $0 upfront, no inventory, no code
   change by me beyond swapping strings. **Caveat from Ali herself:** she got cold feet
   ("who's going to buy these") and the ruling corrected the priority — merch converts *only
   once fans exist*, so this earns little pre-audience. It's the cheapest to switch on and the
   cheapest to leave dormant.
2. **Sell the $6 KSVL Mix as a standalone Gumroad file.** Digital, instant delivery, no print
   partner, no membership dependency. One Gumroad product + one URL paste. Decoupling it from
   the unbuilt paid tier makes it shippable now.
3. **Buttondown paid subscriptions / a "supporter" tier** — NOT VERIFIED whether the current
   Buttondown plan supports paid subs, but this would monetize the audience directly without
   building the Supabase paid tier. Worth checking as a low-lift bridge.
4. **Paid membership + Burn-the-CD** — highest ceiling, highest effort. Needs the paid tier
   built on top of the (currently paused) Supabase identity layer, plus billing Ali connects.
   This is the sustainable long game, gated on audience + Part C.
5. **Affiliate "Shop the Closet"** — cheap to add but low-yield and maintenance-heavy (weekly
   link-checking), and revenue only at real traffic.
6. **Sponsor ads / workshops / cohorts** — highest potential (esp. workshops per the growth
   OS), but all explicitly **audience-signal-gated**. Not now.

---

## THE HONEST TENSION (surface to Ali)

Two grounded strategy docs point in *slightly different* directions and Ali should reconcile:
- `monetization-priority` memory says the sequence is content → **analytics** → community/
  membership → merch-later. Membership is the cake.
- `laidies-growth-operating-system.md` says the strongest business is **workshops/training/
  templates**, and to build *no* paid tier until demand signals repeat.

Both agree on: **don't monetize ahead of audience; install/read analytics first; merch is not
the engine.** Analytics is already live (Plausible + Clarity on `shop.html`, and the shop
click-tracking is effectively a demand probe). So the truly-next revenue action is arguably
**let the shop + analytics run, watch for the signal, and only then pick a lane** — with the
POD shop as the cheap, already-built thing to flip on for first dollars whenever Ali wants.

---

## GAPS / THINGS I COULD NOT VERIFY
- `operations/member-promises-audit-2026-07-22.md` is **referenced by memory but does not
  exist** on disk (only `collectible-economy-review.md` covers similar ground). Flag: memory
  points at a missing file.
- Whether Buttondown's current plan supports paid subscriptions — NOT VERIFIED.
- Current live status of the Supabase project (was INACTIVE 2026-07-22) — must be re-checked,
  not quoted.
- No pricing rationale doc exists for the shop numbers — prices in `shop.html` are the
  author's placeholders (comment says "set the real price in Printful/Gumroad").
