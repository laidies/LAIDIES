# Printable Takeaway Agent

Use this agent brief whenever a lAIdies issue needs a subscriber printable takeaway.

## Mission

Turn each lAIdies issue into a polished, protected, subscriber-gated printable that is more useful than the games and easy to keep beside a laptop.

The output should feel like a smart friend made a desk reference: practical, lightly funny, visually lAIdies, and useful for real work.

## Inputs

Read these first:

1. `content/episodes/issue-XX.json`
2. `content/issues/issue-XX.md`
3. Any related social kit in `social/episodes/`
4. `content/printables/lesson-takeaway-template.md`
5. `docs/brand/style-creative-direction.md`
6. `docs/brand/founder-content-context.md`

## Required Outputs

For each issue, create:

1. `content/printables/issue-XX-[short-slug].html`
2. `assets/printables/issue-XX-[short-slug]-hero.png`
3. `content/printables/issue-XX-subscriber-gated-download-copy.md`
4. `content/printables/previews/issue-XX-[short-slug]-contact-sheet.png`
5. Individual page previews when useful:
   - `content/printables/previews/issue-XX-[short-slug]-page-1.png`
   - `content/printables/previews/issue-XX-[short-slug]-page-2.png`
   - etc.

## Printable Structure

Default to four pages:

1. **Core Lesson**
   - Issue title
   - One-line lesson
   - Generated hero image
   - Simple framework
   - Copy-paste starter prompt or practical tool

2. **Step-by-Step Try-On**
   - The exact homework
   - A checklist or rating system
   - A small table readers can fill out

3. **Concept Clarifier**
   - What the lesson is / is not
   - Do / do not guidance
   - One memorable analogy from the issue's reference world

4. **Troubleshooting + Receipts**
   - Common failure modes
   - Fix prompts or next moves
   - Safety / verification note
   - Thursday Try-On
   - Prompt Closet save line

## Standard Footer

Every page must include:

`© 2026 lAIdies / Ali Eakin. Personal-use subscriber printable. Do not resell, repackage, or use in paid training without permission. lAIdies.com`

## Access Pattern

Use this default public/private split:

- Public page: title, short description, contact-sheet preview, and one sample section.
- Subscriber gate: full printable download.
- Sharing rule: readers may share the public signup page link, not the file.
- Future paid/member version: deeper workbook, templates, facilitator notes, or bundled lesson pack.

## Visual Direction

Use the lAIdies house style:

- Hot pink, blush paper, dark plum/ink, teal accent, small gold details.
- Y2K desk, closet, magazine, hotline, trading-card, or reference-library energy.
- One generated bitmap image per printable.
- No readable generated text in the image.
- No real logos, copyrighted character likenesses, or direct recreations of TV/movie stills.

## Editorial Rules

- Keep it useful for busy corporate women.
- Do not make the reader feel behind.
- Do not over-explain like a technical manual.
- Do not overpromise AI accuracy.
- Use pop-culture references as memory anchors, not as the substance.
- Include privacy/safety guidance when the issue involves workplace use.
- Make every printable usable without reading the entire issue again.

## Verification

Before finishing:

- Confirm all files exist.
- Confirm every page has the footer.
- Confirm the generated image is copied into `assets/printables`.
- Confirm the public-gate copy says full printable is for subscribers.
- Generate a contact-sheet preview.
- Report final file paths clearly.
