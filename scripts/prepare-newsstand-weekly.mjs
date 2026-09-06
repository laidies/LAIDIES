#!/usr/bin/env node
// Private Weekly input preparation. This assesses cadence and binds eligible
// published Daily inputs; it does not rank editorial importance or publish.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { vancouverDay, stable } from './validate-newsstand-ordinary-story-candidate.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const reject = message => { throw new Error(`NEWSSTAND_WEEKLY_PREPARE_REJECT: ${message}`); };
const canonical = value => `${stable(value)}\n`;

function validDate(value) {
  if (!DATE.test(value || '')) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function addDays(date, count) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + count);
  return value.toISOString().slice(0, 10);
}
export function weeklyPeriodFor(publicationDate) {
  if (!validDate(publicationDate)) reject('publication date must be a real YYYY-MM-DD date');
  if (new Date(`${publicationDate}T12:00:00Z`).getUTCDay() !== 3) reject('Weekly publication date must be Wednesday');
  return { startDate: addDays(publicationDate, -7), endDate: publicationDate };
}
export function correctiveWeekPeriodFor(publicationDate) {
  if (!validDate(publicationDate)) reject('corrective publication date must be a real YYYY-MM-DD date');
  if (new Date(`${publicationDate}T12:00:00Z`).getUTCDay() !== 0) reject('corrective Weekly publication date must be Sunday');
  return { startDate: addDays(publicationDate, -6), endDate: publicationDate };
}
function validCorrectiveCurrentWeekly(current) {
  var corrective = current && current.correctivePublication;
  return !!(corrective && corrective.mode === 'MISSED_WEDNESDAY_CURRENT_WEEK' &&
    corrective.publicationDate === current.editionDate &&
    corrective.period && corrective.period.endDate === current.editionDate &&
    corrective.period.startDate === addDays(current.editionDate, -6) &&
    validDate(current.editionDate) && new Date(`${current.editionDate}T12:00:00Z`).getUTCDay() === 0);
}
function priorWednesday(date) {
  if (!validDate(date)) reject('as-of date must be a real YYYY-MM-DD date');
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay();
  return addDays(date, -((weekday - 3 + 7) % 7));
}
function within(date, period) { return date >= period.startDate && date <= period.endDate; }
function parseStories(raw) {
  const context = { window: {} };
  try { vm.runInNewContext(raw, context, { timeout: 1000 }); } catch { reject('canonical stories source cannot be evaluated'); }
  const data = JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
  if (!data || !Array.isArray(data.stories) || !data.publications?.weekly) reject('canonical Weekly authority is missing');
  return data;
}
function binding(relative, raw) { return { path: relative, sha256: sha256(raw) }; }
function continuationHolds(raw) {
  return raw.split(/\r?\n/).map((text, index) => ({ text, line: index + 1 }))
    .filter(item => /\*\*HOLD\*\*|\*\*DUPLICATE \/ WATCH\*\*/.test(item.text))
    .map(item => ({ line: item.line, text: item.text.trim() }));
}
export function prepareNewsstandWeekly({ storiesRaw, continuationRaw = '', asOf, publicationDate = null, correctiveCurrentWeek = false, storiesPath = 'content/newsstand-stories.js', continuationPath = null }) {
  if (!validDate(asOf)) reject('as-of date must be a real YYYY-MM-DD date');
  const data = parseStories(storiesRaw);
  const current = data.publications.weekly;
  if (current.status !== 'current' || !validDate(current.editionDate) || !(new Date(`${current.editionDate}T12:00:00Z`).getUTCDay() === 3 || validCorrectiveCurrentWeekly(current)) || !current.storyId) reject('current Weekly publication pointer is invalid');
  const prior = data.stories.find(story => story.id === current.storyId && story.edition === 'weekly' && ['published', 'corrected'].includes(story.status) && story.sourceApproval?.status === 'approved');
  if (!prior) reject('current Weekly story is not admitted');
  const lastDueDate = priorWednesday(asOf);
  const nextDueDate = addDays(lastDueDate, 7);
  if (current.editionDate > asOf) reject('current Weekly publication cannot be after the assessment date');
  if (correctiveCurrentWeek && publicationDate && publicationDate !== asOf) reject('corrective Weekly publication date must equal the current Vancouver day');
  const targetDate = publicationDate || (correctiveCurrentWeek ? asOf : (lastDueDate === asOf && current.editionDate < lastDueDate ? lastDueDate : nextDueDate));
  const period = correctiveCurrentWeek ? correctiveWeekPeriodFor(targetDate) : weeklyPeriodFor(targetDate);
  if (correctiveCurrentWeek && current.editionDate >= lastDueDate) reject('corrective Weekly requires a missed Wednesday successor');
  if (targetDate <= current.editionDate) reject('target Weekly must follow the existing published edition');
  const candidates = data.stories
    .filter(story => story.edition === 'daily' && ['published', 'corrected'].includes(story.status) && story.sourceApproval?.status === 'approved' && vancouverDay(story.publishedAt) <= asOf && within(vancouverDay(story.publishedAt), period))
    .sort((left, right) => String(right.publishedAt).localeCompare(String(left.publishedAt)) || left.id.localeCompare(right.id))
    .map(story => ({ id: story.id, headline: story.headline, publishedAt: story.publishedAt, sourceApproval: story.sourceApproval, storySha256: sha256(stable(story)) }));
  const missedIssueDate = current.editionDate < lastDueDate ? lastDueDate : null;
  return {
    schemaVersion: 'newsstand-weekly-input-packet-v1',
    mode: correctiveCurrentWeek ? 'PRIVATE_CORRECTIVE_PREPARATION_ONLY' : 'PRIVATE_PREPARATION_ONLY',
    asOf,
    publicationDate: targetDate,
    period,
    cadence: {
      currentWeeklyEditionDate: current.editionDate,
      lastDueDate,
      nextDueDate,
      missedIssueDate,
      dueStatus: missedIssueDate ? 'MISSED_WEEKLY_SUCCESSOR' : targetDate > asOf ? 'UPCOMING_WEEKLY_SUCCESSOR' : 'DUE_WEEKLY_SUCCESSOR',
      freshnessDoesNotResetCoveragePeriod: true
    },
    correctivePublication: correctiveCurrentWeek ? {
      mode: 'MISSED_WEDNESDAY_CURRENT_WEEK',
      publicationDate: targetDate,
      period
    } : null,
    priorWeekly: {
      publication: { storyId: current.storyId, editionDate: current.editionDate, publishedAt: current.publishedAt, updatedAt: current.updatedAt, lastCheckedAt: current.lastCheckedAt, maxAgeHours: current.maxAgeHours },
      story: { id: prior.id, headline: prior.headline, publishedAt: prior.publishedAt, updatedAt: prior.updatedAt, lastCheckedAt: prior.lastCheckedAt, storySha256: sha256(stable(prior)) }
    },
    candidateInputs: {
      mechanicalOrder: 'PUBLISHED_AT_DESC_NOT_EDITORIAL_RANKING',
      editorialRankingStatus: 'EDITORIAL_SELECTION_REQUIRED',
      stories: candidates
    },
    coverage: {
      continuation: continuationPath ? binding(continuationPath, continuationRaw) : null,
      sourceAssessmentStatus: continuationPath && continuationRaw ? 'BOUND_INPUT_REQUIRES_EDITORIAL_RECONCILIATION' : 'MISSING_DATED_SOURCE_ASSESSMENT',
      heldOrDuplicateLeadLines: continuationHolds(continuationRaw),
      statement: 'Held or duplicate leads remain inputs for editorial judgment; this packet does not certify source coverage or approve a Weekly.'
    },
    sourceIdentity: { stories: binding(storiesPath, storiesRaw) },
    canonicalWrite: false,
    deployActionTaken: false
  };
}
function argument(flag, args) { const index = args.indexOf(flag); return index < 0 ? null : args[index + 1]; }
function local(root, relative, label) {
  const absolute = path.resolve(root, relative);
  if (!absolute.startsWith(`${root}${path.sep}`) || !fs.existsSync(absolute)) reject(`${label} must exist inside the repository`);
  return absolute;
}
function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check') || !argument('--output', args);
  const asOf = argument('--as-of', args) || new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const storiesRelative = argument('--stories', args) || 'content/newsstand-stories.js';
  const defaultContinuation = `operations/product-stewards/newsstand/editorial-intake/${asOf}-source-continuation.md`;
  const continuationRelative = argument('--continuation', args) || (fs.existsSync(path.join(ROOT, defaultContinuation)) ? defaultContinuation : null);
  const storiesPath = local(ROOT, storiesRelative, '--stories');
  const continuationPath = continuationRelative ? local(ROOT, continuationRelative, '--continuation') : null;
  const output = argument('--output', args);
  if (!check && !output) reject('--output is required unless --check is used');
  const packet = prepareNewsstandWeekly({ storiesRaw: fs.readFileSync(storiesPath, 'utf8'), continuationRaw: continuationPath ? fs.readFileSync(continuationPath, 'utf8') : '', asOf, publicationDate: argument('--publication-date', args), correctiveCurrentWeek: args.includes('--corrective-current-week'), storiesPath: path.relative(ROOT, storiesPath), continuationPath: continuationPath ? path.relative(ROOT, continuationPath) : null });
  const rendered = canonical(packet);
  if (!check) {
    const outputPath = path.resolve(ROOT, output);
    const privateRoot = path.join(ROOT, 'operations/product-stewards/newsstand/release-pipeline-v1/weekly-inputs');
    if (!outputPath.startsWith(`${privateRoot}${path.sep}`) || fs.existsSync(outputPath)) reject('--output must be a new private Weekly input packet path');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, rendered, { flag: 'wx' });
  }
  console.log(`NEWSSTAND WEEKLY ${check ? 'CHECK' : 'PREPARE'} PASS as_of=${packet.asOf} target=${packet.publicationDate} period=${packet.period.startDate}..${packet.period.endDate} candidates=${packet.candidateInputs.stories.length} missed=${packet.cadence.missedIssueDate || 'none'} ranking=${packet.candidateInputs.editorialRankingStatus} sha256=${sha256(rendered)}`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) { try { main(); } catch (error) { console.error(String(error?.message || error)); process.exitCode = 1; } }
