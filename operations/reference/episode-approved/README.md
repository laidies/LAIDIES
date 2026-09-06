# Episode approved-reference manifest

This folder contains pointers, not duplicate artwork. The exact source files
remain in their canonical locations so a copied "approved styles" folder cannot
become a second, stale authority.

`manifest.json` separates four jobs that must not be collapsed:

- `style_master`: how people are drawn;
- `identity_reference`: who each character is;
- `environment_reference`: how SUNNYVAiLE locations are drawn;
- `audio_master` and `episode_ident_family`: the reusable bookend inputs.

An `IDENTITY_ONLY_REQUIRES_MASTER_STYLE_REDRAW` entry may inform likeness,
wardrobe and role. Its pixels may not enter the intro animation. A replacement
must match the adult graphic-novel master, pass exact-pixel maker inspection and
role-distinct admission, then receive a new manifest entry and checksum.

Every production cue binds manifest IDs plus the exact selected file checksum.
Directory location, filename language such as `approved`, and file existence do
not establish admission.
