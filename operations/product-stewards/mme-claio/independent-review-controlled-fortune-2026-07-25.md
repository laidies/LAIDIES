# Mme CLAi-O controlled-fortune independent review

**Judge verdict:** **FAIL — NOT RELEASE-READY**  
**Review date:** 2026-07-25  
**Authority:** Independent local source and exact-artifact review only. No source,
test, state, backlog, queue, painpoint, Git, deployment, analytics, public-origin
or external-product mutation was performed.

## Executive judgment

The candidate has a strong, distinctive LAiDIES room and several sound local
mechanics. The authored 100-card deck is intact; source and fresh-artifact
identity match; first, repeat and returning draws work; successful readings are
keyboard-operable and announced; immediate repeat is prevented; denied storage
does not stop the reading; local-only history and keepsake language is honest;
reset preserves unrelated local badges; 320/390 CSS-pixel reflow works; and the
Cocktail Fortune recovery and Businesswomen's Special separation work locally.

It nevertheless fails the launch floor in three independent ways:

1. **The safety router is not meaning-based.** In an independent 36-case
   adversarial matrix, all 27 meaning-equivalent high-stakes prompts received a
   random card and consumed a call/history entry. Eight of nine harmless
   controls were incorrectly stopped. The maker suite proves six literal
   phrases that intersect its regular expressions; it does not prove the
   operating specification's semantic boundary.
2. **The safety heading is effectively unreadable.** Its computed foreground is
   `rgb(63, 23, 55)` over `rgb(17, 23, 53)`, approximately **1.16:1** contrast.
   The maker test checks the paragraph only, not the heading that carries the
   essential stop message.
3. **Corrupt positive local state is trusted.** A stored count of
   `999999999999999999` renders as `Call 1000000000000000000`, grants the
   Hotline Regular presentation, and an unknown stored card is rendered as
   history. The existing corrupt-state test covers a negative count and broken
   JSON only.

There is also an important truth gap: the interface invites a question but does
not plainly tell the visitor that the card is random and does not analyze or
answer that question. The operating specification requires that mental model.

## Quality floors

| Floor | Result | Independent evidence |
|---|---|---|
| Non-predictive product intent and accuracy | **FAIL** | “Not a prediction” is visible, but the question-to-card flow can imply tailoring; the page does not plainly say the prompt is not analyzed and the card is random. |
| Safety and humane boundaries | **FAIL — P0** | 27/27 adversarial high-stakes paraphrases drew a card. Literal maker probes stop humanely, focus the explanation and have zero state side effects, but coverage does not generalize. |
| Benign usefulness / false-positive control | **FAIL — P0** | 8/9 harmless controls were blocked, including “current project deadline,” “invest more energy,” “doctor my resume,” “legal-size paper,” and “stock a craft closet.” |
| Brand contribution | **PASS WITH RELEASE HOLD** | The room, deck presentation, voice and visual world are distinctive and coherent with LAiDIES. The failed safety behavior and unreadable stop heading prevent brand approval for release. |
| Keyboard, focus and live status | **PASS — automated Chromium scope** | Native-button Enter activation, focused reading, focused boundary, reset focus and live-status behavior passed. |
| Contrast and accessible safety state | **FAIL — P0** | Safety paragraph proxy passes, but the essential safety heading computes to about 1.16:1. |
| Reduced motion and reflow proxies | **PASS — proxy scope** | Zero-delay/non-smooth reduced-motion behavior and no page-level overflow at 320 or 390 CSS pixels before/after a result. Main draw control measured 54px high. |
| Local persistence, non-repeat and reset | **PARTIAL FAIL** | Normal, returning, denied-storage, immediate non-repeat and scoped reset pass. Extreme positive count and unknown history entries are not sanitized. |
| Privacy | **PROVISIONAL PASS; OWNER/PLATFORM HOLD** | Reading code does not store or transmit question text; browser maxlength enforces 300 characters. Microsoft documents that Clarity masks input boxes in every masking mode, but production analytics configuration/network behavior was not independently verified. |
| Redirect and product separation | **PASS LOCALLY** | Cocktail Fortune recovers to the canonical route; Businesswomen's Special remains a separately framed drink picker with a spirit-free lane. |
| Exact artifact and integration integrity | **PASS LOCALLY** | Fresh 1,077-file / 961.38 MiB artifact matches all five governed source hashes; exact-artifact browser suite, metadata, inline JS, local links and town contract pass. The 750 MiB advisory warning remains. |
| Maintainability | **FAIL** | Safety policy is embedded as broad keyword regular expressions in the page, while tests largely restate those literals. Policy, fixtures and implementation are not independently evolvable. |

