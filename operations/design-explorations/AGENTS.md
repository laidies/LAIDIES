# Design-exploration instructions

Apply these rules only to page, building, product and interaction concepts in
this directory.

Read the exact product experience brief and current routed visual decisions
before creating a concept. A SUNNYVAiLE building must feel like visiting and
using that place; a generic white page, card grid, dashboard or decorative
front-desk shell is not a building experience.

Design the complete information architecture before artwork: primary visitor
job, first visit, returning use, empty/unavailable/failure states, mobile,
desktop, keyboard/focus, navigation, inventory growth and cross-building
objects. Art supports that system; it does not hide or replace it.

The maker inspects the continuous desktop and mobile render against the
incumbent and lists visible regressions first. Use current approved colours,
identity and assets; do not infer authority from an old exploration.

Do not display, attach, open or link a building-page concept for Ali until its
exact bytes pass `node scripts/check-design-review-admission.mjs`. Obtain the
review URL with `node scripts/resolve-design-review-url.mjs <candidate-path>`.
Hashes and maker assertions prove identity only, not visual quality.
