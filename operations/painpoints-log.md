
## 31. Assembly burned captions OVER the artwork
`category: workflow · timing` — ① Speak their language
- **Context:** Handing the video editor an episode to assemble from clips + stills + narration.
- **Issue:** The assembly prompt said "burn OR attach captions below the picture" — the "burn" option let the editor bake captions into the video, and its default placed them huge and centered, covering the whole frame.
- **What happens:** The exported episode has giant white subtitles over every scene, hiding the art and the character's face.
- **Example:** Ep4 v3 exported with the "Previously on LAiDIES…" line as centered white text across the middle of the frame, over the heroine.
- **Prevent / Fix:** The video must be delivered CLEAN — no caption overlay at all. Captions belong to the player, which renders them in a bar BELOW the picture. Tell the assembler explicitly: no captions in the video. Never leave "burn or attach" as an option.
- **New output:** A clean full-frame episode; captions appear below the picture from the player, never over the art.

## #32 — Over-specified title-card prompt STEERED Codex into hallucination (2026-07-23)
**What happened:** Ep1 title card came back with an invented SUNNYVAiLE water tower + a hot-pink-chair
boardroom, and forced gold lettering. **Root cause:** my prompt added a forced colour ("gold", copied
from Ep4) + an invented background ("Y2K boardroom opening into SUNNYVAiLE"). Ep4's actual title prompt
is ONE line ("Comic title card: THE FOUNDING MOTHERS + 'Episode Four', on a comic ground") — Codex
themed it itself. **Fix baked into prompts:** title cards use the minimal pattern — `Comic title card:
<TITLE> (bold comic lettering) + "Episode N", on a comic ground` + style line; NO forced colour, NO
invented background. Over-specifying a title card steers it wrong. (Scene frames still need exact refs.)
See [[title-card-ep4-standard]].
