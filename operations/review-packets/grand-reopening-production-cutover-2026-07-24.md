# Grand re-opening · production cutover evidence

**Date:** 2026-07-24
**Cutover window:** 14:08–14:24 PDT
**Public origin:** `https://laidies.ai`
**Current release source:** `9dc9153dbd509262ad3b323b0afb3fbc381e7689`
**Current Cloudflare Pages deployment:** `edac8d4f-e304-4cef-8deb-b1de9cc32855`
**Current immutable URL:** `https://edac8d4f.laidies-sunnyvaile.pages.dev`

## Result

**PUBLIC DOMAIN MECHANICS VERIFIED. ANNOUNCEMENT PACKAGE PREPARED; PUBLICATION
IS ON HOLD WHILE THE REOPENED LIBRAiRY ARRIVAL VISUAL GATE IS RESOLVED.**

Cloudflare Pages now reports both `laidies.ai` and `www.laidies.ai` as
**Active · SSL enabled**. The apex homepage response is byte-identical to
`index.html` in the named release commit:

- expected SHA-256:
  `72bf54e5e6d0db80dc9be892f5b11911d5503f4508ea3501e81136a2e30adaf1`
- public-origin SHA-256:
  `72bf54e5e6d0db80dc9be892f5b11911d5503f4508ea3501e81136a2e30adaf1`

The prior GitHub Pages DNS values remain recorded in
`operations/launch/sunnyvaile-production-cutover-playbook.md` as the rollback
path.

## Host and recovery checks

- `https://laidies.ai/` returns HTTP 200 from Cloudflare.
- `https://www.laidies.ai/` returns HTTP 200 from Cloudflare.
- Cloudflare DNS contains proxied CNAMEs for apex and `www`, both targeting
  `laidies-sunnyvaile.pages.dev`.
- `robots.txt` is HTTP 200 `text/plain` and byte-identical to the release.
- `sitemap.xml` is HTTP 200 `application/xml` and byte-identical to the release.
- An invented route returns the branded page with HTTP 404.
- `/grimoire.html` returns HTTP 301 to `/library.html`.

## Public-origin journey evidence

### Homepage and town entry

- Mobile homepage: one H1, current practical-AI promise, no broken images or
  horizontal overflow.
- Visitor's Centre directory selected **The Town LIBRAiRY · Civic Square** and
  exposed the correct Library card plus three `/library.html` actions.

### Library and NewsStand

- Clicking the visible Library suggestion **“what's a hallucination?”**
  returned Hallucination first, then relevant Episodes 2/1/4 and Dream Phone.
- Post-cutover owner review found that **“will AI take my job?”** still behaved
  like generic directory search. The repaired production journey now gives a
  direct answer first, offers only two relevant sourced paths, and contains no
  FAiRY Godmother, SUNNYVAiLE High or MAiKEOVER result.
- The direct Jobs & Work route opens only the selected sourced section in the
  refreshed midnight/white/cyan reader. A shelf-selected book still opens the
  complete reader with its 250px contents rail.
- A primary-source recheck reconciled the Stanford result from the book's old
  13%/“hiring” wording to the current 16% relative decline in employment.
- The public `library.html` SHA-256 is
  `d8285364402e0c6bbf36f876bf423b5325646cb86bcf58be22dde5db0702f88a`,
  byte-identical to the exact `9dc9153` artifact. All four shipped suggestion
  chips, the generic `privacy` fallback, focused/full-book reader states,
  broken-image/overflow checks and production browser logs passed.
- The WEDNESDAY Edition opened its July 24, 2026 health-permission story.
- The story displayed the named OpenAI source, labelled
  `vendor-sponsored`, plus the related Library and Episode 3 paths.

### KSVL and Screening Room

- KSVL Tune In played:
  1. `KSVL · SUNNYVAiLE's Own`;
  2. DJ SunnyV's Golden Girls introduction; and
  3. `The Golden Girls · PATRON SAiNT of Never Too Late`.
- Episode 1 audio loaded at readyState 4 / 1172.30585 seconds.
- Episode 2 audio loaded at readyState 4 / 987.544671 seconds.
- Episode 3 played at readyState 4 / 1048.032653 seconds and displayed its
  read-along caption.
- Episode 4 played at readyState 4 / 1222.460952 seconds and displayed its
  read-along caption.
- Episodes 1–2 say **Illustrated listen-along · read-along captions
  available**.
- Episodes 3–4 say **Narrated edition · read-along captions available** and
  disclose that the motion films remain under owner continuity review.

### Activities and member/community entry

- Dream Phone dialled Mentor 101 and returned a caller-specific answer.
- **Share a Secret** added a caller-specific remix.
- FAiRY Godmother accepted one non-sensitive production-origin request and
  returned both a prompt glow-up and a usable two-sentence draft. No signup,
  metering or CORS error appeared.
- Resident Card, Post Office, Community and MAiKEOVER entry pages returned
  their current H1/state with one main landmark, no broken images and no
  horizontal overflow.

### Responsive/browser diagnostics

- Seven core desktop routes had zero broken images, duplicate IDs or
  horizontal overflow.
- The production browser log contained no warnings or errors after the
  journey pass.
- Pre-cutover mobile/accessibility evidence remains in
  `grand-reopening-performance-accessibility-2026-07-24.md`; this cutover pass
  does not claim field Core Web Vitals.

## Announcement handoff

The bounded Instagram/Story/LinkedIn package in
`social/launch/sunnyvaile-grand-reopening-draft.md` is prepared but is now
**ON HOLD**. Owner review after the production cutover rejected the current
LIBRAiRY arrival as visually underwhelming. The replacement must be
owner-approved, implemented and re-verified on the public origin before the
announcement is published. Channel state is:

- no direct publishing connector is installed;
- LinkedIn company-admin access for organization `125584075` is visibly
  verified in the in-app browser; and
- authenticated ownership of Instagram `@laidies.ai` is visibly verified
  through the account's Edit profile and New post controls.

No password, cookie or private browser store was inspected. Publication URLs
and timestamps remain blank until a real channel post succeeds.
