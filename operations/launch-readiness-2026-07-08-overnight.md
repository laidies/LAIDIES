# Launch-readiness — overnight pass (2026-07-08 → morning of 07-09)

**Bottom line: the site is in good launch shape.** A full-site audit (links, images, naming, placeholders, private-copy, social, domain) came back essentially clean. The only real defects were 3 broken links — all fixed. Everything left is either **yours to do** (record Ep 3, deploy, a couple of decisions) or **optional polish**.

Branch `homepage-redesign` (PR #23). Two checkpoint commits made + pushed overnight — nothing at risk.

---

## ✅ Done overnight (safe, committed, pushed)

**Ep 3 — fully finalized & consistent** across the recording script, the article (`issue-03.md`), voice canon, and social/email:
- Accuracy pass (the deep one): Burn Book "nothing was true", Bethany Byrd reframed, **blue** hoodie, KPMG 40/45, Nature = incentive finding, Stanford = sycophancy, the how-to reordered + expanded to the three-move version, tic sweep. Every claim re-verified against source and logged in the fact ledger.
- New **Verification Rulebook** page (`/grimoire/verification-rulebook.html`) live on the library shelf; quick↔deep cross-links with the SLAiYER Handbook.

**Full-site audit — 114 live pages scanned:**
- **Broken links/images: 3 found, all fixed** — trading-cards → Closet (`/laidies-card.html`), watch.html CSS path (`/assets/sunnyvaile-page.css`), Ep 3 printable image (`-v3`→`-v2`).
- **Stale naming: clean** — every single-Y "SunnyVAiLE" and "DJ JAiDY" is inside the `.retired/` backup (not live); the one "SANCTUAiRY" is the intentional redirect stub.
- **Placeholders: none real** (one is a harmless CSS comment).
- **Private/employer copy: clean** — no personal email/phone; "Ali Eakin" is only the copyright byline; the founder story says "my real job" but names no employer.
- **Social: correct** (IG @laidies.ai; no YouTube link yet, as intended). **Domain: laidies.ai** everywhere (no stale wearelaidies.com).
- `this-week.html` links are **not broken** — it's a graceful redirect to the homepage ("the Wednesday Bag has retired"). Works fine.

---

## ⛔ Needs YOU (the actual launch path)

1. **Record Ep 3.** The script is final and locked — paste `operations/audio/episode-03-elevenlabs-v3-tagged.txt` into ElevenLabs Studio (fixed seed, one Jessica voice + [tv announcer] switch), export **this chapter only**, drop at `content/music/episode-03-narration.mp3`.
2. **Deploy / go live.** Merge `homepage-redesign` → main (or however laidies.ai publishes) — I did **not** touch the deploy; it's outward-facing and yours.
3. **Confirm before flipping Ep 3 to published:** its quiz/card-pack show once you set the issue status to `published` (same pattern as the launch checklist).

## 🟡 Two quick decisions (optional for launch, but easy wins)
- **"Weekly Bag" CTAs** on issue-01 + issue-03 currently redirect to the homepage (fine, not broken) but the *label* is stale. issue-02 already uses the newer try-on / Blend & Snap pattern. Want me to relabel + reroute all episodes to match issue-02? (systemic, ~15 min, needs your target call.)
- **Handbook → 101 consolidation** — planned + parked (`operations/library-101-consolidation-plan.md`); not launch-blocking.

## ⚪ Optional polish (post-launch fine)
- 3 mall stub pages (rollin / pieces-of-flair / maiybe) carry a legacy top-nav; works via redirect, could get the global header.
- `concepts/` prototype pages (design explorations) still link the old `hot-goss.html`; exclude them from the deploy or noindex — they're not linked from the live site.
- SLAiYER Handbook chapters still say "LAiDIES Grimoire" (pre-LIBRAiRY branding) — folds into the consolidation pass.

---

*Verified via a real link-checker (`scratchpad/linkcheck.py`) not eyeballing. No preview audio played (audio-bleed rule).*
