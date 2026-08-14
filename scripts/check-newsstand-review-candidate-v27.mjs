import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REQUIRED_DESKS = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
const READY_DESKS = ["paige_tip", "promptoscope", "career_life", "mme_claio"];
const REJECTED_COLOURS = ["#fff7e1", "#fffaf0", "#fff4d2"];

function words(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

export function inspectNewsstandReviewCandidate({ daily, features, html, css, js, fileExists = () => true, readBoundJson = () => null }) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };

  require(daily?.schemaVersion === "laidies-newsstand-review-candidate.v1", "Daily review schema mismatch");
  require(daily?.status === "PRIVATE_REVIEW_ONLY_NOT_PUBLISHED", "Daily review must remain explicitly private");
  require(daily?.editionDate === "2026-08-14", "Daily edition date mismatch");
  require(Array.isArray(daily?.stories) && daily.stories.length >= 2, "Daily requires at least two stories");
  for (const story of daily?.stories || []) {
    require(story.edition === "daily", `${story.id || "Daily story"}: wrong edition`);
    require(story.status === "review_candidate", `${story.id || "Daily story"}: source record must not claim published`);
    require(words(story.headline) >= 5, `${story.id || "Daily story"}: headline is too vague`);
    require(words(story.the_story) >= 35, `${story.id || "Daily story"}: missing who/what/how context`);
    require(words(story.laidies_read) >= 18, `${story.id || "Daily story"}: missing plain-language read`);
    require(Array.isArray(story.tags) && story.tags.length >= 3, `${story.id || "Daily story"}: topic tags missing`);
    require(Array.isArray(story.sources) && story.sources.length >= 2, `${story.id || "Daily story"}: source map too thin`);
    require(Array.isArray(story.longform?.sections) && story.longform.sections.length >= 4, `${story.id || "Daily story"}: full article missing`);
    require(Boolean(story.media?.src && story.media?.alt && story.media?.caption), `${story.id || "Daily story"}: visible media contract missing`);
    if (story.media?.src) require(fileExists(story.media.src), `${story.id || "Daily story"}: media file is missing`);
  }

  const desks = daily?.desks || [];
  require(desks.length === REQUIRED_DESKS.length, "Daily desk inventory must be complete");
  require(JSON.stringify(desks.map((desk) => desk.type)) === JSON.stringify(REQUIRED_DESKS), "Daily desks are missing or out of governed order");
  for (const desk of desks) {
    if (READY_DESKS.includes(desk.type)) {
      require(desk.state === "ready", `${desk.type}: admitted review desk is not ready`);
      require(Boolean(desk.recordId), `${desk.type}: record ID missing`);
      require(Boolean(desk.sourceExemplar?.path && /^[a-f0-9]{64}$/.test(desk.sourceExemplar?.sha256 || "")), `${desk.type}: exact source exemplar binding missing`);
      require(words(desk.headline) >= 3, `${desk.type}: headline too weak`);
      require(words(desk.summary) >= 45, `${desk.type}: useful substance is too thin`);
      const exemplar = readBoundJson(desk.sourceExemplar);
      require(Boolean(exemplar), `${desk.type}: source exemplar is missing or checksum-stale`);
      if (exemplar) {
        require(exemplar.storage?.recordId === desk.recordId, `${desk.type}: rendered record ID does not match its source exemplar`);
        require(exemplar.headline === desk.headline, `${desk.type}: rendered headline drifted from its source exemplar`);
        const bodyMatches = exemplar.body === desk.summary || (desk.type === "mme_claio" && exemplar.body.startsWith(`${desk.summary}\n\n`));
        require(bodyMatches, `${desk.type}: rendered body drifted from its source exemplar`);
      }
    } else {
      require(desk.state === "empty", `${desk.type}: filler may not masquerade as ready`);
      require(words(desk.emptyState) >= 8, `${desk.type}: empty state is not honest or useful`);
    }
  }

  require(features?.schemaVersion === "laidies-newsstand-review-features.v1", "Feature review schema mismatch");
  require(features?.status === "PRIVATE_REVIEW_ONLY_NOT_PUBLISHED", "Feature review must remain explicitly private");
  for (const [key, edition, minSections] of [["weekly", "weekly", 5], ["bigPicture", "tribune", 8]]) {
    const story = features?.[key];
    require(story?.edition === edition, `${key}: edition mismatch`);
    require(story?.status === "review_candidate", `${key}: source record must not claim published`);
    require(Array.isArray(story?.longform?.sections) && story.longform.sections.length >= minSections, `${key}: full paper article is incomplete`);
    require(Array.isArray(story?.sources) && story.sources.length >= 3, `${key}: source map too thin`);
    require(Boolean(story?.media?.src && story?.media?.alt && story?.media?.caption), `${key}: visible media contract missing`);
    if (story?.media?.src) require(fileExists(story.media.src), `${key}: media file is missing`);
  }

  require(/<body class="newsstand-daily-first">/.test(html), "Daily is not the arrival experience");
  require(/renderFeaturePaper/.test(html) && /The Big Picture/.test(html) && /Term of the week/.test(html), "Weekly/Big Picture paper renderers are incomplete");
  require(/data-open-archive/.test(html), "Archive/topic route is missing");
  require(/searchParams\.get\("review"\) === "2026-08-14"/.test(js) && /PRIVATE_REVIEW_ONLY_NOT_PUBLISHED/.test(js), "Private review loader is missing or fail-open");
  require(/reviewStoriesForReader/.test(js) && /reviewFeatureStoriesForReader/.test(js), "Private records are not isolated from reader-only rendering state");
  require(/\.newsstand-daily-first \.ns-room\s*\{[^}]*display:\s*none/s.test(css), "Old chooser room still competes with the Daily");
  require(/@media \(max-width: 780px\)[\s\S]*?\.ns-daily-service-grid--primary\s*\{[^}]*grid-template-columns:\s*1fr/s.test(css), "Mobile service desks do not stack readably");
  for (const colour of REJECTED_COLOURS) require(!css.toLowerCase().includes(colour), `Rejected beige/yellow colour remains: ${colour}`);

  return { ok: errors.length === 0, errors };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
  const readBoundJson = (binding) => {
    if (!binding?.path || !binding?.sha256) return null;
    const absolute = path.join(ROOT, binding.path);
    if (!fs.existsSync(absolute)) return null;
    const actual = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
    return actual === binding.sha256 ? JSON.parse(fs.readFileSync(absolute, "utf8")) : null;
  };
  const result = inspectNewsstandReviewCandidate({
    daily: readJson("content/newsstand-review-candidate-2026-08-14.json"),
    features: readJson("content/newsstand-review-feature-candidates-2026-08-14.json"),
    html: fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8"),
    css: fs.readFileSync(path.join(ROOT, "content/newsstand.css"), "utf8"),
    js: fs.readFileSync(path.join(ROOT, "content/site/newsstand-catchup-v1.js"), "utf8"),
    fileExists: (publicPath) => fs.existsSync(path.join(ROOT, String(publicPath).replace(/^\//, ""))),
    readBoundJson
  });
  if (!result.ok) {
    console.error(result.errors.join("\n"));
    process.exit(1);
  }
  console.log("NEWSSTAND REVIEW CANDIDATE V27 PASS stories=2 ready_desks=4 weekly=complete big_picture=complete private=true rejected_colours=0");
}