## Weighted score

Quality, accuracy and contribution to the LAiDIES brand are deliberately
weighted heavily. A score cannot override a failed safety or accessibility
floor.

| Dimension | Weight | Score |
|---|---:|---:|
| Safety, trust and humane handling | 25 | 3 |
| Product intent, accuracy and user truth | 15 | 9 |
| LAiDIES brand contribution and craft | 15 | 12 |
| UX and accessibility | 15 | 8 |
| Technical integrity and reliability | 15 | 10 |
| Privacy and data truth | 10 | 8 |
| Maintainability and evidence quality | 5 | 1 |
| **Total** | **100** | **51 / 100 — FAIL** |

## Independent evidence

### Source and exact-artifact reruns

- `node scripts/test-mme-claio-contract.mjs` — **PASS**, 100 cards.
- Maker browser suite rerun against source with screenshots redirected outside
  the workspace — **PASS**.
- Fresh independent build:
  `/tmp/laidies-mme-claio-independent.p1AFzz` — 1,077 files, 961.38 MiB;
  builder warning above the 750 MiB advisory threshold.
- Maker browser suite rerun against that exact fresh artifact — **PASS**.
- `node scripts/validate-public-metadata.mjs <artifact>` — **PASS**.
- `node scripts/check-inline-js.js` — **PASS**, 353 scripts / 132 pages.
- `node scripts/check-local-links.js` — **PASS**, 1,942 references / 110 pages.
- `node scripts/check-town.js` — **PASS**.
- Source/artifact byte comparison — **MATCH** for all five governed files.

| Governed file | Fresh source/artifact SHA-256 |
|---|---|
| `games/madame-claio.html` | `7b2df8f9e6cd49a71b9d4fdc81cd3b4ba17003b0856ddc032a3aae60c828eef8` |
| `content/madame-claio-v2.css` | `24f92925745a7bc79589104c93e18061996bc9d43c66c885c702a69c7cd91997` |
| `content/site/madame-claio-v2.js` | `00467ac79b2d60a9698079f8ca4d412efdea62bcc9832f1f3b7435b90892ab2c` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |
| `games/businesswomens-special.html` | `80da00f08a31608bc89c15a078eefa6c100d91a3eb466ee7c978ece42c36e928` |

### Adversarial safety and false-positive matrix

The independent matrix used the rendered source experience at 390 CSS pixels
with reduced motion. It tested result visibility, focus and storage after every
call.

- **27 expected stops; 27 false negatives.**
- **9 expected low-stakes draws; 8 false positives.**
- **35 classification failures across 36 cases.**
- Correctly stopped calls preserved seeded count, history and an unrelated badge
  exactly; the defect is classification, not the post-classification stop path.

Representative false negatives:

- Crisis/emergency: “I do not want to wake up tomorrow”; “I cannot go on
  anymore”; “Should I take all of these pills?”; “My house is filling with
  smoke and someone is not breathing”; “I am bleeding heavily and feel faint.”
- Abuse/safety: “My boyfriend controls all my money and tracks my phone”; “My
  wife shoved me and I am scared to go home”; “He says he will hurt me if I
  leave.”
- Medical: “My chest hurts and my left arm is numb”; “Can I double my insulin?”;
  “Is this rash cancer?”
- Legal/financial: “Should I accept this settlement?”; “Can my landlord evict
  me?”; “Which ETF should I buy?”; “Can I afford this house?”
- Current/factual: “Who is the prime minister?”; “What is the weather
  tomorrow?”; “Who won last night's game?”; “How much does GPT-5 cost?”
- Normalization/evasion: `k i l l myself`, `self—harm`, `su1cide`, `d0sage`,
  and curly-apostrophe “I can’t stay safe.”

Representative false positives:

- “How can I meet my current project deadline?”
- “How can I invest more energy in friendships?”
- “How do I doctor my resume?”
- “I need a legal-size paper layout.”
- “How do I stock a craft closet?”
- “Is this outfit accurate for a 90s party?”
- “Help me write a fictional emergency scene.”

This reproduces the finite-phrase-router failure described in canonical
painpoint BTB-098.

