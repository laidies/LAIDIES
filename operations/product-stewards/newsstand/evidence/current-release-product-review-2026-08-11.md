# Independent product review — current NewsStand release candidate

**Verdict:** ACCEPT — product/responsive/accessibility review; native assistive technology and public verification remain open

**Reviewed:** 2026-08-11 America/Vancouver

**Reviewer principal:** `/root/newsstand_product_review` — role-distinct read-only judge

**Exact candidate:** commit `0fabc2bcaa3eddcb0293141e9d22b6c5bdecfd62`

- `newsstand.html`: `5af8beb902d4c04de853e156b72c80160eceeaa89145484b0c0c27abd3edb4d7`
- `content/newsstand.css`: `422531dda4fa6c1435d4b293b575a9f1c39336d0039cd95601d28d70642ad3b2`
- `content/newsstand-reader-contract.js`: `5ee7298c575c82882d4ce6236e1c0334b48309caf4f5326b61b20343ddf1bcf0`

## Judgment

No release-blocking product, responsive-UX or code-inspectable accessibility defect was found. The browser-emulated 390px and 320px renders remain readable; the chooser exposes all four publication jobs, state and action without art-only hotspots. Quiet papers say no issue rather than implying a missing feature. The Daily's empty-report state does not manufacture content. The implementation provides pressed state, live status, reduced-motion handling, direct/hash failure states, invoker-return focus and bounded history restoration. The reader contract fails closed for stale, held, unavailable, retracted and quiet records.

## Exact rendered evidence inspected

- `desktop-1440.png`: `fddbf75165f5f9db27b1c49fa933886c482e14e209df2020777590ec53d7a6f7`
- `desktop-counter-1440.png`: `1a84eb95d2c5aef3a9eb171bf1c0ef183b77e7df0498a354a6a2ac8ed53a1e7a`
- `desktop-daily-1440.png`: `07df9a396ded6d7dc801140d9a99563bbde73fc8c3d6573a64c3343254c1df4d`
- `desktop-archive-1440.png`: `6e224a00e9684db2914c07fc4cc0c9cc4437f0c7c1f148ae305d6cb9cf402a51`
- `mobile-arrival-390.png`: `93b4d907eb77b4b48feb3d8c95818dc0fbc2882c869679c13bdecd5b7b28e723`
- `mobile-chooser-390.png`: `aa81ad2582c7d65fb461549eb4f651a6e66f547f26eb60e36cda29881ff505af`
- `mobile-daily-390.png`: `4bceb3c040a257b18f0eed11611e50b1dcb971b3004024c0761a4050c63c7ecf`
- `mobile-arrival-320.png`: `af497d890bbfe9ed245946cab240efa5edbaf636ebc3c871b1d3f77ed44be1ac`

The rendered evidence was produced by the exact candidate's Chrome DevTools test harness using `Emulation.setDeviceMetricsOverride`; the same run completed 211 behavioral/rendered checks.

## Evidence correction

The maker initially supplied an incorrect expanded commit SHA and one raw Chrome `--window-size` screenshot falsely labelled as mobile evidence. The judge rejected the package. The raw-window screenshot was quarantined, the correct commit was independently resolved with Git, and the judge re-ran artifact-first review using only CDP-emulated evidence. The first verdict is invalidated; this receipt records the corrected judgment.

## Still open

- native Safari/VoiceOver announcement and traversal witness;
- deployed public behavior and exact deployed bytes;
- the full production artifact build and controller.

This ACCEPT does not authorize publication or deployment.
