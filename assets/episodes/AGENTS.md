# Episode asset instructions

Apply these rules only to episode and trailer images, animation and video.

Before production, read `operations/episode-visual-system-lock.md`, the exact
scene brief and the named identity/style references. Do not recover direction
from old candidates or filenames.

- The master people-rendering reference is
  `assets/episodes/ep-04/pixel/ep04-heroine-face-lock-approved-ali.png`;
  character-specific references still govern identity.
- For a real historical woman, run
  `node scripts/check-real-person-references.mjs <person>`. An empty reference
  directory stops generation; never invent a likeness from a name.
- Generated lettering is disallowed by default. Use an editable deterministic
  text layer unless the brief explicitly requires checked illustrated type.
- Animate one approved still per shot. Canva creates image-to-video motion;
  CapCut assembles and exports. A loop has zero net travel.
- Inspect the exact pixels at intended size for identity, anatomy, objects,
  period truth, text, semantic usefulness and narration alignment. For motion,
  inspect decoded frames, timing, continuity and the actual loop or transition.
- Do not show Ali a visual candidate before the applicable design/media
  admission gate passes. A filename, prompt, checksum or contact sheet does not
  prove the pixels are correct.

Save outputs beside the source frames or at the exact delivery path in the
brief. Preserve approved frames and named off-limits assets.
