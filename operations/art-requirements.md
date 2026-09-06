# Art requirements — scoped inputs, not one universal style

For visual work start at `operations/reference/README.md`. Select the job first:
**make matching new artwork** or **reuse an existing image at an approved location**.
This file supplies shared production precautions; it is not palette, character,
building, rendering-style, aspect-ratio or publication authority.

## Scope correction

The former instruction to paste a universal 1920×1080 / comic-v1 / no-halftone
block into every card, building and social prompt is superseded by current
scoped authority. Dimensions belong to the destination's output contract.
`qc-frames.py` remains an episode-frame format check, not a universal image gate.

- Episode people: `operations/episode-visual-system-lock.md` and its exact master.
- Character identity: selected current identity reference; a style image does
  not transfer its subject's face to another character.
- Card and comic-page grammar: the applicable reference README. Ben-Day/printed
  halftone can be required there; it must not flatten the episode people master.
- Colours and buildings: current destination-specific authority from the entry
  route. Pink/lilac Card finishes do not authorize mauve rooms. Unsettled
  sitewide direction stays unsettled; measured incumbent colours are not approval.
- Background inspiration: composition/pattern ideas only unless separately
  admitted for exact reuse. Original files and any rights limits remain intact.

## Every production prompt

Bind the actual destination, explicit output dimensions, selected current
references and their current authority. Episode batches additionally bind explicit
reference IDs and the exact current episode manifest version. Read the selected references'
usage scopes. This is input integrity, not proof of art quality or approval to
publish the output. Missing or revoked inputs require source recovery, not a
filename search for something labelled latest, locked or approved.

The existing episode batch tool accepts explicit reference IDs and dimensions;
it resolves `operations/reference/episode-approved/manifest.json` and checks
revocations in `operations/assets/active-asset-registry.json`. Generation inputs
need their own reference eligibility; they need not be ACTIVE public assets.
Direct pixel reuse still requires the destination's exact admission and existing
release checks. Do not use this generation binding to bypass those checks.

Retain these shared precautions, applying the current scene-specific rules:

- Meaning: bind the exact accompanying narration/text or silent purpose; dominant
  objects and action must do the same job, not add decorative misinformation.
- Continuity: same scene/time/identity/wardrobe unless the approved scene changes
  them. A wired cue is timing context, not approval of its image.
- Likeness: use the real person's bound source where required; no invented face.
- Setting and period: current canonical place, geography, era and actual people;
  follow current corporate/SUNNYVAiLE wardrobe context, not a global no-corporate rule.
- Anatomy and physics: coherent faces, hands, limbs, surfaces and object orientation.
- Text: clean art by default; use editable deterministic lettering. If lettering
  itself is the asset, bind exact copy and inspect every character.
- Output inspection: inspect the actual pixels at intended size before independent
  craft judgment. Matching filenames, dimensions or hashes cannot certify quality.

Changing this prose cannot update hardcoded consumers automatically. The episode batch
builder and tracked episode-prompt hook share `operations/tools/visual_reference_binding.py`.
Their tests establish binding/revocation behavior only. Native hook loading and
actual rendering/admission are separate results.

## Episode batch input changes

The five existing positional inputs remain cues, timing map, needed beats,
episode number and output path. Add `--dimensions WIDTHxHEIGHT` and
`--reference-ids PEOPLE_STYLE_MASTER ...` using actual eligible IDs. Old callers
without these inputs stop before changing the output; input JSON files must live
inside the checkout so the hook can reconstruct the same batch; missing information must
be recovered rather than silently guessed.

Each needed beat keeps `t`, `dur`, and exact `says` speaker/text pairs, and now
names `reference_ids` (or inherits the batch selection), `scene`, `wardrobe`,
`continuity_reference_ids`, `continuity_job`, and `subjects`. Each subject names
`cast_key` and `identity_reference_id`; real people also bind `likeness_source`
with exact `path` and `sha256` under their canon-listed real-people folder.
`cast_key: heroine` may use the combined heroine/master reference. An empty
subjects list explicitly means nobody is depicted. Identity correspondence and
whether the declared scene is truthful still require artifact inspection.

A known covered timestamp in the existing cut decisions stops duplicate
commissioning for reconciliation. It does not automatically reuse the old image.
The small manifest may lack a needed historical identity or scene reference:
that is a source hold, not permission to fill the collection with guessed art.

Verification: `python3 operations/tools/test_visual_reference_binding.py` and
`node scripts/test-active-asset-admission.mjs`. The tracked legacy hook covers
recognizable episode art prompts and explicit episode bindings only. It rebuilds
the batch from its bound input files and rejects handwritten or edited successors
that bypass the same subject/continuity validation; change inputs and regenerate. Other
visual destinations retain their scoped checks. Hook fixtures do not establish
native installation, trust or invocation; no installed hook is changed here.
