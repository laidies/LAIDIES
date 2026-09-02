#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = "operations/product-stewards/newsstand/candidates";
const stamp = "2026-09-02T17:00:00.000Z";
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const stable = value => value === null || typeof value !== "object"
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const bind = relative => ({ path: relative, sha256: hash(read(relative)) });
const put = (relative, body) => fs.writeFileSync(path.join(root, relative), body);

const configs = {
  "openclaw-shared-sessions-2026-09-02": {
    image: "latest-openclaw-shared-sessions-20260902.png",
    alt: "Three adult professional women collaborate around a shared AI workspace, with linked folders and work history visible as one continuing project.",
    sources: [
      ["openclaw-release", "OpenClaw — OpenClaw 2.0 release article", "https://openclaw.ai/blog/openclaw-2-accidentally/", "source-openclaw.md", "vendor"],
      ["openclaw-release-notes", "OpenClaw — 2026.8.1 release notes", "https://docs.openclaw.ai/releases/2026.8.1", "source-openclaw.md", "vendor"],
      ["openclaw-cloud-sessions", "OpenClaw — Cloud Sessions documentation", "https://docs.openclaw.ai/gateway/cloud-sessions", "source-openclaw.md", "vendor"],
      ["openclaw-foundation", "OpenClaw Foundation — Project and organizational status", "https://www.openclaw.org/", "source-openclaw.md", "organization"],
      ["hermes-agent-release", "Nous Research — Hermes Agent v0.21.0 release", "https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.31", "source-hermes.md", "vendor"],
      ["aidb-2026-09-01", "The AI Daily Brief — September 1 edition and attributed analysis", "https://aidailybrief.ai/e/2026-09-01", "source-aidb.md", "analysis"]
    ],
    themes: ["shared AI work", "agents and teamwork"], concepts: ["agents", "context", "sessions", "memory"],
    tags: ["OpenClaw", "Hermes", "agents", "shared sessions", "teamwork"]
  },
  "anthropic-agentic-incidents-2026-09-02": {
    image: "latest-anthropic-agentic-incidents-20260902.png",
    alt: "Two adult women review an AI safety test diagram showing a controlled workspace, an open network route and a checklist of system boundaries.",
    sources: [
      ["anthropic-cyber-incidents", "Anthropic — Investigating incidents from cybersecurity evaluations", "https://www.anthropic.com/research/investigating-incidents-cybersecurity-evals", "source-anthropic-july.md", "vendor"],
      ["anthropic-alignment-update", "Anthropic — Improving alignment and security efforts", "https://www.anthropic.com/news/improving-alignment-security-efforts", "source-anthropic-august.md", "vendor"],
      ["aisi-agent-incident", "UK AI Security Institute — Incident report on unsanctioned agent behaviour", "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing", "source-aisi.md", "government"],
      ["aidb-2026-09-01", "The AI Daily Brief — September 1 edition, used as attributed analysis and corrected against primary sources", "https://aidailybrief.ai/e/2026-09-01", "source-aidb.md", "analysis"]
    ],
    themes: ["AI safety", "evaluation and oversight"], concepts: ["agents", "tools", "permissions", "guardrails", "evaluation"],
    tags: ["Anthropic", "AISI", "reward hacking", "AI safety", "cybersecurity"]
  },
  "openai-ads-run-rate-2026-09-02": {
    image: "latest-openai-ads-run-rate-20260902.png",
    alt: "Two adult professional women compare a business speedometer with a bank ledger beside a clearly separated sponsored ChatGPT placement.",
    sources: [
      ["openai-ads-milestone", "OpenAI — Advertising milestone and expansion", "https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/", "source-openai-announcement.md", "vendor"],
      ["openai-ads-faq", "OpenAI Help — Ads in ChatGPT", "https://help.openai.com/en/articles/20001047-ads-in-chatgpt", "source-openai-faq.md", "vendor"],
      ["openai-ads-availability", "OpenAI Help — Ads Manager availability", "https://help.openai.com/en/articles/20001245-ads-manager-availability", "source-openai-faq.md", "vendor"],
      ["newsstand-ads-predecessor", "LAiDIES NewsStand — August 31 ChatGPT ads coverage", "https://laidies.ai/newsstand#chatgpt-ad-expansion-2026-08-31", "source-predecessor.md", "laidies"]
    ],
    themes: ["AI business models", "advertising and incentives"], concepts: ["context", "incentives", "business models"],
    tags: ["OpenAI", "ChatGPT", "advertising", "run rate", "business models"]
  }
};

