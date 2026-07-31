#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const systemDir = path.join(
  root,
  "operations",
  "product-stewards",
  "learning-content-ecosystem",
);
const registerPath = path.join(systemDir, "claim-register.json");
const inboxPath = path.join(systemDir, "freshness-signal-inbox.json");
const siteIndexPath = path.join(root, "content", "site", "site-index.json");

function parseArgs(argv) {
  const args = {
    asOf: new Date().toISOString().slice(0, 10),
    report: null,
    json: null,
    episode: null,
    strict: false,
    maxCandidates: 300,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--as-of") args.asOf = argv[++index];
    else if (value === "--report") args.report = argv[++index];
    else if (value === "--json") args.json = argv[++index];
    else if (value === "--episode") args.episode = argv[++index];
    else if (value === "--strict") args.strict = true;
    else if (value === "--max-candidates") {
      args.maxCandidates = Number.parseInt(argv[++index], 10);
    } else if (value === "--help") {
      console.log(`Usage:
  node scripts/check-content-freshness.mjs [options]

Options:
  --as-of YYYY-MM-DD       Evaluation date (default: today)
  --episode NN             Limit the release-gate view to one episode
  --report PATH            Write a Markdown report
  --json PATH              Write the complete JSON result
  --max-candidates N       Candidate rows in Markdown (default: 300)
  --strict                 Exit 2 when the evaluated release gate is HOLD
  --help                   Show this help`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${value}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.asOf)) {
    throw new Error(`Invalid --as-of date: ${args.asOf}`);
  }
  if (!Number.isInteger(args.maxCandidates) || args.maxCandidates < 1) {
    throw new Error("--max-candidates must be a positive integer");
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function relative(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function addUniqueError(errors, message) {
  if (!errors.includes(message)) errors.push(message);
}

function validate(register, inbox, asOf) {
  const errors = [];
  const warnings = [];
  if (register.schemaVersion !== "1.0.0") {
    errors.push("claim-register.json schemaVersion must be 1.0.0");
  }
  if (register.owner !== "learning-content-ecosystem") {
    errors.push("claim-register.json owner must be learning-content-ecosystem");
  }
  if (!Array.isArray(register.sources) || !Array.isArray(register.claims)) {
    errors.push("claim-register.json must contain sources[] and claims[]");
    return { errors, warnings };
  }
  if (inbox.schemaVersion !== "1.0.0" || !Array.isArray(inbox.signals)) {
    errors.push("freshness-signal-inbox.json must be schema 1.0.0 with signals[]");
    return { errors, warnings };
  }

  const sourceIds = new Set();
  for (const source of register.sources) {
    if (!/^SRC-[A-Z0-9-]+$/.test(source.id || "")) {
      errors.push(`Invalid source id: ${source.id || "(missing)"}`);
    }
    if (sourceIds.has(source.id)) errors.push(`Duplicate source id: ${source.id}`);
    sourceIds.add(source.id);
    if (!isDate(source.accessedAt)) {
      errors.push(`${source.id}: accessedAt must be YYYY-MM-DD`);
    } else if (source.accessedAt > asOf) {
      errors.push(`${source.id}: accessedAt is in the future (${source.accessedAt})`);
    }
  }

  const claimIds = new Set();
  const consumerIds = new Set();
  const canonicalKeys = new Set();
  for (const claim of register.claims) {
    if (!/^CLM-[A-Z0-9-]+$/.test(claim.id || "")) {
      errors.push(`Invalid claim id: ${claim.id || "(missing)"}`);
    }
    if (claimIds.has(claim.id)) errors.push(`Duplicate claim id: ${claim.id}`);
    claimIds.add(claim.id);
    if (canonicalKeys.has(claim.canonicalKey)) {
      errors.push(`Duplicate canonicalKey: ${claim.canonicalKey}`);
    }
    canonicalKeys.add(claim.canonicalKey);
    for (const dateField of ["lastCheckedAt", "nextReviewAt"]) {
      if (!isDate(claim[dateField])) {
        errors.push(`${claim.id}: ${dateField} must be YYYY-MM-DD`);
      }
    }
    if (claim.lastCheckedAt > asOf) {
      errors.push(`${claim.id}: lastCheckedAt is in the future`);
    }
    for (const sourceId of claim.sourceIds || []) {
      if (!sourceIds.has(sourceId)) {
        errors.push(`${claim.id}: unknown sourceId ${sourceId}`);
      }
    }
    if (!Array.isArray(claim.consumers) || claim.consumers.length === 0) {
      errors.push(`${claim.id}: at least one consumer is required`);
      continue;
    }
    for (const consumer of claim.consumers) {
      if (!/^CON-[A-Z0-9-]+$/.test(consumer.id || "")) {
        errors.push(`${claim.id}: invalid consumer id ${consumer.id || "(missing)"}`);
      }
      if (consumerIds.has(consumer.id)) {
        errors.push(`Duplicate consumer id: ${consumer.id}`);
      }
      consumerIds.add(consumer.id);
      const consumerPath = path.resolve(root, consumer.path || "");
      if (!fs.existsSync(consumerPath)) {
        errors.push(`${consumer.id}: consumer path does not exist: ${consumer.path}`);
      }
      if (!isDate(consumer.lastVerifiedAt)) {
        errors.push(`${consumer.id}: lastVerifiedAt must be YYYY-MM-DD`);
      } else if (consumer.lastVerifiedAt > asOf) {
        errors.push(`${consumer.id}: lastVerifiedAt is in the future`);
      }
    }
  }

  const signalIds = new Set();
  for (const signal of inbox.signals) {
    if (!/^SIG-[A-Z0-9-]+$/.test(signal.id || "")) {
      errors.push(`Invalid signal id: ${signal.id || "(missing)"}`);
    }
    if (signalIds.has(signal.id)) errors.push(`Duplicate signal id: ${signal.id}`);
    signalIds.add(signal.id);
    if (!isDate(signal.receivedAt)) {
      errors.push(`${signal.id}: receivedAt must be YYYY-MM-DD`);
    } else if (signal.receivedAt > asOf) {
      errors.push(`${signal.id}: receivedAt is in the future`);
    }
    for (const claimId of signal.affectedClaimIds || []) {
      if (!claimIds.has(claimId)) {
        errors.push(`${signal.id}: unknown affected claim ${claimId}`);
      }
    }
    if (
      ["OPEN", "ROUTED", "ACCEPTED", "WATCH"].includes(signal.status) &&
      (signal.affectedClaimIds || []).length === 0
    ) {
      warnings.push(`${signal.id}: active signal is not yet matched to a claim`);
    }
  }
  return { errors, warnings };
}

const excludedSegments = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "_archive",
  "_archives",
  "_rejected",
  "_superseded",
  "evidence",
  "review-packets",
  "design-qa",
  "launch",
  "freshness-runs",
]);
const allowedExtensions = new Set([
  ".md",
  ".html",
  ".json",
  ".js",
  ".mjs",
  ".jsx",
  ".txt",
]);
const explicitlyExcluded = new Set([
  "operations/painpoints-log.md",
  "operations/engine/LEDGER.md",
  "operations/product-stewards/learning-content-ecosystem/claim-register.json",
  "operations/product-stewards/learning-content-ecosystem/claim-register.schema.json",
  "operations/product-stewards/learning-content-ecosystem/freshness-signal-inbox.json",
  "operations/product-stewards/learning-content-ecosystem/freshness-signal-inbox.schema.json",
  "operations/product-stewards/learning-content-ecosystem/FRESHNESS-SYSTEM.md",
]);

function shouldDescend(filePath) {
  const rel = relative(filePath);
  const segments = rel.split("/");
  if (segments.some((segment) => excludedSegments.has(segment))) return false;
  if (rel.startsWith("operations/design-explorations/")) {
    return (
      rel.includes("/prototype/src") ||
      rel.endsWith("/prototype") ||
      rel === "operations/design-explorations"
    );
  }
  return true;
}

function collectFiles(directory, output = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (shouldDescend(filePath)) collectFiles(filePath, output);
      continue;
    }
    const rel = relative(filePath);
    if (explicitlyExcluded.has(rel)) continue;
    if (allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      output.push(filePath);
    }
  }
  return output;
}

