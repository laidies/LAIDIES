#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.TOWN_CATALOGUE_ROOT || process.cwd());
const productDir = path.join(root, "operations/product-stewards/trading-cards");
const inputPath = path.join(productDir, "town-character-catalogue-admission-candidate-v1-2026-07-27.json");
const contentVerdictPath = path.join(productDir, "evidence-2026-07-27/town-character-catalogue-admission-candidate-v1-independent-verdict-2026-07-27.md");
const consumerVerdictPath = path.join(productDir, "evidence-2026-07-27/town-rendered-card-consumer-v1-independent-verdict-2026-07-27.md");
const rosterPath = path.join(productDir, "CHARACTER-ROSTER.md");
const visualVerdictPath = path.join(productDir, "independent-town-character-front-admission-matrix-2026-07-27.md");
const outputPath = path.join(productDir, "town-character-technical-catalogue-candidate-v1-2026-07-27.json");

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const expected = {
  input: "45b17e19c44e3c6d1ad424bfd83c86519df03a35d9aa692313b77c793c65fefa",
  content: "da1cbe8d2bdbee775be973625fad4591f49e966ff825bfbbcb29638c035f3dee",
  consumer: "2123db882e2b5721d3cc79cbbff7236d9faed19611cfbf590cbe4a56e6e9b2c7",
  roster: "b8b5cf20816b8cd24957aac2aa83698588fa54100aea40bcb5c4750cba8c307c",
  visual: "cf69731aa76c5a14ec03d930a7fb386402940c6f352c694cca14f3d822f98e4e"
};

const actual = {
  input: sha256(inputPath),
  content: sha256(contentVerdictPath),
  consumer: sha256(consumerVerdictPath),
  roster: sha256(rosterPath),
  visual: sha256(visualVerdictPath)
};

for (const [key, hash] of Object.entries(expected)) {
  if (actual[key] !== hash) {
    throw new Error(`Refusing stale ${key}: expected ${hash}, got ${actual[key]}`);
  }
}

const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
if (!Array.isArray(source.records) || source.records.length !== 13) {
  throw new Error("Expected exactly 13 accepted Town content records");
}

const catalogueVersion = "town-character-catalogue-technical-candidate-2026-07-27-v1";
const records = source.records.map((record) => ({
  card_key: record.card_key,
  deck: "character",
  catalog_version: catalogueVersion,
  release_state: "held",
  episode_or_roster: "town-roster-2026-07-27",
  front_title: record.front.title,
  front_hook: record.front.hook,
  back_heading: record.back.heading,
  back_copy: `${record.back.teaching_move} ${record.back.boundary}`,
  source_authority: {
    path: "operations/product-stewards/trading-cards/CHARACTER-ROSTER.md",
    sha256: expected.roster
  },
  source_locator: `town-character:${record.identity_id}`,
  image_front: {
    path: record.front.file,
    sha256: record.front.sha256,
    dimensions: record.front.dimensions
  },
  image_back_or_rendered_copy: {
    kind: "rendered_copy",
    heading: record.back.heading,
    teaching_move: record.back.teaching_move,
    boundary: record.back.boundary
  },
  alt_front: record.front.alt,
  alt_back: record.back.alt,
  pack_keys: [],
  identity_ref: `town:${record.identity_id}`,
  visual_review_receipt: {
    path: "operations/product-stewards/trading-cards/independent-town-character-front-admission-matrix-2026-07-27.md",
    sha256: expected.visual
  },
  editorial_review_receipt: {
    path: "operations/product-stewards/trading-cards/evidence-2026-07-27/town-character-catalogue-admission-candidate-v1-independent-verdict-2026-07-27.md",
    sha256: expected.content
  },
  accessibility_review_receipt: {
    path: "operations/product-stewards/trading-cards/evidence-2026-07-27/town-rendered-card-consumer-v1-independent-verdict-2026-07-27.md",
    sha256: expected.consumer
  },
  correction_owner: "Trading Cards product and editorial steward",
  updated_at: "2026-07-27T08:30:00-07:00"
}));

const output = {
  schema_version: 1,
  kind: "town_character_technical_catalogue_candidate",
  catalog_version: catalogueVersion,
  release_state: "held",
  pack_state: "not_created",
  ownership_state: "none",
  closet_projection_state: "not_wired",
  public_state: "not_released",
  scope: "Technical catalogue-shape candidate for the 13 content-accepted Town records and independently accepted isolated rendered consumer. It does not admit a card, create a pack, grant ownership, write a Closet, change a route or authorize release.",
  immutable_inputs: {
    content_catalogue: {
      path: "operations/product-stewards/trading-cards/town-character-catalogue-admission-candidate-v1-2026-07-27.json",
      sha256: expected.input
    },
    content_verdict: {
      path: "operations/product-stewards/trading-cards/evidence-2026-07-27/town-character-catalogue-admission-candidate-v1-independent-verdict-2026-07-27.md",
      sha256: expected.content
    },
    rendered_consumer_verdict: {
      path: "operations/product-stewards/trading-cards/evidence-2026-07-27/town-rendered-card-consumer-v1-independent-verdict-2026-07-27.md",
      sha256: expected.consumer
    }
  },
  records,
  required_next_reviews: [
    "independent_technical_catalogue_shape",
    "final_product_admission",
    "release_admission"
  ],
  explicit_holds: [
    "pack selection and odds",
    "server-authoritative grant/open/replay/correction",
    "ownership and duplicate projection",
    "Closet projection",
    "production route and release"
  ],
  updated_at: "2026-07-27T08:30:00-07:00"
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`TOWN TECHNICAL CATALOGUE BUILT records=${records.length} release=held pack=not-created ownership=none`);
