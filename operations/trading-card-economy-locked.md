# TRADING CARD ECONOMY — LOCKED 2026-07-22

## The problem this fixes
Character cards were designed as **deterministic**: visit a building or finish an interaction → get
that character's card. Ali: *"I'm not sure the logic on visiting the page / do an interaction works
for trading cards. The fun is you open a pack and see what you get."*

**Deterministic issuing doesn't just remove the thrill — it destroys trading.** One of each card per
member means nobody ever holds a duplicate, so there is nothing to trade or gift. The whole gifting
economy locked 2026-06-30 requires duplicates to exist.

---
## THE MODEL — locked

**1 · Visiting earns a PACK, not a card.**
Exploration still matters — you must go to the LUMINAiRY, finish Mme CLAi-O's reading — but the
reward is a sealed pack. You open it to find out what you got.

**2 · Where you earn it BIASES the contents.**
A pack from the LUMINAiRY skews SAiNTS / MAiVENS; one from Town Hall skews town regulars. Location
stays meaningful as a weighting, never as a guarantee.

**3 · Rarity lives in the FINISH, not the character.**
Every card exists as **common · holo · foil**. Regina isn't rare — **foil Regina** is.
→ The 22-card roster stays completable through ordinary play (nobody is locked out).
→ The chase continues on finishes, which is what gives duplicates a purpose.

**4 · Pity rule: guaranteed foil every 5th pack, with a VISIBLE counter.**
"2 packs until a guaranteed shiny." Hidden pity feels arbitrary; a visible counter turns a drought
into anticipation. Rationale: this site's promise is *"you were never behind"* — a member who opens
six packs and gets nothing contradicts the brand more than randomness excites her.

**5 · A pack never contains the same card twice.** That reads as broken, not unlucky.

**6 · Effort scales PACKS, not hidden odds.**
Ali: *"the more activities and interactions with the site you have, the better your chances of
getting the really rare cards."* Implemented visibly, two ways:
- **More activity → more packs.** Transparent, and mathematically it IS better odds at rares.
- **Full weekly completion → a GOLD PACK** (more cards + a guaranteed foil) instead of a standard one.
⛔ **Never scale hidden per-pack odds by activity.** Invisible rewards don't motivate, and they
quietly make a casual member's packs worse than everyone else's — the people with least time get the
thinnest experience, which compounds.

**7 · Per-pack odds are FIXED and publishable.** That is what makes it feel fair rather than rigged.

**8 · Keep the Gold Pack gap MODEST.** Better than standard, not twice as good. If missing a week
feels like a penalty, it fights the "you were never behind" promise.

**9 · Gift CARDS, never sealed packs.**
A sealed pack is a lottery ticket — loot-box register on a site for women learning AI, with no age
gating. It also breaks the emotional logic of the June gifting decision (*friendship bracelets,
mixtapes, hand-me-downs*): the warmth is **"I picked this for you."** Gifting a specific duplicate
says *I noticed you didn't have Elle*; a sealed pack says *here, have a random thing*.
*(Open question kept alive: a SHARED opening moment — two members opening together — is the one
version worth building later. Much bigger build.)*

**10 · The week grid DRIVES the economy.**
The dashboard stops being a report card: you can see that completing week 4 earns the Gold Pack.
That is a far better reason to finish a week than a tick mark. See `closet-dashboard-spec.md`.

---
## 🔴 HARD TECHNICAL REQUIREMENT
**Pack opening MUST happen server-side.** If the browser decides a pack's contents, anyone can reroll
until they get the foil. This is the same exposure already flagged in `trading-build-plan.md` — the
client can currently insert its own `member_reward_events`. Randomness, rarity and trading all depend
on the server being the sole authority.

---
## STILL OPEN
- Exact drop rates per finish (common / holo / foil).
- Cards per pack (standard vs Gold).
- Whether Concept cards (weekly, episode-tied) adopt the same finish tiers, or stay flat.