const candidatePatterns = [
  {
    category: "policy_or_data_practice",
    priority: "HIGH",
    pattern:
      /\b(retain|retention|train(?:ing)? on|data policy|privacy policy|confidential|medical|legal|financial|copyright|connector|share link|public link)\b|\bpermission\s+(?:to\s+)?(?:use|share|publish|upload|access|copy)\b/i,
  },
  {
    category: "access_plan_price_region",
    priority: "HIGH",
    pattern:
      /(?:[$€£]\s?\d[\d,.]*|\b(?:free|plus|pro|team|business|enterprise)\s+plan\b|\b(?:available|unavailable|rolled out|access)\b.*\b(?:plan|region|country|users?)\b)/i,
  },
  {
    category: "model_or_version",
    priority: "HIGH",
    pattern:
      /\b(?:GPT[-\s]?\d[\w.-]*|Claude\s+(?:Opus|Sonnet|Haiku|Fable)?\s*\d[\w.-]*|Gemini\s+\d[\w.-]*|ChatGPT|OpenAI|Anthropic|Google AI|knowledge cutoff|context window)\b/i,
  },
  {
    category: "statistic",
    priority: "MATERIAL",
    pattern:
      /(?:\b\d+(?:\.\d+)?\s?%|\b\d+(?:,\d{3})+\b|\b(?:percent|percentage|respondents?|sample|survey|study found|research found|times more|times less)\b)/i,
  },
  {
    category: "dated_status",
    priority: "MATERIAL",
    pattern:
      /\b(?:currently|latest|newest|today|as of|now available|recently|this year|this month|this week|default model|flagship)\b/i,
  },
  {
    category: "definition",
    priority: "MATERIAL",
    pattern:
      /\b(?:generative AI|AI model|large language model|LLM|hallucination|agentic AI|artificial general intelligence|AGI|training data|context window|prompt injection)\b.*\b(?:is|means|refers to|describes|defined as)\b/i,
  },
  {
    category: "quote_or_attribution",
    priority: "MATERIAL",
    pattern:
      /(?:“[^”]{12,}”|"[^"]{12,}")\s*(?:—|–|-|said|says|according to)\s*[A-Z]/,
  },
];

