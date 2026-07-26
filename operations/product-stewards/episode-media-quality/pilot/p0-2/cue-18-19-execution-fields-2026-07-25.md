# Episode 04 P0.2 — Cue 18/19 execution fields

**Status:** **FAIL / PENDING. No build, image generation, edit, render or
motion work is authorised by this sheet.** These are the most specific fields
the current evidence permits; every time is on the non-authoritative working
clock from the P0.1 preflight.

## Clock declaration

| Field | Record | State |
|---|---|---|
| Working slice | `245.30–250.30` then `250.30–260.00` | **PENDING** only |
| Audio candidate | `content/music/episode-04-narration.mp3`, SHA-256 `f007a338284550fe27a8e035daf10936a6e1ca0825a40e36484013fce8383688` | Exists, **not final-authority bound** |
| Caption candidate | `operations/captions/episode-04.vtt`, SHA-256 `1bc6b59e3f80b7c7e02c4126a32b9532a31d8621e040f9f09d4fa8d37b0f19d4` | **FAIL** for this clock: related VTT enters at 203.560 and its final relevant cue ends 260.400 |
| As-recorded transcript | None | **FAIL** |

No maker may silently trim, stretch or infer spoken words from the tagged
script. The Audio & Caption Owner must bind the final audio, as-recorded
transcript and retimed VTT or issue a separately recorded boundary change.

## Cue 18 — semantic editorial bridge

| Field | Bound / exact record | State |
|---|---|---|
| Working window | `245.30–250.30` | **PENDING clock** |
| Teaching job | Move from the in-world MAiVENS gallery to a sourced 1843 publication card without pretending that a historical scene or operating machine has been filmed. | **PENDING judge** |
| Start source | Existing Cue 17 still `assets/episodes/ep-04/pixel/ep04-open-18-grace-looks-up-at-ada-maivens-comic-v2-canonical-cathedral-1920.png`, SHA `1fe2f9dfb33f35b6fc23d0159455778169dea38e56cec96b5b1db4677782ac6c` | **FAIL admission**; no maker may use it as an authorised start plate |
| Semantic event | The readable MAiVENS glass/light field resolves into a flat, non-diegetic evidence card. The material change is gallery → editorial evidence field, not a pan, zoom, light flicker, time-machine effect or camera drift. | **PENDING** Animation Director + independent Motion Quality Judge |
| End visual | New, unmade static evidence card. No existing transition still is an admissible end input. | **FAIL / missing** |
| Exact card line 1 | `LONDON · 1843` | **PENDING copy/typography review** |
| Exact card line 2 | `Menabrea’s translation + Lovelace’s Notes` | **PENDING copy/typography and source review** |
| Source marker | `1843 publication · Project Gutenberg eBook #75107 (reference text)` | **PENDING presentation/legal review**; this is a citation marker, not a claim that Project Gutenberg published the 1843 item |
| Historical exclusion | No documentary London street/room, no complete operating Analytical Engine, no literal time travel, and no new person. | **Required** |
| Reduced motion | One static card at the semantic end state, shown for the same final approved narration interval; no animated dissolve, pan, zoom or pulsing. It must be comprehensible with the player captions below the picture. | **PENDING final clock + accessibility/image judgment** |
| Prohibited input | `ep04-transition-ada-timejump-london-1843-comic-v1-no-halftone-1920.png`, SHA `c2bf2e70f7b1cf88a9e731342cc4affa4ccf904229707fa2a04151f980deb34c` | **REJECTED** in P0.1 source manifest |

## Cue 19 — intentional still, not a recovered loop

| Field | Bound / exact record | State |
|---|---|---|
| Working window | `250.30–260.00` | **PENDING clock** |
| Visual job | Reinforce one idea: **a method can be written for an unbuilt machine.** | **PENDING judge** |
| Motion mode | `intentional-still` — one checksum-bound native still, no body/face/camera/graphic motion. | **Required; candidate missing** |
| Person reference | Retained research asset `source-assets/ada-lovelace-engraved-1841-commons-pd.jpg`, SHA `328ad98469b7cc25fcccca6c625d28625f4bb10befd424a1a3356c1422cd44c8` | **PENDING** historical/likeness/image review; dated 1838/c.1841 likeness only, not proof of an 1843 work scene |
| Machine reference | Retained research asset `source-assets/babbage-analytical-engine-plan-1840-chm-commons-cc-by-4.jpg`, SHA `d830bdfcbdbf0b2998b450b1caacd3973a47c3ea0219d4290a43b7679793d9a5` | **PENDING** historical/image review; CC BY 4.0 attribution and change notice required; plan/proposed-machine only |
| Primary evidence | Retained reference text `source-assets/menabrea-lovelace-1843-project-gutenberg-75107.html`, SHA `c7927f7454c9f2ae6bdc624b42b925dc5f9d6a87f844c6dcf71abbc7163d8fe7`; anchor `NOTE_G`, diagram heading page 66, continuation 67–68 | **PENDING** primary-text and typography review; reference-only licence scope |
| Composition | A clearly interpretive Ada figure is visually separate from: (a) a labelled *procedure / Note G* text-area whose exact content has been independently checked, and (b) a plan-like, explicitly *proposed / unbuilt* Engine reference. The three areas must not visually imply that a full Engine was operating in a documented room. | **PENDING**; no exact layout, person, room, dress or manuscript text is authorised |
| Required disclosure/meaning | The fact must read through narration/caption and visual logic as “procedure intended for Babbage’s unbuilt Analytical Engine,” not “Ada ran a working computer.” | **PENDING story/history review** |
| Exclusions | No NPG L274; no cloned/refashioned portrait; no false 1843 workroom; no operational brass machine; no music notes/numbers emitted as historical fact; no invented quotation; no loop, pan, zoom or drift. | **Required** |
| Prohibited input | `assets/episodes/ep-04/clips/ep04-scene-03-ada-loop-v1.mp4`, SHA `343e37c02c4873ae71c7fed8e21bb6d4c52b7ccc0bfb05770a223b84ee36b3b4` | **REJECTED** in P0.1 source manifest |

## Explicit external blocks

1. **Audio & Caption Owner:** final audio/transcript/VTT/clock record.
2. **Ali:** a distinct approved LUMINAiRY exterior master for Cue 15; this
   packet cannot choose it.
3. **Independent historical/image/rights judge:** evaluate the three retained
   reference assets, required attributions and every Cue 18/19 declaration.
4. **Animation Director + Motion Quality Judge:** declare and test the actual
   Cue 18 event; Cue 19 remains an intentional still unless a later candidate
   clears all separate gates.
