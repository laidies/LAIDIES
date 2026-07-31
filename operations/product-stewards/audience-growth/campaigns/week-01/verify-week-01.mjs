import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const campaignDir = import.meta.dirname;
const ownerDir = path.resolve(campaignDir, "../..");
const assetsDir = path.join(campaignDir, "assets");
const manifest = JSON.parse(fs.readFileSync(path.join(campaignDir, "seven-day-content-board.json")));
const measurement = JSON.parse(fs.readFileSync(path.join(ownerDir, "measurement-state.json")));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function valueAtPath(object, dottedPath) {
  return dottedPath.split(".").reduce((value, key) => value?.[key], object);
}

function readPngDimensions(file) {
  const header = Buffer.alloc(24);
  const descriptor = fs.openSync(file, "r");
  try {
    fs.readSync(descriptor, header, 0, header.length, 0);
  } finally {
    fs.closeSync(descriptor);
  }
  assert(header.subarray(1, 4).toString("ascii") === "PNG", `${file} is not a PNG`);
  return {
    width: header.readUInt32BE(16),
    height: header.readUInt32BE(20),
  };
}

assert(manifest.units.length === 35, "manifest must contain 35 units");
assert(manifest.units.reduce((count, unit) => count + unit.hooks.length, 0) === 105, "manifest must contain 105 hooks");
for (const job of ["STOP", "TEACH", "SAVE/SEND", "JOIN", "VISIT/RETURN"]) {
  assert(manifest.units.filter((unit) => unit.job === job).length === 7, `${job} must contain 7 units`);
}

const repairedSourceUse = new Map([
  [
    "W01-D1-01",
    [
      "payoff",
      "Specificity—not secret syntax—gives AI a better chance of producing something you can use.",
    ],
  ],
  [
    "W01-D1-03",
    ["hooks.1", "Seven briefing lines. A better chance at a usable first pass."],
  ],
  [
    "W01-D1-05",
    [
      "payoff",
      "The visitor gets the Issue 02 lesson and a concrete before/after prompt.",
    ],
  ],
]);
for (const [unitId, [field, expected]] of repairedSourceUse) {
  const unit = manifest.units.find((candidate) => candidate.id === unitId);
  assert(unit, `${unitId} must exist`);
  assert(valueAtPath(unit, field) === expected, `${unitId} ${field} must match NewsStand wording`);
}

const manifestText = JSON.stringify(manifest);
for (const held of [
  "Specificity—not syntax—is what makes AI useful.",
  "Seven lines. One much better first draft.",
  "The visitor gets a practical before/after transformation.",
  "Tell it what you really really want",
  "The Spice Girls did not say: tell me what you vaguely want.",
  "Be specific. Be bold. Be David Rose about it.",
]) {
  assert(!manifestText.includes(held), `held NewsStand wording remains: ${held}`);
}
assert(!manifestText.includes("looks like.."), "W01-D1-01 retains doubled terminal punctuation");
assert(
  manifest.units.find((unit) => unit.id === "W01-D1-01")?.accessibleText.includes(
    "STOP: Tell it what useful looks like."
  ),
  "W01-D1-01 accessible text must contain one terminal period"
);

const brandSuccessorCopy = [
  ["W01-D1-01", "title", "Tell it what useful looks like."],
  ["W01-D1-01", "hooks.0", "Specificity is not secret syntax. It is a useful brief."],
  ["W01-D1-05", "hooks.2", "Be specific about the job, the audience and the boundary."],
];
for (const [unitId, field, expected] of brandSuccessorCopy) {
  const unit = manifest.units.find((candidate) => candidate.id === unitId);
  assert(unit, `${unitId} must exist`);
  assert(valueAtPath(unit, field) === expected, `${unitId} ${field} must match Brand-successor wording`);
}

