# Homepage incumbent + daily edition column

**Status:** CORRECTED LOCAL PROTOTYPE — NOT APPROVED / NOT INTEGRATED / NOT PUBLIC

The first Cycle 9 proposal was rejected because it loaded the wrong dark
baseline and turned the Daily into teaser chips and links. This corrected
prototype now loads the current Homepage source and adds:

- the protected full-width incumbent masthead image and its exact overlay;
- a right-side Daily column immediately below the masthead on desktop;
- the same complete Daily directly below the masthead on mobile;
- full visible information for Breaking News, Daily News, Mme CLAi-O’s reading,
  Paige’s pocket note, Promptoscope, Did You Know? and Song of the Day;
- every Daily item remains fully readable in place and ends with one small,
  secondary link to its existing underlying destination;
- one functional pager button that opens a seven-stop SUNNYVAiLE guide; and
- brighter 1990s versions of the established LAiDIES accents throughout
  buttons, controls, labels and text accents—not only in the masthead.

The rejected `The SUNNYVAiLE Signal` heading has been removed. The prototype
uses the descriptive placeholder `Today’s edition` while Ali develops the
final punchy AI/daily title. Its header now explicitly says that the column is
a daily mix of AI news, useful tips, Mme CLAi-O’s reading, Promptoscope, a
SUNNYVAiLE fact and a song; it also states that the contents refresh daily and
are shown directly in the column.

The Opus 5 news image is deliberately character-free. It uses a model-testing
desk so it cannot be mistaken for the LAiDIES heroine or introduce an
unapproved character identity.

The other daily services share one character-free comic illustration: a pager,
pocket note, AI horoscope crystal ball, exact eight-stop route map and
cassette/headphones. This avoids mixing unrelated illustration styles while
making the column feel like an authored LAiDIES feature rather than plain
boxes.

## Corrected incumbent reflow and image authority

Adding the desktop column reduces the width available to the incumbent content.
The candidate therefore reflows, rather than clips, the affected descendant
grids:

- intent cards use two bounded columns on desktop and one on mobile;
- activity cards use two bounded columns on desktop and one on mobile;
- district cards use two bounded columns on desktop and one on mobile; and
- the LIBRAiRY reference form preserves readable controls at both widths.

The prototype also replaces four obsolete or low-resolution overrides with the
exact available full-size assets:

- FAiRY Godmother:
  `assets/video/delivery-20260714-opening-v6/shots/opening-08-fairy-godmother-clean-lit-v2.png`;
- Miss Jeeves at the modern reference desk:
  `assets/library/jeeves-desk.png`;
- Delta LAi Nu:
  `assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/10-delta-lai-nu-house-rethink-v1.jpg`; and
- the planted Willow Lane house:
  `assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/regular/11-fairy-godmother-house-enchanted-garden-crisp-roof-v6.png`.

Eyebrows now use one text colour throughout, including any branded words
inside them. The masthead’s eyebrow and branded phrases also read as unified
single-colour phrases rather than switching colour within words.

`Be Kind, Rewind` was removed from Song of the Day because it is not a KSVL
track. The prototype now uses the exact available catalogue title
`Wednesdays in SUNNYVAiLE` from `content/music/ksvl-track-registry.json`.
The card also includes a compact Listen/Pause control bound directly to the
registry’s exact available MP3. The KSVL page remains a small secondary link
for visitors who want the full station.

## Locked invariants

- The current Homepage is loaded from `/index.html`; production bytes are not
  edited by this proposal.
- Existing copy, destinations, section order and all 26 source images remain.
- The Wednesday Tour retains its original Chick Flicks postcard and eight-stop
  route.
- Miss Jeeves remains in the LIBRAiRY only.
- Large background colour families and the masthead treatment remain the
  incumbent source; this is not a darker-page or neon-on-black redesign.
- Only the branded `Ai` treatment is special inside branded words.

Nothing in this directory authorizes integration, deployment or publication.

## Visitor-language correction

The Cycle 9 Homepage and the shared surfaces it previews no longer expose
release-control language as product copy. Phrases such as
`creator-confirmed catalogue`, `source-checked`, `qualified interruption`,
`working draft preview`, `release checks` and `held account status` have been
replaced with plain descriptions of what a visitor can do, what is available
now and what is coming later.

The internal status model was not weakened or removed. Exact availability,
publication and evidence states remain bound in their registries, contracts
and tests; they simply no longer read like staff notes on the public
interface.

## Intent-card image containment correction

The four `What brought you to town today?` cards no longer squeeze landscape
art into narrow portrait strips. Each card now uses an image-first vertical
layout with:

- a full-width `16:9` media stage above the copy;
- `object-fit: contain` and centred positioning so the complete source scene
  remains visible rather than being cropped into a slice;
- one consistent 3 px electric-violet `#7658e8` frame, divider and restrained
  violet shadow that remain visible against the coral section background; and
- the same two-column desktop / one-column mobile hierarchy already used by
  the corrected incumbent reflow.

The four existing destination images and links are unchanged. This is an
isolated presentation correction only; no live or public Homepage bytes were
changed.
