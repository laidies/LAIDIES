#!/usr/bin/env node

import fs from "node:fs";

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error("NEWSSTAND READER ENTRY FAIL\n- exact Markdown artifact path is required");
  process.exit(1);
}

const source = fs.readFileSync(file, "utf8");
const lines = source.split(/\r?\n/);
const headlineIndex = lines.findIndex(line => /^#\s+/.test(line));
const headline = headlineIndex >= 0 ? lines[headlineIndex].replace(/^#\s+/, "").trim() : "";
let standfirst = "";
const standfirstStart = lines.findIndex((line, index) => index > headlineIndex && /^\*[^*]/.test(line.trim()));
if (standfirstStart >= 0) {
  const parts = [];
  for (let index = standfirstStart; index < lines.length; index += 1) {
    parts.push(lines[index].trim());
    if (/\*$/.test(lines[index].trim()) && index > standfirstStart || /^\*[^*].*\*$/.test(lines[index].trim())) break;
  }
  standfirst = parts.join(" ").replace(/^\*|\*$/g, "").trim();
}
const prose = lines.slice(Math.max(0, headlineIndex + 1))
  .filter(line => !/^#{1,6}\s/.test(line) && !/^[-*]\s/.test(line) && !/^https?:\/\//.test(line))
  .join(" ")
  .replace(/[*_`[\]()]/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const first120 = prose.split(/\s+/).slice(0, 120).join(" ").toLowerCase();
const errors = [];
const negation = /\b(no|did not|didn't|does not|doesn't|had not|hadn't|not your|not every|not ordinary|was not|wasn't)\b/i;

const section = heading => {
  const start = lines.findIndex(line => line.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (start < 0) return "";
  const endOffset = lines.slice(start + 1).findIndex(line => /^##\s+/.test(line));
  const end = endOffset < 0 ? lines.length : start + 1 + endOffset;
  return lines.slice(start + 1, end).join("\n").trim();
};

const publicItem = section("What you may have seen");
const storySummary = section("What it was saying");
const actualEvent = section("What actually happened");
const route = section("What was the “attack”?") || section("What was the \"attack\"?") || section("How this happened");
const boundaries = section("Where this meets the way you use AI") || section("If I only type into ChatGPT, what does this mean for me?") || section("What does this mean if I only use ChatGPT?") || section("When this can happen — and when it cannot") || section("When this can happen—and when it cannot");
const unintended = section("What did the researchers find?") || section("What private information did they find?") || section("What could be included without realizing it");
const laidiesRead = section("The LAiDIES read");
const unintendedPlain = unintended.replace(/[*_`\n]/g, " ").replace(/\s+/g, " ");
const journey = [storySummary, actualEvent, route].join("\n");
const sourceIdentity = [publicItem, storySummary].join("\n");

if (!headline) errors.push("headline is missing");
if (!standfirst) errors.push("standfirst is missing");
if (!(negation.test(headline) || /\bactually (?:found|means)\b/i.test(headline))) errors.push("headline does not correct the likely frightening conclusion");
if (!negation.test(standfirst)) errors.push("standfirst does not repeat the correction before explanation");
if (!/\b(developer|developers|researcher|researchers)\b/.test(first120)) errors.push("first 120 words do not name the actual actor");
if (!/\b(posted|published|uploaded|shared)\b/.test(first120)) errors.push("first 120 words do not name the deliberate sharing action");
if (!/\b(record|records|file|files)\b/.test(first120)) errors.push("first 120 words do not name the ordinary object as a saved record or file");
if (!/\b(private|ordinary)(?: ai)? chats?\b/.test(first120)) errors.push("first 120 words do not state the ordinary-chat boundary");
if (!/\b(inspect|study|reuse|reproduce|show how|understand how)\b/.test(first120)) errors.push("first 120 words do not say why the record was shared");

if (!publicItem) errors.push("missing exact-source section: What you may have seen");
if (publicItem && !/theneurondaily\.com\/p\//i.test(publicItem)) errors.push("exact-source section does not link the encountered reporting");
if (publicItem && !/arxiv\.org\/abs\//i.test(sourceIdentity)) errors.push("exact-source section does not link the underlying primary paper");
if (publicItem && !/\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},\s+\d{4}\b/i.test(publicItem)) errors.push("exact-source section does not give the publication date");
if (publicItem && !/\b(headline|article|report|post|newsletter)\b/i.test(publicItem)) errors.push("exact-source section does not identify the encountered reporting");
if (publicItem && !/\b(paper|preprint|study)\b/i.test(sourceIdentity)) errors.push("exact-source section does not identify the underlying primary source");
if (!storySummary) errors.push("missing fair-summary section: What it was saying");
if (storySummary && storySummary.split(/\s+/).length < 35) errors.push("story summary is too short to fairly state the public item's claim");

if (!route) errors.push("missing attack-action section");
if (route && !/\b(deliberate security test|deliberately tested)\b/i.test(route)) errors.push("attack is not defined as a deliberate security test");
if (route && !/\b(powerful|stronger|capable)\b[^.]{0,160}\bweaker\b/i.test(route)) errors.push("attack section does not show the stronger-to-weaker model transfer");
if (route && !/\b(fed|moved|handed|gave)\b/i.test(route)) errors.push("attack section does not show the unreadable bundle being moved");
if (route && !/\b(instructions|prompt)\b/i.test(route)) errors.push("attack section does not show the deliberate bypass instructions");
if (route && !/\b(stopped|no longer)\b[^.]{0,120}\b(reveal|revealing|return|produce)/i.test(route)) errors.push("attack section does not explain exactly what stopped working");
if (journey && !/\b(github|hugging face|public repository|public website)\b/i.test(journey)) errors.push("sharing journey does not name where the record went");
if (journey && !/\b(inspect|study|reuse|reproduce)\b/i.test(journey)) errors.push("sharing journey does not explain why the record was published");
if (actualEvent && !/websites? where people\s+post computer projects and ai research/i.test(actualEvent.replace(/\s+/g, " "))) errors.push("specialist destination names appear without explaining what those websites are for");
if (actualEvent && !/\boutside\b[^.]{0,100}\b(account|team)\b[^.]{0,100}\b(find|download)\b/i.test(actualEvent.replace(/\s+/g, " "))) errors.push("public does not identify who gains access");
if (actualEvent && !/\bai did not post\b/i.test(actualEvent)) errors.push("public does not distinguish the person from the AI as publisher");
if (actualEvent && !/\b(private workspace|named person)\b/i.test(actualEvent)) errors.push("public does not contrast private and named-recipient sharing");

if (actualEvent && !/what you give the ai/i.test(actualEvent)) errors.push("information-flow model is missing what the person gives the AI");
if (actualEvent && !/what the ai gives you/i.test(actualEvent)) errors.push("information-flow model is missing the visible AI result");
if (actualEvent && !/what some advanced tools (?:create|record) automatically/i.test(actualEvent)) errors.push("information-flow model is missing the automatically created activity record");
if (actualEvent && !/what somebody later (?:puts online|shares)/i.test(actualEvent)) errors.push("information-flow model is missing the later publication action");
if (actualEvent && !/\b(?:job file|activity record)\b[\s\S]{0,220}\b(instructions|replies)\b[\s\S]{0,180}\b(files opened|actions)\b/i.test(actualEvent.replace(/\s+/g, " "))) errors.push("activity record is named without saying what it records");
if (actualEvent && !/\b(?:public project folder|project folder containing it|public website)\b/i.test(actualEvent)) errors.push("article does not explain how an activity record could be put online");

if (!boundaries) errors.push("missing can/cannot boundary section");
if (boundaries && !(/\bselect(?:ed|ing)?\b[^.]{0,100}\bvisible\b[^.]{0,100}\b(past(?:e|ed|ing)|cop(?:y|ied|ying))\b/i.test(boundaries) || /\bcopy\w*\b[^.]{0,100}\bselected\b[^.]{0,100}\b(move|send)\w*\b/i.test(boundaries))) errors.push("boundary section does not explain selecting visible words and pasting only those words");
if (boundaries && !/\b(public|share|shared)[- ]?(chat[- ]?)?link\b/i.test(boundaries)) errors.push("boundary section does not distinguish a public chat link");
if (boundaries && !/\b(attach|upload)\w*\b[^.]{0,100}\b(document|file)\b/i.test(boundaries)) errors.push("boundary section does not distinguish an ordinary file attachment");
if (boundaries && !/\b(phone)\b[^.]{0,120}\b(chatgpt|claude)\b|\b(chatgpt|claude)\b[^.]{0,120}\bphone\b/i.test(boundaries)) errors.push("reader spectrum does not include ordinary phone questions");
if (boundaries && !/\b(paste|upload)\w*\b[^.]{0,120}\b(document|image|spreadsheet)\b/i.test(boundaries)) errors.push("reader spectrum does not include ordinary work material");
if (boundaries && !/\b(open files|run commands|work through a project)\b/i.test(boundaries)) errors.push("reader spectrum does not include project-wide AI tools");
if (boundaries && !/\b(?:job file|activity record)\b[^.]{0,160}\bpaper directly studied\b/i.test(boundaries.replace(/\s+/g, " "))) errors.push("boundary section does not identify the directly studied activity-record publication");
if (/\bmarkdown\b/i.test(source) && !/\bmarkdown file is just\s+readable text\b/i.test(source.replace(/\s+/g, " "))) errors.push("Markdown is named without its ordinary information boundary");

if (!laidiesRead || !/\bdoes not automatically carry\b/i.test(laidiesRead)) errors.push("article does not answer whether every AI-made public item has this risk");
if (laidiesRead && !/\b(job files?|activity records?|file recording every step)\b/i.test(laidiesRead)) errors.push("article does not identify the narrower risky object");

if (!unintended) errors.push("missing unintended-contents section");
if (unintended && !/\b(passwords?|api keys?|access tokens?|private keys?)\b/i.test(unintended)) errors.push("unintended-contents section lacks concrete sensitive examples");
if (unintended && !/\b(clean|remove|sanitize|scrub)\w*\b/i.test(unintended)) errors.push("unintended-contents section lacks an evidence-supported route into the hidden record");
if (unintended && !/\b(could not determine|couldn't determine|unknown|not know|cannot know)\b/i.test(unintended)) errors.push("unintended-contents section does not preserve unknown origins");
if (unintended && !/api keys?[^.]{0,120}\b(password|software|charges|service)\b/i.test(unintendedPlain)) errors.push("API key is named without ordinary meaning or consequence");
if (unintended && !/access tokens?[^.]{0,100}\b(pass|access|temporary)\b/i.test(unintendedPlain)) errors.push("access token is named without ordinary meaning or consequence");
if (unintended && !/private keys?[^.]{0,120}\b(secret|unlock|identity|access)\b/i.test(unintendedPlain)) errors.push("private key is named without ordinary meaning or consequence");

if (/\b(copy(?:ing)? an answer|full work file)\b/i.test(source)) errors.push("article uses rejected vague shorthand: copying an answer or full work file");

if (errors.length) {
  console.error(`NEWSSTAND READER ENTRY FAIL\n${errors.map(error => `- ${error}`).join("\n")}`);
  process.exit(1);
}

console.log("NEWSSTAND READER ENTRY INTEGRITY MATCH correction=headline+standfirst encountered_reporting=present underlying_primary=present attack_action=explained information_flow=present reader_spectrum=present public_audience=defined credentials=translated boundary_words=120 quality_authority=none");
