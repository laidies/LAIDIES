#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sources = {
  decisions: path.join(root, "operations", "DECISIONS.md"),
  lessons: path.join(root, "operations", "LESSONS-ACTIVE.md"),
  canon: path.join(root, "operations", "voice", "laidies-canon-index.md"),
  agreement: path.join(root, "operations", "CODEX-WORKING-AGREEMENT.md")
};
const hash = file => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
for (const [name, file] of Object.entries(sources)) if (!fs.existsSync(file)) throw new Error(`standing-card source missing: ${name} (${file})`);
const sourceText = Object.fromEntries(Object.entries(sources).map(([name, file]) => [name, fs.readFileSync(file, "utf8")]));
for (const [label, needle] of [
  ["truth separation", "publicly verified"],
  ["quality gate", "AI-slop"],
  ["teaching voice", "smartest, funniest"],
  ["collision control", "One writer owns a building lane at a time"],
  ["Episode 1 authority", "Episode 1 is the gold standard"]
]) if (!Object.values(sourceText).some(text => text.toLowerCase().includes(needle.toLowerCase()))) throw new Error(`standing-card source no longer contains required authority: ${label}`);

const sourceHashes = Object.fromEntries(Object.entries(sources).map(([name, file]) => [name, hash(file)]));
const body = `# LAiDIES standing card

<!-- GENERATED FILE. Run: node scripts/build-standing-card.mjs -->
decisions-sha256: ${sourceHashes.decisions}
lessons-sha256: ${sourceHashes.lessons}
canon-sha256: ${sourceHashes.canon}
agreement-sha256: ${sourceHashes.agreement}

## The job

LAiDIES is a cohesive, useful learning town for professional women from the Rewind Era. Teach complex AI in the voice of her smartest, funniest, passionate friend: plain English first, accurate mechanism, earned analogy, practical real-life example, how the parts connect, why it matters and what she can do with it. Episode 1 is the voice benchmark. Generic, personality-free, boring, decorative-reference or AI-slop work fails.

## Truth and authority

- Durable repository authority outranks chat summaries. Read the Canon Index, then DECISIONS, then the exact product dossier before making a product choice.
- Planned, local, rendered, reviewed, admitted, released, deployed and publicly verified are different states. Never promote one into another.
- Ali owns public voice, material product choices, deployment/publication and spend. A local pass does not use that authority.
- One writer owns an exact file lane at a time. Preserve dirty work and active locks. Capture a new idea, then continue the active build unless Ali explicitly switches it.

## Produce before review

- Solve the visitor outcome, not the checklist. Tier 1 work must fail inside production before it reaches Ali.
- Public teaching prose follows: valid producer contract → exact-prose producer self-review → role-distinct semantic judge on the same bytes → claim/source binding → observed unfamiliar-reader evidence where required → owner admission.
- A simulated reader probe is producer evidence only. It is never an observed human. A substantial Library book needs three distinct unfamiliar-human explain-back and unseen-transfer observations.
- The independent semantic judge must use a different model family and stripped context: exact artifact, writing lock and Episode 1 only. Use scripts/run-independent-content-judge.mjs for OpenAI-made prose.
- New rejection families come from the shared exemplar registry automatically. Repeated known defects stop production and repair the producer/checker before another review.
- Review URLs are issued only through the Review Door. Maker receipts, hashes, route loads and self-authored PASS labels have integrity authority only.

## Visitor and release

- Test the real continuous desktop/mobile experience and its visitor states. Do not infer function from a route load or a screenshot.
- Visual/media review starts from exact rendered pixels or decoded frames at intended size. Preserve approved work and compare successors against it.
- No direct deploy, publication, purchase, provider choice, public messaging or claim of completion without the named release owner and exact live verification.

## Retrieve, do not preload

This card is orientation, not full authority. Retrieve exact passages only when the task needs them:

    node scripts/query-laidies-context.mjs --source decisions --query "term"
    node scripts/query-laidies-context.mjs --source lessons --query "term"
    node scripts/query-laidies-context.mjs --source canon --query "term"
    node scripts/query-laidies-context.mjs --source product --product library --query "term"

If a required source is absent or contradictory, stop only the affected work and route the conflict. Do not improvise from this summary.
`;

const target = path.join(root, "operations", "runtime", "STANDING-CARD.md");
if (process.argv.includes("--check")) {
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== body) {
    console.error("STANDING CARD STALE: run node scripts/build-standing-card.mjs");
    process.exit(1);
  }
  console.log(`STANDING CARD PASS bytes=${Buffer.byteLength(body)} sha256=${crypto.createHash("sha256").update(body).digest("hex")}`);
} else {
  fs.writeFileSync(target, body);
  console.log(`STANDING CARD BUILT bytes=${Buffer.byteLength(body)} target=${path.relative(root, target)}`);
}
