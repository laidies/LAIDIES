# Evergreen masthead, duplication and legacy-art audit

**Status:** REPORT READY — READ-ONLY AUDIT / NOT IMPLEMENTED / NOT PUBLIC  
**Evidence date:** 2026-07-26 America/Vancouver  
**Owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Trigger:** Ali Homepage hierarchy and visual-direction rulings  
**Acceptance owner:** Town Entry for hierarchy and page behaviour; Brand &
Experience for visual classification and the revised sitewide system

## Ali rulings now governing Town Entry

1. The Homepage masthead/hero is **evergreen**. It does not change weekly.
2. Current episode and current news belong in a separate module below the
   masthead.
3. Preserve the current Homepage as the comparison baseline.
4. Remove duplication in the later admitted implementation.
5. Audit legacy FAiRY Godmother and building art; existing use is not approval.
6. The glamour-cartoon/pop-sticker direction is rejected as cheap and not
   adult.
7. Do not implement a new Homepage visual treatment until Brand & Experience
   supplies revised sophisticated adult editorial/graphic-novel rules.
8. The current live luminous-dusk masthead is the baseline winner. Preserve
   its exact image and composition; do not rebuild it.
9. Reject white-background redesigns, muddy/grungy building filters,
   glamour-cartoon treatment and sticker-comic decoration.
10. Later Homepage work is conservative: stronger 90s colour in UI accents,
    better hierarchy, less duplication and replacement only of art proved
    stale.

This report records observed conflicts and a reversible future patch boundary.
It does not select art, alter the baseline, or begin implementation.

## Frozen baseline

| File | SHA-256 | Current role |
| --- | --- | --- |
| `index.html` | `c437da107ba8863111a48434e790a2f6d17b683349b5ccea52954216dbd24772` | Homepage baseline |
| `start-here.html` | `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0` | Start Here baseline |
| `content/site/homepage.js` | `03156f7901459f16e3b6972ea4752e0b2cd155646102a202e30511bf92fd7433` | Homepage behaviour baseline |

The baseline is current implementation evidence, not the approved future
visual system. No route or asset was changed by this audit.

The masthead is the exception to the unresolved wider system: Ali has selected
its current live treatment as the winner. Exact hero image
`assets/sunnyvaile-streets/main-street-dusk.webp`, SHA
`4efec0f4ed1a8211b07b2db633f7c373ca3001485b43c05cefe850d0b6b19d3b`,
and current luminous-dusk composition are **KEEP / DO NOT REBUILD**.

## Weekly Episodes producer contract consumed

Town Entry has verified and accepted as a specification dependency:

- `operations/product-stewards/episode-experience/ownership-handoff-town-entry-current-episode-module-2026-07-26.md`
- Contract `EPX-HOME-CURRENT-EPISODE-v1`
- SHA-256
  `53cb1c49bb99af96d8a75022a8ec91a71f80f421b116a8bf42aa28c443d2d6f2`
- Status: **SPECIFIED / QUEUED — NOT IMPLEMENTED**

Weekly Episodes owns one atomic record containing episode number, title,
summary, checksum-bound image/alt, explicit nullable read/watch/listen links,
release date, complete song or `null`, accepted card-pack key or `null`,
self-contained fallback, release/public authority and record checksum. Town
Entry owns the separate module's presentation and accessibility.

The whole accepted record must swap atomically. Town Entry must not patch
individual fields, infer missing formats from routes/files, retain an old song
when the new record says `null`, or mix a new current card with old Episode 04
season/KSVL state.

## Hierarchy conflict

The current source already contains a separate checksum-bound current-content
module at `index.html` lines 550–556. That is the correct architectural home
for a fresh episode, Breaking item or Daily item.

The masthead still contains a fixed Episode 04 action at `index.html` line 536.
More importantly, `content/site/homepage.js` lines 282–289 finds a promotable
`latest-episode` and rewrites that hero action. This is a direct conflict with
Ali's evergreen-masthead ruling.

**Required later repair:** remove the `latest-episode` → `.entry-episode-action`
mutation and conservatively relabel that existing action geometry as an
evergreen visitor job. Do not rebuild the masthead. The separate `#current`
module remains the sole dynamic current-content promotion surface.

## Duplication audit

### Functional/content duplication

| Observation | Evidence | Later disposition |
| --- | --- | --- |
| Episode 04 competes across the hero, current-module explanation, Season One heading/track, feature buttons and ritual text | `index.html` lines 536, 553, 612, 625, 631–632 and 646 | Remove episode-specific hero treatment; keep one distinct current module and one evergreen sequential-season route |
| A readiness-card limitation node is appended twice | `content/site/homepage.js` lines 247–251 call `appendChild(limitation)` twice | Remove the duplicate append; add an assertion that each limitation renders once |
| FAiRY Godmother is surfaced as intent, activity and district using the same art | `index.html` lines 606, 672 and 718 | Keep distinct jobs only if each earns its place; use one canonical primary entry and non-duplicative cross-discovery |
| Chick Flicks postcard repeats in purpose and Season route | `index.html` lines 604 and 616 | One image should not make two adjacent sections feel like the same action |
| Miss Jeeves scene repeats in purpose and reference section | `index.html` lines 605 and 687 | Keep the lookup handoff primary; purpose cue may become text or a distinct admitted asset |
| Main Street dusk repeats in hero, purpose and district | `index.html` lines 526, 607 and 714 | Hero may retain the baseline source for comparison; remove repeated decorative reuse in the later system |
| Lantern Hill repeats in spotlight and district | `index.html` lines 683 and 719 | Distinguish product spotlight from geographic discovery |

