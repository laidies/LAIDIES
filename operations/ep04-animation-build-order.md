# EP4 — ANIMATION BUILD ORDER

*2026-07-22. Joined `operations/captions/episode-04-timing-map.json` (206 timed narration lines)
to the 57-cue sheet. Times and words are straight from those files; motion vocabulary from
`comic-animation-frame-spec.md`. This per-beat 'what moves / where it fits' map did not exist before.*

✅ built (in render script) · 🎬 needs Codex motion clip · 🔧 needs a frame swap first · ▪ static by design

| # | time | on screen | the beat | motion | status |
|---|---|---|---|---|---|
| 0 | 0:00.0 | `open-01-previously-strip-com` | Previously, on LAiDIES: our heroine got a gorgeous, con… | recap strip — static | ▪ |
| 1 | 0:19.7 | `open-03-title-comic-v1-exact` | And on this episode: three weeks in, she realizes she's… | gold shine-sweep loop | ✅ |
| 2 | 0:56.3 | `open-04-desk-comic-v1-face-l` | I have been talking to this thing every day for three w… | monitor glow pulse loop | ✅ |
| 3 | 1:01.4 | `open-05-unease-comic-v1-face` | I've briefed it, argued with it, caught it lying to my … | **push-in** — wide to close on her face as doubt lands | 🎬 |
| 4 | 1:13.9 | `open-06-thinking-closeup-com` | Who made it. It's like I moved in with someone and real… | static hold | ▪ |
| 5 | 1:23.6 | `open-07-questions-comic-v1-e` | And I couldn't help but wonder... this thing that showe… | static hold | ▪ |
| 6 | 1:50.8 | `open-09-recap-3panel-comic-v` | Three weeks ago you stopped feeling behind. Then you le… | recap strip — static | ▪ |
| 7 | 2:10.3 | `open-10-car-engine-comic-v5-` | So this week, no new trick. This week's a flashback. It… | static hold | ▪ |
| 8 | 2:29.3 | `open-11-mall-directory-comic` | Which AI? ChatGPT? Claude? The one my company announced… | directory panels + neon flicker loop | ✅ |
| 9 | 2:38.3 | `open-12-which-ai-comic-v2-re` | Because "just use AI" isn't really an instruction. "AI"… | static hold | ▪ |
| 10 | 2:52.4 | `open-13-just-use-internet-co` | With the internet, you already know which part does wha… | static hold | ▪ |
| 11 | 2:58.2 | `open-14-question-hangs-comic` | With AI, nobody has handed you that map yet. And the co… | static hold | ▪ |
| 12 | 3:06.1 | `open-15f-transformation-main` | She couldn't have told me either. But before I could ev… | **TRANSFORMATION** — current frame is RETIRED; use approved 5-frame stage sequence (corporate → poof builds → covers → clears → reveal) | 🔧 |
| 13 | 3:23.6 | `open-16-luminairy-approach-c` | And for that, I went up the hill, to the LUMINAiRY — SU… | path-lantern + firefly flicker loop | ✅ |
| 14 | 3:40.7 | `open-17-maivens-hall-comic-v` | No movie stars in there. ...Well. Almost no movie stars… | candle flicker loop | ✅ |
| 15 | 4:01.4 | `open-18-grace-looks-up-at-ad` | The lights go soft. Somewhere, a harp.… | **push-in** — hall up to Ada in the window; leads into first time-jump | 🎬 |
| 16 | 4:05.7 | `transition-ada-timejump-lond` | Stay with me — we're going back. It starts in the eight… | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 17 | 4:10.6 | `scene-03-ada-loop-v1` | With a young woman staring at a giant mechanical calcul… | notes travel to camera; plays once, freezes | ✅ |
| 18 | 5:05.9 | `scene-03-ada-b-mid-comic-v1-` | It only ever does what we know how to order it to do. R… | candle + lamp flicker loop | ✅ |
| 19 | 5:42.1 | `tj-hedy-comic-v2-timnit-styl` | Now jump ahead a century, to nineteen forty-two. And th… | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 20 | 5:49.4 | `scene-04-hedy-comic-v2-timni` | She was billed, at the time, as the most beautiful woma… | static hold | ▪ |
| 21 | 6:34.7 | `scene-04-hedy-b-mid-comic-v1` | You cannot jam a signal you cannot find. Hedy Lamarr — … | signal hops the arc; once, freezes | ✅ |
| 22 | 7:18.2 | `tj-eniac-comic-v1-exact-capt` | And three years later — nineteen forty-five — with the … | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 23 | 7:37.4 | `scene-04b-eniac-comic-v4-str` | But a machine that new doesn't come with instructions. … | panel-lamp flicker loop | ✅ |
| 24 | 8:22.4 | `scene-04b-eniac-c-end-comic-` | And when the ENIAC is shown to the press, the men in th… | **SWAP** to approved comic page (men named / women uncredited) | 🔧 |
| 25 | 9:03.1 | `tj-grace-comic-v2-philadelph` | The machines are real now — but talking to one is agony… | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 26 | 9:08.6 | `scene-05-grace-a-start-comic` | You had to write in raw code, the machine's own languag… | static hold | ▪ |
| 27 | 9:38.0 | `scene-05-grace-b-mid-comic-v` | I found that a failure of imagination. Why should a per… | console-lamp flicker loop | ✅ |
| 28 | 10:26.1 | `scene-05-grace-c-end-comic-v` | She kept the logbook.… | **state-change** — the moth lands on the relay; 2-3 frames; EXACT cue 10:15 | 🎬 |
| 29 | 10:28.3 | `tj-dartmouth-comic-v2-timnit` | And it's right here — nineteen fifty-six — that the men… | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 30 | 10:35.4 | `scene-06-naming-comic-v1-fre` | A handful of them get a room at Dartmouth for the summe… | **state-change** — chalk writing appears on the board | 🎬 |
| 31 | 10:48.5 | `scene-06-naming-b-mid-comic-` | And then they promise the world it'll be basically solv… | static hold | ▪ |
| 32 | 10:55.4 | `scene-06-naming-c-end-comic-` | It was not solved by the end of the summer. It wasn't s… | static hold | ▪ |
| 33 | 11:01.8 | `scene-07-ai-winter-a-start-c` | The funding dried up, the promises curdled, and "AI" be… | **state-change** — monitors go dark across the 3 winter beats | 🎬 |
| 34 | 11:09.5 | `scene-07-ai-winter-comic-v1-` | They call those the AI winters.… | static hold | ▪ |
| 35 | 11:12.5 | `scene-07-ai-winter-c-end-com` | Roughly two of them. It got cold more than once.… | static hold | ▪ |
| 36 | 11:17.2 | `tj-karen-comic-v2-timnit-sty` | But even in the cold, the work didn't stop.… | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 37 | 11:22.8 | `scene-08-karen-comic-v3-clea` | Nineteen seventy-two — a woman at Cambridge cracks a pr… | CRT + server-LED flicker loop | ✅ |
| 38 | 12:18.7 | `scene-08-karen-c-end-comic-v` | Karen Spärck Jones. She spent most of her career on sho… | static hold | ▪ |
| 39 | 12:45.3 | `tj-feifei-comic-v1-exact-cap` | ...Write that one down. And then — decades later, after… | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 40 | 12:53.9 | `scene-09-fei-fei-a-start-com` | It comes from a professor at Stanford named Fei-Fei Li,… | static hold | ▪ |
| 41 | 13:19.2 | `scene-09-fei-fei-b-mid-comic` | And she builds the thing everyone told her was far too … | **pull-out reveal** — close to wide; the wall FILLS with millions of images | 🎬 |
| 42 | 13:47.2 | `scene-09-fei-fei-comic-v2-ti` | That is the spark. That "AI boom" people won't stop tal… | static hold | ▪ |
| 43 | 14:04.4 | `open-04-desk-comic-v1-face-l` | And after that, it moves fast. Twenty-seventeen, a team… | monitor glow pulse loop | ✅ |
| 44 | 14:56.2 | `tj-modern-comic-v1-2018-2021` | But here's the part the highlight reel skips.… | time-jump swirl → era card (swirl asset exists) | 🎬 |
| 45 | 14:59.9 | `scene-11a-joy-comic-v2-timni` | As it got powerful, another set of women got loud — on … | static hold | ▪ |
| 46 | 15:31.0 | `scene-11b-timnit-comic-v1-ra` | Timnit Gebru — whose own doctoral advisor was Fei-Fei L… | static hold | ▪ |
| 47 | 15:58.7 | `scene-11b-timnit-comic-v1-ra` | Gebru raised it inside Google, and in twenty-twenty she… | static hold | ▪ |
| 48 | 16:16.6 | `scene-11d-kate-comic-v2-timn` | And Kate Crawford maps the part nobody wants to look at… | server-rack LED flicker loop | ✅ |
| 49 | 16:44.3 | `splash-lights-up-comic-v1-st` | Last week you learned to check the machine. These are t… | 14s cross-dissolve dim to blazing | ✅ |
| 50 | 17:20.6 | `splash-lights-up-comic-v1-en` | The newest chapter, the one still being written this ve… | static hold | ▪ |
| 51 | 18:05.4 | `cocktail-comic-v1-exact-mixe` | Whether or not the textbook bothered to write it down. … | static hold | ▪ |
| 52 | 18:54.6 | `around-town-comic-v1` | Because it's very hard to feel behind on something the … | static hold | ▪ |
| 53 | 19:22.2 | `sign-off-comic-v1` | And if this is your first Wednesday with us, stop by Ma… | static hold | ▪ |
| 54 | 19:49.2 | `next-week-comic-v1` | Computing is too important to be left to men. See you n… | static hold | ▪ |

## Summary

- ✅ **14 built** — background light motion, already in the cut
- 🎬 **6 real motion clips owed** — push-in, pan, state-change, reveal (the moth, the wall, the opening push-ins)
- 🎬 **8 time-jump swirls** — swirl asset exists; each era card gets it
- 🔧 **2 frame swaps** — transformation → 5-frame stage sequence; ENIAC → comic page
- ▪ **25 static by design** — text cards, recap, quick beats

The only genuinely-missing *animation* is the 🎬 rows. That is the Codex work list.