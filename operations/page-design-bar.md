# THE PAGE DESIGN BAR — measured, not remembered

> Built 2026-07-22 after I shipped a Post Office page in flat cream at half the homepage's type
> scale. Ali: *"it looks boring. didn't the brief say it must look at least as good as the
> homepage?"* — and then, correctly: *"why did you not follow the brief or review things… I keep
> asking you what we need to do to set up this project better so this doesn't keep happening…
> and then nothing ever changes."*
>
> **Nothing changed because every previous fix was a document, and documents only work if I
> choose to read them.** The art rules stick because `enforce-art-prompt.py` BLOCKS. This file is
> the design equivalent, and `.claude/hooks/enforce-page-design.py` enforces it.

## The reference is `index.html`. These are its real values.

Read off the live homepage in the browser, 2026-07-22. **Do not guess these. Do not "improve"
them from taste.** If you think one is wrong, open index.html and measure again.

| | Value |
|---|---|
| page canvas | `rgb(28, 15, 28)` — near-black aubergine |
| ink on candy | `#3a1838` |
| h1 | **74.88px**, weight **800**, line-height ≈0.98 |
| section headings | **57.6px** — every one of the ten sections |
| buttons | solid candy fill · **dark plum text** · **10px** radius |
| backgrounds | gradient or image — **never flat** |
| font | Jost |
| candy | pink `#e982ab` · teal `#57b6c0` · coral `#ec7a78` · periwinkle `#b3abe7` |

## What the hook blocks

A building page under `Website-homepage/` is BLOCKED if it:

1. **sits on a near-white canvas** — the shared shell's cream is the single biggest "boring" tell
2. **has no display type** — nothing at 56px or above; the homepage's *section* heads are 57.6px
3. **inherits the 760px centre column** — `assets/sunnyvaile-page.css` forces
   `main { max-width: 760px }`; a building page must override it for itself
4. **uses retired gold or plum as UI colour** — `#c9a227`, `#4b2148`, `var(--gold…)`

Those four are exactly the four failures in the rejected Post Office v3.

## What the hook can NOT check — still on you

Static CSS can't see a page. It cannot tell you the layout is dull, the art is off-brand, or the
mechanic is wrong. **Open the page next to the homepage before calling anything done.**
The hook stops the four cheap regressions; it does not certify a page.

## Related standing rules
- `operations/building-mechanic-audit-2026-07-22.md` — the building's function IS the mechanic
- `operations/post-office-decisions.md` — worked example, including two rejected attempts
- memory: `homepage-bar-measured-numbers`, `building-pages-tell-you-your-state`,
  `page-experience-standard`, `gold-plum-retired-sitewide`

```thresholds
min_display_px = 56
banned_hex = #c9a227, #4b2148
```

---

## Rollout status — 2026-07-22

**Upgraded and verified** (gate passes + contrast measured in-browser, 0–3 failures):
`post-office` · `mall` · `town-hall` · `sunnyvaile-high` · `radio` · `blend-snap` · `maikeover`

**Deliberately NOT upgraded** — reverted to their prior state after measuring:

| Page | Contrast fails after the layer | Why |
|---|---|---|
| chick-flicks | 33 | `.cfs-tag` and the standee hardcode literal `#fffdfb` fills |
| luminairy | 15 | wing-door scrims are pale gradients with their own ink |
| visitors-centre | 10 | own `vc-*` component set, pale CTA panels |
| bronze-aige | 10 | invite/coaster blocks are inline pale gradients |
| sorority-house | 8 | `sh-door` / wing headers are pale panels |
| newsstand | — | its own newspaper design (cream, Bodoni). Dark treatment fights it |

**The lesson, so nobody repeats it:** a token remap fixes pages that use tokens. It cannot fix a
page that hardcodes a light fill — the text goes cream-on-cream. Those six need per-page work,
not another pass of the blanket layer. I chased them selector-by-selector for three rounds and
the numbers stopped improving; that is the signal to stop and revert, not to keep patching.

**Load order matters:** the layer must come after the page's own `<style>`, or the page's
`:root` wins. On pages whose `<style>` is in the body, the link goes after the last `</style>`.
