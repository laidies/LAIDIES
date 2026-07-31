# Cycle 9 Homepage image-crop audit

Status: **LOCAL CANDIDATE CORRECTED — NO PUBLIC CHANGE**

This audit treats a loaded image as insufficient evidence. Each rendered family
must preserve faces, character identity, building identity, labels and the
story-bearing objects that explain why the image is present.

| Image family | Crop contract | Result |
|---|---|---|
| Masthead MAiN Street scene | Intentional scenic `cover`; no person or face; key town signs remain the focal area | KEEP |
| Method postcard and Ada stained glass | Natural dimensions / `contain` | PASS |
| Four “What brought you to town?” scenes | Shared 16:9 image-first stage with `contain` | PASS |
| Weekly Chick Flicks postcard | `contain`; complete postcard composition | PASS |
| FAiRY Godmother, Mme CLAi-O, Businesswomen’s Special, Dream Phone and NewsStand activity art | Shared 4:3 stage with `contain`; mixed portrait, square and landscape sources are never blanket-cropped | PASS |
| Girl Talk Truth/Dare portraits | 2:3 stages with `contain` | PASS |
| KSVL spotlight | Rebound to the 1672×941 landscape DJ SunnyV studio scene; `contain` | PASS |
| LUMINAiRY spotlight | 1400×788 landscape source; `contain` | PASS |
| Miss Jeeves reference desk | 1600×900 landscape source; 16:9 `contain` | PASS |
| SUNNYVAiLE map | Natural width and height; no crop | PASS |
| Six district scenes | Rebuilt as image-first cards with a 16:9 `contain` stage; copy is no longer laid over a tall background crop | PASS |
| Closet puffy binder | Natural dimensions; no forced crop | PASS |
| Wednesday Postcard / Post Office | `contain`; complete building composition | PASS |
| Daily paper/provider/theme art | Source and stage are both 3:2; no geometric crop | PASS |
| Tour-guide pager icon | Deliberate object crop from the pager artwork; no person or identity-bearing scene is involved | KEEP |

## Defect corrected

The incumbent activity rule forced every source into the same 4:3 `cover`
window. Mme CLAi-O is a 933×1400 portrait, so the rule removed part of her head
and much of the image’s meaningful composition. The same blanket rule was also
unsafe for the landscape FAiRY Godmother room and NewsStand.

Cycle 9 now uses `contain` for identity-bearing imagery and reserves `cover`
only for scenic/background jobs whose focal area has been explicitly reviewed.