const stopVtt = fs.readFileSync(path.join(
  assetsDir,
  "instagram-motion",
  "w01-d1-01.vtt"
), "utf8");
assert(
  stopVtt.includes("Specificity is not secret syntax. It is a useful brief."),
  "W01-D1-01 VTT must contain the Brand-successor opening"
);
for (const held of ["Spice Girls", "really really want", "David Rose"]) {
  assert(!stopVtt.includes(held), `W01-D1-01 VTT retains held rights wording: ${held}`);
}

const social = measurement.social;
assert(social.plannedToday === 5, "plannedToday must be 5");
assert(social.readyToday === 0, "readyToday must be 0");
assert(social.publishedToday === 0, "publishedToday must be 0");
assert(social.rollingSevenDay.planned === 35, "rolling planned must be 35");
assert(social.rollingSevenDay.builtLocally === 35, "rolling builtLocally must be 35");
assert(social.rollingSevenDay.readyToPublish === 0, "rolling readyToPublish must be 0");
assert(social.rollingSevenDay.published === 0, "rolling published must be 0");

const evidenceTime = Date.parse(measurement.asOf);
assert(Number.isFinite(evidenceTime), "measurement asOf must parse as an exact timestamp");
assert(evidenceTime <= Date.now(), `measurement asOf is in the future: ${measurement.asOf}`);

const issue04Units = manifest.units.filter((unit) => unit.source.title === "The Founding Mothers");
for (const unit of issue04Units) {
  assert(
    JSON.stringify(unit.source.paths) === JSON.stringify([
      "content/episodes/issue-04.json",
      "content/episodes/episode-04.canon.md",
    ]),
    `${unit.id} has the wrong Issue 04 authority`
  );
}

const imageSpecs = [
  ["instagram", 35, 1080, 1350],
  ["linkedin", 35, 1200, 1200],
  ["instagram-stories", 35, 1080, 1920],
  ["instagram-carousels", 70, 1080, 1350],
  ["linkedin-document-pages", 70, 1200, 1200],
];
for (const [directory, count, width, height] of imageSpecs) {
  const imageDir = path.join(assetsDir, directory);
  const files = fs.readdirSync(imageDir).filter((file) => file.endsWith(".png"));
  assert(files.length === count, `${directory} expected ${count} PNGs, found ${files.length}`);
  for (const file of files) {
    const dimensions = readPngDimensions(path.join(imageDir, file));
    assert(dimensions.width === width && dimensions.height === height, `${directory}/${file} has ${dimensions.width}x${dimensions.height}; expected ${width}x${height}`);
  }
}

const pdfDir = path.join(assetsDir, "linkedin-documents");
const pdfs = fs.readdirSync(pdfDir).filter((file) => file.endsWith(".pdf"));
assert(pdfs.length === 14, `expected 14 LinkedIn PDFs, found ${pdfs.length}`);
for (const file of pdfs) {
  const result = spawnSync("pdfinfo", [path.join(pdfDir, file)], { encoding: "utf8" });
  assert(result.status === 0, `${file} failed pdfinfo`);
  assert(/^Pages:\s+5$/m.test(result.stdout), `${file} must have 5 pages`);
  assert(/^Page size:\s+1200 x 1200 pts/m.test(result.stdout), `${file} must be 1200x1200 points`);
}

const motionDir = path.join(assetsDir, "instagram-motion");
const videos = fs.readdirSync(motionDir).filter((file) => file.endsWith(".mp4"));
const captions = fs.readdirSync(motionDir).filter((file) => file.endsWith(".vtt"));
assert(videos.length === 7, `expected 7 motion candidates, found ${videos.length}`);
assert(captions.length === 7, `expected 7 WebVTT files, found ${captions.length}`);

if (errors.length) {
  console.error("WEEK 01 VERIFICATION FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("WEEK 01 VERIFICATION PASS");
console.log("units=35 hooks=105 jobs=7x5");
console.log("plannedToday=5 rollingBuilt=35 ready=0 published=0");
console.log("instagram=35 feed + 35 story + 14x5 carousel + 7 motion/vtt");
console.log("linkedin=35 preview + 14x5-page document");
console.log(`measurementAsOf=${measurement.asOf} future=false`);
