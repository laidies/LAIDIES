# Mall banner preview — hosted verification

Preview: https://22aa181e.laidies-sunnyvaile.pages.dev/#dyk-title
Source commit: 2d421e8d637638888753e7f1e46b4250c52b9b7c

Hosted browser checks at 1440px and 390px passed: the existing Mall frontage image decoded, the crop stayed on the glass dome/neon entrance, and no horizontal overflow occurred. Root inspected the actual hosted mobile pixels and existing in-app tab8; tab8 is paused on the Mall slide. Both scoped artifact-first reviewers admitted this candidate; no owner approval is implied. Eight deliberately bad admission variants rejected.

Twelve deployed files match the complete staging artifact, including homepage/runtime/image and all nine carried-forward NewsStand changes from production7614029e. An initial Python urllib fetch returned HTTP403; curl fetched and verified the same hosted resources successfully. No new image generation, copy changes, radio changes, Mall receiving-page redesign, or production promotion. The Mall neon lettering is small on phones; the dome and storefront supply the visual recognition.
