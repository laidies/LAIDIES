# LAiDIES video tool stack recommendation

Date: 2026-07-23  
Status: recommended test plan; no new purchase authorized.

## Recommendation

Use a small three-layer stack:

1. **Canva first** for existing layouts, manual animation, overlays, typography, simple image-to-video work, and social variants. It is already installed and paid for.
2. **Adobe Firefly as a temporary multi-model test bench** only when a scene needs genuine generative motion. Firefly currently exposes Adobe Firefly Video plus partner models including Kling, Runway, Luma, Sora, and Veo in one interface. This avoids buying several separate subscriptions before we know which model works for LAiDIES.
3. **Automated local finishing** for narration sync, clip assembly, captions, loudness, file validation, and repeatable exports. Use the existing local FFmpeg workflow by default. Consider the free DaVinci Resolve only if a sequence needs visual timeline finishing that cannot be handled reliably by automation.

CapCut is not part of the recommended animation pipeline.

## Why this is the right shape

The project has approximately 90 minutes of programme material. Generating 90 minutes of AI video would be expensive, slow, and likely to damage character continuity.

Use three motion classes instead:

| Class | Use | Approximate share | Tool |
|---|---|---:|---|
| A — generative hero motion | Time jumps, transformations, meaningful character action, signature transitions | 10–20% | Canva Image to Video or best Firefly-hosted model |
| B — controlled ambient motion | Practical light, weather, screens, particles, subtle parallax, object movement | 50–60% | Canva animation or deterministic local motion |
| C — editorial motion | Cuts, dissolves, graphic transitions, titles, captions, audio-led pacing | 20–40% | Automated local finishing; DaVinci Resolve if needed |

This concentrates paid generation on the moments the audience will notice and keeps faces, wardrobe, composition, and canon stable elsewhere.

## Initial bake-off

Use one approved Episode 04 frame and one identical motion brief for four five-second tests:

1. Canva Image to Video
2. Adobe Firefly Video
3. Kling 3.0 through Firefly
4. Runway Gen-4.5 through Firefly

Score each output on:

- face/body/wardrobe stability
- background-only motion control
- transition quality
- adherence to the prompt
- visible artifacts
- usable seconds per generation
- cost per accepted clip
- commercial-use suitability

Do not buy direct Runway, Luma, or Kling subscriptions during the bake-off. A direct subscription is justified only if its winning model is materially cheaper outside Firefly at the volume LAiDIES needs.

## Cost controls

- Use the existing Canva allowance before adding cost.
- Test Firefly's free daily generations first.
- If more testing is needed, one month of Firefly Standard is currently US$9.99 and advertises 2,000 credits; model-specific consumption varies.
- Set an explicit per-scene retry ceiling.
- Stop a model after two failed attempts on the same controlled prompt.
- Record every generation, accepted/rejected status, and cost in the video release board.

## Finishing

The existing automated local toolchain can:

- assemble clips against the locked narration
- add or burn captions
- mix and normalize audio
- create review proxies and contact sheets
- validate duration, resolution, frame rate, codecs, and audio levels

DaVinci Resolve is available free and supports editing, transitions, audio post, and subtitle tracks. It is not currently installed on this Mac. Installation should wait until a real finishing need is identified.

## Commercial-use note

Adobe describes its own Firefly models as commercially safe. Adobe also states that creators remain responsible for deciding whether a partner model is appropriate for commercial work. Partner-model terms therefore need to be checked before a monetized release.

## Primary sources

- Canva AI video and commercial-use overview: https://www.canva.com/features/ai-video-generator/
- Canva pricing and AI allowances: https://www.canva.com/pricing/
- Adobe Firefly partner video models: https://helpx.adobe.com/firefly/web/work-with-audio-and-video/work-with-video/generate-videos-using-non-adobe-models.html
- Adobe Firefly plans: https://www.adobe.com/products/firefly/plans.html
- Runway API pricing: https://docs.dev.runwayml.com/guides/pricing/
- Luma Dream Machine pricing: https://lumalabs.ai/learning-hub/dream-machine-support-pricing-information
- DaVinci Resolve editions: https://www.blackmagicdesign.com/products/davinciresolve/studio
- DaVinci Resolve subtitle editing: https://www.blackmagicdesign.com/products/davinciresolve/edit