function distinctiveTokens(claim) {
  const values = [
    claim.canonicalKey,
    claim.canonicalWording,
    claim.evidenceSummary,
  ].join(" ");
  const numbers = values.match(/\b\d+(?:\.\d+)?%?\b/g) || [];
  const words = claim.canonicalKey.split("-").filter((word) => word.length > 3);
  return [...new Set([...numbers, ...words])];
}

function scanCandidates(register) {
  const consumerClaims = new Map();
  for (const claim of register.claims) {
    for (const consumer of claim.consumers) {
      const list = consumerClaims.get(consumer.path) || [];
      list.push(claim);
      consumerClaims.set(consumer.path, list);
    }
  }

  const scanRoots = [
    path.join(root, "content"),
    path.join(root, "operations", "audio"),
    path.join(root, "operations", "classes"),
    path.join(root, "operations", "codex-prompts"),
    path.join(root, "operations", "design-explorations"),
  ];
  const siteIndex = readJson(siteIndexPath);
  const indexedRoutes = (siteIndex.entries || [])
    .filter((entry) => ["live", "preview"].includes(entry.status))
    .map((entry) => {
      const route = String(entry.url || "")
        .split(/[?#]/, 1)[0]
        .replace(/^\/+/, "");
      if (!route || /^https?:/i.test(route)) return null;
      const candidate = path.resolve(
        root,
        route.endsWith("/") ? `${route}index.html` : route,
      );
      return candidate.startsWith(`${root}${path.sep}`) ? candidate : null;
    })
    .filter(Boolean);
  const missingIndexedRoutes = indexedRoutes
    .filter((filePath) => !fs.existsSync(filePath))
    .map(relative);
  const files = [...new Set([
    ...indexedRoutes.filter((filePath) => fs.existsSync(filePath)),
    ...scanRoots
      .filter((scanRoot) => fs.existsSync(scanRoot))
      .flatMap((scanRoot) => collectFiles(scanRoot)),
  ])];

  const candidates = [];
  const seen = new Set();
  for (const filePath of files) {
    const rel = relative(filePath);
    let contents;
    try {
      const stat = fs.statSync(filePath);
      if (stat.size > 2_000_000) continue;
      contents = fs.readFileSync(filePath, "utf8");
    } catch {
      continue;
    }
    const lines = contents.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const raw = lines[index].replace(/\s+/g, " ").trim();
      if (!raw || raw.length < 18 || raw.length > 1200) continue;
      for (const rule of candidatePatterns) {
        if (!rule.pattern.test(raw)) continue;
        const snippet = raw.slice(0, 360);
        const hash = crypto
          .createHash("sha256")
          .update(`${rel}\n${rule.category}\n${snippet.toLowerCase()}`)
          .digest("hex")
          .slice(0, 12);
        if (seen.has(hash)) continue;
        seen.add(hash);
        const claimsAtPath = consumerClaims.get(rel) || [];
        const lower = snippet.toLowerCase();
        const matchedClaim = claimsAtPath.find((claim) =>
          distinctiveTokens(claim).some((token) =>
            lower.includes(String(token).toLowerCase()),
          ),
        );
        candidates.push({
          id: `CAND-${hash.toUpperCase()}`,
          category: rule.category,
          priority: rule.priority,
          path: rel,
          line: index + 1,
          snippet,
          registration: matchedClaim ? "REGISTERED_CONSUMER" : "UNREGISTERED",
          claimId: matchedClaim?.id || null,
        });
      }
    }
  }
  const priorityOrder = { HIGH: 0, MATERIAL: 1, LOW: 2 };
  return {
    candidates: candidates.sort(
      (left, right) =>
        priorityOrder[left.priority] - priorityOrder[right.priority] ||
        left.path.localeCompare(right.path) ||
        left.line - right.line,
    ),
    scanMeta: {
      filesScanned: files.length,
      currentIndexedRoutes: indexedRoutes.length,
      missingIndexedRoutes,
    },
  };
}

function evaluate(register, inbox, args, validation, candidates, scanMeta) {
  const episodeNeedle = args.episode
    ? new RegExp(`(?:episode|issue)[- _]?0?${Number(args.episode)}\\b`, "i")
    : null;
  const claims = episodeNeedle
    ? register.claims.filter((claim) =>
        claim.consumers.some(
          (consumer) =>
            episodeNeedle.test(consumer.path) ||
            episodeNeedle.test(consumer.surface),
        ),
      )
    : register.claims;
  const claimIdSet = new Set(claims.map((claim) => claim.id));
  const due = claims.filter((claim) => claim.nextReviewAt <= args.asOf);
  const dueSoonLimit = new Date(`${args.asOf}T00:00:00Z`);
  dueSoonLimit.setUTCDate(dueSoonLimit.getUTCDate() + 14);
  const dueSoonDate = dueSoonLimit.toISOString().slice(0, 10);
  const dueSoon = claims.filter(
    (claim) =>
      claim.nextReviewAt > args.asOf && claim.nextReviewAt <= dueSoonDate,
  );
  const blockedClaims = claims.filter((claim) =>
    ["STALE", "CONFLICTED", "CORRECTION_REQUIRED", "HOLD"].includes(claim.status),
  );
  const openConsumerActions = claims.flatMap((claim) =>
    claim.consumers
      .filter((consumer) =>
        [
          "UPDATE_REQUIRED",
          "SCRIPT_READY",
          "REBUILD_REQUIRED",
          "OWNER_REVIEW",
          "HOLD",
        ].includes(consumer.status),
      )
      .map((consumer) => ({ claimId: claim.id, ...consumer })),
  );
  const activeSignals = inbox.signals.filter((signal) =>
    ["OPEN", "ROUTED", "ACCEPTED", "WATCH"].includes(signal.status),
  );
  const matchedSignals = activeSignals.filter((signal) =>
    signal.affectedClaimIds.some((id) => claimIdSet.has(id)),
  );
  const unmatchedSignals = activeSignals.filter(
    (signal) => signal.affectedClaimIds.length === 0,
  );
  const releaseHold =
    validation.errors.length > 0 ||
    blockedClaims.length > 0 ||
    due.length > 0 ||
    openConsumerActions.length > 0 ||
    matchedSignals.some(
      (signal) =>
        ["OPEN", "ROUTED"].includes(signal.status) &&
        ["MATERIAL", "HIGH", "HARD_HOLD"].includes(signal.severity),
    );
  return {
    evaluatedAt: args.asOf,
    episode: args.episode,
    gate: releaseHold ? "HOLD" : "PASS",
    coverage: register.coverage,
    counts: {
      registeredClaims: register.claims.length,
      evaluatedClaims: claims.length,
      sources: register.sources.length,
      consumers: register.claims.reduce(
        (sum, claim) => sum + claim.consumers.length,
        0,
      ),
      due: due.length,
      dueSoon: dueSoon.length,
      blockedClaims: blockedClaims.length,
      openConsumerActions: openConsumerActions.length,
      activeSignals: activeSignals.length,
      unmatchedSignals: unmatchedSignals.length,
      filesScanned: scanMeta.filesScanned,
      currentIndexedRoutes: scanMeta.currentIndexedRoutes,
      missingIndexedRoutes: scanMeta.missingIndexedRoutes.length,
      scanCandidates: candidates.length,
      unregisteredCandidates: candidates.filter(
        (candidate) => candidate.registration === "UNREGISTERED",
      ).length,
    },
    validation,
    due,
    dueSoon,
    blockedClaims,
    openConsumerActions,
    activeSignals,
    matchedSignals,
    unmatchedSignals,
    scanMeta,
    candidates,
  };
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .trim();
}

function markdown(result, maxCandidates) {
  const episodeLabel = result.episode
    ? `Episode ${String(result.episode).padStart(2, "0")}`
    : "site-wide";
  const rows = [];
  rows.push(`# LAiDIES weekly freshness report — ${result.evaluatedAt}`);
  rows.push("");
  rows.push(`**Scope:** ${episodeLabel}`);
  rows.push(`**Release gate:** ${result.gate}`);
  rows.push(
    `**Registry coverage:** ${result.coverage.state} — ${result.coverage.scope}`,
  );
  rows.push("");
  rows.push("## Decision summary");
  rows.push("");
  rows.push("| Measure | Count |");
  rows.push("|---|---:|");
  for (const [key, value] of Object.entries(result.counts)) {
    rows.push(`| ${key} | ${value} |`);
  }
  rows.push("");
  rows.push(
    "A PASS means the evaluated registered claims have no due/blocked release condition. It does not mean the historical site backfill is complete.",
  );

  rows.push("");
  rows.push("## Due or blocked claims");
  rows.push("");
  if (result.due.length === 0 && result.blockedClaims.length === 0) {
    rows.push("None in the evaluated registered scope.");
  } else {
    rows.push("| Claim | Status | Next review | Owner |");
    rows.push("|---|---|---|---|");
    const combined = new Map(
      [...result.due, ...result.blockedClaims].map((claim) => [claim.id, claim]),
    );
    for (const claim of combined.values()) {
      rows.push(
        `| ${claim.id} — ${escapeCell(claim.canonicalKey)} | ${claim.status} | ${claim.nextReviewAt} | ${claim.owner} |`,
      );
    }
  }

  rows.push("");
  rows.push("## Open consumer actions");
  rows.push("");
  if (result.openConsumerActions.length === 0) {
    rows.push("None.");
  } else {
    rows.push("| Claim | Consumer | Status | Owner | Path / locator |");
    rows.push("|---|---|---|---|---|");
    for (const consumer of result.openConsumerActions) {
      rows.push(
        `| ${consumer.claimId} | ${escapeCell(consumer.surface)} | ${consumer.status} | ${consumer.owner} | \`${consumer.path}\` — ${escapeCell(consumer.locator)} |`,
      );
    }
  }

  rows.push("");
  rows.push("## Active freshness signals");
  rows.push("");
  if (result.activeSignals.length === 0) {
    rows.push("None.");
  } else {
    rows.push("| Signal | Source | Status | Severity | Claims / entities |");
    rows.push("|---|---|---|---|---|");
    for (const signal of result.activeSignals) {
      const targets =
        signal.affectedClaimIds.length > 0
          ? signal.affectedClaimIds.join(", ")
          : `UNMATCHED — ${signal.affectedEntities.join(", ")}`;
      rows.push(
        `| ${signal.id} | ${signal.sourceSystem} | ${signal.status} | ${signal.severity} | ${escapeCell(targets)} |`,
      );
    }
  }

  rows.push("");
  rows.push("## Unregistered candidate queue");
  rows.push("");
  rows.push(
    "Machine-discovered candidates require human materiality, evidence and duplication review. They are not findings of truth or staleness.",
  );
  rows.push("");
  const unregistered = result.candidates
    .filter((candidate) => candidate.registration === "UNREGISTERED")
    .slice(0, maxCandidates);
  if (unregistered.length === 0) {
    rows.push("No unregistered candidates found.");
  } else {
    rows.push("| Priority | Category | Location | Candidate text |");
    rows.push("|---|---|---|---|");
    for (const candidate of unregistered) {
      rows.push(
        `| ${candidate.priority} | ${candidate.category} | \`${candidate.path}:${candidate.line}\` | ${escapeCell(candidate.snippet)} |`,
      );
    }
    if (result.counts.unregisteredCandidates > unregistered.length) {
      rows.push("");
      rows.push(
        `Showing ${unregistered.length} of ${result.counts.unregisteredCandidates} unregistered candidates. The JSON report retains the complete queue.`,
      );
    }
  }

  rows.push("");
  rows.push("## Known coverage gaps");
  rows.push("");
  for (const gap of result.coverage.knownGaps) rows.push(`- ${gap}`);
  rows.push("");
  rows.push(
    "_Generated by `scripts/check-content-freshness.mjs`. A generated report records what the register and scanner found on this run; it is not publication or public-currentness proof._",
  );
  rows.push("");
  return rows.join("\n");
}

function writeFile(target, contents) {
  const absolute = path.resolve(root, target);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, contents);
  return relative(absolute);
}

