#!/usr/bin/env node
import fs from "node:fs";
import { validateDispositionRegistry } from "./check-newsstand-cloud-intake-dispositions.mjs";

const LABEL = "newsstand-intake";
const TITLE = "[NewsStand intake] Unreconciled cloud signals";

function md(value) {
  return String(value || "").replace(/[\[\]`*_<>]/g, " ").replace(/\s+/g, " ").trim();
}

export function buildIssueComment(receipt, runUrl) {
  const lines = [
    `## Private intake — ${receipt.generatedAt}`,
    "",
    `**Outcome:** ${receipt.counts.newSignals} new private signal(s); ${receipt.counts.sourceHealthAlerts} new or changed source-health alert(s). Nothing was drafted, approved, published or deployed.`,
    "",
    `**Receipt:** [GitHub Actions run](${runUrl})`,
    ""
  ];
  if (receipt.newSignals.length) {
    lines.push("### Signals requiring an exact disposition", "");
    for (const signal of receipt.newSignals) {
      lines.push(`- **${md(signal.title)}** — ${md(signal.sourceName)} (${signal.signalId})`);
      lines.push(`  - Source: ${signal.url}`);
      lines.push(`  - Published: ${signal.publishedAt || "UNKNOWN"}`);
      lines.push(`  - Candidate routes: ${signal.destinations.map(md).join(", ")}`);
      lines.push("  - Required next record: duplicate / quiet / watch / no-build, or one governed content work order with exact owner and trigger.");
    }
    lines.push("");
  }
  if (receipt.sourceHealthAlerts.length) {
    lines.push("### Source health", "");
    for (const source of receipt.sourceHealthAlerts) {
      lines.push(`- ${md(source.sourceId)} — ${md(source.error)} (${source.url || "URL unavailable"})`);
    }
    lines.push("");
  }
  lines.push("This issue is a private execution queue, not a publication queue. It may close only after every listed signal has a durable disposition.");
  return lines.join("\n");
}

export function removeAlreadyReported(receipt, priorText = "") {
  const seen = String(priorText || "");
  const newSignals = (receipt.newSignals || []).filter((signal) => !seen.includes(signal.signalId));
  const sourceHealthAlerts = (receipt.sourceHealthAlerts || []).filter((alert) => {
    const marker = `${alert.sourceId} — ${alert.error}`;
    return !seen.includes(marker);
  });
  return {
    ...receipt,
    counts: {
      ...receipt.counts,
      newSignals: newSignals.length,
      sourceHealthAlerts: sourceHealthAlerts.length
    },
    newSignals,
    sourceHealthAlerts
  };
}

export function resolvedSignalIds(registry) {
  return new Set((registry?.signals || []).map((signal) => signal.signalId));
}

export function extractSignalIds(text = "") {
  return [...new Set(String(text).match(/NSCI-[a-f0-9]{20}/g) || [])];
}

export function extractSourceHealthMarkers(text = "") {
  const markers = [];
  for (const match of String(text).matchAll(/^- (SRC-[A-Z0-9-]+ — [^\n(]+?)(?: \(|$)/gm)) markers.push(match[1].trim());
  return [...new Set(markers)];
}

export function removeResolvedSignals(receipt, registry) {
  const resolved = resolvedSignalIds(registry);
  const resolvedHealth = new Set((registry?.sourceHealth || []).map((source) => source.alertMarker));
  const newSignals = (receipt.newSignals || []).filter((signal) => !resolved.has(signal.signalId));
  const sourceHealthAlerts = (receipt.sourceHealthAlerts || []).filter((alert) => !resolvedHealth.has(`${alert.sourceId} — ${alert.error}`));
  return {
    ...receipt,
    counts: {
      ...receipt.counts,
      newSignals: newSignals.length,
      sourceHealthAlerts: sourceHealthAlerts.length
    },
    newSignals,
    sourceHealthAlerts
  };
}

export function unresolvedSignalIds(priorText, receipt, registry) {
  const all = new Set([
    ...extractSignalIds(priorText),
    ...(receipt?.newSignals || []).map((signal) => signal.signalId)
  ]);
  const resolved = resolvedSignalIds(registry);
  return [...all].filter((signalId) => !resolved.has(signalId)).sort();
}

export function unresolvedSourceHealthMarkers(priorText, receipt, registry) {
  const all = new Set([
    ...extractSourceHealthMarkers(priorText),
    ...(receipt?.sourceHealthAlerts || []).map((alert) => `${alert.sourceId} — ${alert.error}`)
  ]);
  const resolved = new Set((registry?.sourceHealth || []).map((source) => source.alertMarker));
  return [...all].filter((marker) => !resolved.has(marker)).sort();
}

export function buildClosureComment(registry, commitUrl) {
  const signals = registry.signals.map((signal) => `- **${signal.signalId}** — ${signal.disposition}: ${md(signal.title)}`);
  return [
    "## Durable reconciliation complete",
    "",
    ...signals,
    "",
    `The exact dispositions and source-health follow-up are recorded in [the checksum-bound repository registry](${commitUrl}).`,
    "",
    "Closing this intake issue records reconciliation only. It does not mean any story was drafted, approved, published or deployed. A future unrecognized signal will open a new issue."
  ].join("\n");
}

async function api(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) throw new Error("GITHUB_TOKEN and GITHUB_REPOSITORY are required");
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...options,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body.slice(0, 500)}`);
  }
  return response.status === 204 ? null : response.json();
}

async function main() {
  const receiptPath = process.argv[2];
  if (!receiptPath) throw new Error("usage: node scripts/upsert-newsstand-intake-issue.mjs RECEIPT.json");
  let receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  const registryPath = process.env.NEWSSTAND_DISPOSITION_REGISTRY || new URL("../operations/product-stewards/newsstand/cloud-intake-dispositions.json", import.meta.url);
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const registryValidation = validateDispositionRegistry(registry);
  if (!registryValidation.ok) throw new Error(`invalid NewsStand disposition registry: ${registryValidation.errors.join("; ")}`);
  receipt = removeResolvedSignals(receipt, registry);
  try {
    await api("/labels", { method: "POST", body: JSON.stringify({ name: LABEL, color: "5319E7", description: "Private NewsStand source signals awaiting durable reconciliation" }) });
  } catch (error) {
    if (!/422/.test(error.message)) throw error;
  }
  const issues = await api(`/issues?state=open&labels=${encodeURIComponent(LABEL)}&per_page=100`);
  let issue = issues.find((candidate) => candidate.title === TITLE);
  if (!issue && !(receipt.counts.newSignals || receipt.counts.sourceHealthAlerts)) {
    console.log("NO_ISSUE_UPDATE — no unresolved signals or source-health failures");
    return;
  }
  if (!issue) {
    issue = await api("/issues", {
      method: "POST",
      body: JSON.stringify({
        title: TITLE,
        labels: [LABEL],
        body: "Cloud intake continues while Ali's laptop is off. Every signal must receive a durable duplicate, quiet, watch, no-build or governed work-order disposition. This issue does not authorize drafting, approval, publication or deployment."
      })
    });
  }
  const comments = await api(`/issues/${issue.number}/comments?per_page=100`);
  const priorText = [issue.body, ...comments.map((comment) => comment.body)].join("\n");
  receipt = removeAlreadyReported(receipt, priorText);
  const unresolved = unresolvedSignalIds(priorText, receipt, registry);
  const unresolvedHealth = unresolvedSourceHealthMarkers(priorText, receipt, registry);
  if (unresolved.length === 0 && unresolvedHealth.length === 0 && !(receipt.counts.newSignals || receipt.counts.sourceHealthAlerts)) {
    const sha = process.env.GITHUB_SHA || "main";
    const commitUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/blob/${sha}/operations/product-stewards/newsstand/cloud-intake-dispositions.json`;
    await api(`/issues/${issue.number}/comments`, {
      method: "POST",
      body: JSON.stringify({ body: buildClosureComment(registry, commitUrl) })
    });
    await api(`/issues/${issue.number}`, {
      method: "PATCH",
      body: JSON.stringify({ state: "closed", state_reason: "completed" })
    });
    console.log(`NEWSSTAND INTAKE ISSUE CLOSED number=${issue.number} dispositions=${registry.signals.length}`);
    return;
  }
  if (!(receipt.counts.newSignals || receipt.counts.sourceHealthAlerts)) {
    console.log(`NO_ISSUE_UPDATE — issue ${issue.number} still has unresolved signals=${unresolved.join(",") || "none"} source_health=${unresolvedHealth.join(" | ") || "none"}`);
    return;
  }
  const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
  await api(`/issues/${issue.number}/comments`, {
    method: "POST",
    body: JSON.stringify({ body: buildIssueComment(receipt, runUrl) })
  });
  console.log(`NEWSSTAND INTAKE ISSUE UPDATED number=${issue.number}`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
