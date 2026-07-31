#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../..");
const matrixPath = path.join(import.meta.dirname, "CARD-MATRIX.md");
const outputPath = path.join(
  import.meta.dirname,
  "episode-01-04-concept-catalogue-candidate-v1.json",
);

const episodeReceipts = {
  "01": [
    "operations/product-stewards/trading-cards/evidence-2026-07-27/episode-01-concept-card-fronts-independent-visual-editorial-verdict-2026-07-27.md",
    "operations/product-stewards/trading-cards/evidence-2026-07-27/episode-01-human-judgment-v3-successor-independent-visual-editorial-verdict-2026-07-27.md",
  ],
  "02": [
    "operations/product-stewards/trading-cards/evidence-2026-07-27/episode-02-concept-card-fronts-independent-visual-editorial-verdict-2026-07-27.md",
  ],
  "03": [
    "operations/product-stewards/trading-cards/evidence-2026-07-27/episode-03-concept-card-fronts-independent-visual-editorial-verdict-2026-07-27.md",
  ],
  "04": [
    "operations/product-stewards/trading-cards/evidence-2026-07-27/episode-04-concept-card-fronts-independent-visual-editorial-verdict-2026-07-27.md",
    "operations/product-stewards/trading-cards/evidence-2026-07-27/episode-04-ai-winter-v2-successor-independent-visual-editorial-verdict-2026-07-27.md",
  ],
};

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function plain(value) {
  return value
    .replaceAll("**", "")
    .replaceAll("`", "")
    .replace(/\s+/g, " ")
    .trim();
}

const matrix = await readFile(matrixPath, "utf8");
const records = [];

for (const episode of ["01", "02", "03", "04"]) {
  const sectionMatch = matrix.match(
    new RegExp(
      `## Episode ${episode}[^\\n]*\\n([\\s\\S]*?)(?=\\n## Episode|\\n## Episode 05\\+)`,
    ),
  );
  if (!sectionMatch) throw new Error(`Missing Episode ${episode} matrix section`);

  const packMatch = sectionMatch[1].match(/Pack key: `([^`]+)`/);
  if (!packMatch) throw new Error(`Missing Episode ${episode} pack key`);
  const packKey = packMatch[1];

  const manifestRel =
    `assets/cards/concepts/episode-${episode}/candidates-20260727/manifest.json`;
  const manifestRaw = await readFile(path.join(root, manifestRel), "utf8");
  const manifest = JSON.parse(manifestRaw);
  const byKey = new Map(manifest.cards.map((card) => [card.card_key, card]));

  const rows = sectionMatch[1]
    .split("\n")
    .filter((line) => line.startsWith("| `concept:"));

  if (rows.length !== 5) {
    throw new Error(`Episode ${episode} expected 5 matrix rows, found ${rows.length}`);
  }

  for (const row of rows) {
    const cells = row.split("|").slice(1, -1).map((cell) => cell.trim());
    const cardKey = plain(cells[0]);
    const frontParts = cells[1].split("·").map(plain);
    const art = byKey.get(cardKey);
    if (!art) throw new Error(`${cardKey} missing from ${manifestRel}`);

    const imageRel =
      `assets/cards/concepts/episode-${episode}/candidates-20260727/${art.file}`;
    const imageBytes = await readFile(path.join(root, imageRel));
    const actualImageSha = sha256(imageBytes);
    if (actualImageSha !== art.sha256) {
      throw new Error(`${cardKey} image hash mismatch`);
    }

    for (const receipt of episodeReceipts[episode]) {
      await stat(path.join(root, receipt));
    }

    const exactReceipt =
      cardKey === "concept:s01:e01:human-judgment:v1" ||
      cardKey === "concept:s01:e04:ai-winter:v1"
        ? episodeReceipts[episode].at(-1)
        : episodeReceipts[episode][0];

    records.push({
      card_key: cardKey,
      deck: "concept",
      catalog_version: "concept-s01-e01-04-candidate-v1",
      release_state: "candidate",
      episode_or_roster: `s01:e${episode}`,
      front_title: frontParts[0],
      front_hook: frontParts[1],
      back_heading: frontParts[0],
      back_copy: plain(cells[2]),
      source_authority: "operations/product-stewards/trading-cards/CARD-MATRIX.md",
      source_locator: plain(cells[3]),
      image_front: imageRel,
      image_front_sha256: actualImageSha,
      image_back_or_rendered_copy: null,
      alt_front: plain(cells[4]),
      alt_back: null,
      pack_keys: [packKey],
      identity_ref: null,
      visual_review_receipt: exactReceipt,
      editorial_review_receipt: exactReceipt,
      visual_review_receipts: episodeReceipts[episode],
      editorial_review_receipts: episodeReceipts[episode],
      correction_owner: "trading-cards-subchampion",
      updated_at: "2026-07-27",
    });
  }
}

const candidate = {
  schema_version: 1,
  status: "candidate_unadmitted",
  catalog_version: "concept-s01-e01-04-candidate-v1",
  generated_at: "2026-07-27",
  source_matrix: "operations/product-stewards/trading-cards/CARD-MATRIX.md",
  source_matrix_sha256: sha256(matrix),
  count: records.length,
  packs: [...new Set(records.flatMap((record) => record.pack_keys))],
  cards: records,
  limits: [
    "Candidate catalogue only; no card or pack is admitted, openable, owned, rewarded or public.",
    "Back copy is specified as real text; no generated back image is implied.",
    "Accessibility, technical catalogue, product/ownership and pack admission remain required.",
  ],
};

await writeFile(outputPath, `${JSON.stringify(candidate, null, 2)}\n`);
console.log(`WROTE ${path.relative(root, outputPath)} cards=${records.length}`);