let args;
try {
  args = parseArgs(process.argv.slice(2));
  const register = readJson(registerPath);
  const inbox = readJson(inboxPath);
  const validation = validate(register, inbox, args.asOf);
  const scan = scanCandidates(register);
  const result = evaluate(
    register,
    inbox,
    args,
    validation,
    scan.candidates,
    scan.scanMeta,
  );

  let reportOutput = null;
  let jsonOutput = null;
  if (args.report) {
    reportOutput = writeFile(args.report, markdown(result, args.maxCandidates));
  }
  if (args.json) {
    jsonOutput = writeFile(args.json, `${JSON.stringify(result, null, 2)}\n`);
  }

  console.log(
    [
      `CONTENT FRESHNESS ${result.gate}`,
      `as_of=${result.evaluatedAt}`,
      `scope=${result.episode ? `episode-${result.episode}` : "site-wide"}`,
      `registered_claims=${result.counts.registeredClaims}`,
      `consumers=${result.counts.consumers}`,
      `due=${result.counts.due}`,
      `blocked=${result.counts.blockedClaims}`,
      `open_consumer_actions=${result.counts.openConsumerActions}`,
      `unmatched_signals=${result.counts.unmatchedSignals}`,
      `unregistered_candidates=${result.counts.unregisteredCandidates}`,
      `validation_errors=${result.validation.errors.length}`,
      reportOutput ? `report=${reportOutput}` : null,
      jsonOutput ? `json=${jsonOutput}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  if (validation.errors.length > 0) {
    for (const error of validation.errors) console.error(`ERROR ${error}`);
    process.exit(1);
  }
  if (args.strict && result.gate === "HOLD") process.exit(2);
} catch (error) {
  console.error(`CONTENT FRESHNESS ERROR\n${error.stack || error.message}`);
  process.exit(1);
}
