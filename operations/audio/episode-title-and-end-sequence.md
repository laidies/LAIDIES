# LAiDIES — Title Sequence + End Scene (reusable every episode)

Both are built **once** and reused all season, like a real show. Only two things change per week:
the **"Episode N · [title]" card** (title) and the **end song** (that week's anthem). Everything else is fixed.

All assets already exist — the title sequence needs **no new renders.**

---

## ▶ TITLE SEQUENCE  (~25s)

**Music:** "Wednesday in SUNNYVAiLE" by THE LAiDIES — `content/music/the-laidies-wednesday-in-sunnyvaile.mp3`
(4:03 total; use the first ~25s intro/hook).

| time | beat | asset |
|------|------|-------|
| 0:00–0:06 | **The reveal** — the neon "Welcome to SUNNYVAiLE" sign lights up. Cold open into titles. | `assets/video/sunnyvaile-logo-reveal.mp4` |
| 0:06–0:20 | **The town flies by** — fast cuts on the beat (~1–1.3s each, slow push-in on each hero), a walk down Main. | the 17 y2k-v3 heroes (order below) |
| 0:20–0:25 | **Land the card** — LAiDIES logo + **"Episode 01 · On Wednesdays We Do AI"** (the only per-episode change). | logo + text card |

**Montage order (12 flashes, "down Main + up the hill"):**
`01 Visitor's Centre → 07 Chick Flicks → 08 Blend & Snap → 03 Library → 06 Mme CLAi-O → 09 MAiKEOVER →
05 Bronze AiGE → 17 Dream Phone → 04 Mall → 16 KSVL (DJ SunnyV) → 14 SUNNYVAiLE High → 15 The LUMINAiRY`
(from `assets/sunnyvaile-buildings/y2k-v3/`)

**New renders: none.**

---

## ⏹ END SCENE  (~22s)

**Music:** *that week's* Wednesday Anthem — Ep 1 = `content/music/dj-jaidy-week-01-on-wednesday-we-do-ai.mp3`
(end credits roll on the episode's own song).

| time | beat | asset |
|------|------|-------|
| 0:00–0:12 | **Town at dusk** — warm "credits" image, the week's song rising. | park (`assets/sunnyvaile-streets/town-park-afternoon.png`) or a dusk street when the street scenes lock |
| 0:12–0:18 | **"See you next Wednesday… in SUNNYVAiLE"** card. | text card |
| 0:18–0:22 | **Next Time** tease (the announcer's next-ep line / an ep-02 VHS-box flash). | text + `episode-vhs-boxes/ep-02.webp` |

**New renders: 0–1** (an optional dusk town shot; reuse the park to ship now).

---

## How they're used

- **Reused every episode** — only swap the title card + the end song. It's a template, not a per-episode build.
- **In the Screening Room:** play **theme → narration → end song** so pressing play feels like a broadcast starting (that's just player code — not gated on anything).
- **On YouTube / anywhere:** prepend the title, append the end scene to any upload — instant "real show" bookends.
- **Assembly:** cut both in Descript or CapCut from the assets above. One afternoon, done for the season.