function inline(value) {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
function paragraphs(body) {
  return body.trim().split(/\n\s*\n/).map(value => `<p>${inline(value.replace(/\n/g, " "))}</p>`).join("");
}
function sections(markdown) {
  const result = {};
  let current = "headline";
  const parts = [];
  for (const line of markdown.split("\n")) {
    const match = line.match(/^## (.+)$/);
    if (match) {
      if (current !== "headline") result[current] = parts.splice(0).join("\n").trim();
      current = match[1].trim();
    } else if (current === "headline" && line.startsWith("# ")) result.headline = line.slice(2).trim();
    else if (current !== "headline") parts.push(line);
  }
  result[current] = parts.join("\n").trim();
  return result;
}

const selected = process.argv.slice(2);
for (const [id, config] of Object.entries(configs).filter(([candidateId]) => !selected.length || selected.includes(candidateId))) {
  const dir = `${base}/${id}`;
  const content = sections(read(`${dir}/article.md`));
  const classNotes = [content["Class Notes"], content["Previous coverage"]].filter(Boolean).map(section => inline(section.replace(/^- /gm, "").replace(/\n+/g, " "))).join(" ");
  const story = {
    id, slug: id, edition: "daily", status: "hold", publishedAt: null,
    updatedAt: stamp, lastCheckedAt: stamp,
    sourceApproval: { record: `newsstand:source-approval:${id}`, status: "independent-review-required" },
    correction: null, correctionHistory: [], retraction: null,
    predecessorStoryIds: [], successorStoryIds: [], relationshipType: null,
    bigPicture: null, thread: null, thread_subtitle: null, thread_entry: null,
    headline: content.headline,
    heroVisual: { src: `/assets/newsstand/design-20260830/${config.image}`, alt: config.alt, credit: "LAiDIES NewsStand illustration" },
    the_story: paragraphs(content["The Story"]),
    laidies_read: paragraphs(content["The LAiDIES Read"]),
    what_this_means: paragraphs(content["What This Means For You"]),
    cocktail_party: content["The Cocktail Party Explanation"].trim(),
    watch_fors: null, closing_note: null, class_notes: classNotes,
    sources: config.sources.map(([sourceId, label, url, , publisherType]) => ({ id: sourceId, label, url, publisherType, accessedAt: "2026-09-02", approvalStatus: "reviewed" })),
    aidb_credit: null, themes: config.themes, concepts: config.concepts, tags: config.tags,
    saint_lane: null, badge: "THE LATEST"
  };
  put(`${dir}/story.json`, `${JSON.stringify(story, null, 2)}\n`);
  put(`${dir}/review-text.json`, `${stable(story)}\n`);
  put(`${dir}/rendered-article.html`, `<article><h1>${story.headline}</h1><section><h2>The Story</h2>${story.the_story}</section><section><h2>The LAiDIES Read</h2>${story.laidies_read}</section><section><h2>What This Means For You</h2>${story.what_this_means}</section><section><h2>The Cocktail Party Explanation</h2><p>${story.cocktail_party}</p></section><section><h2>Class Notes</h2><p>${story.class_notes}</p></section></article>\n`);
  const manifest = { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "NEWSSTAND_DAILY", contentClass: "NEWS", reviewText: bind(`${dir}/review-text.json`), rendered: bind(`${dir}/rendered-article.html`) };
  put(`${dir}/publication-manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  const sourceClaimMap = JSON.parse(read(`${dir}/claim-map.json`));
  put(`${dir}/publication-claim-map.json`, `${JSON.stringify(sourceClaimMap.claims || sourceClaimMap, null, 2)}\n`);

  const producer = JSON.parse(read(`${dir}/producer-review.json`));
  producer.reviewedAt = stamp;
  producer.artifact = { manifest: bind(`${dir}/publication-manifest.json`), reviewText: bind(`${dir}/review-text.json`), rendered: bind(`${dir}/rendered-article.html`) };
  producer.limitations = [...new Set([...(producer.limitations || []), "AI editorial assessment only; no observed human-comprehension evidence is claimed."])];
  put(`${dir}/producer-publication-review.json`, `${JSON.stringify(producer, null, 2)}\n`);

  const sourceByPath = new Map(config.sources.map(([, , , file]) => [file, bind(`${dir}/${file}`)]));
  const packageSeed = {
    schemaVersion: "newsstand-ordinary-story-candidate-v1", candidateStatus: "READY_FOR_ISSUE_ADMISSION", candidateId: id, editionDate: "2026-09-02",
    story, storySha256: hash(stable(story)),
    publicationBase: { path: `${dir}/publication-base.js`, sha256: "PENDING" },
    sourceText: bind(`${dir}/review-text.json`), claimMap: bind(`${dir}/publication-claim-map.json`), producerContract: bind(`${dir}/producer-contract.json`),
    sources: config.sources.map(([sourceId, , url, file]) => ({ id: sourceId, url, evidence: sourceByPath.get(file) })),
    reviewEvidence: { producer: bind(`${dir}/producer-publication-review.json`), independent: { path: `${dir}/independent-publication-review.json`, sha256: "PENDING" }, independentRawReport: { path: `${dir}/independent-publication-raw-report.json`, sha256: "PENDING" } }
  };
  put(`${dir}/candidate-package-seed.json`, `${JSON.stringify(packageSeed, null, 2)}\n`);
  console.log(`${id} story_sha=${packageSeed.storySha256}`);
}