### State, privacy and accessibility probes

- A correctly stopped medication probe preserved a seeded count of four,
  existing history and unrelated badge byte-for-byte.
- Scoped reset removed Mme CLAi-O count/history/keepsake, preserved the unrelated
  badge, returned focus to the draw button and announced the reset.
- The textarea enforced 300 characters when filled with 350.
- At 390 and 320 CSS pixels, the page had no horizontal overflow before or
  after a reading; draw button height was 54px.
- The safety paragraph is readable, but the safety heading's computed
  `rgb(63, 23, 55)` foreground on `rgb(17, 23, 53)` is approximately 1.16:1.
- Microsoft Clarity's current official masking documentation says input-box
  content is masked in all modes and cannot be unmasked:
  <https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking>.
  This supports, but does not replace, the held production configuration and
  network verification.

## Exact repair packet

### P0-1 — remove unsafe free-text classification from the launch path

**Recommended repair:** remove the optional free-text question for launch and
make Mme CLAi-O an honest random-card reflection. The deck does not use the
question to tailor a result, so this is the smallest solution that simultaneously
removes sensitive-input collection, eliminates false reassurance from an
unreliable router, and makes the product's actual mechanic legible.

Keep a permanent, concise boundary before the draw: low-stakes reflection only;
not for emergencies, personal safety/abuse, health, legal, financial or
fact/current-information decisions. Provide a plainly labelled “Need real-world
help or current information?” disclosure with the humane category routes
already authored. Do not require a visitor in crisis to find the right keyword.

If owner direction requires retaining an input, it cannot ship behind the
current regex expansion strategy. It needs a separately reviewed design that
does not claim semantic safety from a finite phrase list and does not send
sensitive text to an external classifier. A structured, user-chosen low-stakes
topic is safer than arbitrary prose, but still needs Safety/Trust approval.

### P0-2 — make the random, non-tailored mechanic explicit

Visible copy beside the draw must say that the prompt/card is random authored
reflection and does not analyze, answer or know the visitor. Do not rely on “not
a prediction” alone. If P0-1 removes free text, state simply that each draw is a
random authored card to keep, adapt or ignore.

### P0-3 — repair and test the entire safety state contrast

Make the computed safety heading foreground meet at least 4.5:1 against its
actual background at source and artifact. Use sufficient selector specificity
or an explicit component token so shared `h3` rules cannot override it. Test the
heading, paragraph, links and focus indicator—not only `#claioSafetyMessage`.

### P0-4 — sanitize the complete local data contract

- Accept count only when it is a non-negative safe integer within a defensible
  product maximum; otherwise reset it to zero.
- Accept history only when each card exists in the governed 100-card deck.
  Rehydrate authoritative `read` copy from the deck rather than trusting stored
  display text.
- Accept badges only as a plain object with the expected member shape.
- Verify malformed, array, extreme-positive, decimal, exponential, unknown-card,
  oversized-history and denied-read/write/remove cases.
- Preserve unrelated valid badges during repair and reset.

### P0-5 — replace implementation-shaped tests with an independent fixture gate

Create a versioned fixture matrix owned/reviewed by Safety/Trust, not copied from
the router. It must cover paraphrase, indirect language, Unicode punctuation,
spacing, common misspelling/obfuscation, mixed intent and benign contextual uses.
Every stopped case must assert zero change to seeded count/history/badges; every
benign case must complete. Add explicit tests for the safety heading contrast,
extreme corrupt state, 320 and 390 reflow, input truth, focused result/boundary,
live status, reduced motion, reset scope, redirect and BWS separation. Run the
same matrix against source and a freshly built exact artifact.

### P0-6 — repeat independent judgment

The maker must not self-certify this repair. A new independent judge should
receive the operating specification, this failed matrix and the exact candidate,
then rerun and expand the adversarial cases.

## Preserved holds

This judgment does not clear or narrow any existing hold:

- Safari keyboard and storage behavior;
- VoiceOver reading, boundary, reset and returning-state announcements;
- native browser zoom/text scaling and real-device touch behavior;
- Ali's visual/creative approval;
- production Plausible/Clarity privacy configuration and event-property review;
- canonical/retired-route verification on the real public origin;
- exact release-artifact naming;
- deployment, publication, promotion or other public/external mutation.

The current fresh artifact is evidence only. It must not be deployed.
