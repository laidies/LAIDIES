# DESIGN-PLAN — LAiDIES Homepage recomposition (2026-07-30)

## Objective
A coherent, beautiful, unmistakably-LAiDIES Rewind-Era Homepage that a first-time
visitor understands immediately and a returning visitor can use without frustration —
materially better than the protected incumbent, not merely valid.

## Governing tension (resolved)
- The reset brief (2026-07-30, governing) requires **four equal masthead destinations**.
- The steward EXPERIENCE-BRIEF (2026-07-26) preferred **one primary newcomer path**.
- Resolution: follow the newer reset brief — four equal area buttons — while keeping a
  genuinely obvious newcomer on-ramp (the Area 1 visitor-state panel + “Start learning”),
  so newcomers still get one clear start without the masthead pretending there is only one door.
- Copy-lock (`HOMEPAGE-COPY-RULING`) is superseded for the **masthead** only: the reset
  brief explicitly authorises drafting + testing new masthead copy. Method/why copy retains
  the approved substance, recomposed.

## Composition (top → bottom)
Global header → **Masthead** (evergreen, full-bleed) → **Area 1** two-column current-info
(main + Daily Buzz rail) → **Area 2** activities/destinations (one card system) + single town
map → **Area 3** how-it-works & why-it-matters (method + mission + LUMINAiRY, one sequence) →
**Area 4** move-to-SUNNYVAiLE (one image+text stage) → footer.

Rhythm: full-bleed colour bands and image-led stages alternate with calmer reading surfaces
on the soft layered page gradient. Purposeful asymmetry (main + rail; image+copy split
stages). Breathing room is intentional; no unexplained voids.

## Colour system (electric 1990s, not pastel)
- text plum `#3a1838` (text/outline ONLY — never a solid background);
- electric teal `#19d3d1`; hot pink `#ef4d9c`; electric purple `#744fc0` / periwinkle `#6c7cd1`;
  coral `#ff6b61`; sunshine `#f7d45c`.
- Gradient families (from brief): pink→purple→blue, cyan→purple→pink, pink→yellow→cyan,
  soft page gradient, layered page glow. Strong gradients only on major feature/action panels;
  reading surfaces use the soft layered page recipe + plum text.
- Ai treatment (accented `i`) only in brand words where it reads clearly; eyebrows, labels and
  long body use ONE readable colour. Eyebrows one colour, never multi-accent.

## Typography
- **Archivo 800** for major display headings (H1, section H2). **Jost** for body + UI (and small
  headings/eyebrows). Controlled scale via `clamp()`; H1 caps so no heading becomes a 1–2-word
  tower. Eyebrows readable ≥ 0.78rem, letter-spacing tuned, single colour.

## Masthead arrival sequence (once per browser-tab session)
Implements all 10 brief requirements:
1. brief VHS white static line; 2. LAiDIES ident expands from that line; 3. approved master
plays **muted**; 4. second brief static line; 5. full-width masthead revealed; 6. `sessionStorage`
gate → once per tab, not on every back-nav; 7. Skip button (focusable); 8. `prefers-reduced-motion`
(and `?motion=reduce`) → straight to stable masthead, no motion; 9. no autoplay audio (video muted,
`defaultMuted`); 10. masthead markup + text exist underneath from first paint (no geometry jump,
crop, blurred letterbox band, or late-loading masthead text). Ident sits `contain` on a solid
`#1c0f1c` matte (a clean matte, not a blurred band). `?intro=preview` replays for review.

## Reusable components
- `.hp-btn` (one button primitive; variant classes for accent, equal size within a group);
- `.area` band + `.area-head` (eyebrow + Archivo H2 + lede) — one section grammar;
- `.buzz-item` (Daily Buzz card grammar); `.dest-card` (one destination-card grammar, equal size);
- `.stage` split image+copy; `.pill-row` equal-size control groups.
Cards within a group share size, radius, surface family and one accent set (accent is a thin
top rule / icon chip, not a different full background per card).

## Responsive plan (verified at 1440/1280/1000/900/768/390/320)
- Header: full nav ≥ 900px; “Menu” panel < 900px (same items, Escape closes).
- Masthead buttons: 4-up ≥ 1000px; 2×2 640–999px; full stack ≤ 430px. Never 3+1.
- Area 1: main + rail side-by-side ≥ 1000px; single column below, Daily Buzz after episode+tour.
- Area 2 destination grid: 3-up ≥ 1000px; 2-up 640–999px; 1-up ≤ 520px — equal card sizes at each.
- Split stages (Area 3/4) stack image-first ≤ 860px with balanced (not oversized) copy.
- Fluid spacing via `clamp()`; one authoritative mobile spacing block last in the CSS.

## Anti-pattern checklist (self-reject gate before showing Ali)
- [ ] No boxes-inside-boxes; one card grammar per group.
- [ ] Consistent card sizes within every group.
- [ ] No 3-on-a-row + 1 orphan (masthead + every control group).
- [ ] No overlapping text / text-over-face.
- [ ] No bad crops; identity imagery `contain`; faces/signs/labels intact.
- [ ] No unapproved images; rejected SUNNYYVAiLE postcard absent; Jeeves LIBRAiRY-only.
- [ ] No excessive blank space / manufactured equal-height voids.
- [ ] No duplicated destinations (see IA duplication map).
- [ ] Clear section boundaries; each area a distinct intentional part of one page.
- [ ] No internal language in visitor copy (no “tuple/candidate/hold/creator-confirmed…”).
- [ ] No solid plum backgrounds; plum is text/outline only.
- [ ] No dark/neon-on-black; no editorial-magazine or SaaS-dashboard feel.
- [ ] Contrast ≥ 4.5:1 for body text; visible focus; semantic headings; meaningful alt.
- [ ] No horizontal overflow at any tested width.
- [ ] Reduced-motion path verified; no autoplay audio.

## Honesty in the design (see FUNCTIONALITY-GAPS.md)
Realistic labelled states only. No claim that messaging, cross-device account entry,
Closet mutation, personalised “what’s new,” magic-link delivery or a full class catalogue is
operational. “Take a class” routes to the real Pop-Quiz/class surface without over-promising.