Not all repeated destinations are inherently duplicate: one current promotion
and one evergreen directory route may serve different visitor jobs. The
admission test is whether the label, result and receiving context are distinct,
not merely whether the URL appears twice.

## Legacy art audit

### FAiRY Godmother

- Exact asset:
  `assets/town-characters/scenes/fairy-godmother-scene.webp`
- SHA-256:
  `fb546e953c7f299df1b27b5743bd95bae19820b7352907a03fee08be92786ecd`
- Current use: three Homepage placements.
- Observed rendering: detailed warm fantasy portrait on a porch with wand,
  tea, mailbox and Willow Lane sign.
- Product strength: the character, place and working objects are legible and
  adult; it explains more than a generic icon.
- Hold: its highly rendered photographic/painterly register is not evidence
  that it fits the future sophisticated editorial/graphic-novel system. Triple
  reuse makes the Homepage feel templated and gives one product disproportionate
  visual repetition.
- Disposition: **AUDIT / HOLD FOR BRAND CLASSIFICATION**. Do not delete,
  restyle or promote it as the future system before Brand rules.

### Building/town art currently used

- `assets/sunnyvaile-streets/main-street-dusk.webp`, SHA
  `4efec0f4...d0b6b19d3b`, appears three times. Its masthead use is **KEEP**;
  the two repeated non-masthead uses remain consolidation candidates.
- `assets/postcards/from-sunnyvaile/pc-chick-flicks.webp`, SHA
  `d427e7e5...b3f7f2b3`, appears twice.
- `assets/library/jeeves-scene.webp`, SHA
  `69edb1f3...18a3943`, appears twice.
- `assets/sunnyvaile-streets/lantern-hill-evening.webp`, SHA
  `b8683817...71660d8`, appears twice.
- Other single-use Homepage sources mix stained glass, postcards, painterly
  character scenes, rendered streets/buildings, game cards and object
  photography.

Observed risk is not simply “old.” The page combines several rendering
registers, crop shapes and levels of detail. The Dream Phone booth reads as a
bright rendered location; the NewsStand source is a smaller face-on building
image; the Fairy portrait is photographic fantasy; postcards and Girl Talk
cards use separate graphic languages. Existing coexistence does not establish
a coherent adult editorial system.

### Rejected visual direction

The glamour-cartoon/pop-sticker direction is **REJECTED** for Homepage/system
use because it reads cheap and insufficiently adult. Do not reintroduce it by:

- treating sticker clusters as a substitute for hierarchy;
- adding glossy glamour-character cut-outs;
- covering mature editorial composition with decorative pop labels;
- reskinning existing boxes with novelty outlines, bursts or decals; or
- claiming “graphic novel” while retaining cartoon-glamour proportions and
  sticker-like interface furniture.

Brand must translate Ali's winner into positive rules for the rest of the
page: sophisticated adult editorial hierarchy, restrained graphic-novel image
treatment where applicable, typography, stronger 90s UI accents, colour
discipline, object/environment integration, mobile translation and examples of
prohibited cheapening. Those rules must preserve rather than reinterpret the
masthead.

## Later patch boundary

After Brand's revised system is selected and handed off, Town Entry may prepare
one reversible route patch that:

1. preserves the accepted visitor-state and fail-closed readiness contracts;
2. keeps the masthead evergreen;
3. renders the complete accepted `EPX-HOME-CURRENT-EPISODE-v1` record and
   current news only in separate current modules;
4. removes the duplicate limitation append and consolidates overlapping
   episode/FAiRY/art entrances;
5. classifies every visible Homepage asset `KEEP / ADAPT / REJECT` against the
   exact Brand rules;
6. does not duplicate destination-owner prose; and
7. reruns 1440/390/320, no-JS, keyboard/focus, reduced-motion, 200% reflow,
   failure, performance and independent product/Brand acceptance.

## Current limit and next trigger

**BLOCKED — BUILD REMAINS REQUIRED.** The masthead direction is decided and
locked. The blocker for the rest of the Homepage is Brand's missing
implementation rules derived from that winner plus the joint current-episode
integration lock. This is not permission to continue visual implementation
independently.

Exact next trigger: Brand & Experience supplies the conservative
positive/negative implementation rules derived from Ali's selected masthead,
and Control Room grants the joint Weekly Episodes + Platform + Town Entry
shared integration lock.
Town Entry then writes the route-level consolidation packet before any
implementation. No deploy, publication, campaign or spend authority exists.
