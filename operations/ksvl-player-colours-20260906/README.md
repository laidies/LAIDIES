# Shared bottom music player — bright candidate

Status: local preview, owner review pending. Not published.

User goal: update the persistent music player to match the site. Owner corrections: no navy and pink; match the bright fun colours and backgrounds throughout the site.

Exact candidate `content/site/ksvl-player.js` SHA256 `070a2d743abad85e7263268eaaa180269409b2f4805556c5d8a283caf5678744`.

Current live baseline fetched from https://laidies.ai/content/site/ksvl-player.js and matched to git a8bff04b blob 4a100b7a57a28bcd00563e9e38aedb59b0fd61cf. Preserved in c731d6f9. Changes affect only bottom-deck and resume-pill CSS plus the CSS comment. Playback code outside those blocks is byte-identical. The entire shared file is the integration unit; do not restore the older homepage-worktree player.

Bright candidate: turquoise #15bce0 to mint #7de2c2 to lime #b7e42b background; tangerine #ff9b3d play; purple #492878 control outlines/sliders and #7137d6 top edge; charcoal #202020 lettering. Deterministic CSS only, no generated artwork.

Maker: CUA actual local radio rendering captured at 1280x720 and390x844. Playback status, pause/resume, next track, volume keyboard change0.8 to0.75 and seek status verified. Width320 also had no horizontal overflow on the first colour candidate; responsive rules are unchanged. Final bright desktop/mobile inspected. Syntax and whitespace checks pass. Retired-colour check calibrated by old baseline failing; bright candidate excludes both retired and rejected deck values. No newly verified pop-out or account journey. Local cross-page restoration was not established and is not claimed; functionality was preserved from the current public baseline.

Files: bright-desktop.png and bright-mobile.png are current. desktop.png and mobile.png are rejected navy/pink history and never approval/release inputs. before-desktop.png and before-mobile.png show the production incumbent.

The independent inventory found other legacy colours in the separate Mix CDs rack. That is remaining separate scope; this change covers the persistent player and its resume pill only.

Preview: http://127.0.0.1:5189/radio . Local server overlays the candidate player on current public text/resources; no external upload or production mutation occurred.

Independent Terra/Low review: inspected bright desktop/mobile pixels before source; ADMIT_FOR_OWNER_REVIEW for exact SHA above, no blocking findings. This is not owner approval. An incorrect cropped screenshot was removed after review caught that it did not contain the player.
