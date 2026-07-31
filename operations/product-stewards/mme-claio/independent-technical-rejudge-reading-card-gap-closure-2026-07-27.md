# Independent technical rejudge — Mme CLAi-O reading-card gap closure

**Date:** 2026-07-27 (America/Vancouver)  
**Scope:** Judge-only review of the exact local closure described in `maker-evidence-reading-card-gap-closure-2026-07-27.md`. No source, assets, test, route, account, reward, provider, deployment, or public-state file was changed by this review.

## Verdict

**ACCEPT — local card-art completeness integration.**

The four approved candidate PNG bytes were copied exactly into the product asset location; their WebP delivery derivatives are present at the same native card geometry. The immutable 100-card authored deck remains byte-identical to `HEAD`, and the exact production lookup rules resolve WebP and PNG files for all 100 canonical card names. The supplied contract suite and a real Chromium browser suite both pass.

This accepts only the local asset/lookup closure. Native Safari/VoiceOver, release-artifact binding, deployment, cache and public-origin proof remain separate and are **not** implied.

## Frozen assets

| Canonical card / slug | Product PNG SHA-256 | Product WebP SHA-256 | Native dimensions | Candidate-to-product PNG identity |
|---|---|---|---|---|
| The Temporary Tattoo / `temporary-tattoo` | `0c38d87976d4c1fbe28988c0cfecdb8bfa16d0772c006c8b0384e0884c700a84` | `b9d97899f452c986c2947bfc90e58d11d683357ffbf3ad1e615b6a10174d58a9` | PNG 886×1248; WebP 886×1248 | **PASS** — matches accepted candidate `temporary-tattoo-candidate-v1.png` exactly |
| The Beanie Baby Tag / `beanie-baby-tag` | `57989582632df28c8b035d30f2f4acd1e7b15a69f5860eacb06988e061aae198` | `05091583066663d4f402a1d5bb9e4dbf09ca5df86d8f4cc2b5ebdb2b8366e81c` | PNG 886×1248; WebP 886×1248 | **PASS** — matches accepted candidate `beanie-baby-tag-candidate-v1.png` exactly |
| The Milky Pen / `milky-pen` | `94193043c3b3873aa9a0ee799d86495241443495c7a861653cc041d90e25ba02` | `08855c457a1ef2bd5de04f11ab7fb2bc5ac519eeb966cf97ef2092f3ca640db1` | PNG 886×1248; WebP 886×1248 | **PASS** — matches accepted candidate `milky-pen-candidate-v1.png` exactly |
| The Hair Wrap Thread / `hair-wrap-thread` | `39043469da697d3ca08caffe1027189399ce0c09597d296702100892faaff989` | `47ae07303c1ddc66829324c13b7dc2407c03414c1793786d639fd3cb3ce0d87f` | PNG 886×1248; WebP 886×1248 | **PASS** — matches accepted candidate `hair-wrap-thread-candidate-v1.png` exactly |

The upstream visual candidate verdict remains `independent-reading-card-gap-candidates-visual-verdict-2026-07-27.md`, SHA-256 `9c28bb157947d633ad9af46c6e862da6a9508a7dd80d8431d0b2c1cfa2976399`.

## Lookup and runtime evidence

1. Reimplemented the production `cardSlug()` rule, including only its two source aliases (`pixie-stick → pixie-sticks`; `secret-diary-with-the-lock → secret-diary-with-lock`), against all 100 distinct entries in the authored `fortuneCards` array.
   - `cards=100`, `unique=100`, `webp_png_missing=0`.
   - Every canonical name therefore has both the primary WebP and the existing PNG fallback file.
2. Real bundled `playwright-core` + local Chromium served the exact repository and exercised the four live lookup paths through `window.showCardArt()` at a 390×844 viewport:
   - `/assets/mme-claio/reading-cards/temporary-tattoo.webp` — `alt="The Temporary Tattoo"`, 886×1248, visible.
   - `/assets/mme-claio/reading-cards/beanie-baby-tag.webp` — `alt="The Beanie Baby Tag"`, 886×1248, visible.
   - `/assets/mme-claio/reading-cards/milky-pen.webp` — `alt="The Milky Pen"`, 886×1248, visible.
   - `/assets/mme-claio/reading-cards/hair-wrap-thread.webp` — `alt="The Hair Wrap Thread"`, 886×1248, visible.
3. `node scripts/test-mme-claio-contract.mjs` — **PASS**, `deck_cards=100`.
4. `PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node scripts/test-mme-claio-browser.mjs` — **PASS**. The real-browser matrix includes random/non-tailored truth, no free text, keyboard/focus/live result, non-repeat, device-local badge/history/reset, storage denial, corrupt state, reduced motion, 320/390 reflow, contrast, legacy redirect and separate-game boundary.
5. `jq empty operations/product-stewards/mme-claio/state.json`, targeted owner-entry preflight, and scoped `git diff --check` — **PASS**.

## Preserved contract / mutation boundary

- The exact authored deck block SHA-256 is `f3408d996e7628a52d6af65c69b2ad2c792fe86cc4b1ff87d96f3fe0a264c6c3` in both the current file and `HEAD`: **no deck-copy mutation**.
- No card-gap-specific route logic, account, reward, provider, or public/deploy mutation was found. The page retains the local-only history and Hotline Regular scope exercised by the browser suite.
- The current worktree does contain a separate two-line `games/madame-claio.html` diff adding canonical and `og:url` metadata. It is outside this card-gap integration, does not alter the deck block or route behaviour, and is not accepted as public-origin proof here.

## Exact next action

Control Room may record the **local 100-card art completeness gate** as closed. Before any release claim, bind this local tuple into the intended release artifact and run the separate native Safari/VoiceOver, release-artifact, deployment/cache and public-origin checks. No deck copy or visual re-review is reopened by this technical acceptance.

## Learning scan

No qualifying new painpoint entry: the existing record contained no directly applicable Mme CLAi-O card-lookup prevention rule, and this rejudge found no failure or surprising workaround. The reusable control remains explicit 100-name × two-format coverage plus a browser load of every newly filled slug; it is recorded here because this task was limited to a dossier-local receipt.
