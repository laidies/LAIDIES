#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const configPath = process.argv[2];
if (!configPath) {
  console.error("Usage: node scripts/compile-newsstand-longform.mjs <config.json>");
  process.exit(2);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const sourcePath = path.resolve(path.dirname(configPath), config.sourcePath);
const markdown = fs.readFileSync(sourcePath, "utf8");

function escapeHTML(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inline(value) {
  return escapeHTML(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseSections(lines) {
  const sectionHeadingLevels = new Set(config.sectionHeadingLevels || [2]);
  const sectionHeading = (line) => {
    const match = line.match(/^(#{2,3}) (.+)$/);
    return match && sectionHeadingLevels.has(match[1].length) ? match[2] : null;
  };
  const sections = [];
  let current = config.introSectionLabel
    ? { id: slug(config.introSectionLabel), label: config.introSectionLabel, lines: [] }
    : null;
  for (const line of lines) {
    const heading = sectionHeading(line);
    if (heading) {
      if (current && current.lines.some((item) => item.trim())) sections.push(current);
      current = { id: slug(heading), label: heading, lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else if (line.trim() && line.trim() !== "---") {
      throw new Error("Meaning-bearing prose appeared before the first H2 section");
    }
  }
  if (current && current.lines.some((line) => line.trim())) sections.push(current);
  return sections;
}

function parseBlocks(lines) {
  const blocks = [];
  for (let index = 0; index < lines.length;) {
    const raw = lines[index];
    const line = raw.trim();
    if (!line || line === "---") { index += 1; continue; }
    if (/^### /.test(line)) {
      blocks.push({ type: "subheading", text: line.slice(4) });
      index += 1;
      continue;
    }
    if (/^>/.test(line)) {
      const values = [];
      while (index < lines.length && /^>/.test(lines[index].trim())) {
        values.push(lines[index].trim().replace(/^> ?/, ""));
        index += 1;
      }
      const body = values.join(" ");
      const roleText = body.replace(/[*_]/g, "");
      const roleEntry = (config.quoteRoles || []).find((item) => roleText.startsWith(item.startsWith));
      blocks.push({
        type: "quote",
        role: roleEntry?.role || "evidence",
        ...(roleEntry?.eyebrow ? { eyebrow: roleEntry.eyebrow } : {}),
        body: inline(body)
      });
      continue;
    }
    const listMatch = line.match(/^([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[1]);
      const items = [];
      while (index < lines.length) {
        const itemMatch = lines[index].trim().match(ordered ? /^\d+\.\s+(.*)$/ : /^[-*]\s+(.*)$/);
        if (!itemMatch) break;
        const parts = [itemMatch[1]];
        index += 1;
        while (index < lines.length && lines[index].trim() && !/^(#{1,3} |>|---$|[-*] |\d+\. )/.test(lines[index].trim())) {
          parts.push(lines[index].trim());
          index += 1;
        }
        items.push(inline(parts.join(" ")));
        while (index < lines.length && !lines[index].trim()) index += 1;
      }
      blocks.push({ type: ordered ? "ordered_list" : "unordered_list", items });
      continue;
    }
    const parts = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,3} |>|---$|[-*] |\d+\. )/.test(lines[index].trim())) {
      parts.push(lines[index].trim());
      index += 1;
    }
    const body = parts.join(" ");
    const landmark = (config.landmarks || []).find((item) => body.startsWith(item.startsWith));
    if (landmark) blocks.push({ type: "subheading", text: landmark.label });
    blocks.push({ type: "paragraph", body: inline(body) });
  }
  return blocks;
}

const lines = markdown.split(/\r?\n/);
const title = lines.shift()?.replace(/^# /, "");
while (lines[0] !== undefined && !lines[0].trim()) lines.shift();
const edition = lines.shift()?.replace(/^\*\*|\*\*$/g, "");
if (title !== config.expectedTitle || edition !== config.expectedEdition) {
  throw new Error(`Source identity mismatch: ${JSON.stringify({ title, edition })}`);
}
if (config.expectedHeadline) {
  while (lines[0] !== undefined && !lines[0].trim()) lines.shift();
  const headline = lines.shift()?.replace(/^## /, "");
  if (headline !== config.expectedHeadline) {
    throw new Error(`Source headline mismatch: ${JSON.stringify({ headline })}`);
  }
}

const sections = parseSections(lines).map((section) => ({
  id: section.id,
  label: section.label,
  blocks: parseBlocks(section.lines)
}));
const sectionIds = new Set(sections.map((section) => section.id));
const jumpSectionIds = config.jumpHeadings.map(slug);
for (const jumpId of jumpSectionIds) {
  if (!sectionIds.has(jumpId)) throw new Error(`Configured jump target is missing: ${jumpId}`);
}
for (const landmark of config.landmarks || []) {
  const found = sections.some((section) => section.blocks.some((block) => block.type === "subheading" && block.text === landmark.label));
  if (!found) throw new Error(`Configured landmark is missing: ${landmark.label}`);
}
for (const role of config.quoteRoles || []) {
  const found = sections.some((section) => section.blocks.some((block) => block.type === "quote" && block.role === role.role &&
    block.body.replace(/<[^>]*>/g, "").startsWith(role.startsWith)));
  if (!found) throw new Error(`Configured quote role is missing: ${role.startsWith}`);
}

const longform = { ariaLabel: config.ariaLabel, jumpSectionIds, sections };

if (config.storyTemplatePath || config.outputPath) {
  if (!config.storyTemplatePath || !config.outputPath) {
    throw new Error("storyTemplatePath and outputPath must be supplied together");
  }
  const templatePath = path.resolve(path.dirname(configPath), config.storyTemplatePath);
  const outputPath = path.resolve(path.dirname(configPath), config.outputPath);
  const candidate = JSON.parse(fs.readFileSync(templatePath, "utf8"));
  if (!candidate?.story || candidate.story.status !== "hold" || candidate.story.publishedAt !== null) {
    throw new Error("Story template must remain a held, unpublished candidate");
  }
  candidate.story.longform = longform;
  fs.writeFileSync(outputPath, JSON.stringify(candidate, null, 2) + "\n");
  process.stdout.write(`${path.relative(process.cwd(), outputPath)}\n`);
} else {
  process.stdout.write(JSON.stringify(longform, null, 2) + "\n");
}
